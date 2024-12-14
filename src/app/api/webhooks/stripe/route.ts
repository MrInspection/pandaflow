import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get("stripe-signature")

    if (!signature) {
      return new Response("Invalid signature", { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? "",
    )

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const { userId } = (session.metadata || {
        userId: null,
      })

      if (!userId) {
        return new Response("Invalid request metadata", { status: 400 })
      }

      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          plan: "PRO",
        },
      })
    }

    return NextResponse.json({ result: event, ok: true })
  } catch (err) {
    return NextResponse.json({ message: "Something went wrong", ok: false }, { status: 500 })
  }
}