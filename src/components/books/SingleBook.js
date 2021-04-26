import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import BookCard from "./BookCard";

const URL = "https://www.googleapis.com/books/v1/volumes";

const SingleBook = () => {
  const { id } = useParams();
  const [oneBook, setOneBook] = useState(null);

  useEffect(
    function getTheBook() {
      async function get() {
        const { data } = await axios.get(`${URL}/${id}`);
        setOneBook(data);
      }

      get();
    },
    [id]
  );

  console.log(oneBook);
  if (!oneBook) return "LOADING!";

  return (
    <div>
      <BookCard id={oneBook.id} volumeInfo={oneBook.volumeInfo} />
    </div>
  );
};

export default SingleBook;
