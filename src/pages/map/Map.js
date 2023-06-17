import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import { Map as OLMap, View } from 'ol';
import { fromLonLat, transformExtent } from 'ol/proj';
import { click } from 'ol/events/condition';
import Zoom from 'ol/control/Zoom';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import objectsLayer from '../../store/layers/ObjectsLayer';

import './Map.css';

const Map = ({ layers }) => {
    /* eslint-disable no-unused-vars */
    const [map, setMap] = useState();
    /* eslint-enable no-unused-vars */
    const [additionalLayers, setAdditionalLayers] = useState([objectsLayer]);
    const [selectedGeoObject, setSelectedGeoObject] = useState({
        name: '',
        psNumber: '',
        eNumber: '',
        type: '',
        harbourOffice: '',
    });

    const mapElement = useRef();
    const modal = useRef();

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

        const selectObject = new Select({
            condition: click,
            style: null // no style changes should be made to marker
        });

        selectObject.on('select', (e) => {
            if (e.selected.length == 0 || e.selected[0].values_.features.length == 0) {
                return;
            }

            setSelectedGeoObject({
                name: e.selected[0].values_.features[0].values_.naziv_objekta,
                psNumber: e.selected[0].values_.features[0].values_.ps_br,
                eNumber: e.selected[0].values_.features[0].values_.e_br,
                type: e.selected[0].values_.features[0].values_.tip_objekta,
                harbourOffice: e.selected[0].values_.features[0].values_.lucka_kapetanija,
            });
            const bsModal = new Modal(modal.current)
            bsModal.show()
        });

        initialMap.addInteraction(selectObject);

        setMap(initialMap);
    }, [additionalLayers]);

    useEffect(() => {
        const visibleLayers = layers.filter(l => l.visible).map(l => l.layer);
        setAdditionalLayers(visibleLayers);
    }, [layers]);

    const hideModal = () => {
        const bsModal = Modal.getInstance(modal.current)
        bsModal.hide()
    }

    return (
        <div className='map'>
            <div ref={ mapElement } style={{ position:'relative', overflow:'hidden', width: '100%', height: '100%'}}></div>

            <div ref={ modal } className='modal fade'>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Info</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={ hideModal }>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <table className='table table-borderless'>
                                <tbody>
                                    <tr>
                                        <td className='col-md-3'>Naziv objekta:</td>
                                        <td className='col-md-9'>{ selectedGeoObject.name }</td>
                                    </tr>
                                    <tr>
                                        <td className='col-md-3'>PS broj:</td>
                                        <td className='col-md-9'>{ selectedGeoObject.psNumber }</td>
                                    </tr>
                                    <tr>
                                        <td className='col-md-3'>E broj:</td>
                                        <td className='col-md-9'>{ selectedGeoObject.eNumber }</td>
                                    </tr>
                                    <tr>
                                        <td className='col-md-3'>Tip objekta:</td>
                                        <td className='col-md-9'>{ selectedGeoObject.type }</td>
                                    </tr>
                                    <tr>
                                        <td className='col-md-3'>Lučka kapetanija:</td>
                                        <td className='col-md-9'>{ selectedGeoObject.harbourOffice }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={ hideModal }>Zatvori</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;