import React from 'react'

import "./User.scss";

function user({name, image, scores, hasNextMoveFunc, isWinner}) {
  const className = isWinner ? "user user--winner" : "user";
  return (
    <section className={className}>
      <figure>
        <img src={image} alt="the user avatar" />
      </figure>
      <h2>{name}</h2>
      {isWinner ? <h3>🎉 WINNER 🎉</h3> : null}
      <span>Score: {scores ? scores.reduce((x, y) => x + y) : 0}</span>
      {hasNextMoveFunc && isWinner === null &&
        <>
          <button
            className='user__button'
            onClick={() => hasNextMoveFunc()}
          >
            Roll
          </button>
        </>
      }
    </section>
  )
}

export default user