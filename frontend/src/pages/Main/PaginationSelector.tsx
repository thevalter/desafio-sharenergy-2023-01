import React from 'react';

interface PaginationSelectorInterface{
    usersPerPage: number,
    setUsersPerPage: React.Dispatch<React.SetStateAction<number>>,
}

const PaginationSelector = ({ usersPerPage, setUsersPerPage } : PaginationSelectorInterface) => {
    return (
        <div className='select-field'>
            Resultados por página: &nbsp;
            <select value={usersPerPage} onChange={e => setUsersPerPage(Number(e.target.value))}>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
                <option value="12">12</option>
            </select>
        </div>
    )
}

export default PaginationSelector;