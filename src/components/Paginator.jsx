import React from 'react'
import styles from '../styles/Paginator.module.css'


export const Paginator = ({currentPage, setCurrentPage, max}) => {
  //paginator functions for next and prev buttons
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className='flex justify-between'>
      <button
      className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 shadow'
      onClick={handlePrevBtn}
      disabled={ currentPage === 1 || currentPage < 1}
      >Prev</button>
      <span>{currentPage}</span>
      <button 
      className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 shadow'
      onClick={handleNextBtn}
      disabled={ currentPage === max || currentPage > max}
      >Next</button>
    </div>
  )
}
