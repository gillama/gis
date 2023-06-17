import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Map from './pages/map/Map';
import Sidebar from './components/sidebar/Sidebar';

import routes from './routes';
import objectsLayer from './store/layers/ObjectsLayer';

import './App.css';

function App() {
    const [layers, setLayers] = useState([
        {
            title: 'OBJEKTI',
            icon: 'bi-house',
            visible: false,
            layer: objectsLayer
        },
        // add new layers here
    ]);

    const toggleLayer = (idx) => {
        if (idx < 0 || idx >= layers.length) {
            return;
        }

        let layer = layers[idx];
        layer.visible = !layer.visible;

        setLayers([
            ...layers.slice(0, idx),
            layer,
            ...layers.slice(idx + 1)
        ]);
    };

    return (
        <div className='app'>
            <Sidebar layers={ layers } toggleLayer={ toggleLayer } />
            <Routes>
                <Route exact path={ routes.mapPage } element={ <Map layers={ layers }/> }/>
            </Routes>
        </div>
    );
}

export default App;
