"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UpdateBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [printLength, setPrintLength] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [genre, setGenre] = useState("Trending"); // Set default genre
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");

  const router = useRouter();

  // Handle form submission for updating the book
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      publisher,
      printLength,
      publishedDate,
      genre,
      description,
      imgURL,
    };

    console.log("Updated Book:", updatedBook);

    // Redirect to the catalog page after updating the book
    router.push("/catalog");
  };

  // Handle cancel
  const handleCancel = () => {
    router.push("/catalog"); // Redirect to the catalog page
  };

  return (
    <div style={pageContainerStyle}>
      <h1 style={headingStyle}>Update Book</h1>

      <form onSubmit={handleSubmit} style={formContainerStyle}>
        {/* Form fields */}
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Publisher:</label>
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Print Length:</label>
          <input
            type="number"
            value={printLength}
            onChange={(e) => setPrintLength(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Published Date:</label>
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Genre:</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="Trending">Trending</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Thriller">Thriller</option>
            <option value="Mystery">Mystery</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Self-help">Self-help</option>
            <option value="Computer Science">Computer Science</option>
          </select>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={textareaStyle}
          />
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Image URL:</label>
          <input
            type="url"
            value={imgURL}
            onChange={(e) => setImgURL(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Buttons Container */}
        <div style={buttonContainerStyle}>
          <button type="submit" style={{ ...submitButtonStyle, backgroundColor: "#00843D" }}>
            Update Book
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{ ...submitButtonStyle, backgroundColor: "#B0B0B0" }} // Gray for cancel
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;

// Styles
const pageContainerStyle: React.CSSProperties = {
  padding: "20px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "20px",
};

const formContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: "bold",
  marginBottom: "5px",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid #ddd",
  marginBottom: "10px",
};

const textareaStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  height: "100px",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "15px", // Space between the buttons
};

const submitButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  fontSize: "1rem",
  borderRadius: "4px",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
