import mapboxgl from 'mapbox-gl'
import { useCallback, useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibXJ3aWx2IiwiYSI6ImNsZHc5bmNvdzA1OGczcHFmb3pxMmphemQifQ._Xg8PGF33M-DbfCb0VpT6g';


export const useMapbox = (startingPoint) => {
//ref al div del mapa
    const mapDiv = useRef();
    const setRef = useCallback((node)=>{
        mapDiv.current = node
    },[])

    const mapa = useRef();

    const [coords, setCoords] = useState(startingPoint)


    useEffect(() => {
        const startmapa = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: startingPoint.zoom,
            center: [startingPoint.lng, startingPoint.lat]
        });

        mapa.current = startmapa;

    }, [startingPoint])

    useEffect(() => {
        mapa.current?.on('move', () => {
            const { lng, lat } = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2),
            })
        })

        return mapa.current?.off('move')
    }, [])

    return {
        coords,
        setRef
    }
}
