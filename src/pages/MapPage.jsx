import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibXJ3aWx2IiwiYSI6ImNsZHc5bmNvdzA1OGczcHFmb3pxMmphemQifQ._Xg8PGF33M-DbfCb0VpT6g';

export const MapPage = () => {

    const startingPoint = {
        lng: 5,
        lat:34,
        zoom:10,
    }

    const mapDiv = useRef();

    const [ mapa, setMapa] = useState();

    const [coords, setCoords ] = useState(startingPoint)


    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom:startingPoint.zoom,
            center:[startingPoint.lng,startingPoint.lat]
        });

        setMapa(map);

    }, [])


    return (
        <>
        <div className="info">
            lng : {coords.lng} lat : {coords.lat} zoom : {coords.zoom}
        </div>
            <div
                className="mapContainer"
                ref={mapDiv}
            />

        </>
    )
}
