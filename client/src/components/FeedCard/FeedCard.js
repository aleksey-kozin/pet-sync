import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
}));

function FeedCard({ value }) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="30%"
            image={value.img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Link to={`/feed/${value._id}`}>
              <Typography gutterBottom variant="h5" component="h2">
                {value.name}
              </Typography>
            </Link>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default FeedCard;
