import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkParse from 'remark-parse';
import math from 'remark-math';
import htmlKatex from 'remark-html-katex';
import unified from 'unified';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath);
    const matterResult = matter(fileContents);
    
    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData //.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id:any) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult  = matter(fileContents);
    const processedContent = await unified()
    .use(remarkParse)
    .use(math)
    .use(htmlKatex)
    .use(html)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    return {
      id,
      contentHtml,
      ...matterResult.data.title,
      ...matterResult.data.date,
    };
}