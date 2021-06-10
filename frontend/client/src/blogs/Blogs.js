import React from 'react'
import { useHistory } from 'react-router'
import AddIcon from '@material-ui/icons/Add';
import BlogList from './BlogList'

function Blogs() {
    const history=useHistory()
    return (
        <div className="blogs_page">
            <button onClick={()=>history.push('/addblog')}>Add New Blog <AddIcon color="secondary"/></button>
            <BlogList/>
        </div>
    )
}

export default Blogs
