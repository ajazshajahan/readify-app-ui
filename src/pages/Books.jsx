import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import "./Books.css";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  

  // Function to fetch books data
  const fetchBooks = () => {
    const userId = localStorage.getItem("userId");
    const params = {};
    if (userId) {
      params.userId = userId; // Add userId to params only if it's present
    }

    axios
      .get("http://localhost:8080/api/find/books", { params })
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data); // Initially show all books
      })
      .catch((error) => {
        console.error("There was an error fetching the books data!", error);
      });
  };

  // Fetch books data on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books based on search term
  useEffect(() => {
    const filtered = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredBooks(filtered);
  }, [searchTerm, books]); // Filter books whenever the search term or book list changes

  // Function to handle the API call on button click
  const updateStatus = (bookId, fileData, isPublic) => {
    if (localStorage.getItem("userId")) {
      axios
        .post("http://localhost:8080/api/book/status", null, {
          params: {
            userId: localStorage.getItem("userId"),
            bookId: bookId,
          },
        })
        .then((response) => {
          console.log("Status updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating status:", error);
        });
    }

    fetchBooks();

    const userId = localStorage.getItem("userId");

    if (userId || isPublic) {
      openBook(fileData);
    }else{
      alert("selected book is private, please login to read ")

      navigate('/login');
    }

  };

  const openBook = (fileData) => {
    const byteCharacters = atob(fileData); // Decode base64
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([byteNumbers], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);

    // Open the blob URL in a new browser tab
    window.open(blobUrl, "_blank");
  };

  return (
    <div className="books-containe">
      <h1 className="bookh">Books</h1>

      <div className="seachb">
        <input
          className="inpsrch"
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="books-grid">
        {filteredBooks.map((book) => (
          <div
            className="book-card"
            key={book.id}
            onClick={() => updateStatus(book.id, book.fileData, book.isPublic)}
          >
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">Author: {book.author}</p>
            <p className="book-genre">Genre: {book.genre}</p>
            <p className="book-public">
              Public: {book.isPublic ? "Yes" : "No"}
            </p>
            <p className="book-visited">
              Visited: {book.readByUser ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;