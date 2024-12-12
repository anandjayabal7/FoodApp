import userModel from '../model/userModel.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from 'validator';
import 'dotenv/config.js'


 const loginUser  = async (req,res) =>{

    try{

        const {email,password} = req.body;

        const user = await userModel.findOne({email});
    
        if(!user){
            return res.json({success:false, message:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }

        const token = createToken(user._id)

        res.json({success:true,token})

    }catch(error){
        return res.json({ success: false, message: error.message });
    }

    



 }

 const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
 }

 const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    
    try {

        const exist = await userModel.findOne({ email });

        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });


        const user = await newUser.save();

        const token = createToken(user._id);

        return res.json({ success: true, token: token });

    } catch (error) {

        return res.json({ success: false, message: error.message });
    }
};

 export {loginUser,registerUser}