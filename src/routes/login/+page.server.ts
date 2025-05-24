import { redirect } from "@sveltejs/kit";
import { dev } from "$app/environment"; 
import { journalService } from "$lib/services/journal-service.js";
import bcrypt from "bcrypt";

export const actions = {
  login: async ({ request, cookies }) => {

    const form = await request.formData();
    const email = form.get("email") as string;
    const plainPassword = form.get("password") as string;

    const password = form.get("password") as string;
    if (email === "" || !plainPassword) {
    throw redirect(307, "/")

    const validPassword = await bcrypt.compare(plainPassword, user.password);
    if (!validPassword) { console.log("invalid password")}
    } else {
      console.log(`attempting to log in email: ${email} with password: ${password}`);
      const session = await journalService.login(email, password);

      if (session) {
        const userJson = JSON.stringify(session);
        cookies.set("journal-user", userJson, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: !dev,
          maxAge: 60 * 60 * 24 * 7 // one week
        });
        throw redirect(303, "/journal");
      } else {
        throw redirect(307, "/");
      }
    }
  }
};
