 
import { loggedInUser, currentDataSets, currentCandidates, currentJournals } from "$lib/runes.svelte";
import type {Journal, Candidate}  from "$lib/types/journal-types";
import type LeafletMap from "$lib/ui/LeafletMap.svelte";
 

 
 
 

export function computeByMethod(journalList: Journal[]) {
  currentDataSets.journalsByMethod.datasets[0].values= [0,0,0]
  
  journalList.forEach((journal) => {
    if (journal.method == "bike") {
      currentDataSets.journalsByMethod.datasets[0].values[0] += journal.amount;
    } else if (journal.method == "walk") {
      currentDataSets.journalsByMethod.datasets[0].values[1] += journal.amount;
    }else if (journal.method == "bus") {
      currentDataSets.journalsByMethod.datasets[0].values[2] += journal.amount;
  }});
}

export function computeByCandidate(journalList: Journal[], candidates: Candidate[]) {
  currentDataSets.journalsByCandidate.labels = [];
  currentDataSets.journalsByCandidate.datasets[0].values = [];
  candidates.forEach((candidate) => {
    currentDataSets.journalsByCandidate.labels.push(`${candidate.lastName}, ${candidate.firstName}`);
    currentDataSets.journalsByCandidate.datasets[0].values.push(0);
  });

  candidates.forEach((candidate, i) => {
   journalList.forEach((journal) => {
      if (typeof journal.candidate !== "string") {
        if (journal.candidate._id == candidate._id) {
          currentDataSets.journalsByCandidate.datasets[0].values[i] +=journal.amount;
        }
      }
    });
  });
}

export async function refreshJournalMap (map:LeafletMap) {
  
  currentJournals.journals.forEach((journal: Journal) => {
        if (typeof journal.candidate !== "string") {
          const popup = `${journal.candidate.firstName} ${journal.candidate.lastName}: ${journal.amount} minutes visit`;
           map.addMarker(journal.lat, journal.lng, popup);
        }
      });
      const lastJournal = currentJournals.journals[currentJournals.journals.length -1]
      if (lastJournal) map.moveTo(lastJournal.lat, lastJournal.lng);
}


export function clearJournalState() {
  currentJournals.journals = [];
  currentCandidates.candidates = [];
  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";
}

export async function refreshJournalState(journals: Journal[], candidates: Candidate[]) {
  currentJournals.journals = journals;
  currentCandidates.candidates = candidates;
  computeByMethod(currentJournals.journals);
  computeByCandidate(currentJournals.journals, currentCandidates.candidates);
}
