import z from "zod";

const emailDataSchema = z.object({
  actor: z.string().nonempty("Actor is required"),
  subject: z.string().nonempty("Subject is required"),
  message: z.string().nonempty("Message is required"),
})

export function validateEmailData(inputs: z.infer<typeof emailDataSchema>) {
  return emailDataSchema.safeParse(inputs);
}