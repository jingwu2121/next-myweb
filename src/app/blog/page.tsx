import React from 'react'
import Card from '../components/Card'
import tree from '../images/tree-0.png'
import fs from 'fs'
import path from 'path'
import matter from "gray-matter"
import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts';

const blog = () => {
  const allPostsData = getSortedPostsData();

  return (
    <div className="mx-5 md:mx-20">
      <Card title='Blog' logo={tree}>
          <ul className="p-4">
            {allPostsData.map(({ id, title, date }: any) => (
              <li key={id} >
                <div className="flex md:justify-between">
                  <Link className='text-blue-600 hover:text-purple-600' href={`/blog/${id}`}>{title}</Link>
                  <div className="hidden md:inline">{date}</div>
                </div>
              </li>
            ))}
          </ul>
            
      </Card>

    </div>
  );
}


export default blog