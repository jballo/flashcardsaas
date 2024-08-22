import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/firebase"
import { setDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const plans = [
    {
        priceId: 'price_1Pq9iFKrKjT7Qm7LXNtEBHUl',
        name: 'Pro',
    },
    {
        priceId: 'price_1PqcV0KrKjT7Qm7LCrPfr4ba',
        name: 'Ultimate',
    }
];

export async function POST(req) {

    const payload = await req.text();
    const signature = req.headers.get('stripe-signature');

    let data;
    let eventType;
    let event;

    // verify the stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err){
        console.error(`Webook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: err.message}, { status: 400 });
    }

    data = event.data;
    eventType = event.type;

    try {
        switch (eventType) {
            case 'checkout.session.completed': {
                console.log('Checkout session was completed');
                const session = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                    {
                        expand: ['line_items']
                    }
                );

                const customerId = session?.customer;
                const customer = await stripe.customers.retrieve(customerId);

                const priceId = session?.line_items.data[0]?.price.id;
                const plan = plans.find((p) => p.priceId === priceId);

                // if price id matches either price id's, break
                if (!plan) break;

                console.log('session.payment_status: ', session.payment_status);
                if (session.payment_status !== 'paid') {
                    console.error('Payment status not paid');
                    break;
                }

                let user;

                if (customer.email) {
                    // find user by email in firestore
                    const usersRef = collection(db, 'users');
                    const userQuery = query(usersRef, where('email', '==', customer.email));
                    const userSnapshot = await getDocs(userQuery);

                    if (userSnapshot.empty) {
                        console.error(`User with email ${customer.email} not found`);
                        break;
                    }

                    user = userSnapshot.docs[0].data();
                    const userRef = userSnapshot.docs[0].ref;

                    const newUserData = {
                        ...user,
                        isActive: true,
                        stripeCustomerId: customerId,
                        plan: priceId,
                        subscriptionId: session.subscription
                    };

                    await setDoc(userRef, newUserData);
                } else {
                    console.error('No user found!');
                    throw  new Error('No user found!');
                }
                break;
            }
            case 'customer.subscription.deleted': {
                // Revoke access to product
                // The customer might have changed hte plan (higher or lower, cancel soon etc.)
                const subscription = await stripe.subscriptions.retrieve(
                    data.object.id
                );

                const usersRef = collection(db, 'users');
                const userQuery = query(usersRef, where('stripeCustomerId', '==', subscription.customer));
                const userSnapshot = await getDocs(userQuery);

                if (userSnapshot.empty) {
                    console.error(`User with email ${customer.email} not found`);
                    break;
                }

                const userData = userSnapshot.docs[0].data();
                const userRef = userSnapshot.docs[0].ref;

                const newUserData = {
                    ...userData,
                    isActive: false,
                    stripeCustomerId: '',
                    plan: '',
                    subscriptionId: ''
                }

                await setDoc(userRef, newUserData);

                break;
            }
            default:
        }
    } catch (e) {
        console.error(
            'stripe error: ' + e.message + '| EVENT TYPE: ' + eventType
        );
    }

    return NextResponse.json({});
}