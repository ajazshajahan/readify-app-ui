import React, { useState, useRef } from 'react';
import axios from 'axios';
import './BookManagement.css';

export const BookManagement = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null); // Reference for file input

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setIsPublic(true);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Check if a file is selected
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    // Check file size
    if (file.size > 15728640) {
      setErrorMessage("File size must be less than 5MB.");
      return;
    }

    // Check allowed file types
    const allowedTypes = ['application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Only PDF or text files are allowed.");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('isPublic', isPublic);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/save/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Book saved successfully: ' + response.data);
      resetForm();
    } catch (error) {
      console.error('Error saving book:', error);
      console.error('Error response:', error.response); // Log the full response for more details
      setErrorMessage('Failed to save the book. ' + (error.response?.data?.message || error.message || 'Please try again.'));
    }
  };

  return (
    <div className="book-management-container">
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit} className="book-form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />

        <label htmlFor="file">Upload Book File:</label>
        <input
          type="file"
          id="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <label htmlFor="isPublic">Public:</label>
        <input className='chbx'
          type="checkbox"
          id="isPublic"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        /><br /><br></br>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className='bkmgbn'>Save Book</button>
      </form>
    </div>
  );
};

export default BookManagement;
