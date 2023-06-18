import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Map from './pages/map/Map';
import Table from './pages/table/Table';
import Sidebar from './components/sidebar/Sidebar';

import routes from './routes';
import objectsLayer from './store/layers/ObjectsLayer';
import getGeoData from './services/GeoData';

import './App.css';

function App() {
    const [geoData, setGeoData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setGeoData(await getGeoData())
        };
        fetchData();
    }, []);

    const [layers, setLayers] = useState([
        {
            title: 'OBJEKTI',
            icon: 'bi-house',
            set: false,
            layer: objectsLayer
        },
        // add new layers here
    ]);

    const [options, setOptions] = useState([
        {
            title: 'CLUSTER',
            icon: 'bi-funnel',
            set: false
        },
        // add new options here
    ]);

    const toggleLayer = (idx) => {
        if (idx < 0 || idx >= layers.length) {
            return;
        }

        let layer = layers[idx];
        layer.set = !layer.set;

        setLayers([
            ...layers.slice(0, idx),
            layer,
            ...layers.slice(idx + 1)
        ]);
    };

    const toggleOption = (idx) => {
        if (idx < 0 || idx >= options.length) {
            return;
        }

        let option = options[idx];
        option.set = !option.set;

        setOptions([
            ...options.slice(0, idx),
            option,
            ...options.slice(idx + 1)
        ]);
    };

    return (
        <div className='app'>
            <Sidebar layers={ layers } options={ options } toggleLayer={ toggleLayer } toggleOption={ toggleOption }/>
            <Routes>
                <Route exact path={ routes.mapPage } element={ <Map layers={ layers } options={ options }/> }/>
                <Route exact path={ routes.dataPage } element={ <Table data={ geoData } maxItemsPerPage={ 20 }/> }/>
            </Routes>
        </div>
    );
}

export default App;
