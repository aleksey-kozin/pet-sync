import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Link } from 'react-router-dom'
import { editFeedAC } from '../../utils/redux/actionCreators/actionCreators'
import ProfileNav from '../Profile/ProfileNav'
import './FeedDetail.css'
import '../AddFeed/AddFeed.css'

function FeedDitail({ value }) {
  const userState = useSelector((state) => state.usersReducer)
  let admin = userState.user.email === 'akost2001@gmail.com'

  const feedArray = useSelector((state) => state.feedReducer.feed)
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useHistory()
  const [state, setState] = useState(true)
  const text = useRef()

  const findFeed = feedArray.find((item) => item._id === id)

  const editFeed = (ev) => {
    ev.preventDefault()
    const editFeed = {
      _id: findFeed._id,
      img: findFeed.img,
      type: text.current.type.value,
      age: text.current.age.value,
      size: text.current.size.value,
      veterinaryDiet: text.current.veterinaryDiet.value,
      brand: text.current.brand.value,
      name: text.current.name.value,
    }
    dispatch(editFeedAC(editFeed))
    fetch(`/edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFeed),
    })
      .then((res) => res.json())
      .then((result) => {
        alert('Изменения успешно сохранены')
      })
      .then(setState(true))
  }

  const delFeed = (ev) => {
    ev.preventDefault()
    fetch(`/delfeed/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => {
        // if (result.status) {
        //   alert('Корм успешно удален из базы')
        // } else {
        //   alert('Что-то пошло не так')
        // }
      })
      .then(() => history.push('/feeds'))
  }

  return (
    <div className="container">
      <ProfileNav />
      <Link to={`/feeds`}>
        <img
          style={{ marginTop: '40px' }}
          src="/left-arrow.svg"
          alt=""
          width="40px"
        />
      </Link>
      {state === false ? (
        <div className="">
          <form ref={text}>
            <div className="one-feed-card">
              <label>
                <img src={value.img} alt="" />

                <h5>
                  {' '}
                  Брэнд:{' '}
                  <input
                    className="form-input"
                    name="brand"
                    defaultValue={value.brand}
                  />{' '}
                </h5>
              </label>
              <label>
                {' '}
                <p>
                  Наименование:{' '}
                  <input
                    className="form-input"
                    name="name"
                    defaultValue={value.name.toLowerCase()}
                  />
                </p>
              </label>
              <label>
                {' '}
                <p>
                  Для кого:{' '}
                  <input
                    className="form-input"
                    name="type"
                    defaultValue={value.type}
                  />
                </p>
              </label>
              <label>
                <p>
                  Возраст:{' '}
                  <input
                    className="form-input"
                    name="age"
                    defaultValue={value.age}
                  />
                </p>
              </label>
              <label>
                <p>
                  Размер:{' '}
                  <input
                    className="form-input"
                    name="size"
                    defaultValue={value.size}
                  />
                </p>
              </label>
              <label>
                <p>
                  Особые потребности:{' '}
                  <input
                    name="veterinaryDiet"
                    defaultValue={value.veterinaryDiet}
                  />
                </p>
              </label>
              <button onClick={editFeed} type="button">
                Сохранить
              </button>
              <button
                onClick={() => {
                  setState(true)
                }}
                type="button"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="one-feed-card">
          <img src={value.img} alt="" />
          <div>
            <h5>Брэнд: {value.brand}</h5>
            <p>Наименование: {value.name.toLowerCase()}</p>
            <p>Для кого: {value.type}</p>
            <p>Возраст: {value.age}</p>
            <p>Размер: {value.size}</p>
            <p>Особые потребности: {value.veterinaryDiet}</p>
          </div>
          {admin ? (
            <>
              <button
                onClick={() => {
                  setState(false)
                }}
                type="button"
              >
                Редактировать
              </button>
              <button onClick={delFeed} type="button">
                Удалить
              </button>
            </>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default FeedDitail
