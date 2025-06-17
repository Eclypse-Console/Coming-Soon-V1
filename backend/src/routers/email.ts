import { z } from 'zod';
import { router, publicProcedure } from '../utils/trpc';
import { db } from '../db';
import { subscribers } from '../db/schema';
import { eq } from 'drizzle-orm';

export const emailRouter = router({
  subscribe: publicProcedure
    .input(z.object({
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      try {
        const existingSubscriber = await db.query.subscribers.findFirst({
          where: eq(subscribers.email, input.email),
        });

        if (existingSubscriber) {
          return {
            success: false,
            message: 'Email already subscribed',
          };
        }

        await db.insert(subscribers).values({
          email: input.email,
        });

        return {
          success: true,
          message: 'Successfully subscribed to newsletter',
        };
      } catch (error) {
        console.error('Error subscribing:', error);
        return {
          success: false,
          message: 'Failed to subscribe to newsletter',
        };
      }
    }),
}); 