import React from 'react'
import tree from '../images/tree-0.png'
import Card from '../components/Card'
import Image from 'next/image'
import search_computer from '../images/search_computer-0.png'
import styles from '../styles/button.module.css'

const misc = () => {
  return (
    <>
      <div className="mx-5 md:mx-20">
        <Card title='Misc' logo={tree}>
          <div className="p-4 grid gap-2">
            <li><a className='text-blue-600 hover:text-purple-600' href="https://www.oubac.com/" target="_blank">O.U.Ba.C.</a> Member! :3</li>
            <li>Piano Lover! (๑•̀ㅂ•́)و✧</li>
            <li>Procreate Lover! (I am a part-time artist as well!)</li>
            <li>Amateur music producer. I do J-Rock, funk, neo soul, soothe piano & summer vibe!</li>
            <li>Pre-professional badminton player</li>
          </div>
        </Card>

        <Card title='Resources' logo={search_computer}>
            <div className="p-4 grid gap-2">
                <li><a className='text-blue-600 hover:text-purple-600' href="https://numbda.cs.tsinghua.edu.cn/~yuwj/TH-CPL.pdf">THU-CPL</a></li>
                <li><a className='text-blue-600 hover:text-purple-600' href="https://www.ccf.org.cn/Academic_Evaluation/AI/">CCF</a></li>
            </div>
        </Card>
      </div>


      {/* <div className=' mx-auto overflow-auto'>
        <img src="//www.clustrmaps.com/map_v2.png?d=w5GKewlMS81Z30508D4q2IkFOZgvzpY2QjmU5MglUB4&cl=ffffff" />
      </div> */}
      {/* <a href="https://clustrmaps.com/site/1bzi7"  title="Visit tracker"></a> */}
    </>
  )
}

export default misc