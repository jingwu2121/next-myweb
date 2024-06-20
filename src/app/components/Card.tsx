import React from 'react'
import Image from 'next/image'
import styles from '../styles/card.module.css'
import about from '../images/user_calendar-0.png'

const Card = ({children, logo, title}:any) => {
  return (
    <div className={`${styles.card} my-10 mx-4`}>
        <div className={styles.card_header}>
            <h4 className="my-0 text-xl font-weight-normal flex gap-2 items-center"> <Image src={logo} alt={title} /> {title}</h4>
        </div>
        <div className="p-4">
            { children }
        </div>
    </div>
  )
}

export default Card