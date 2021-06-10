import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router";
function EditBlog() {
    const [blogTitle,setBlogTitle]=useState('')
    const [blogDescription,setBlogDescription]=useState('')
    const [fileName,setFileName]=useState("")

    const [blogs,setBlogs]=useState([])
    const {id}=useParams()
    const history=useHistory()
      const onChangeFile=(e)=>{
        setFileName(e.target.files[0])
    }
     const getBlogById=async()=>{
        const blogRes=  await axios.get(`http://localhost:5000/blog/${id}`)
        setBlogs(blogRes.data)
     }
     useEffect(()=>{
         getBlogById()
        
         // eslint-disable-next-line
     },[blogs])
  
    const updateBlog=async(e)=>{
        e.preventDefault();
        try{
            const formData=new FormData();
            formData.append("date",new Date())
            formData.append("title",blogTitle?blogTitle:blogs.title)
            formData.append("description",blogDescription?blogDescription:blogs.description)
            formData.append("articleImage",fileName?fileName:blogs?.articleImage)
            formData.append("author",blogs?.author)
            formData.append("uid",blogs?.uid)
       
            await axios.post(`http://localhost:5000/blog/${id}`,formData)

             history.push("/blog")
        }catch(err){
           alert(err)
        }
    }

    return (
        <div className="edit_blog_div">
            <h1>Edit your blog</h1>
           <form onSubmit={updateBlog} encType="multipart/form-data">
               <input placeholder={blogs.title} value={blogTitle} onChange={(e)=>setBlogTitle(e.target.value)} />
               <textarea placeholder={blogs.description} value={blogDescription} onChange={(e)=>setBlogDescription(e.target.value)}/>
               <label>Want to post an Image?</label>
               <input required type="file" filename="articleImage"  onChange={onChangeFile}/>
               <button>{blogTitle==='' && blogDescription==='' && fileName===''?'Keep it same':'Update Blog'}</button>
                </form>
        </div>
    )
}

export default EditBlog
