import { Router } from "express";
import {register,login,addproducts,getProducts,getProductsByCategory} from "../controlls/controll.js"
import { get } from "mongoose";


const route=Router()

route.get("/getProducts",getProducts)

route.post("/login",login)
route.post("/register",register)
route.post("/addproducts",addproducts)
route.post("/getProductsByCategory",getProductsByCategory)



export default route;