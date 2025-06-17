import { z } from 'zod';
import { router, publicProcedure } from '../utils/trpc';
import { db } from '../db';
import { subscribers } from '../db/schema';

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(z.object({
      email: z.string().email(),
      name: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        const existingSubscriber = await db.query.subscribers.findFirst({
          where: (subscribers, { eq }) => eq(subscribers.email, input.email),
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

  getAll: publicProcedure
    .query(async () => {
      try {
        const allSubscribers = await db.query.subscribers.findMany();
        return allSubscribers;
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        throw new Error('Failed to fetch subscribers');
      }
    }),
}); 