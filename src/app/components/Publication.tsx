import React from 'react'
import Image from 'next/image'
import publication_styles from "../styles/publication.module.css"

const Publication = ({children, teaser, paper_title, web}:any) => {
  return (
    <div className=" grid grid-cols-1 items-center md:grid-cols-3 md:gap-4">
        <div className=''>
            <Image className={`${publication_styles.profile_img} hidden md:flex`} src={teaser} alt="" />
        </div>
        <div className="col-span-2">
        <h5 className='text-lg'><a className='text-blue-600 hover:text-purple-600' href={web} target="_blank"> {paper_title} </a></h5>
        {children}
        </div>
    </div>
    
  )
}

export default Publication