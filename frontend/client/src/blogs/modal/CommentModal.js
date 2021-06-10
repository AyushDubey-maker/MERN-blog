import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Input } from '@material-ui/core';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

  
  function getModalStyle() {
     const top = 50 ;
     const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display:'flex',
      flexDirection:'column'
    },
  }));
function CommentModal({open,close,id}) {
    const classes = useStyles();
    const [comment,setComment]=useState('')
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const {userData}=useContext(AuthContext)
  
    async function postComment(e){
        e.preventDefault()
        try{
            const data={
                user_id:userData?._id,
                comment:comment,
            }
             axios.post(`http://localhost:5000/blog/comment/${id}`,data)
             setComment('')
             alert("Comment Posted")
             
            }catch(err){
                alert(err)
            }
    }
  

    return (
        <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          <div style={modalStyle} className={classes.paper}>
        <CloseIcon style={{cursor:'pointer'}} onClick={close}/>
          <div>
          <Input placeholder='Enter Comment' value={comment} onChange={(e)=>setComment(e.target.value)}/>
          <Button disabled={!comment} variant="contained" color="primary" style={{marginLeft:'10px'}} onClick={postComment}>POST</Button>
          </div>
          </div>
      </Modal>
   
        </div>
    )
}

export default CommentModal
