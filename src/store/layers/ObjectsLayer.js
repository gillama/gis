import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import { Cluster } from 'ol/source';
import VectorSource from 'ol/source/Vector';

const objectsLayer = new VectorLayer({
    updateWhileAnimating: true,
    source: new Cluster({
        distance: 20,
        minDistance: 0,
        source: new VectorSource({
            url: 'https://plovput.li-st.net/getObjekti/',
            format: new GeoJSON({ featureProjection: 'EPSG:3857' })
        })
    })
});

export default objectsLayer;
