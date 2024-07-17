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
        bodyText : req.body["body-text"],
        indexNum : posts.length
    }

    posts.push(newPost);
    res.redirect("/");
});

app.get("/update-post", (req, res) => {
    res.render("update");
});

// post update info
app.post("/update-post-data", (req, res) => {
    const index = req.body["index-num"];
    const updatedTitle = req.body.title;
    const updatedBodyText = req.body['body-texts'];

    if (!isNaN(index) && index >= 0 && index < posts.length) {
        posts[index].bodyTitle = updatedTitle;
        posts[index].bodyText = updatedBodyText;
        console.log(`post at index ${index} has been updated`);
    } else {
        res.status(404).send("Post not found or invalid index.");
    }
    

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`server is runing ${port}...`);
});