import React from "react";

function Pagination({size, total, paginate, current}) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(total / size); i++) {
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className="pagination d-flex justify-content-center">
                {current === 1 ? null :
                    <li className='page-item'>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a onClick={() => paginate(current - 1)} href="#" className="page-link">
                            &laquo;
                        </a>
                    </li>}
                {pageNumber.map(number => (
                    <li key={number} className="page-item">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a onClick={() => paginate(number)} href="#"
                           className={current === number ? 'active page-link' : 'page-link'}>
                            {number}
                        </a>
                    </li>
                ))}
                {current < (total / size) ?
                    <li className='page-item'>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a onClick={() => paginate(current + 1)} href="#" className="page-link">
                            &raquo;
                        </a>
                    </li> : null}
            </ul>
        </nav>
    );
}

export default Pagination;