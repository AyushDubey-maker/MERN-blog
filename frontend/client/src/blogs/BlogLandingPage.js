import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Avatar, Button } from "@material-ui/core";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import AuthContext from "../context/AuthContext";
import CommentModal from "./modal/CommentModal";
import DeleteIcon from "@material-ui/icons/Delete";
function BlogLandingPage() {
  const [blog, setBlog] = useState([]);
  const [dislikecolor, setDislikeColor] = useState("");
  const [likecolor, setlikeColor] = useState("");
  const { id } = useParams();
  const { userData } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  
  // Function to fetch all blogs
  async function getBlogById() {
    const blogData = await axios.get(`http://localhost:5000/blog/${id}`);
    setBlog(blogData.data);
  }

  // Assign color to the Like button 
  function assign_color() {
    if (blog?.dislikedBy?.includes(userData?._id)) {
      setDislikeColor("#4267B2");
      setlikeColor("");
    } else if (blog?.likedBy?.includes(userData?._id)) {
      setlikeColor("#4267B2");
      setDislikeColor("");
    } else {
      setDislikeColor("");
      setlikeColor("");
    }
  }
  async function likeBlog() {
    try {
      const data = {
        user_id: userData?._id,
      };
      await axios
        .put(`http://localhost:5000/blog/like/${id}`, data)
        .then(() => console.log());
    } catch (err) {
      alert(err);
    }
  }
  async function dislikeBlog() {
    try {
      const data = {
        user_id: userData?._id,
      };
      await axios
        .put(`http://localhost:5000/blog/dislike/${id}`, data)
        .then(() => console.log("Dislike"));
    } catch (err) {
      alert(err);
    }
  }
  async function deleteComment(commentId) {
    try {
      const comment_data = {
        comment_id: commentId,
      };
      await axios.put(
        `http://localhost:5000/blog/deletecomment/${id}`,
        comment_data
      );
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    getBlogById();
    assign_color();
    // eslint-disable-next-line
  }, [blog, likeBlog, dislikeBlog]);

  return (
    <div className="blog_landing">
      <div className="blog_landing_div">
        <h2>{blog.title}</h2>
        <p>{blog.description}</p>
        <img src={`/uploads/${blog.articleImage}`} alt="" />
      </div>
      <div className="blog_landing_footer">
        <div className="like_div">
          <ThumbUpIcon
            onClick={() => {
              likeBlog();
            }}
            style={{ color: likecolor }}
          />{" "}
          Like
        </div>
        <div className="dislike_div">
          <ThumbDownIcon
            onClick={() => dislikeBlog()}
            style={{ color: dislikecolor }}
          />{" "}
          Dislike
        </div>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
          style={{ textTransform: "inherit" }}
        >
          Add a comment
        </Button>
        <CommentModal id={id} open={open} close={handleClose} />
      </div>

      {/* Show the comments container */}
        {blog?.comments?.length>0 &&
      <div className="blog_comment_container">
        <hr />
        <strong>View Comments</strong>
        {blog?.comments?.map((comment) => (
          <div className="blog_comment_section" key={comment._id}>
            <Avatar>{comment.commentator[0]}</Avatar>
            <p>
              {comment.comment}
              {comment.commentator === userData.email && (
                <DeleteIcon
                  fontSize="small"
                  onClick={() => {
                    deleteComment(comment._id);
                  }}
                  titleAccess="Delete your comment"
                  className="delete_comment"
                />
              )}
            </p>

            <strong>-By {comment.commentator}</strong>
          </div>
        ))}
      </div>
        }
    </div>
  );
}

export default BlogLandingPage;
