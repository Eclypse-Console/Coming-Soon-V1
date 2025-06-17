import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

async function main() {
  try {
    console.log('Testing email subscription...');
    // Test email subscription
    const emailResult = await client.email.subscribe.mutate({
      email: 'test@example.com',
    });
    console.log('Email subscription result:', emailResult);

    // Test newsletter subscription
    console.log('\nTesting newsletter subscription...');
    const newsletterResult = await client.newsletter.subscribe.mutate({
      email: 'test@example.com',
      name: 'Test User',
    });
    console.log('Newsletter subscription result:', newsletterResult);

    // Test getting all subscribers
    console.log('\nTesting get all subscribers...');
    const subscribers = await client.newsletter.getAll.query();
    console.log('All subscribers:', subscribers);

  } catch (error) {
    console.error('Error during test:', error);
  }
}

main().catch(console.error); 