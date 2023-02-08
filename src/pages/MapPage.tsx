import { useEffect, useState } from "react";
import { GoogleMapUtils } from "../assets/utils/GoogleMapUtils";
import { MapInit } from "../components/map/MapInit";

const MapPage = () => {
    
    const [loadScripts, setLoadScripts] = useState(false);

    useEffect(() => {
        const googleMapScripts = GoogleMapUtils();
        googleMapScripts.addEventListener('load', function() {
            setLoadScripts(true);
        })
    }, [])

    return (
        <>
            {loadScripts && (
                <MapInit />
            )}
        </>
    );
};