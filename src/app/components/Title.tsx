import React from 'react'

const Title = ({title, subtite}:any) => {
  return (
    <div>
        <h1 className="text-3xl text-center mt-10 md:text-5xl md:mt-20">{title}</h1>
        <h2 className="text-1xl text-center mt-5 md:text-xl">{subtite}</h2>
    </div>
  )
}

export default Title