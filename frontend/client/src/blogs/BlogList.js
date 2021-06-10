import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
function BlogList() {
    const [blogs,setBlogs]=useState([])
    const history=useHistory()
  async  function getBlogs(){
    const blogRes=await axios.get("http://localhost:5000/blog/")
    setBlogs(blogRes.data)
    }
 
    useEffect(()=>{
        getBlogs()
    },[blogs])
    // Delete Functionality
    const deleteBlog=async(id)=>{
        await axios.delete(`http://localhost:5000/blog/delete/${id}`)

    }
    return (
        <div className="blog_list">
            {blogs?.map((blog)=>(
                <div key={blog._id} className="blog">
                    <div className="blog_content">
                    <strong>{blog.title}</strong>
                    <p>{blog.description}</p>
                    <img  onClick={()=>history.push(`/viewblog/${blog._id}`)} src={`/uploads/${blog.articleImage}`} alt=""/>
                    <div className="blog_content_like">
                    <p>{blog.likes} Likes</p>
                    <p>{blog.dislikes} Dislikes</p>
                    </div>
                    <p>{blog.comments.length} comments</p>
                    </div>
                    <div className="blog_buttons">
                    <button onClick={()=>deleteBlog(blog._id)}><DeleteIcon color="secondary"/></button>
                    <button onClick={()=>history.push(`/edit/${blog._id}`)}><EditIcon color="primary"/></button>
                    </div>
                    </div>
            ))}
        </div>
    )
}

export default BlogList
