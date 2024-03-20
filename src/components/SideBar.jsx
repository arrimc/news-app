import Link from 'next/link';
import React from 'react'

export const SideBar = ({
  postData, 
  selectedArticle,
}) => {

  const selected = postData.find((post) => post.id === selectedArticle);

  return (
    <div className='container'>
      <Link href={`/news/${selected.title}`}>
        <h2>{selected.title}</h2>
      </Link>
      <h3>by {selected.user.name}</h3>
      <p>{selected.body}</p>
    </div>
  )
}
