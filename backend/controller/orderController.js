import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import Stripe from "stripe";
import 'dotenv/config.js'

const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)





const placeOrder =async(req,res)=>{

    const frontend_url = "http://localhost:5173";

    try{
        const newOrder =  new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
           
             quantity:item.quantity

        }))
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery charge"
                },
                unit_amount:2*100*80
                
            },
            quantity:1
        })
        console.log(stripe);
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            
        })
        res.json({success:true,session_url:session.url})


    }catch(error){
        return res.json({ success: false, message: error.message });
    }


}

const verifyOrder = async(req,res)=>{

    const {orderId,success} = req.body;
    try{
        if(success="true"){
            await orderModel.findByIdAndDelete(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }

    }catch(error){
        return res.json({ success: false, message: error.message });
    }
    
}

const userOrders = async(req,res)=>{

    try{
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    }catch(error){
        return res.json({ success: false, message: error.message });
    }

}

const listOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    }catch(error){
        return res.json({ success: false, message: error.message });
    }
   

}

const updateStatus = async(req,res)=>{

    try{

        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"status updated"})

    }catch(error){
        return res.json({ success: false, message: error.message });
    }

}


export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus}