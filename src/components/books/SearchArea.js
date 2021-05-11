import { useState } from "react";

/*style*/
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing(3),
  },
}));
/*function*/

const SearchArea = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState(""); //set search term
  const [maxResults, setMaxResults] = useState(10); //set Max results

  const classes = useStyles();

  /*handle change*/
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /*handle submit and herit search function*/
  const handleSubmit = (e) => {
    e.preventDefault();
    search(searchTerm.trim() || undefined, maxResults);
    setSearchTerm(searchTerm.trim());
  };

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <Grid item xs={6}>
            <TextField
              required
              type="text"
              placeholder="search book"
              label="Search Term"
              variant="outlined"
              color="primary"
              size="large"
              value={searchTerm}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <label for="maxResults">Quantity: {maxResults}</label>
            <input
              type="range"
              min="1"
              max="40"
              id="maxResults"
              placeholder="Max Results"
              value={maxResults}
              onChange={(e) => setMaxResults(e.target.value)}
            />
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default SearchArea;
