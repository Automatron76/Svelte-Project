import type { Journal } from "$lib/types/journal-types";
import mongoose, { Model } from "mongoose";

const journalSchema = new mongoose.Schema<Journal>({
  amount: Number,
  method: String,
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate"
  },
  lat: Number,
  lng: Number
});

let JournalMongoose: Model<Journal>;
try {
  JournalMongoose = mongoose.model<Journal>("Journal");
} catch {
  JournalMongoose = mongoose.model<Journal>("Journal", journalSchema);
}

export { JournalMongoose };
