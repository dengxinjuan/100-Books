import BookCard from "./BookCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
  },
  container: {
    padding: theme.spacing(3),
  },
}));

const BookList = ({ theBooks }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={3} alignItems="stretch">
          {theBooks.items.map((b) => (
            <BookCard id={b.id} volumeInfo={b.volumeInfo} key={b.id} />
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default BookList;
