import React from 'react';

const CardItem =  (props) => {
  const {name, url, email, liked, toggleLike, removeUsers}  = props;
  return (
    <div className="text-center user-item">
      <h3>{name}</h3>
      <img src={url} alt=''/>
      <p>{email}</p>
      <button onClick={() => toggleLike(email)}>{liked ? 'dislike': 'like'}</button>
      <button onClick={() => removeUsers(email)}>Remove</button>
    </div>
    )
}

export default CardItem;
