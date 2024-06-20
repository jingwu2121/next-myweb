import React from 'react'
import style from '../styles/footer.module.css'

const Footer = () => {
  return (
    <div>
        <div className={`${style.taskbar} text-center text-xs text-xs md:text-sm`}>
            Copyright 2024 @ Wu Jing | All Rights Reserved | Theme from Alex B | Written in Next.js
        </div>
    </div>
  )
}

export default Footer