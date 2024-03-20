import Link from 'next/link';
import React, { useState } from 'react';
import { SideBar } from './SideBar';
import styles from '../styles/List.module.css';
import { Paginator } from './Paginator';
export const List = ({ postData }) => {

  //set status for the sidebar to know which article was selected.
  const [selectedArticle, setSelectedArticle] = useState(0);

  //paginator
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const max = postData.length / perPage;


  return (
    <div>     
    {/* print list */}
      {postData
      .slice ( (currentPage - 1) * perPage, currentPage * perPage)
      .map(({id, user, title}) => ( 
      <div className='news_content' key={id}>

        <article className={styles.articles}>
          <button onClick={()=> setSelectedArticle(id)}>
          {/* <Link href={`/news/${title}`}> */}
            <h2 className={styles.post_title}>{title}</h2>
          {/* </Link> */}
          </button>
          <span className={styles.post_author}>by {user.name}</span>
        </article>

        {/*display sideBar for the selected article only*/}
        {selectedArticle === id && (
          <SideBar
          />)}
        </div>

      ))}
      
      {/* Paginator */}
        <Paginator 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        max={max}/>
    </div>
  );
};
