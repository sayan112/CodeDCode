import React from 'react'

const Loader = (props) => {
  return (
    <div>
        <img src={`${props.type}.gif`} className="rounded-full -mx-2" alt="Loading..." />
    </div>
  )
}

Loader.defaultProps = {
    type:"output"
  }

export default Loader