import { useEffect, useState } from "react";
import "./App.css";
import ShowMap from "./components/Showmap";
import SideBar from "./components/SideBar";

function App() {
	const [longitude, setLongitude] = useState(0);
	const [latitude, setLatitude] = useState(0);
	const [zoom, setZoom] = useState(15);
	const [pinPoint, setPinPoint] = useState({});

	console.log(pinPoint);

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};
	function success(pos) {
		var crd = pos.coords;

		setLongitude(crd.longitude);

		setLatitude(crd.latitude);
	}

	function errors(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.permissions
				.query({ name: "geolocation" })
				.then(function (result) {
					if (result.state === "granted") {
						console.log(result.state);
						navigator.geolocation.getCurrentPosition(success);
						//If granted then you can directly call your function here
					} else if (result.state === "prompt") {
						console.log(result.state);
						navigator.geolocation.getCurrentPosition(success, errors, options);
					} else if (result.state === "denied") {
						//If denied then you have to show instructions to enable location
					}
					result.onchange = function () {
						console.log(result.state);
					};
				});
		} else {
			console.log("Sorry Not available!");
		}
	}, []);

	return (
		<div className='app'>
			<div className='app_sidebar'>
				<SideBar
					setLongitude={setLongitude}
					setLatitude={setLatitude}
					setZoom={setZoom}
					setPinPoint={setPinPoint}
				/>
			</div>
			<div className='app__map'>
				<ShowMap
					pinPoint={pinPoint}
					longitude={longitude}
					latitude={latitude}
					zoom={zoom}
				/>
			</div>
		</div>
	);
}

export default App;
