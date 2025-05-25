import { journalService } from "$lib/services/journal-service";
import type { Session } from "$lib/types/journal-types";
import type { PageServerLoad } from "./$types";
import type { RequestEvent } from "@sveltejs/kit";


export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent ();
  if ( session) {
    return {
      journals: await journalService.getJournals(),
      candidates: await journalService.getCandidates()
    };
  }
};

export const actions = {
  
  journal: async ({ request, cookies }: RequestEvent) => {
    const cookieStr = cookies.get("journal-user") as string;
    if (!cookieStr) {
        return { success: false, error: "No user session found"}}

      const session = JSON.parse(cookieStr) as Session;
      if (!session) {
        return { success: false, error: "Invalid session"}}


        const form = await request.formData();
        const journal = {
          amount: form.get("amount") as unknown as number,
          method: form.get("method") as string,
          candidate: form.get("candidate") as string,
          lat: form.get("lat") as unknown as number,
          lng: form.get("lng") as unknown as number,
          donor: session._id
        };try {
        const newJournal = await journalService.journal(journal);
        return newJournal;
      }
        catch(error) {
            return {
                success: false,
                error: "Failed to create donation"
            };
        }
      }
    }
