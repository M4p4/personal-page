import { z } from 'zod';

export const contactSchema = z.object({
  subject: z.string().trim().min(1, "Subject can't be empty!"),
  email: z.email('Email has invalid format'),
  message: z.string().trim().min(1, "Message can't be empty!"),
  botcheck: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
