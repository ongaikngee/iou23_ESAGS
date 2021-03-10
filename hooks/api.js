import axios from 'axios';
import { useState } from 'react';

export function useGeoCode(){

	const [loading, setLoading] = useState(false);
	const [latitude, setlatitude] = useState(1.275439);
	const [longitude, setLongitude] = useState(103.840013);

	const getGeoCode = async(address)=>{

		// const URL = 'http://api.positionstack.com/v1/forward';
		// const PARAM_KEY = '';
		// const PARAM_QUERY = address + ' Singapore';
		// const PARAM_OUTPUT = 'json';
		// const PARAM_LIMIT = '1';
		try {
			setLoading(true)
		// 	const response = await axios.get(URL, {
		// 		params: {
		// 			access_key: PARAM_KEY,
		// 			query: PARAM_QUERY,
		// 			limit: PARAM_LIMIT,
		// 			output: PARAM_OUTPUT
		// 		}
		// 	});

		// 	setlatitude(response.data.data[0].latitude);
		// 	setLongitude(response.data.data[0].longitude);

			// Dummy Data
			await forfun();
			setlatitude(1.275439);
			setLongitude(103.840013);
			
			setLoading(false);

		} catch (error) {
			console.log(error);
		}
	}


	//to be deleted :: for the await function to work if dummy data is passed. 
	const forfun = () =>{
		console.log("for fun function");
	}


	return [loading, latitude, longitude, getGeoCode];
};