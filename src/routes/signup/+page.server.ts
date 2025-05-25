import { journalService } from "$lib/services/journal-service";
import type { User } from "$lib/types/journal-types";
import { fail, redirect } from "@sveltejs/kit";
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
      return fail(400, {message:"invalid email or password required"});
    } else {
      console.log(`attempting to sign up email: ${user.email} with password: ${user.password}`);
      const success = await journalService.signup(user);
      if (!success) {
        return fail(409, {message:"user already exists"});
      } else {
        throw redirect(303, "/login") 
      }
    }
  }
};
