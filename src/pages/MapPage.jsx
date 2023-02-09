import React from 'react'
import { useMapbox } from '../hooks/useMapbox';

const startingPoint = {
    lng: 5,
    lat:34,
    zoom:10,
}

export const MapPage = () => {

    const {coords, setRef} = useMapbox(startingPoint);

    return (
        <>
        <div className="info">
            lng : {coords.lng} lat : {coords.lat} zoom : {coords.zoom}
        </div>
            <div
                className="mapContainer"
                ref={setRef}
            />

        </>
    )
}
