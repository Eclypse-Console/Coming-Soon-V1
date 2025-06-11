import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { db, newsletterUser } from "@db/index";

export const newsletterRouter = router({
  addUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const uid = crypto.randomUUID();
      const result = await db
        .insert(newsletterUser)
        .values({
          uid,
          email: input.email,
        })
        .returning();

      return result[0];
    }),

  getUsers: publicProcedure.query(async () => {
    const users = await db.select().from(newsletterUser);
    return users;
  }),
});
