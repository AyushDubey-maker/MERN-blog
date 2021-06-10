import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useHistory } from 'react-router';

function HomePage() {
    const [homeblogs,setHomeBlogs]=useState([])
  
    const history=useHistory()
    async function getHomeBlogs(){
        const homeblogsData=await axios.get("http://localhost:5000/blog/home")
        setHomeBlogs(homeblogsData.data)
    }
    useEffect(()=>{
    
          getHomeBlogs()
      
    },[homeblogs])

 
    return (
        <div className="home_div">
            <h1>Welcome to M.E.R.N Blogs  <MenuBookIcon className="home_icon"  fontSize="large"/></h1>
            <div className="home_grid">
            {homeblogs.map((homeblog)=>(
              <div className="home_div_blog" onClick={()=> history.push(`/viewblog/${homeblog._id}`)} key={homeblog._id}>
              <h3>{homeblog.title}</h3>
              <p>{homeblog.description}</p>
              <img src={`/uploads/${homeblog.articleImage}`} alt=""/>
              <div className="home_div_blog_content">
              <p>-By <strong>{homeblog.author}</strong></p>
            
              </div>
              </div>
          ))}
</div>
        </div>
    )
}

export default HomePage
