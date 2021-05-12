import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import BookCard from "./BookCard";
import LoadingSpinner from "../common/LoadingSpinner";

/*style*/
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const URL = "https://www.googleapis.com/books/v1/volumes";

const SingleBook = ({ id }) => {
  const classes = useStyles(); //style
  const id2 = useParams().id;

  /*if not id provided then the id equal the path id*/
  if (!id) {
    id = id2;
  }

  const [oneBook, setOneBook] = useState(null);

  useEffect(
    function getTheBook() {
      async function get() {
        const { data } = await axios.get(`${URL}/${id}`);
        setOneBook(data);
        console.log(data);
      }

      get();
    },
    [id]
  );

  //console.log(oneBook);
  if (!oneBook) return <LoadingSpinner />;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h1>{oneBook.volumeInfo.title}</h1>
        <h2>author: {oneBook.volumeInfo.authors}</h2>
        <h2>
          Publisher: {oneBook.volumeInfo.publisher}on{" "}
          {oneBook.volumeInfo.publishedDate}{" "}
        </h2>

        <img src={oneBook.volumeInfo.imageLinks.smallThumbnail} alt="photo" />
        <a href={oneBook.volumeInfo.infoLink}>Go!</a>
        <a href={oneBook.volumeInfo.previewLink}>Preview!</a>
        <div
          dangerouslySetInnerHTML={{
            __html: oneBook.volumeInfo.description,
          }}
        ></div>
      </Paper>
    </div>
  );
};

export default SingleBook;
