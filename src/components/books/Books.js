import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?"; //the basic google api books data when loading

const Books = () => {
  const [theBooks, setTheBooks] = useState(null);
  /*we load the basic data when the books mount*/
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(`${BASE_URL}q=storytime`);

        console.log(data);
        setTheBooks(data);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, []);

  if (!theBooks) return "loading!";

  return (
    <div>
      <h1>Books Here!</h1>
    </div>
  );
};

export default Books;
