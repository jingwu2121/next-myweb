import React from 'react'
import Card from '../components/Card'
import envelope from '../images/envelope_closed-0.png'

const contact = () => {
  return (
    <>
      <div className="mx-5 md:mx-20">
        <Card title='Contact' logo={envelope}>
            
          <div className="p-4 grid gap-2">
          <li>Email: jing.wu@eng.ox.ac.uk</li>
          </div>
            
        </Card>
      </div>
    </>
  )
}

export default contact