import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './config/mongodb.js'
import connectcloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/CartRoute.js'
import orderRouter from './routes/OrderRoute.js'
import path from 'path'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectdb()
connectcloudinary()

// Middleware
app.use(express.json())
app.use(cors())

// Static Files
app.use('/uploads', express.static(path.resolve('uploads')));

//API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req,res) => {
    res.send("API configured")
})

app.listen(port, () => console.log("Server initiated on PORT : " + port))
