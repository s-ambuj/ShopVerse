import userModel from "../models/useModel.js";
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for User Login
const loginUser = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false, message:"User doesn't exists."})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true, token})
        } else {
            res.json({success:false, message: "Incorrect Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}




// Route for User register
const registerUser = async (req,res) => {
    try{
        const {name, email, password } = req.body;
        
        //Validating User 
        const exist = await userModel.findOne({email})

        if (exist) {
            return res.json({success:false, message:"User already exists"})
        }

        // Email & pwd validation
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please provide a valid email !"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Password must be of min. 8 letters"})
        }

        // Hashing user pwd
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        // Creating token for unique users (using JWT)
        const token = createToken(user._id)

        res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})

    }
}

//Route for Admin Login

const adminLogin = async (req,res) => {

}


export { loginUser, registerUser, adminLogin }