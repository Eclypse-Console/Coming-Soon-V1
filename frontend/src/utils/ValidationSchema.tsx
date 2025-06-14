import { z } from "zod";

export const newsletterSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Invalid email address" })
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			{ message: "Please enter a valid email address" }
		)
		.max(100, { message: "Email is too long" }),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
