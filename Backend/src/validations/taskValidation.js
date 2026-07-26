import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  status: z.enum(["To Do", "In Progress", "Done"]),
  priority: z.enum(["Low", "Medium", "High"]),

  dueDate: z.string().date().optional(),
});
