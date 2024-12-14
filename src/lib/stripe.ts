import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string ?? '', {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
})

export const createCheckoutSession = async ({userEmail, userId}: {userEmail: string, userId: string}) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price: "price_1QVt1WAtzVhoLo1mRRhNuOmG",
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/pricing`,
    customer_email: userEmail,
    metadata: {
      userId,
    },
  })
  return session
}
