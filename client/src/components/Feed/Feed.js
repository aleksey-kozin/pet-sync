import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import FeedCard from '../FeedCard/FeedCard'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { initFeedAC } from '../../utils/redux/actionCreators/actionCreators'
import './Feed.css'
import ProfileNav from '../Profile/ProfileNav'
import Loader from '../Loader/Loader'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(2),
  },
}))

function Feed() {
  const { id } = useParams()
  const feedArray = useSelector((state) => state.feedReducer.feed)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/feed')
      .then((res) => res.json())
      .then((result) => {
        dispatch(initFeedAC(result.feedArr))
        setLoading(false)
      })
  }, [dispatch])
  const classes = useStyles()

  const typePets = [{ typeLabel: 'Собаки' }, { typeLabel: 'Кошки' }]
  const agePets = [
    { ageLabel: '1 - 12 мес' },
    { ageLabel: 'от 1 года до 7 лет' },
    { ageLabel: 'от 7 лет' },
  ]
  const sizePets = [
    { sizeLabel: 'Маленькая' },
    { sizeLabel: 'Средняя' },
    { sizeLabel: 'Крупная' },
  ]
  const veterinaryDietPets = [
    { veterinaryDietLabel: 'Чувствительное пищеварение' },
    { veterinaryDietLabel: 'Стерилизованное или кастрированное животное' },
    { veterinaryDietLabel: 'Контроль над весом' },
  ]

  const [type, setType] = useState([])
  const [age, setAge] = useState([])
  const [size, setSize] = useState([])
  const [veterinaryDiet, setVeterinaryDiet] = useState([])


  const filteredUnits =
    type.length || age.length || size.length || veterinaryDiet.length
      ? feedArray.filter((feed) => {
          return (
            (!type.length || type.includes(feed.type)) &&
            (!age.length || age.includes(feed.age)) &&
            (!size.length || size.includes(feed.size)) &&
            (!veterinaryDiet.length ||
              veterinaryDiet.includes(feed.veterinaryDiet))
          )
        })
      : feedArray

  const userState = useSelector((state) => state.usersReducer)
  let admin = userState.user.email === 'akost2001@gmail.com'

  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          <div className="feed">
            {!admin ? (
              <Link to={`/mypets/${id}`}>
                <img
                  style={{ marginBottom: '40px' }}
                  src="/left-arrow.svg"
                  alt=""
                  width="40px"
                />
              </Link>
            ) : (
              <Link to={`/mypets`}>
                <img
                  style={{ marginBottom: '40px' }}
                  src="/left-arrow.svg"
                  alt=""
                  width="40px"
                />
              </Link>
            )}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '40px' }}>Подбор базовой диеты</h2>

              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" style={{ fontSize: '18px' }}>
                  <b>Животное</b>
                </FormLabel>
                <FormGroup>
                  {typePets.map((animal, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          onChange={(event) =>
                            setType((prev) =>
                              event.target.checked
                                ? [...prev, animal.typeLabel]
                                : []
                            )
                          }
                        />
                      }
                      label={animal.typeLabel}
                      value={animal.typeLabel}
                    />
                  ))}
                </FormGroup>
              </FormControl>

              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" style={{ fontSize: '18px' }}>
                  <b>Возраст</b>
                </FormLabel>
                <FormGroup>
                  {agePets.map((age, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          onChange={(event) =>
                            setAge((prev) =>
                              event.target.checked
                                ? [...prev, age.ageLabel]
                                : []
                            )
                          }
                        />
                      }
                      label={age.ageLabel}
                      value={age.ageLabel}
                    />
                  ))}
                </FormGroup>
              </FormControl>

              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" style={{ fontSize: '18px' }}>
                  <b>Размер</b>
                </FormLabel>
                <FormGroup>
                  {sizePets.map((size, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          onChange={(event) =>
                            setSize((prev) =>
                              event.target.checked
                                ? [...prev, size.sizeLabel]
                                : []
                            )
                          }
                        />
                      }
                      label={size.sizeLabel}
                      value={size.sizeLabel}
                    />
                  ))}
                </FormGroup>
              </FormControl>

              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" style={{ fontSize: '18px' }}>
                  <b>Особые потребности</b>
                </FormLabel>
                <FormGroup>
                  {veterinaryDietPets.map((diet, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          onChange={(event) =>
                            setVeterinaryDiet((prev) =>
                              event.target.checked
                                ? [...prev, diet.veterinaryDietLabel]
                                : []
                            )
                          }
                        />
                      }
                      label={diet.veterinaryDietLabel}
                      value={diet.veterinaryDietLabel}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </div>
            <div className="feed-wrapper">
              {loading ? (
                <Loader />
              ) : (
                filteredUnits &&
                filteredUnits.map((el) => <FeedCard key={el._id} value={el} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Feed
