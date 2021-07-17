import React from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
}));

function Pet({ value }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <Link to={`/mypets/${value.name}`}>
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {value.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {value.breed}
              </Typography>
            </CardContent>
          </div>
          <CardMedia className={classes.cover} image="/620x414.jpeg" />
        </Card>
      </Link>
    </div>
  );
}

export default Pet;