import type { Journal, Candidate } from "./types/journal-types";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({
    email: "" ,
    name: "",
    token: "",
    _id: ""});
export const currentJournals = $state({ journals: [] as Journal[] });
export const currentCandidates = $state({ candidates: [] as Candidate[] });

export const currentDataSets = $state({
    journalsByMethod: {
      labels: ["bike", "walk", "bus"],
      datasets: [
        {
          values: [0, 0, 0]
        }
      ]
    },
    journalsByCandidate: {
      labels: [] as string[],
      datasets: [
        {
          values: [0, 0, 0]
        }
      ]
    }
  })