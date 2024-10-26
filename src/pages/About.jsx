import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <h1 className='abouth1' >About Us</h1>
      <p className='aboutp'>
        Welcome to Readify, your go-to platform for reading books online. At Readify, we believe that reading should be accessible to everyone, everywhere. Our platform offers a vast collection of books across different genres, ensuring there is something for every kind of reader.
      </p >

      <h2 className='abouth2'>Our Mission</h2>
      <p className='aboutp'>
        Our mission is simple: to create a seamless and enjoyable reading experience for book lovers all over the world. Whether you're reading on your phone, tablet, or computer, Readify delivers the best reading experience with no hassle.
      </p>

      <h2 className='abouth2'>Why Choose Us?</h2>
      <ul>
        <li>Access to thousands of books, both classics and modern titles.</li>
        <li>Read from anywhere and on any device.</li>
        <li>Personalized reading recommendations based on your preferences.</li>
        <li>Community features like reviews, ratings, and book discussions.</li>
      </ul>
      <h2 className='abouth2'>Contact Us</h2>
      <p className='aboutp'>
        Have questions or feedback? Feel free to reach out to us at <a href="mailto:support@readify.com">support@readify.com</a>.
      </p>
      </div>
  )
}

export default About
