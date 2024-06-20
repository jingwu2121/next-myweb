import React from 'react'
import matter from 'gray-matter';
import { marked } from 'marked'
import markedKatex from "marked-katex-extension";
import fs from 'fs';
import path from 'path';
import { getPostData } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import world from '../../images/world-0.png'
import note from '../../images/note-0.png'

import Card from '@/app/components/Card';
import button_styles from "../../styles/button.module.css"

export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), 'src/posts');
    const fileNames = fs.readdirSync(postsDirectory);
    
    return fileNames.map((fileName) => ({
      id: fileName.replace(/\.md$/, ''),
    }));
}
  
export default async function Post({ params }:any) {
    const postData = await getPostData(params.id);
    // console.log(marked(postData.content))

    const options = {
      throwOnError: false
    };
    marked.use(markedKatex(options));


    return (
        <div className="mx-5 md:mx-20">
          <Card title={postData.title} logo={note}>
            <div className="items-center justify-between mb-5 md:flex">
              <button>
                <Link href="/blog" className={`${button_styles.btn} flex gap-2 items-center`}>
                    <Image src={world} alt="Twitter" /> Go Back
                </Link>
              </button>
              <div className="">Last Update: {postData.date}</div>
            </div>
            
            <div className='posts px-4 md:px-10' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </Card>
          
        </div>
    );
}