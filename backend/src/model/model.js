import mongoose from "mongoose";


const userSchem= new mongoose.Schema({
  username : String,
  email : String,
  place : String,
  password: Number
})

const productSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  weight: String,
  price: String,
  image: String,
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [productSchema],  // Array of products
});

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categories: [categorySchema], // Array of categories
});

export const products=mongoose.model("Products", productsSchema);

export const usern= mongoose.model("User",userSchem);