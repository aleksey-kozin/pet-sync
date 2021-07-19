import React from 'react';

function FeedDitail({ value }) {
  const updFeed = (ev) => {
    ev.preventDefault();
  }
  const delFeed = (ev) => {
    ev.preventDefault();
  };
  return (
    <div>
      <img src={value.img} />
      <div>
        <h5>{value.brand}</h5>
        <p>{value.name}</p>
        <p>{value.type}</p>
        <p>{value.age}</p>
        <p>{value.size}</p>
      </div>
      <button onClick={updFeed} type="button">
        Редактировать
      </button>
      <button onClick={delFeed} type="button">
        Удалить
      </button>
    </div>
  );
}

export default FeedDitail;
