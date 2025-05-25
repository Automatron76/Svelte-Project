import { journalService } from "$lib/services/journal-service";
 
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
   const { session } = await parent();
  if (session) 
    { 
    return {
      journals: await journalService.getJournals(),
      candidates: await journalService.getCandidates()
    };
  }
};
