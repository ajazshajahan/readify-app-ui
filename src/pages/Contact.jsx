import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './Contact.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    
    // Send form data to Spring Boot backend
    axios.post('http://localhost:8080/api/send/messages', formData)
      .then(response => {
        console.log('Response from server:', response.data);
        setFormData({ name: '', email: '', message: '' }); // Reset form
      })
      .catch(error => {
        console.error('Error sending form data', error);
      });
  };

  return (
    <div className='contactbgrnd'>
      <div className="contact-container">
        <h2 className='contacth2'>Contact Us</h2>
        <p className='contactP'>We would love to hear from you! Please fill out the form below to reach out.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
