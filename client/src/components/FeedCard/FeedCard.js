import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    margin: '10px',
  },
  text: {
    color: 'black',
    textDecoration: 'none',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}))

function FeedCard({ value }) {
  const classes = useStyles()
  // if(value){
  // const name = value.name.toLowerCase()
  // const newName = name.replace(name[0], name[0].toUpperCase())}

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            image={value.img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Link className={classes.text} to={`/feed/about/${value._id}`}>

              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ fontSize: "16px",  textAlign:"center"}}
              >
                {value.name.toLowerCase()}

              </Typography>
            </Link>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default FeedCard
