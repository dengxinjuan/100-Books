import { useEffect, useState } from "react";
import axios from "axios";
import SearchArea from "./SearchArea";
import BookCard from "./BookCard";
import BookList from "./BookList";
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

  async function search(q) {
    try {
      const { data } = await axios.get(`${BASE_URL}q=${q}`);

      console.log(data);
      setTheBooks(data);
    } catch (e) {
      console.error(e);
    }
  }

  if (!theBooks) return "loading!";

  return (
    <div>
      <h1>Books Here!</h1>
      <SearchArea search={search} />
      <BookList theBooks={theBooks} />
    </div>
  );
};

export default Books;
