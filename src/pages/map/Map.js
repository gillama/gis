import { useEffect, useRef, useState } from 'react';
import { Map as OLMap, View } from 'ol';
import { fromLonLat, transformExtent } from 'ol/proj';
import Zoom from 'ol/control/Zoom';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import './Map.css';

const Map = ({ layers }) => {
    /* eslint-disable no-unused-vars */
    const [map, setMap] = useState();
    /* eslint-enable no-unused-vars */
    const [additionalLayers, setAdditionalLayers] = useState([]);

    const mapElement = useRef();

    useEffect(() => {
        // limit view to Croatia only
        const extent = transformExtent(
            [12.755, 42.052, 19.556, 46.600],
            'EPSG:4326', 'EPSG:3857'
        );

        const initialMap = new OLMap({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM({})
                }),
                ...additionalLayers
            ],
            view: new View({
                zoom: 1,
                minZoom: 0,
                center: fromLonLat([16.353, 44.772]),
                extent: extent,
            }),
            controls: [
                new Zoom({
                    zoomInTipLabel: '',
                    zoomOutTipLabel: ''
                })
            ]
        });
        setMap(initialMap);
    }, [additionalLayers]);

    useEffect(() => {
        const visibleLayers = layers.filter(l => l.visible).map(l => l.layer);
        setAdditionalLayers(visibleLayers);
    }, [layers]);

    return (
        <div className='map'>
            <div ref={ mapElement } style={{ position:'relative', overflow:'hidden', width: '100%', height: '100%'}}></div>
        </div>
    );
}

export default Map;