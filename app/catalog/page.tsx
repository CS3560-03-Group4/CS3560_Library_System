"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import the Link component

const ManageBookCatalog: React.FC = () => {
  const booksPerPage = 5; // Number of books to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [books] = useState([
    {
      bookId: "000-111-1001",
      title: "Soul Screamer 1",
      author: "Rachel Vincent",
      publisher: "Harlequin Teen",
      numberOfPages: 288,
      datePublished: "2009-01-01",
    },
    {
      bookId: "000-111-1002",
      title: "Blue Eyes",
      author: "Nguyen Nhat Anh",
      publisher: "Nha Nam",
      numberOfPages: 200,
      datePublished: "2019-07-01",
    },
    {
      bookId: "000-111-1003",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      publisher: "Celadon Books",
      numberOfPages: 336,
      datePublished: "2019-02-05",
    },
    {
      bookId: "000-111-1004",
      title: "The Night Circus",
      author: "Erin Morgenstern",
      publisher: "Doubleday",
      numberOfPages: 512,
      datePublished: "2011-09-13",
    },
    {
      bookId: "000-111-1005",
      title: "Circe",
      author: "Madeline Miller",
      publisher: "Little, Brown and Company",
      numberOfPages: 400,
      datePublished: "2018-04-10",
    },
    {
      bookId: "000-111-1006",
      title: "The Goldfinch",
      author: "Donna Tartt",
      publisher: "Little, Brown and Company",
      numberOfPages: 771,
      datePublished: "2013-10-22",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate the books to be displayed on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books
    .filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .slice(indexOfFirstBook, indexOfLastBook);

  // Handle page number click
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <div style={headerContainerStyle}>
        <h1 style={headingStyle}>Manage Book Catalog</h1>
        <div style={searchContainerStyle}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for books..."
            style={searchBarStyle}
          />
          <div style={filterSortContainerStyle}>
            <button style={filterSortButtonStyle}>Filter</button>
            <button style={filterSortButtonStyle}>Sort</button>
          </div>
        </div>
      </div>

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={headerStyle}>Book ID</th>
              <th style={headerStyle}>Title</th>
              <th style={headerStyle}>Author</th>
              <th style={headerStyle}>Publisher</th>
              <th style={headerStyle}>Number of Pages</th>
              <th style={headerStyle}>Date Published</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.bookId}>
                <td style={cellStyle}>{book.bookId}</td>
                <td style={cellStyle}>{book.title}</td>
                <td style={cellStyle}>{book.author}</td>
                <td style={cellStyle}>{book.publisher}</td>
                <td style={cellStyle}>{book.numberOfPages}</td>
                <td style={cellStyle}>{book.datePublished}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Page numbers */}
      <div style={paginationContainerStyle}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            style={{
              ...paginationButtonStyle,
              backgroundColor: currentPage === index + 1 ? "#4CAF50" : "#f0f0f0",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Action buttons placed on the right below the pagination */}
      <div style={actionButtonContainerStyle}>
        <Link href="/add">
          <button style={actionButtonStyle("add")}>Add Book</button>
        </Link>
        <Link href="/update">
          <button style={actionButtonStyle("update")}>Update Book</button>
        </Link>
        <button style={actionButtonStyle("remove")}>Remove Book</button>
      </div>
    </div>
  );
};

// Inline styles for table elements
const headerContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const headingStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "left",
  marginBottom: "20px",
};

const searchContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const searchBarStyle: React.CSSProperties = {
  padding: "10px",
  marginRight: "10px",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid #ddd",
};

const filterSortContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
};

const filterSortButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: "4px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const headerStyle: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #ddd",
  fontWeight: "bold",
  textAlign: "left",
};

const cellStyle: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const paginationContainerStyle: React.CSSProperties = {
  marginTop: "20px",
  textAlign: "center",
};

const paginationButtonStyle: React.CSSProperties = {
  padding: "10px 15px",
  margin: "0 5px",
  fontSize: "1rem",
  borderRadius: "4px",
  backgroundColor: "#f0f0f0",
  cursor: "pointer",
};

// Action button style with dynamic colors based on button type
const actionButtonStyle = (action: string): React.CSSProperties => ({
  padding: "10px 20px",
  borderRadius: "4px",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  backgroundColor:
    action === "add" ? "#A1EBDA" : action === "remove" ? "#F6171A" : "#9Cb8B1", // Custom colors
});

// Updated style to align action buttons to the right
const actionButtonContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  justifyContent: "flex-end",
  marginTop: "20px",
  alignItems: "center",
};

export default ManageBookCatalog;
