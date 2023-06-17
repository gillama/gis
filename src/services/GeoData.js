import axios from "axios";

function GeoObject (
    idx,
    name,
    psNumber,
    eNumber,
    type,
    harbourOffice,
    longitude,
    latitude,
) {
    this.idx = idx;
    this.name = name;
    this.psNumber = psNumber;
    this.eNumber = eNumber;
    this.type = type;
    this.harbourOffice = harbourOffice;
    this.longitude = longitude;
    this.latitude = latitude;
};

export default async function getGeoData() {
    const data = await axios.get("https://plovput.li-st.net/getObjekti/")
        .then((response) => response.data);

    return data.features.map((feature, idx) => new GeoObject(
        idx + 1,
        feature.properties.naziv_objekta,
        feature.properties.ps_br,
        feature.properties.e_br,
        feature.properties.tip_objekta,
        feature.properties.lucka_kapetanija,
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
    ));
};
