import { JournalService } from "$lib/services/journal-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const candidates = await JournalService.getCandidates();
  const candidate = candidates.find((c) => c._id === params.id);
  return {
    candidate,
    journals: await JournalService.getJournals(params.id)
  };
};
