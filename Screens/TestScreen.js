import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const QUERY = 'https://data.gov.sg/api/action/datastore_search';
const RESOURCE_ID = 'ede26d32-01af-4228-b1ed-f05c45a1d8ee';
const LIMIT = 500;

export default () => {
	const [ data, setData ] = useState([]);
	const [ entries, setEntries ] = useState(0);

	const getDATA = async () => {
		console.log('You are starting AXIOs!');
		console.log('##############################');

		setData([]);
		try {
			const response = await axios.get(QUERY, {
				params: {
					resource_id: RESOURCE_ID,
					limit: LIMIT
				}
			});

			let obj = response.data.result.records;
			let tempdata = [];

			// filter the data here
			obj = obj.filter((item) => item.mainlevel_code == 'PRIMARY');
			// obj = obj.filter((item) => item.zone_code == 'SOUTH');
			// obj = obj.filter((item) => item.dgp_code == 'CENTRAL');
			obj = obj.filter((item) => item.gifted_ind == 'Yes');
			obj.map((item, index) => {
				tempdata.push({
					id: item._id,
					address: item.address,
					postal_code: item.postal_code,
					email_address: item.email_address,
					url_address: item.url_address,
					dgp_code: item.dgp_code,
					school_name: item.school_name,
					autonomous_ind: item.autonomous_ind,
					gifted_ind: item.gifted_ind,
					ip_ind: item.ip_ind,
					sap_ind: item.sap_ind,
					zone_code: item.zone_code,
					dgp_code: item.dgp_code,
					mainlevel_code: item.mainlevel_code,
					nature_code: item.nature_code,
					session_code: item.session_code,
					type_code: item.type_code
				});
			});
			setData(tempdata);
			console.log(data.length + ' schools founded!');
			setEntries(data.length);
		} catch (error) {
			console.log(error);
		}
	};

	const getLatLong = () => {

		data.forEach(async (item, index) => {
			// A: Togger between this with the letter
			const API = 'http://venueChope.pythonanywhere.com';
			const API_ADD = '/venue/';

			// A: Togger between this with the letter. Find the missing key.
			// const URL = 'http://api.positionstack.com/v1/forward';
			// const PARAM_KEY = '';
			// const PARAM_QUERY = item.address + ' Singapore(' + item.postal_code + ')';
			// const PARAM_OUTPUT = 'json';
			// const PARAM_LIMIT = '1';

			try {
				// B: Togger between this with the letter
				const response = await axios.get(API + API_ADD + 1);

				// B: Togger between this with the letter
				// const response = await axios.get(URL, {
				// 	params: {
				// 		access_key: PARAM_KEY,
				// 		query: PARAM_QUERY,
				// 		limit: PARAM_LIMIT,
				// 		output: PARAM_OUTPUT
				// 	}
				// });

				console.log('processing: ' + index);

				// C: Togger between this with the letter
				item.latitude = response.data.name;
				item.longitude = response.data.name;

				// C: Togger between this with the letter
				// item.latitude = response.data.data[0].latitude;
				// item.longitude = response.data.data[0].longitude;
			} catch (error) {
				console.log(error);
			}
		});
	};

	useEffect(() => {
		getDATA();
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={styles.title}>Instructions:</Text>
			<Text>
				This screen enable you to append LatLong into the data. You can filter the data in getDATA function.{' '}
			</Text>
			<Text>Step 1: The data will be loaded automatically. </Text>
			<Text style={styles.title}>{entries} schools founded.</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					getDATA();
				}}
			>
				<Text>Get data</Text>
			</TouchableOpacity>
			<Text>Step 2: Click on the 2nd button to fetch API and append data into array. </Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					getLatLong();
				}}
			>
				<Text>Get LatLong</Text>
			</TouchableOpacity>

			<Text>Step 3: Click on the 3rd button to console.log data</Text>
			<View style={{flexDirection:'row'}}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						console.log('*********************');
						console.log(JSON.stringify(data));
					}}
				>
					<Text>see JSON data</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						console.log('*********************');
						console.log(data);
					}}
				>
					<Text>see raw data</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		padding: 20,
		margin: 20,
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: 'red'
	},
	title: {
		fontSize: 24,
		marginTop: 20
	}
});
