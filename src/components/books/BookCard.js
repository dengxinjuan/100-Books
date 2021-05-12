import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
//import Button from "../common/Button";
import CardHeader from "@material-ui/core/CardHeader";

/*style start here*/
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: 20,
  },
  media: {
    height: 140,
  },
});

const BookCard = ({ id, volumeInfo }) => {
  const classes = useStyles(); // style

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

  let { title, authors, publisher, publishedDate, description, imageLinks } =
    volumeInfo;
  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardHeader title={title} subheader={`By ${authors}`} />
        <CardActionArea>
          <a href={`/books/${id}`}>
            <CardMedia
              className={classes.media}
              image={imageLinks.thumbnail}
              title={title}
            />
          </a>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {authors} - {publisher} on {publishedDate}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
            </Typography>
          </CardContent>
        </CardActionArea>

        {currentUser && (
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleRead}
              disabled={read}
            >
              {read ? "READ" : "Mark As READ"}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={removeRead}
              disabled={!read}
            >
              remove
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

export default BookCard;
