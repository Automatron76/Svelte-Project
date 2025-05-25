
import type { JournalService, Session, User } from "$lib/types/journal-types";
import type { Candidate, Journal } from "$lib/types/journal-types";
import { userStore } from "$lib/models/mongo/user-store";
import { journalStore } from "$lib/models/mongo/journal-store";
import { candidateStore } from "$lib/models/mongo/candidate-store";
 
import validator from "validator";


export const journalService: JournalService = {
  // baseUrl: "http://localhost:4000",

  async signup(user: User): Promise<boolean> {

    const sanitizedUser = {
      ...user,
      email: validator.normalizeEmail(user.email) || "",
      firstName: validator.escape(user.firstName),
      lastname: validator.escape(user.lastName),
      password: validator.escape(user.password)
    }
    console.log("Sanitized user object:", sanitizedUser)
   if (!sanitizedUser.email) {
    console.log("email emtpy:")
   } 
   

    if( sanitizedUser.email || !validator.isEmail(sanitizedUser.email) || sanitizedUser.password.length <4) { return false}
    console.log("invalid email format")
    try {
      const existingUser = await userStore.findBy(sanitizedUser.email)
      console.log("check if user exists with:", sanitizedUser.email)
      if(existingUser) {
        console.log("user seems to exist already:", existingUser.email)
        return false
      }
      const newUser = await userStore.add(sanitizedUser);
      return !!newUser
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const sanitizedEmail = validator.normalizeEmail(email);
      const sanitizedPassword = validator.escape(password);

      if ( !sanitizedEmail || !validator.isEmail(sanitizedEmail))return null 
      if (sanitizedPassword.length <0) return null

      const user = await  userStore.findBy(sanitizedEmail);
      if (user !== null && user.password === sanitizedPassword)
      {
         
        const session= {
            name: `${user.firstName} ${user.lastName}`,
            token: user._id!.toString(),
            _id: user._id!.toString(),
            email: user.email
        };
    
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },



  async journal(journal: Journal) {

    const sanitizedJournal = {
      ...journal,
      method: validator.escape(journal.method),
      amount: Math.max(0,Number(journal.amount)),
      lat: Number(journal.lat),
      lng: Number(journal.lng) 
    }

    if ( !sanitizedJournal.method || isNaN(sanitizedJournal.amount) || isNaN(sanitizedJournal.lat) || isNaN(sanitizedJournal.lng)) { return false}


    try {
      const newJournal = await journalStore.add(sanitizedJournal);
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
        return [];}
    }

}
