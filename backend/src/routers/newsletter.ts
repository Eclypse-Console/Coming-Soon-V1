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
        console.log('Newsletter subscription attempt for:', input.email);
        
        // Test database connection
        try {
          await db.query.subscribers.findFirst();
          console.log('Database connection test successful');
        } catch (dbError) {
          console.error('Database connection test failed:', dbError);
          throw new Error('Database connection failed');
        }

        const existingSubscriber = await db.query.subscribers.findFirst({
          where: (subscribers, { eq }) => eq(subscribers.email, input.email),
        });

        if (existingSubscriber) {
          console.log('Email already exists:', input.email);
          return {
            success: false,
            message: 'Email already subscribed',
          };
        }

        console.log('Attempting to insert new subscriber:', input.email);
        const result = await db.insert(subscribers).values({
          email: input.email,
        });
        console.log('Insert result:', result);

        return {
          success: true,
          message: 'Successfully subscribed to newsletter',
        };
      } catch (error) {
        console.error('Detailed error in newsletter subscription:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          input: input
        });
        return {
          success: false,
          message: 'Failed to subscribe to newsletter',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }),

  getAll: publicProcedure
    .query(async () => {
      try {
        console.log('Attempting to fetch all subscribers');
        const allSubscribers = await db.query.subscribers.findMany();
        console.log('Successfully fetched subscribers count:', allSubscribers.length);
        return allSubscribers;
      } catch (error) {
        console.error('Error fetching subscribers:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        throw new Error('Failed to fetch subscribers');
      }
    }),
}); 