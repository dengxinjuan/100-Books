import { useEffect, useState } from "react";
import axios from "axios";
import SearchArea from "./SearchArea";
import BookCard from "./BookCard";
import BookList from "./BookList";
import LoadingSpinner from "../LoadingSpinner";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?"; //the basic google api books data when loading

const Books = () => {
  const [theBooks, setTheBooks] = useState(null);
  /*we load the basic data when the books mount*/
  useEffect(() => {
    async function getData() {
      try {
        /*const { data } = await axios.get(`${BASE_URL}q=storytime`);*/

        const { data } = await axios.get(BASE_URL, {
          params: { q: "kidsstory" },
        });

        console.log(data);
        setTheBooks(data);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, []);

  async function search(q, number) {
    try {
      const { data } = await axios.get(BASE_URL, {
        params: { q: q, maxResults: number },
      });

      cleanData(data);
      console.log(data);
      setTheBooks(data);
    } catch (e) {
      console.error(e);
    }
  }

  /*function that clean the data errors, sometimes the data dont have images or date*/
  function cleanData(data) {
    const cleanData = data.items.map((book) => {
      if (book.volumeInfo.hasOwnProperty("publishedDate") === false) {
        book.volumeInfo["publishedDate"] = "0000";
      } else if (book.volumeInfo.hasOwnProperty("imageLinks") === false) {
        book.volumeInfo["imageLinks"] = {
          thumbnail:
            "https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png",
        };
      }
      return book;
    });

    return cleanData;
  }

  if (!theBooks) return <LoadingSpinner />;

  return (
    <div>
      <h1>Books Here!</h1>
      <SearchArea search={search} />
      <BookList theBooks={theBooks} />
    </div>
  );
};

export default Books;
