export const GoogleMapUtils = () => {

    const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    const scripts = document.getElementsByTagName('script');

    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf(mapsURL) === 0) {
            return scripts[i];
        }
    }

    const googleMapScripts = document.createElement('script');
    googleMapScripts.src = mapsURL;
    googleMapScripts.async = true;
    googleMapScripts.defer = true;
    window.document.body.appendChild(googleMapScripts);

    return googleMapScripts;
}