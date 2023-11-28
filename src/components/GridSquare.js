import React from 'react'

export default function GridSquare( {style, id, value, click }) {
  return (
    <div className={style} id={id} onClick={click}>{value}</div>
  )
}
