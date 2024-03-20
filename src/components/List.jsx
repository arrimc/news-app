import Link from 'next/link';
import React, { useState } from 'react';
import { SideBar } from './SideBar';
import styles from '../styles/List.module.css';
import { Paginator } from './Paginator';
export const List = ({ postData }) => {

  //set status for the sidebar to know which article was selected.
  const [selectedArticle, setSelectedArticle] = useState(0);
  
  //sideBar
  const [showSideBar, setShowSideBar] = useState(false);

  const handleShowSideBar = () => {
    setShowSideBar(true);
  }

  //paginator
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const max = postData.length / perPage;

  return (
    <>     
    {/* print list */}
      <div className='grid mt-8' style={{gridTemplateColumns: '2fr 1fr', gap: '9px' }}>
        <div className='item_1' >
          {postData
          .slice ( (currentPage - 1) * perPage, currentPage * perPage)
          .map(({id, user, title}) => ( 
            <div className='news_content' key={id}>

              <article className={styles.articles}>
                <button onClick={() => {
                  setSelectedArticle(id);
                  handleShowSideBar();
                }}>
                {/* <Link href={`/news/${title}`}> */}
                  <h2 className={styles.post_title}>{title}</h2>
                {/* </Link> */}
                </button>
                <span className={styles.post_author}>by {user.name}</span>
              </article>

            </div>
          ))}
        </div>
        {/*display sideBar for the selected article only*/}
        <div className='item_2'>
          {showSideBar && <SideBar postData={postData} selectedArticle={selectedArticle}/>}
        </div>
      </div>
      {/* Paginator */}
        <Paginator 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        max={max}/>
    </>
  );
};
