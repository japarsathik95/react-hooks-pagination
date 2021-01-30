import React, { useState, useEffect } from "react";
import "./style.css";

export default function Pagination() {
  let [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "One",
      age: 20,
      location: "india"
    },
    {
      id: 2,
      name: "Two",
      age: 21,
      location: "US"
    },
    {
      id: 3,
      name: "There",
      age: 25,
      location: "UK"
    },
    {
      id: 4,
      name: "Four",
      age: 29,
      location: "Germany"
    },
    {
      id: 5,
      name: "Five",
      age: 44,
      location: "France"
    }
  ]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      res
        .json()
        .then(result => console.log(setUsers(result)))
        .then(err => console.log(error));
    }
    getData();
  });

  const perPage = 2;
  const totalPages = Math.ceil(users.length / perPage);

  const renderPages = () => {
    const pages = [];
    for (var i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages.map(data => {
      return (
        <button
          onClick={() => setCurrentPage(data)}
          disabled={currentPage === data}
        >
          {data}
        </button>
      );
    });
  };

  const renderPaginationConfig = () => {
    return (
      <div class="btn">
        <button
          onClick={() => setCurrentPage(--currentPage)}
          disabled={currentPage <= 1}
        >
          Prev
        </button>
        {renderPages()}
        <button
          onClick={() => setCurrentPage(++currentPage)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  const renderUserDeatils = () => {
    const allusers = [...users];
    const result = new Array(Math.ceil(allusers.length / perPage))
      .fill()
      .map(_ => allusers.splice(0, perPage));

    return result[currentPage - 1].map(data => {
      return (
        <div class="user-container">
          <h1>{data.name}</h1>
          <h4>{data.website}</h4>
          <p>{data.phone}</p>
          <h4>{data.age}</h4>
          <p>{data.location}</p>
        </div>
      );
    });
  };

  return (
    <div class="pagination">
      <h1>Pagination</h1>
      {renderUserDeatils()}
      {renderPaginationConfig()}
    </div>
  );
}
