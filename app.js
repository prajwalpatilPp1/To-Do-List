const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");

const trySchema = new mongoose.Schema({
    name: String
})

const item = mongoose.model("task",trySchema);

const  todo1 = new item({
    name:"Create some videos"
});
const  todo2 = new item({
    name:"Hello"
});
const  todo3 = new item({
    name:"Hii"
});
const  todo4  = new item({
    name:"Bye Bye "
});


todo1.save();

app.get("/",async function(req,res){
    try{
        const foundItems = await item.find();
        res.render("list",{ejes:foundItems});
    }
    catch(err){
        console.log(err);
    }
    
});

app.post("/",async function(req,res){
    try{
        const itemName = req.body.ele1;
        const todo1 = new item({
            name:itemName
        });
        todo1.save();
    }
    catch(err)
    {
        console.log(err);
    }
    res.redirect("/");
    
});

app.post("/delete",async function(req,res){
    try{
        const checked = req.body.checkbox1;
        await item.findByIdAndDelete(checked);
        res.redirect("/");
    }
    catch(err){
        console.log(err);
        res.redirect("/");
    }
});

app.listen("3000",function(){

    console.log("Server is running!");

});