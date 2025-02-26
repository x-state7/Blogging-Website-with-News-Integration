import React from "react";
import userImg from '../assets/images/1.jpg'
import './Blogs.css'
const Blogs = () => {
  return (
    <div className="blogs">

      <div className="blogs-left">
        <img src={userImg} alt="User Image"></img>
      </div>

      <div className="blogs-right">
        <button className="post-btn">Create New Post</button>
        <button
          className="blogs-close-btn">
          Back<i className="bx bx-chevron-right"></i>
        </button>
      </div>

    </div>
  )
}

export default Blogs;