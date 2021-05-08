import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";

const BookCard = ({ id, volumeInfo }) => {
  const { hasRead, addReadId, removeReadId } = useContext(UserContext);
  const [read, setRead] = useState();

  React.useEffect(function updateRead() {
    setRead(hasRead(id));
  }, []);

  /*handle read */
  async function handleRead(evt) {
    if (hasRead(id)) return;
    addReadId(id);
    setRead(true);
  }

  /*delete read */
  async function removeRead(evt) {
    if (!hasRead(id)) return;
    removeReadId(id);
    setRead(false);
  }

  let {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    imageLinks,
  } = volumeInfo;
  return (
    <div>
      {id}
      {title}
      {authors}
      {publisher}
      {publishedDate}
      description: {description}
      <img src={imageLinks.thumbnail} alt="book" />
      <button>
        <a href={`/books/${id}`}>View</a>
      </button>
      <button
        className="btn btn-danger font-weight-bold text-uppercase float-right"
        onClick={handleRead}
        disabled={read}
      >
        {read ? "READ" : "Read me!"}
      </button>
      <button
        className="btn btn-danger font-weight-bold text-uppercase float-right"
        onClick={removeRead}
        disabled={!read}
      >
        remove
      </button>
    </div>
  );
};

export default BookCard;
