import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import FeedCard from '../FeedCard/FeedCard';
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(2),
  },
}));

function Feed(props) {
  const [feedArray, setFeedArray] = useState()
  useEffect(() => {
    fetch("http://localhost:4000/feed")
      .then((res) => res.json())
      .then((result) => setFeedArray(result.feedArr));
  }, [])

  console.log(feedArray);

const classes = useStyles();

const [state, setState] = useState({
  type: false,
  age: false,
  size: false,
  veterinaryDiet: false,
});
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  
  useEffect(() => {
    console.log(state);
  }, [state]);
  

const { type, age, size, veterinaryDiet } = state;
  // const error =
  //   [cat, dog, young, adult, old, small, medium, big, sterilization, digestion, weight].filter((v) => v)
  //     .length !== 2;

  return (
    <div>
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Животное</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={type}
                  onChange={handleChange}
                  name="type"
                  value="Кошки"
                />
              }
              label="Кошки"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={type}
                  onChange={handleChange}
                  name="type"
                  value="Собаки"
                />
              }
              label="Собаки"
            />
          </FormGroup>

          <FormLabel component="legend">Возраст</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={age}
                  onChange={handleChange}
                  name="age"
                  value="1 - 12 мес"
                />
              }
              label="1 - 12 мес"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={age}
                  onChange={handleChange}
                  name="age"
                  value="от 1 года до 7 лет"
                />
              }
              label="от 1 года до 7 лет"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={age}
                  onChange={handleChange}
                  name="age"
                  value="от 7 лет"
                />
              }
              label="от 7 лет"
            />
          </FormGroup>
          <FormLabel component="legend">Размер</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={size}
                  onChange={handleChange}
                  name="size"
                  value="Маленькая"
                />
              }
              label="Маленькая"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={size}
                  onChange={handleChange}
                  name="size"
                  value="Средняя"
                />
              }
              label="Средняя"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={size}
                  onChange={handleChange}
                  name="size"
                  value="Крупная"
                />
              }
              label="Крупная"
            />
          </FormGroup>
          <FormLabel component="legend">Особые потребности</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={veterinaryDiet}
                  onChange={handleChange}
                  name="veterinaryDiet"
                  value="Стерилизованное или кастрированное животное"
                />
              }
              label="Стерилизованное или кастрированное животное"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={veterinaryDiet}
                  onChange={handleChange}
                  name="veterinaryDiet"
                  value="Чувствительное пищеварение"
                />
              }
              label="Чувствительное пищеварение"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={veterinaryDiet}
                  onChange={handleChange}
                  name="veterinaryDiet"
                  value="Контроль над весом"
                />
              }
              label="Контроль над весом"
            />
          </FormGroup>
        </FormControl>
      </div>

      {feedArray && feedArray.map((el) => <FeedCard key={el._id} value={el} />)}
    </div>
  );
}

export default Feed;
