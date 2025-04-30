const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const main = ()=>{
    try {
        mongoose.connect("mongodb+srv://prajwalpatil392:admin123@cluster0.lh4ctac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("✅ Connected to MongoDB successfully!");
    } catch (error) {
        console.log("MongoDb not connected",error);
    }
}

main();
const item = mongoose.model("task", new mongoose.Schema({ name: String }));



app.get("/", async function (req, res) {
    try {
        const foundItems = await item.find();
        res.render("list", { ejes: foundItems });
    } catch (err) {
        console.log(err);
    }
});

app.post("/", async function (req, res) {
    try {
        const itemName = req.body.ele1;
        await item.create({ name: itemName });
    } catch (err) {
        console.log(err);
    }
    res.redirect("/");
});

app.post("/delete", async function (req, res) {
    try {
        const checked = req.body.checkbox1;
        await item.findByIdAndDelete(checked);
    } catch (err) {
        console.log(err);
    }
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("🚀 Server is running!");
});