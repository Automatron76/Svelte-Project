import { JournalService } from "./journal-service";
import { loggedInUser, currentDataSets, currentCandidates, currentJournals } from "$lib/runes.svelte";
import type {Journal, Candidate}  from "$lib/types/journal-types";
import type LeafletMap from "$lib/ui/LeafletMap.svelte";
 

 
 

export async function refreshJournalMap (map:LeafletMap) {
    if (!loggedInUser.token) JournalService.restoreSession();
    const journals = await JournalService.getJournals(loggedInUser.token);
    journals.forEach((journal: Journal) => {
        if (typeof journal.candidate !== "string") {
          const popup = `${journal.candidate.firstName} ${journal.candidate.lastName}: €${journal.amount}`;
          map.addMarker(journal.lat, journal.lng, popup);
        }
      });
      const lastJournal = journals[journals.length - 1];
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

