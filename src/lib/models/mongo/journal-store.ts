import type { Journal } from "$lib/types/journal-types.js";
import { JournalMongoose } from "./journal.js";

export const journalStore = {
  async find(): Promise<Journal[]> {
    const journals = await JournalMongoose.find().populate("donor").populate("candidate").lean();
    return journals;
  },

  async findBy(id: string): Promise<Journal | null> {
    const journal = await JournalMongoose.findOne({ candidate: id });
    if (!journal) {
      return null;
    }
    return journal;
  },

  async add(journal: Journal): Promise<Journal | null> {
    const newJournal = new JournalMongoose({ ...journal });
    await newJournal.save();
    const populatedJournal = await JournalMongoose.findById(newJournal._id).populate("donor").populate("candidate").lean();
    return populatedJournal;
  },

  async delete() {
    await JournalMongoose.deleteMany({});
  }
};