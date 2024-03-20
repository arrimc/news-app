import Link from 'next/link';
import React from 'react';

export const List = ({ postData }) => {
  return (
    <>     
      {postData.map(({id, user, title}) => ( 
        <article key={id}>
          <Link href={`/news/${title}`}>
            <h2 className='post-title'>{title}</h2>
          </Link>
          <span className='post-author'>{user.name}</span>
        </article>
      ))}
    </>
  );
};
