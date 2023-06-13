import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import classes from './Sidebar.module.css'


const Siderbar = () => {

    const [open, setopen] = useState(false);
    const toggleOpen = () => {
        setopen(!open);
    }

    return (
        <div className={open ? classes.sidebarOpen : classes.sidebarClosed}>
            <div className={classes.siderbar}>
                <button className={classes.btnMenu} onClick={toggleOpen}>
                    {open ? <i className="bi bi-x"></i> :  <i className="bi bi-list"></i>}
                </button>
            </div>
            <div className={classes.sidebarDisplay}>
                { open ? 
                    <div className={classes.sidebarOpenDisplay}>
                        <p>IZBORNIK</p>
                        <button><i className="bi bi-map"></i>KARTA</button>
                        <button><i className="bi bi-table"></i>PODACI</button>
                    </div>
                    :
                    <div className={classes.sidebarClosedDisplay}>
                        <button><i className="bi bi-map"></i></button>
                        <button><i className="bi bi-table"></i></button>
                    </div>
                    }     
            </div>
            <div className={classes.sidebarLayers}>
                {open ? 
                    <div className={classes.sidebarOpenLayers}>
                        <p>SLOJEVI</p>
                        <button><i className="bi bi-house"></i> OBJEKTI</button>
                    </div>
                : 
                <div className={classes.sidebarClosedLayers}>
                    <button><i className="bi bi-house"></i></button>
                </div>
            }
            </div>
        </div>
    )

};


export default Siderbar;