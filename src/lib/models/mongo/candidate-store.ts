import type { Candidate, Journal } from "$lib/types/journal-types.js";
import { CandidateMongoose } from "./candidate.js";
import { JournalMongoose } from "./journal.js";

export const candidateStore = {
  async find(): Promise<Candidate[]> {
    const candidates = await CandidateMongoose.find().lean();
    return candidates;
  },

  async findOne(id: string): Promise<Candidate | null> {
    const candidate = await CandidateMongoose.findOne({ _id: id }).lean();
    return candidate;
  },

  async findBy(candidateId: string): Promise<Journal[]> {
    const journals = await JournalMongoose.find({ candidate: candidateId}).populate("donor").populate("candidate").lean();
    return journals;
  }
};
