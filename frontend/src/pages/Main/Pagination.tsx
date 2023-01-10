import React from 'react';

import {GrFormPrevious, GrFormNext} from 'react-icons/gr';

interface PaginationInterface {
    pages: number,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
}

const Pagination = ({pages, currentPage, setCurrentPage} : PaginationInterface) => {
  return (
    <div className='pagination'>

      <GrFormPrevious onClick={() => currentPage === 0 ? currentPage = currentPage : setCurrentPage(currentPage - 1)}/>
        
        {Array.from(Array(pages), (item, index) => {
            return <button 
            key={index}
            style={
                index === currentPage ? {backgroundColor: "#7e57c2", color: '#ede7f6'} : undefined
            }
            value={index} 
            onClick={e => setCurrentPage(Number(e.currentTarget.value))} >{index + 1}</button>
        })}

        <GrFormNext onClick={() => currentPage === pages -1 ? currentPage = currentPage : setCurrentPage(currentPage + 1)}/>
        
    </div>
  )
}

export default Pagination;