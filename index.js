import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// posts
let posts = [];

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

// home route
app.get("/", (req, res) => {
    res.render("index", { blogPosts : posts });
});

app.get("/create-post", (req, res) => {
    res.render("form");
});

app.post("/publish", (req, res) => {
    const newPost = {
        bodyTitle : req.body["blog-title"],
        bodyText : req.body["body-text"]
    }

    posts.push(newPost);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`server is runing ${port}...`);
});