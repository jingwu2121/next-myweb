"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import open_folder from '../images/directory_open_cool-5.png'
import close_folder from '../images/directory_closed_cool-5.png'
import windows from '../images/windows-0.png'
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const getMenuClasses = () => {
        let menuClasses = [];
        if (isOpen) {
            menuClasses = [
                'flex',
                'absolute',
                'top-[60px]',
                'bg-[silver]',
                'w-full',
                'left-0',
                'flex-col',
                'pt-[10px]',
                'pb-[10px]',
                'pl-[20px]',
                'gap-3',
            ]
        } else {
            menuClasses = ['hidden', 'md:flex']
        }

        return menuClasses.join(" ")
    }

    return (
        <nav className='bg-[silver] p-4 md:p-0'>
            <div className="container mx-auto flex justify-betweenitems-center sm:p-6 md:p-2 md:flex md:justify-between  md:items-center">
                <div className="container flex mx-auto items-center gap-5">
                    <Link className="gap-2 flex items-center font-bold hover:underline" href="/"><Image src={windows} alt="logo"></Image> Wu Jing </Link>

                    <div className={getMenuClasses()}>
                        <Link className='mx-2 hover:underline' href="/" >
                            Home
                        </Link>
                        <Link className='mx-2 hover:underline' href="/cv" >
                            CV
                        </Link>
                        <Link className='mx-2 hover:underline' href="/misc" >
                            Misc
                        </Link>
                        <Link className='mx-2 hover:underline' href="/contact" >
                            Contact
                        </Link>
                    </div>
                </div>
                
                <div className="md:hidden flex items-center">
                    <button onClick={() => {
                        setIsOpen(!isOpen);
                    }}>
                        {isOpen ? <Image src={open_folder} alt="open" /> : <Image src={close_folder} alt="close"/>}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar