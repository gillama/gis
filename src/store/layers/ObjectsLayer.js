import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import { Cluster } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

const objectsLayer = new VectorLayer({
    updateWhileAnimating: true,
    source: new Cluster({
        distance: 40,
        minDistance: 0,
        source: new VectorSource({
            url: 'https://plovput.li-st.net/getObjekti/',
            format: new GeoJSON({ featureProjection: 'EPSG:3857' })
        })
    }),
    style: new Style({
        image: new Icon({
            scale: 0.05,
            crossOrigin: 'anonymous',
            src: 'images/object.svg',
            anchor: [0.5, 1]
        })
    })
});

export default objectsLayer;
