import express, { urlencoded } from "express";
import { connect, Schema, model } from "mongoose";
import methodOverride from "method-override";

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride('_method'));

// MongoDB connection
async function main() {
  try {
    await connect("mongodb+srv://prajwalpatil:prajwalpatil@cluster0.cmnmaeq.mongodb.net/todolistDB?retryWrites=true&w=majority&appName=Cluster0");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}
main();

// Schema & Model
const taskSchema = new Schema({ 
  name: String,
  priority: String
});
const Task = model("Task", taskSchema);

// Routes
app.get("/", async (req, res) => {
  const items = await Task.find();
  res.render("list", { items }); // renamed from `ejes` to `items`
});

app.post("/", async (req, res) => {
  const { newItem, priority } = req.body;
  if (newItem.trim() !== "") {
    await Task.create({ name: newItem, priority }); // save both name and priority
  }
  res.redirect("/");
});

app.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const updatedName = req.body.updatedName;
  await Task.findByIdAndUpdate(id, { name: updatedName });
  res.redirect("/");
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
