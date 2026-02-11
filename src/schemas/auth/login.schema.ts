import { z } from "zod";

const LoginSchema = z.object({
    // email must be a string first, then validated as an email
    email: z.string().email("Invalid email address"),
    
    // password just needs to be a string with at least 1 character
    password: z.string().min(1, "Password is required"),
});

// This extracts the TypeScript type from the schema for use in your components
export type LoginFormData = z.infer<typeof LoginSchema>;

export default LoginSchema;