import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import routes from '../../routes';

import './Sidebar.css';

const Sidebar = ({ layers, toggleLayer }) => {
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
            {
                opened
                ?
                <div className='menu'>
                    {
                        layers.map((layer, idx) =>
                            <div key={ idx }>
                                <p>{ layer.title }</p>
                                <button>
                                    <i className={ 'bi ' + layer.icon }></i> { layer.title }
                                    <div className='form-check form-switch'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            role='switch'
                                            checked={ layer.visible }
                                            onChange={ () => { toggleLayer(idx) } }>
                                        </input>
                                    </div>
                                </button>
                            </div>
                        )
                    }
                </div>
                :
                null
            }
        </div>
    );
};

export default Sidebar;