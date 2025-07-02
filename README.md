# 🛒 ShopVerse - MERN Stack eCommerce Platform

ShopVerse is a full-featured, modern eCommerce application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js).
It includes dynamic product listings, secure user authentication, admin functionality, cart management, and integrated payment gateways via **Stripe** and **Razorpay**.

> 🔗 **Live Demo**: https://shopverse-dusky.vercel.app/  


---

## 🚀 Features

- 🔐 User authentication with JWT
- 🛍️ Dynamic product listings
- 🧑‍💼 Admin dashboard for managing products/orders
- 🛒 Shopping cart with real-time updates
- 💳 Stripe & Razorpay payment gateway integration
- ☁️ Image upload and hosting via Cloudinary
- 🧾 Order history and user profile management
- 📱 Responsive design for all devices
- 📦 Deployed with **Vercel** for both frontend and backend

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Context API
- Axios
- TailwindCSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (for image upload)
- Stripe & Razorpay APIs

---

## ⚙️ Environment Variables

Create a `.env` file in each directory (`frontend`, `backend`, and `admin` if applicable) and add the following:

```env
# Shared Variables
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_NAME=your_cloudinary_name
JWT_SECRET=your_jwt_secret

# Admin Credentials
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

# Payment Integrations
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key

```

## 🧪 Getting Started Locally
```
1. Clone the repository

git clone https://github.com/s-ambuj/shopverse.git
cd shopverse

2. Install dependencies

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin
cd ../admin
npm install

3. Set up .env files

Create .env files in each folder and add the appropriate environment variables.
4. Run the servers

# Start backend server
cd backend
npm run dev

# Start frontend app
cd ../frontend
npm start

# Start admin panel
cd ../admin
npm start

Your app should now be running on:

    Frontend: http://localhost:5173

    Backend: http://localhost:4000

    Admin: http://localhost:5174
```

## ☁️ Deployment (Vercel)

Both the frontend and backend are deployed via Vercel.
✅ Steps to Deploy

    Push your project to GitHub.

    Go to Vercel dashboard and import your GitHub repository.

    Configure each directory as a separate project (frontend, backend, and optionally admin).

    Set the environment variables in the Vercel dashboard for each project.

    Set build commands:

        Frontend/Admin: npm run build

        Backend: npm install

    Set output directory:

        Frontend/Admin: dist or default for React apps

        Backend: Not required (it's serverless or API-based on Vercel)

## 📸 Screenshots

    ![image](https://github.com/user-attachments/assets/e92291bd-6322-422a-8964-3f3af583aa22)
    ![image](https://github.com/user-attachments/assets/812be815-f05a-4d37-aca6-32ed5b6d07d4)


## 📄 License

This project is licensed under the MIT License.
