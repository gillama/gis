import { useEffect, useState } from 'react';

import './Table.css';

const Table = ({ data, maxItemsPerPage }) => {
    const MAX_PAGINATION_ITEMS = 5;

    const [totalPagesCount, setTotalPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // round up total pages count
        setTotalPagesCount(Math.ceil(data.length / maxItemsPerPage));
    }, [data, maxItemsPerPage]);

    const setPage = (e, page) => {
        // remove focus from the following buttons: <<, < and >, >>
        e.currentTarget.blur();
        if (page === 0) {
            setCurrentPage(1);
        } else if (page > totalPagesCount) {
            setCurrentPage(totalPagesCount);
        } else {
            setCurrentPage(page);
        }
    };

    const getPaginationItems = () => {
        if (currentPage < MAX_PAGINATION_ITEMS / 2) {
            return Array.from(Array(MAX_PAGINATION_ITEMS).keys()).map(i => i + 1);
        }
        if (currentPage > (totalPagesCount - MAX_PAGINATION_ITEMS / 2)) {
            return Array.from(Array(MAX_PAGINATION_ITEMS).keys()).map(i => totalPagesCount - i).reverse();
        }
        return [
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2
        ];
    };

    return (
        <div className='table-container'>
            <table className='table'>
                <thead className='header'>
                    <tr>
                        <th scope='col' className='col-md-1'>#</th>
                        <th scope='col' className='col-md-4'>Naziv objekta</th>
                        <th scope='col' className='col-md-1'>PS Broj</th>
                        <th scope='col' className='col-md-1'>E Broj</th>
                        <th scope='col' className='col-md-2'>Tip objekta</th>
                        <th scope='col' className='col-md-3'>Lučka kapetanija</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                            .slice((currentPage - 1) * maxItemsPerPage, currentPage * maxItemsPerPage)
                            .map((object, idx) => (
                            <tr key={ idx }>
                                <th className='col-md-1' scope='row'>{ object.idx }</th>
                                <td className='col-md-4'>{ object.name }</td>
                                <td className='col-md-1'>{ object.psNumber }</td>
                                <td className='col-md-1'>{ object.eNumber }</td>
                                <td className='col-md-2'>{ object.type }</td>
                                <td className='col-md-3'>{ object.harbourOffice }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <nav className='mx-auto' style={{ width: 'fit-content' }}>
                <ul className='pagination'>
                    {/* << and < buttons */}
                    <li className='page-item'>
                        <button
                            className='page-link shadow-none'
                            aria-label='First'
                            onClick={ (e) => setPage(e, 1) }
                        >
                            <span aria-hidden='true'>&laquo;</span>
                        </button>
                    </li>
                    <li className='page-item'>
                        <button
                            className='page-link shadow-none'
                            aria-label='Previous'
                            onClick={ (e) => setPage(e, currentPage - 1) }
                        >
                            <span aria-hidden='true'>&lsaquo;</span>
                        </button>
                    </li>

                    {
                        totalPagesCount > MAX_PAGINATION_ITEMS
                        ?
                        <li className='page-item'>
                            <button
                                className='page-link shadow-none'
                                onClick={ () => setCurrentPage(currentPage) }>
                                ...
                            </button>
                        </li>
                        :
                        null
                    }
                    {
                        getPaginationItems().map((value) => (
                            <li className='page-item' key={ value }>
                                <button
                                    className={ 'page-link shadow-none ' + (currentPage === value ? 'active' : '') }
                                    onClick={ () => setCurrentPage(value) }>
                                    { value }
                                </button>
                            </li>
                        ))
                    }
                    {
                        totalPagesCount > MAX_PAGINATION_ITEMS
                        ?
                        <li className='page-item'>
                            <button
                                className='page-link shadow-none'
                                onClick={ () => setCurrentPage(currentPage) }>
                                ...
                            </button>
                        </li>
                        :
                        null
                    }

                    {/* > and >> buttons */}
                    <li className='page-item'>
                        <button
                            className='page-link shadow-none'
                            aria-label='Next'
                            onClick={ (e) => setPage(e, currentPage + 1) }
                        >
                            <span aria-hidden='true'>&rsaquo;</span>
                        </button>
                    </li>
                    <li className='page-item'>
                        <button
                            className='page-link shadow-none'
                            aria-label='Last'
                            onClick={ (e) => setPage(e, totalPagesCount) }
                        >
                            <span aria-hidden='true'>&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Table;