const auth = require("../middleware/auth");
const Blog = require("../models/UserBlogModel");
const multer = require("multer");
const User = require("../models/UserModel");
const router = require("express").Router();

// Multer package helps in storing the images in the backend.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../frontend/client/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const uploadArticleImage = multer({ storage: storage });

router.post(
  "/",
  auth,
  uploadArticleImage.single("articleImage"),
  async (req, res) => {
    try {
      const { title, description, author, date, uid } = req.body;
      const articleImage = req.file.filename;
      if (articleImage) {
        let blog = new Blog({
          title,
          description,
          author,
          articleImage,
          date,
          uid,
        });
        blog = await blog.save();
        res.send(blog);
      } else {
        let blog = new Blog({ title, description, author, date, uid });
        blog = await blog.save();
        res.send(blog);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }
);
router.get("/", auth, async (req, res) => {
  const user = req.user;

  try {
    const blogs = await Blog.find().sort({ date: -1 });
    // Fetching blogs according to the 'uid'
    const filteredBlogs = blogs.filter((blog) => blog.uid === user);

    res.send(filteredBlogs);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});
// Get Blogs For HomePage
router.get("/home", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.send(blogs);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});
// Delete Blogs:
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id)
    .then(() => res.send("Blog Deleted"))
    .catch((err) => res.send(err));
});
// Get Blogs By Id:
router.get("/:id",auth, async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id).exec();
  res.send(blog);
});

// Like Post
router.put("/like/:id", auth, async (req, res) => {
  const { user_id } = req.body;
  const id = req.params.id;

  const blog = await Blog.findById({ _id: id });

  if (blog.likedBy.includes(user_id)) {
    console.log("User Already Liked");
  } else {
    // Check if user who liked post has previously disliked a post
    if (blog.dislikedBy.includes(user_id)) {
      blog.dislikes--; // Reduce the total number of dislikes
      const arrayIndex = blog.dislikedBy.indexOf(user_id); // Get the index of the username in the array for removal
      blog.dislikedBy.splice(arrayIndex, 1); // Remove user from array
      blog.likes++; // Increment likes
      blog.likedBy.push(user_id); // Add username to the array of likedBy array
      // Save blog post data
      blog.save((err) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: "Something went wrong." }); // Return error message
        } else {
          res.json({ success: true, message: "Blog liked!" }); // Return success message
        }
      });
    } else {
      blog.likes++; // Incriment likes
      blog.likedBy.push(user_id); // Add liker's username into array of likedBy
      // Save blog post
      blog.save((error) => {
        if (error) {
          res.json({ success: false, message: "Something went wrong." }); // Return error message
        } else {
          res.json({ success: true, message: "Blog liked!" }); // Return success message
        }
      });
    }
  }
});

// Dislike Post
router.put("/dislike/:id", auth, async (req, res) => {
  const { user_id } = req.body;
  const id = req.params.id;
  console.log(id);

  const blog = await Blog.findById({ _id: id });

  if (blog.dislikedBy.includes(user_id)) {
    console.log("User Already Disliked Blog");
  } else {
    // Check if user who liked post has previously disliked a post
    if (blog.likedBy.includes(user_id)) {
      blog.likes--; // Reduce the total number of dislikes
      const arrayIndex = blog.likedBy.indexOf(user_id); // Get the index of the username in the array for removal
      blog.likedBy.splice(arrayIndex, 1); // Remove user from array
      blog.dislikes++; // Increment likes
      blog.dislikedBy.push(user_id); // Add username to the array of likedBy array
      // Save blog post data
      blog.save((err) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: "Something went wrong." }); // Return error message
        } else {
          res.json({ success: true, message: "Blog Disliked!" }); // Return success message
        }
      });
    } else {
      blog.dislikes++; // Incriment likes
      blog.dislikedBy.push(user_id); // Add liker's username into array of likedBy
      // Save blog post
      blog.save((error) => {
        if (error) {
          res.json({ success: false, message: "Something went wrong." }); // Return error message
        } else {
          res.json({ success: true, message: "Blog Disliked!" }); // Return success message
        }
      });
    }
  }
});

// Comment on Blog
router.post('/comment/:id',auth,async(req,res)=>{
  const { user_id } = req.body;
  const id = req.params.id;

  const blog =await Blog.findById({_id:id})
  const user=await User.findById({_id:user_id})
 
  try{
    blog.comments.push({
      comment:req.body.comment,
      commentator:user.email
    });
    blog.save((err)=>{
      if(err){
        console.log(err.message)
      }else{
        console.log("Comment Saved")
        res.json({ success: true, message: 'Comment saved' });
      }
    })
  }catch(err){
    console.log(err.message)
  }
})

// Delete Comment
router.put('/deletecomment/:id',async(req,res)=>{
  const id=req.params.id
  const {comment_id}=req.body
  const blog = await Blog.findById({ _id: id });
   blog.comments.map((comment)=>{
      if(comment._id==comment_id){
        const arrayIndex=blog.comments.indexOf(comment)
        blog.comments.splice(arrayIndex,1)
        blog.save()
      }
   })
})

// Update Blog
router.post("/:id", uploadArticleImage.single("articleImage"),
  async (req, res) => {
    const id = req.params.id;
    const { title, description, author, date, uid } = req.body;
    const articleImage = req.file.originalname;
    await Blog.findById(id, function (err, blog) {
      if (!blog) {
        res.status(404).send("Blog Not Found");
      } else {
        blog.title = title;
        blog.description = description;
        blog.author = author;
        blog.date = date;
        blog.uid = uid;
        blog.articleImage = articleImage;
      }
      blog
        .save()
        .then(() => {
          res.send("Blog Updated");
        })
        .catch((error) => {
          res.send(err);
        });
    });
  }
);
module.exports = router;
