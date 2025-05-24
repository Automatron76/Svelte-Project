
import type { JournalService, Session, User } from "$lib/types/journal-types";
import type { Candidate, Journal } from "$lib/types/journal-types";
import { userStore } from "$lib/models/mongo/user-store";
import { journalStore } from "$lib/models/mongo/journal-store";
import { candidateStore } from "$lib/models/mongo/candidate-store";


export const journalService: JournalService = {
  // baseUrl: "http://localhost:4000",

  async signup(user: User): Promise<boolean> {
    try {
      const newUser = await userStore.add(user);
      return !!newUser
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const user = await  userStore.findBy(email);
      if ( user !== null && user.password ===password) {
         
        const session= {
            name: `${user.firstName} ${user.lastName}`,
            token: user._id!.toString(),
            _id: user._id!.toString(),
            email: user.email
        };
     //   this.saveSession(session, email);
     //   await this.refreshJournalInfo();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

 // saveSession(session: Session, email: string) {
 //   loggedInUser.email = email;
  //  loggedInUser.name = session.name;
  //  loggedInUser.token = session.token;
  //  loggedInUser._id = session._id;
  //  localStorage.journal = JSON.stringify(loggedInUser);
//  },

 // async restoreSession() {
 //   const savedLoggedInUser = localStorage.journal;
 //   if (savedLoggedInUser) {
 //     const session = JSON.parse(savedLoggedInUser);
 //     loggedInUser.email = session.email;
 //     loggedInUser.name = session.name;
 //     loggedInUser.token = session.token;
 //     loggedInUser._id = session._id;
 //   }
    
 // },

 // clearSession() {
 //   currentJournals.journals = [];
 //   currentCandidates.candidates = [];
 //   loggedInUser.email = "";
 //   loggedInUser.name = "";
 //   loggedInUser.token = "";
 //   loggedInUser._id = "";
 //   localStorage.removeItem("journal");
 // },


  async journal(journal: Journal) {
    try {
      const newJournal = await journalStore.add(journal);
      return JSON.parse(JSON.stringify(newJournal));
       
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getCandidates(): Promise<Candidate[]> {
    try {
      const candidates = await candidateStore.find();
      return JSON.parse(JSON.stringify(candidates));
    } catch (error) {
    console.log(error);
      return [];
    }
  },

  async getJournals(candidateId?: string): Promise<Journal[]> {
    try {
      if(candidateId) {
      const journals = await journalStore.findBy(candidateId);
      return JSON.parse(JSON.stringify(journals))
    } else {
      const journals = await journalStore.find();
      return JSON.parse(JSON.stringify(journals));
    } 
    }catch (error) {
      console.log(error)
        return [];
}

}
}
