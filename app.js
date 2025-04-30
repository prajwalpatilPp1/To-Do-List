const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://prajwalpatil392:admin123@cluster0.lh4ctac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", async function () {
    console.log("✅ Connected to MongoDB successfully!");

    const item = mongoose.model("task", new mongoose.Schema({ name: String }));

    // Insert default items only if collection is empty
    const count = await item.countDocuments();
    if (count === 0) {
        await item.insertMany([
            { name: "Prajwal" },
            { name: "Hello" },
            { name: "Hii" },
            { name: "Bye Bye" },
            { name: "Bye Bye" },
            { name: "Bye Bye" }


        ]);
        console.log("✅ Default items added to DB.");
    }

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
});