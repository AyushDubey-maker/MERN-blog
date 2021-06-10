import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import AuthContext from '../context/AuthContext';

function BlogForm() {
    const [blogTitle,setBlogTitle]=useState('')
    const [blogDescription,setBlogDescription]=useState('')
    const [fileName,setFileName]=useState("")
    const history=useHistory()
    const {userData}=useContext(AuthContext)
    const onChangeFile=(e)=>{
        setFileName(e.target.files[0])
    }
      async function addBlog(e){
          e.preventDefault();
          try{
              const formData=new FormData();
              formData.append("date",new Date())
              formData.append("title",blogTitle)
              formData.append("description",blogDescription)
              formData.append("articleImage",fileName)
              formData.append("author",userData?.email)
              formData.append("uid",userData?._id)
              await axios.post("http://localhost:5000/blog/",formData)
              setBlogTitle('')
              setBlogDescription('')
              setFileName('')
              alert('Blog Added')
              history.push('/blog')
          }catch(err){
             alert(err)
          }
      }
    return (
        <div className="blog_form">
            <h1>Create Blog</h1>
            <form onSubmit={addBlog} encType="multipart/form-data">
                <input placeholder="Title " required value={blogTitle}  onChange={(e)=>setBlogTitle(e.target.value)}/>
                <textarea placeholder="Description (Max 200 characters)" maxLength={200} onChange={(e)=>setBlogDescription(e.target.value)}/>
                <label>Add an Image</label>
                <input className="file-input" required type="file" filename="articleImage"  onChange={onChangeFile}/>
                {/* disabled={!blogTitle || !blogDescription} */}
                <button>Add Blog</button>
            </form>
        </div>
    )
}

export default BlogForm
