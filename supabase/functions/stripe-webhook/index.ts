import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    apiVersion: '2023-10-16',
})

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
    const signature = req.headers.get('stripe-signature')

    try {
        const body = await req.text()
        const event = stripe.webhooks.constructEvent(
            body,
            signature ?? '',
            Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''
        )

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session
            const userId = session.metadata?.user_id
            const plan = session.metadata?.plan

            if (userId) {
                // Define token amounts for each plan
                const tokenAmounts: Record<string, number> = {
                    'Starter': 1000,
                    'Creator Pro': 50000,
                    'Studio': 250000,
                }

                const tokensToAdd = tokenAmounts[plan ?? ''] ?? 0

                // Update the user's credit balance in the database
                const { data, error } = await supabase
                    .from('User')
                    .select('creditBalance')
                    .eq('id', userId)
                    .single()

                if (error) throw error

                const newBalance = (data.creditBalance ?? 0) + tokensToAdd

                const { error: updateError } = await supabase
                    .from('User')
                    .update({ creditBalance: newBalance })
                    .eq('id', userId)

                if (updateError) throw updateError

                console.log(`Successfully added ${tokensToAdd} tokens to user ${userId}`)
            }
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        })
    } catch (error: any) {
        console.error(`Webhook Error: ${error.message}`)
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            }
        )
    }
})
