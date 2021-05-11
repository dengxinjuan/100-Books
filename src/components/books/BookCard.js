import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import Button from "../common/Button";

const BookCard = ({ id, volumeInfo }) => {
  const { hasRead, addReadId, removeReadId } = useContext(UserContext);
  const [read, setRead] = useState();

  useEffect(
    function updateRead() {
      setRead(hasRead(id));
    },
    [id, hasRead]
  );

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

  let { title, authors, publisher, publishedDate, description, imageLinks } =
    volumeInfo;
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
      <Button
        className="btns"
        buttonStyle="btn--outline"
        buttonSize="btn--medium"
        onClick={handleRead}
        disabled={read}
      >
        {read ? "READ" : "Read me!"}
      </Button>
      <Button
        className="btns"
        buttonStyle="btn--primary"
        buttonSize="btn--medium"
        onClick={removeRead}
        disabled={!read}
      >
        remove
      </Button>
    </div>
  );
};

export default BookCard;
