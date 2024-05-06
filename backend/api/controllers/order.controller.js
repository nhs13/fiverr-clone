import createError from "../utils/createError.js"
import Order from "../models/order.model.js"
import Gig from "../models/gig.model.js"
import Stripe from "stripe"
import dotenv from 'dotenv';
dotenv.config();

export const intent = async (req,res,next) => {
  const stripe = new Stripe(process.env.STRIPE)

  // finding price of gig
  const gig = await Gig.findById(req.params.id)


  // Create a PaymentIntent with the order amount and currency
  // PaymentIntent represents the payment process for a transaction
  // created when a customer intiates a payment & it tracks the entire
  // lifecycle of the payment from init to completion
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,   // to convert it into dollars
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // creating a new order
  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  })

  // console.log(newOrder)
  await newOrder.save();

  // client_secret is an unique token that is used to authenticate 
  // and authorize the payment on the client-side
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  })
}


// so learning to program is def cognitively demanding, but doing it without the getting distracted for 4 hours everyday is a big deal
// and without context shifts
// cognitively demanding and done without distraction
// is known as deep work
// export const createOrders = async (req,res,next)=>{
//     try{

//         const gig = await Gig.findById(req.params.gigId);
//         console.log(gig)
//         const newOrder = new Order({
//             gigId: gig._id,
//             img: gig.cover,
//             title: gig.title,
//             buyerId: req.userId,
//             sellerId: gig.userId,
//             price: gig.price,
//             payment_intent: "temp",
//         })

//         console.log(newOrder)
//         await newOrder.save();
//         res.status(200).send("done")
//     }catch(err){
//         next(err)
//     }
// }


// getting all the orders present in the db
export const getOrders = async (req, res, next) => {
    try {
      const orders = await Order.find({
        ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      });
      
      // console.log(orders)
      res.status(200).send(orders);
    } catch (err) {
      next(err);
    }
  };
