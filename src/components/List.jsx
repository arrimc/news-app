import React from 'react';

export const List = ({ postData }) => {
  return (
    <>               
      {postData.map(({id, user, title}) => ( 
        <div key={id}>
          <h2 className='post-title'>{title}</h2>
          <span className='post-author'>{user.name}</span>
        </div>
      ))}
    </>
  );
};
