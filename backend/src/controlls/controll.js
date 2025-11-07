import jwt from "jsonwebtoken";
import {products,usern} from "../model/model.js"

export async function login(req,res){
    const {username,password}=req.body;
        const result = await usern.find({username,password})
        console.log(result)
        if(result.length>0){
            const payload={
              username,
              password
            }
          const token = jwt.sign(payload,"ABC") 
          res.status(200).json({token})
        }
        else{
          res.json({"message":"user invaild"})
        }

}

export async function register(req,res) {
        const {username,email,place,password}=req.body;
            const existingUser = await usern.findOne({ $or: [{ username }, { email }] });    
            if(existingUser){
                res.status(400).json({"message":"user already register"})
            }
            else{
                const newuser = new usern({username,email,place,password})
                newuser.save();
                const payload={
                    username,
                    email,
                    place,
                    }
                const token = jwt.sign(payload,"ABC") 
                res.status(200).json({token})
        }
}

export async function getProducts(req,res) {
    try {
    const data = await products.find(); 
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function addproducts(req,res) {
    try {
    const newProducts = new products(req.body); // req.body must be your JSON
    await newProducts.save();
    res.status(201).json({ message: "Products added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}




export async function getProductsByCategory(req, res) {

  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const Products = await products.aggregate([
      { $unwind: "$categories" }, 
      { $match: { "categories.name": category } }, 
      { $project: { _id: 0, products: "$categories.products" } } 
    ]);

    if (!Products.length) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(Products[0].products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
