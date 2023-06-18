import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import routes from '../../routes';

import './Sidebar.css';
import SidebarSection from './SidebarSection';

const Sidebar = ({ layers, options, toggleLayer, toggleOption }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [opened, setOpened] = useState(false);

    return (
        <div className={ 'sidebar ' + (opened ? 'opened' : 'closed') }>
            <button className='sidebar-toggle' onClick={ () => { setOpened(!opened) } }>
                {
                    opened
                    ?
                    <i className='bi bi-x'></i>
                    :
                    <i className='bi bi-list'></i>
                }
            </button>
            {
                opened
                ?
                <div className='menu'>
                    <p>IZBORNIK</p>
                    <button onClick={ () => { navigate(routes.mapPage) } } className={ location.pathname === routes.mapPage ? 'active' : '' }>
                        <i className='bi bi-map'></i>KARTA
                    </button>
                    <button onClick={ () => { navigate(routes.dataPage) } } className={ location.pathname === routes.dataPage ? 'active' : '' }>
                        <i className='bi bi-table'></i>PODACI
                    </button>
                </div>
                :
                <div className='menu'>
                    <button onClick={ () => { navigate(routes.mapPage) } } className={ location.pathname === routes.mapPage ? 'active' : '' }>
                        <i className='bi bi-map'></i>
                    </button>
                    <button onClick={ () => { navigate(routes.dataPage) } } className={ location.pathname === routes.dataPage ? 'active' : '' }>
                        <i className='bi bi-table'></i>
                    </button>
                </div>
            }
            { opened ? <SidebarSection title='SLOJEVI' items={ layers } toggle={ toggleLayer } /> : null }
            { opened ? <SidebarSection title='POSTAVKE' items={ options } toggle={ toggleOption } /> : null }
        </div>
    );
};

export default Sidebar;