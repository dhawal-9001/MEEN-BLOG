//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


mongoose.connect("mongodb+srv://admin91:admin91@blogcluster.bryfurv.mongodb.net/blogDb", { useNewUrlParser: true }, (err) => {
  if (err) throw err;
  else console.log("Connected to DB Successfully");
})
const postSchema = {
  title: String,
  description: String
}
const Post = mongoose.model("Post", postSchema);




app.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) console.log("Some error occured =>\n", err)

    if (posts.length === 0) {
      const samplePost = new Post({
        title: "Sample Post",
        description: "Sample Desription  Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda numquam quae aperiam quia quibusdam iure earum. Facilis animi quidem repellendus mollitia, magni accusantium? Eum debitis sit inventore ut praesentium harum, corrupti laudantium voluptas ratione? Neque unde officiis molestias consequuntur quisquam itaque eum, minus ab possimus, magni sequi consequatur praesentium reiciendis tempora odio commodi. Totam voluptas nihil ea deleniti ad nulla ab fugit nisi delectus id perferendis rem, distinctio omnis nam quia aut non modi beatae similique? Sit nobis minus quis tempora dolores pariatur impedit, odit aperiam, aliquam similique necessitatibus voluptate doloremque quo ducimus sed assumenda perferendis! Magni officiis labore possimus!"
      })
      samplePost.save();
      res.redirect("/");
    } else {
      res.render("home", { content: homeStartingContent, posts: posts })
    }
  })
})

app.get("/posts/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (!err && post) {
      res.render("post", {
        title: post.title,
        description: post.description
      })
    }
    else {
      res.render("notfound");
    }
  })
})

app.get("/about", (req, res) => {
  res.render("about", { content: aboutContent })
})

app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent })
})

app.get("/compose", (req, res) => {
  res.render("compose")
})

app.post("/compose", (req, res) => {
  const newPost = new Post({
    title: req.body.postTitle,
    description: req.body.postDescription
  })
  newPost.save()
  res.redirect("/")
})


app.listen(port, function () {
  console.log("Server started on port ", port);
});


