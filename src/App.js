import { Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import MapPage from './pages/map/Map';
import Table from './pages/map/table/Table';

import routes from "./routes";

import './App.css';

function App() {
    return (
        <div className="App">
            <Sidebar/>
            <Routes>
                <Route exact path={ routes.mapPage } element={ <MapPage /> }/>
                <Route exact path={ routes.dataPage } element={ <Table /> }/>
            </Routes>     
        </div>
    );
}

export default App;
