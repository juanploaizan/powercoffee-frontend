import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  coffeeShopId: z.string(),
  createdAt: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
