import type { Session } from "$lib/types/journal-types";
import type { LayoutServerLoad } from "./$types";
import { SvelteKitAuth } from "@auth/sveltekit";
 

 

export const load: LayoutServerLoad = async ({ cookies }) => {  
  const cookieStr = cookies.get("journal-user") as string;
   
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    return {
      session: session
    };
  }
};
 