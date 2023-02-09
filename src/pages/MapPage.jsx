import React, { useEffect } from 'react'
import { useMapbox } from '../hooks/useMapbox';

const startingPoint = {
    lng: 5,
    lat:34,
    zoom:10,
}

export const MapPage = () => {

    const {coords, setRef, newMarker$, moveMarker$} = useMapbox(startingPoint);

    useEffect(()=>{
        newMarker$.subscribe( marcador =>{
            console.log(marcador);
        })
    },[newMarker$])

    useEffect(()=>{
        moveMarker$.subscribe( data => console.log(data))
    },[moveMarker$])

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
