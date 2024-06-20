import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Card from './Card'
import Publication from './Publication'

import profile_img from '../images/rupert-cat.gif'
import note from '../images/note-0.png'
import about from '../images/user_calendar-0.png'
import user_computer from '../images/user_computer-0.png'
import users from '../images/users-1.png'
import directory_folder_options from '../images/directory_folder_options-5.png'
import button_styles from "../styles/button.module.css"

import derainnerf from '../project_imgs/derainnerf.jpg'
import gaussctrl from '../project_imgs/gaussctrl.gif'


const HomeCards = () => {
  return (
    <>
      <div className="grid grid-cols-1 mt-20 mx-5 md:grid-cols-2 md:mx-10">
          <div className='items-center mx-auto overflow-auto'>
              <Image src={profile_img} width={500} height={500} alt='profile image'></Image>
          </div>
          <Card logo={about} title="About Me" >
            Hey, welcome to my homepage. :D <br />
                        
            I am a 1st year DPhil student at <a className='text-blue-600 hover:text-purple-600' href="https://www.robots.ox.ac.uk/ActiveVision/" target="_blank">Active Vision Group</a>, University of Oxford, jointly supervised by Professor <a className='text-blue-600 hover:text-purple-600' href="https://www.robots.ox.ac.uk/~victor/" target="_blank">Victor Prisacariu</a> and Dr. <a className='text-blue-600 hover:text-purple-600' href="https://campar.in.tum.de/Main/IroLaina" target="_blank">Iro Laina</a>. I also work closely with <a className='text-blue-600 hover:text-purple-600' href="https://scholar.google.com/citations?user=XLlgbBoAAAAJ&hl=en" target="_blank">Xinghui Li</a>, Dr. <a className='text-blue-600 hover:text-purple-600' href="https://jwbian.net/" target="_blank">Jia-Wang Bian</a>.
            Before this, I interned at Westlake University, where I was mentored by Professor <a className='text-blue-600 hover:text-purple-600' href="https://ethliup.github.io/">Liu Peidong</a>. <br /> 
            I obtained my M.Sc. degree with <b>Distinction</b> from Imperial College London.
            Prior to that, I received my B.Eng. from the University of Electronic Science and Technology of China (UESTC).
            I was awarded the Outstanding Graduate Award of Sichuan Province. 
            <br />
            <br />
            <div className="flex">
                <button>
                  <Link href="https://twitter.com/jingwu23" className={`${button_styles.btn} flex gap-2 items-center`}>
                      <Image src={user_computer} alt="Twitter" /> Twitter
                  </Link>
                </button>
                <button>
                  <Link href="https://www.linkedin.com/in/jing-wu-068b7b1b4" className={`${button_styles.btn} flex items-center gap-2`}>
                      <Image src={users} alt="Twitter" /> Linkedin
                  </Link>
                </button>
                <button>
                  <Link href="https://github.com/jingwu2121" className={`${button_styles.btn} flex items-center gap-2`}>
                      <Image src={directory_folder_options} alt="Twitter" /> GitHub
                  </Link>
                </button>
            </div>
          </Card>
          
          <Card logo={note} title="Research Interest" >
            <ul className="m-4">
                <li>3D Editing</li>
                <li>Generative Models, 3D Gaussian Splatting</li>
                <li>3D Reconstruction, NeRF</li>
            </ul>
          </Card>
          
          <Card logo={note} title="News" >
            <ul className="m-4">
                <li>Starting my DPhil at Oxford! :3</li>
            </ul>
          </Card>
      </div>

      {/* Publication */} 
      <div className="mx-5 md:mx-10">
        <Card title='Research' logo={note}>
          <div className="divide-y divide-slate-700 grid gap-y-2">
            <Publication teaser={gaussctrl} paper_title='GaussCtrl: Multi-View Consistent Text-Driven 3D Gaussian Splatting Editing' web='https://gaussctrl.active.vision/'>
              <b>Jing Wu*</b>, Jia-Wang Bian*, Xinghui Li, Guangrun Wang, Ian Reid, Philip Torr, Victor Adrian Prisacariu  <br />
              <i>arXiv</i>, 2024 <br />
              [<a className='text-blue-600 hover:text-purple-600' href="https://arxiv.org/abs/2403.08733" target="_blank">Paper</a>][<a className='text-blue-600 hover:text-purple-600' href="https://gaussctrl.active.vision/" target="_blank">Web</a>]
          
              <br />
              <br />
              GaussCtrl is a text-driven method used to edit a 3D scene.
            </Publication>

            <Publication teaser={derainnerf} paper_title='DerainNeRF: 3D Scene Estimation with Adhesive Waterdrop Removal' web='https://arxiv.org/abs/2403.20013'>
              Yunhao Li, <b>Jing Wu</b>, Lingzhe Zhao, Peidong Liu <br />
              <i>ICRA</i>, 2024 <br />
              [<a className='text-blue-600 hover:text-purple-600' href="https://arxiv.org/abs/2403.20013" target="_blank">Paper</a>][<a className='text-blue-600 hover:text-purple-600' href="https://github.com/yunhaoli2020/DerainNeRF" target="_blank">Code</a>]
          
              <br />
              <br />
              DerainNeRF is a method used to reconstruct the clear 3D scene implicitly from multi-view images degraded by waterdrops.
            </Publication>

          </div>

        </Card>
      </div>
        
    </>
  )
}

export default HomeCards