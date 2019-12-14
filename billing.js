import stripePackage from 'stripe';
import { calculateCost } from './libs/billing-lib';
import { success, failure } from './libs/response-lib';

// eslint-disable-next-line
export async function main(event, context) {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: 'usd',
    });
    return success({ status: true });
  } catch (error) {
    return failure({ message: error.message });
  }
}
