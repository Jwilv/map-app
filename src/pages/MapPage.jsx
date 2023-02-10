import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext';
import { useMapbox } from '../hooks/useMapbox';

const startingPoint = {
    lng: 5,
    lat:34,
    zoom:10,
}

export const MapPage = () => {

    const { socket } = useContext( SocketContext );

    const {coords, setRef, newMarker$, moveMarker$, addMarker} = useMapbox(startingPoint);

    useEffect(() => {
        socket.on('markers-active', (marker)=>{
            for(const key of Object.keys(marker)){
                addMarker(marker[key], key);
            }
        })
    }, [socket,addMarker])
    

    useEffect(()=>{
        newMarker$.subscribe( marker =>{
            socket.emit('new-marker',marker)
        })
    },[newMarker$,socket])

    useEffect(()=>{
        moveMarker$.subscribe( (marker) =>{
            socket.emit('update-marker', marker)
        })
    },[moveMarker$, socket])

useEffect(() => {
    socket.on('new-marker',(marker)=>{
        addMarker(marker, marker.id)
    });
}, [socket,addMarker])


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
