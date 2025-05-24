import axios from "axios";
import type { Session, User } from "$lib/types/journal-types";
import type { Candidate, Journal } from "$lib/types/journal-types";
import { currentDataSets, currentJournals, loggedInUser, currentCandidates } from "$lib/runes.svelte";



export function computeByMethod(JournalList: Journal[]) {
  JournalList.forEach((journal) => {
    if (journal.method == "bus") {
      currentDataSets.journalsByMethod.datasets[0].values[0] += journal.amount;
    } else if (journal.method == "bike") {
      currentDataSets.journalsByMethod.datasets[0].values[1] += journal.amount;
    }
  });
}

export function computeByCandidate(JournalList: Journal[], candidates: Candidate[]) {
  currentDataSets.journalsByCandidate.labels = [];
  candidates.forEach((candidate) => {
    currentDataSets.journalsByCandidate.labels.push(
      // @ts-ignore
      `${candidate.lastName}, ${candidate.firstName}`
    );
    currentDataSets.journalsByCandidate.datasets[0].values.push(0);
  });

  candidates.forEach((candidate, i) => {
    JournalList.forEach((journal) => {
      if (typeof journal.candidate !== "string") {
        if (journal.candidate._id == candidate._id) {
          currentDataSets.journalsByCandidate.datasets[0].values[i] += journal.amount;
        }
      }
    });
  });
}



export const JournalService = {
  baseUrl: "http://localhost:4000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
         email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        this.saveSession(session, email);
        await this.refreshJournalInfo();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.journal = JSON.stringify(loggedInUser);
  },

  async restoreSession() {
    const savedLoggedInUser = localStorage.journal;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
    }
    await this.refreshJournalInfo();
  },

  clearSession() {
    currentJournals.journals = [];
    currentCandidates.candidates = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("journal");
  },


  async journal(journal: Journal, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token
       
      const response = await axios.post(this.baseUrl + "/api/candidates/" + journal.candidate + "/journals", journal);
      console.log("Creating journal for candidate ID:", journal.candidate),
      console.log("URL", `${this.baseUrl}/api/candidates/${journal.candidate}/journals)`),
      await this.refreshJournalInfo();
      return response.status == 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getCandidates(token: string): Promise<Candidate[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/candidates");
      return response.data;
    } catch (error) {
    console.log(error);
      return [];
    }
  },

  async getJournals(token: string): Promise<Journal[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/journals");
      return response.data;
    } catch (error) {
    console.log(error)
      return [];
    }

},

async refreshJournalInfo() {
  if (loggedInUser.token) {
    currentJournals.journals = await this.getJournals(loggedInUser.token);
    currentCandidates.candidates = await this.getCandidates(loggedInUser.token);
    computeByMethod(currentJournals.journals);
    computeByCandidate(currentJournals.journals, currentCandidates.candidates)
  }
},





}
