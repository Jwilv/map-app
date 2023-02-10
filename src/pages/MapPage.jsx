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
    }, [socket])
    

    useEffect(()=>{
        newMarker$.subscribe( marcador =>{
            socket.emit('new-marker',marcador)
        })
    },[newMarker$,socket])

    useEffect(()=>{
        moveMarker$.subscribe( data => console.log(data))
    },[moveMarker$])

useEffect(() => {
    socket.on('new-marker',(marker)=>{

    });
}, [socket])


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
