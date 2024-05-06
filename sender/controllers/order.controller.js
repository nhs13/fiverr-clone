import createError from "../utils/createError.js"
import Order from "../models/order.model.js"
import Gig from "../models/gig.model.js"
import Stripe from "stripe"

export const intent = async (req,res,next) => {
  const stripe = new Stripe(process.env.STRIPE)

  // finding price of gig
  const gig = await Gig.findById(req.params.id)


  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  })

  console.log(newOrder)
  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  })
}

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

export const getOrders = async (req, res, next) => {
    try {
      const orders = await Order.find({
        ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      });
      
      console.log(orders)
      res.status(200).send(orders);
    } catch (err) {
      next(err);
    }
  };
