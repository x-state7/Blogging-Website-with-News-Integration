import React from "react";
import demoImg from '../assets/images/1.jpg'
import './NewsModal.css'
const NewsModal = () => {
  return (
    <div className='modal-overlay'>
      <div className="modal-content">
        <span className="close-button">
          <i className="fa-solid fa-xmark"></i>
        </span>
        <img src={demoImg} alt="Modal Image" className="modal-image" />
        <h2 className="modal-title">Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
        <p className="modal-source">Source:THe Gueara</p>
        <p className="modal-date">June 21,2024,4:15</p>
        <p className="modal-content-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <a href="#" className="read-more-link">Read More</a>
      </div>
    </div>
  )
}
export default NewsModal;