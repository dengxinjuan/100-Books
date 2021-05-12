import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

/*style*/
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: 20,
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
      }

      get();
    },
    [id]
  );
  /* the button function*/
  const { hasRead, addReadId, removeReadId, currentUser } =
    useContext(UserContext);
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

        <img src={oneBook.volumeInfo.imageLinks.smallThumbnail} alt="book" />
        <div>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              size="small"
              variant="contained"
              href={oneBook.volumeInfo.infoLink}
              target="_blank"
            >
              Go!
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              href={oneBook.volumeInfo.previewLink}
              target="_blank"
            >
              Preview!
            </Button>
            {currentUser && (
              <div>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={removeRead}
                  disabled={!read}
                >
                  remove
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={handleRead}
                  disabled={read}
                >
                  {read ? "READ" : "Mark As READ"}
                </Button>
              </div>
            )}
          </ButtonGroup>
        </div>
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
