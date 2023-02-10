import mapboxgl from 'mapbox-gl'
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { Subject } from 'rxjs'

mapboxgl.accessToken = 'pk.eyJ1IjoibXJ3aWx2IiwiYSI6ImNsZHc5bmNvdzA1OGczcHFmb3pxMmphemQifQ._Xg8PGF33M-DbfCb0VpT6g';


export const useMapbox = (startingPoint) => {
    //ref al div del mapa
    const mapDiv = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node
    }, [])

    const mapa = useRef();

    const [coords, setCoords] = useState(startingPoint)

    const marcadores = useRef({});

    //observables de rxjs
    const moveMarker = useRef( new Subject());

    const newMarker = useRef( new Subject());

    //agregar marcadores 
    const addMarker = useCallback((event, id) => {
        const { lng, lat } = event.lngLat || event
        const marker = new mapboxgl.Marker();
        marker.id = id ?? uuidv4();

        marker
            .setLngLat([lng, lat])
            .addTo(mapa.current)
            .setDraggable(true)

        marcadores.current[marker.id] = marker;

        //Subject del newMarker
        if(!id){
            newMarker.current.next({
                id : marker.id,
                lng,lat
            })
        }

        //update position
        const updatePositionMaker = ({id, lng, lat})=>{
            marcadores.current[id].setLngLat([lng, lat])
        }

        //drag

        marker.on('drag', ({ target }) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();
            moveMarker.current.next({
                id,
                lng,
                lat,
            })
        })

    }, [])

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

        // return mapa.current?.off('move')
    }, [])

    useEffect(() => {
        mapa.current?.on('click', addMarker)
        // return (mapa.current?.off('click'))
    }, [])

    return {
        addMarker,
        coords,
        moveMarker$: moveMarker.current,
        newMarker$ : newMarker.current,
        setRef,
        updatePositionMaker,
    }
}
