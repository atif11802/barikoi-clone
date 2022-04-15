import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
	"pk.eyJ1IjoiYXRpZjExODAyIiwiYSI6ImNrcnN3NTNoYzAybWwydm9jcGlxamkyYmEifQ.hMfJBG5puaTo-Mwq4yimHg";

const ShowMap = ({ longitude, latitude, zoom, pinPoint }) => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	// const [lng, setLng] = useState(longitude);
	// const [lat, setLat] = useState(latitude);

	const { area, pType, address } = pinPoint;

	const geojson = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [longitude, latitude],
				},
				properties: {
					title: "",
					description: { address },
					pType,
				},
			},
		],
	};

	useEffect(() => {
		// if (map.current) return; // initialize map only once
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [longitude, latitude],
			zoom: zoom,
		});
		map.addControl(new mapboxgl.NavigationControl());
		map.addControl(
			new mapboxgl.FullscreenControl({
				container: document.querySelector("body"),
			})
		);

		for (const feature of geojson.features) {
			// create a HTML element for each feature
			const el = document.createElement("div");

			if (pType === "Education") {
				el.className = "marker__education";
			}
			el.className = "marker";

			// make a marker for each feature and add it to the map
			new mapboxgl.Marker(el)
				.setLngLat(feature.geometry.coordinates)
				.setPopup(
					new mapboxgl.Popup({ offset: 25 }) // add popups
						.setHTML(
							`<h3>${feature.properties.title}</h3><p>${feature.properties.description.address}</p>`
						)
				)
				.addTo(map);
		}
	}, [latitude, longitude, zoom]);

	return (
		<div>
			<div ref={mapContainer} className='map-container' />
		</div>
	);
};

export default ShowMap;
