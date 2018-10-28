import React from 'react'

function PageHeader (props) {
  return (
    <div className="list-books-title">
      <h1>{props.header}</h1>
    </div>
  )
}

export default PageHeader