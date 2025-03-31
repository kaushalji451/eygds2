const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
const Review = require("./models/review");
const User = require("./models/User");

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATHCH", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/urboncompany";
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
// get all product data
app.get("/", async (req, res) => {
  let result = await Product.find({});
  res.send(result);
});

// create product data
app.post("/product", async (req, res) => {
  let newproduct = new Product(req.body);
  let data = await newproduct.save();
  res.json("your data was saved");
});

// get single product data
app.get("/product/:id", async (req, res) => {
  let { id } = req.params;
  let result = await Product.findById(id).populate("reviewid").exec();
  res.json(result);
});

// update update single product data
app.put("/product/edit/:id", async (req, res) => {
  let { id } = req.params;
  let responce = await Product.findByIdAndUpdate(id, req.body);
  let data = await responce.save();
  res.json("your data was updated");
});

// delete product
app.delete("/product/:id", async (req, res) => {
  let { id } = req.params;
  let responce = await Product.findByIdAndDelete(id);
  res.json(responce.categery);
});

// user post request 
app.post("/user",async(req,res)=>{
  let check = await User.find({email : req.body.email});
  if(!check ){
    let newuser = new User(req.body);
    let data = await newuser.save();
      if(data){
        res.json("user added");
      }
  }else{
    console.log(check);
    res.json("this user is exist please login");
  }
})

// user check request && get user
app.post("/user/check",async(req,res)=>{
  let {email} = req.body;
  let data = await User.find({email : email});
  if(data){
    res.json(data);
  }else{
    res.json("user does not exist");
  }
})

app.listen(8080, () => {
  console.log(`listing on port 8080`);
});
