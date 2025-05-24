import { journalService } from "$lib/services/journal-service";
import type { User } from "$lib/types/journal-types";
import { redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";

const saltRounds = 12;

export const actions = {
  signup: async ({ request, cookies }) => {
    const form = await request.formData();

    const plainPassword = form.get("password") as string;
    const hashedPassword = await bcrypt.hash(plainPassword,saltRounds)
    

    
    const user: User = {
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      email: form.get("email")as string,
      password: hashedPassword
    };
    if (user.email === "" || hashedPassword === "") {
      throw redirect(307, "/");
    } else {
      console.log(`attempting to sign up email: ${user.email} with password: ${user.password}`);
      const success = await journalService.signup(user);
      if (success) {
        throw redirect(303, "/");
      } else {
        throw redirect(307, "/");
      }
    }
  }
};
