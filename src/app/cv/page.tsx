import React from 'react'
import note from '../images/note-0.png'
import Card from '../components/Card'

const cv = () => {
  return (
    <div className="mx-5 md:mx-20">
      <Card title='CV' logo={note}>
          
        <div className="p-4 grid gap-2">
          <li>
              University of Oxford [Oxford] (10.2023 - Present)
              <p><i>DPhil in Engineering Science</i></p>
          </li>
          <li>Imperial College London [ICL] (10. 2021 - 10. 2022)
              <p><i>MSc. Applied Machine Learning</i></p>
          </li>
          <li>University of Electronic Science and Technology of China [UESTC] (09. 2017 - 06. 2021)
              <p><i>BEng. Electronic Information Engineering</i></p>
          </li>
        </div>
          
      </Card>
    </div>
  )
}

export default cv