import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function UserScreen() {
	const [ data, setData ] = useState();
	const [ loading, setLoading ] = useState(true);
	const [ schoolName, setSchoolName ] = useState([]);
	const [ timer, setTimer ] = useState(0);
	const [ nameArray, setNameArray ] = useState([]);

	const QUERY = 'https://data.gov.sg/api/action/datastore_search';
	const RESOURCE_ID = 'ede26d32-01af-4228-b1ed-f05c45a1d8ee';
	const LIMIT = 500;

	async function getDetails() {
		try {
			setLoading(true);
			const response = await axios.get(QUERY, {
				params: {
					resource_id: RESOURCE_ID,
					limit: LIMIT
				}
			});

			let getData = response.data.result.records;
			//NTS: Only needs the Primary School, using Hi-Level filter
			getData = getData.filter((item) => item.mainlevel_code == 'PRIMARY');
			setData(getData);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		console.log('Get it done.');
		setTimer(0);
		getDetails();
	}, []);

	const getInformation = async (index, name, address) => {
		console.log('You are in in in in inside.');
		console.log('The index is: ' + index);
		console.log('Name is : ' + name);
		console.log('Address is : ' + address);

		let newObj = '';



		const API = 'http://venueChope.pythonanywhere.com';
		const API_ADD = '/venue/';
		let id = index + 1;

		// const URL = 'http://api.positionstack.com/v1/forward';
		// const PARAM_KEY = '';
		// const PARAM_QUERY = address + ' Singapore';
		// const PARAM_OUTPUT = 'json';
		// const PARAM_LIMIT = '1';

		try {
			const response = await axios.get(API + API_ADD + 1);

				// const response = await axios.get(URL, {
				// 	params: {
				// 		access_key: PARAM_KEY,
				// 		query: PARAM_QUERY,
				// 		limit: PARAM_LIMIT,
				// 		output: PARAM_OUTPUT
				// 	}
				// });

			console.log('Axios Success message');
			newObj = {
				index: index,
				name: name,
				address: address,
				zname: response.data.name,
				// latitude: response.data.data[0].latitude,
				// longitude: response.data.data[0].longitude
			};

			nameArray.push(newObj);
			console.log('huhuhh huhuhu huhu h');
			// console.log(nameArray);
			console.log(JSON.stringify(nameArray));
		} catch (e) {
			console.log('Axios error');
			console.log(e.response);
		}

		return [ name, 'hello' ];
	};

	const getLatLong = () => {
		console.log('There you getLatLong');
		console.log(data.length);
		// data.map((item)=>{
		//     console.log(item.school_name)
		//     return setSchoolName([...schoolName, {name:item.school_name}])
		// });
		// data.foreach(print);
		data.forEach((item) => {
			console.log(item.school_name);
			// setSchoolName([...schoolName, {name:item.school_name}]);
			schoolName.push({ name: item.school_name, address: item.address });
		});
	};

	const print = () => {
		console.log('Printing');
		console.log(schoolName.length);
		console.log(JSON.stringify(schoolName));
		// console.log(schoolName);
	};

	const addElement = () => {
		console.log('Adding more element to object in array');
		// schoolName.map((item) => ((item.latitude = '100'), (item.longitude = '200')));

		schoolName.forEach((item, index) => {
			getInformation(index, item.name, item.address);
		});
	};

	const reset = () => {
		console.log('reseting array');
		setSchoolName([]);
	};

	const increaseTimer = () => {
		console.log('increaeTimer Function activated');
		setTimer(timer + 1);
	};

	const startTimer = () => {
		console.log('Timer Function');

		let timerID = setInterval(() => {
			increaseTimer();
		}, 1000);

		setTimeout(() => {
			clearInterval(timerID);
		}, 10000);
	};

	const stopTimer = () => {
		console.log('Timer is stop.');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>!This is the User Screen. I will decide what to do with it later. </Text>
			{loading ? (
				<ActivityIndicator />
			) : (
				<View>
					<TouchableOpacity style={styles.button} onPress={() => getLatLong()}>
						<Text>Put Data into new Array</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => print()}>
						<Text>Print me</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => addElement()}>
						<Text>Add Element</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => reset()}>
						<Text>Reset</Text>
					</TouchableOpacity>
				</View>
			)}
			<View style={styles.timerContainer}>
				<Text style={styles.text}>{timer}</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={() => startTimer()}>
						<Text>Start Timer</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => stopTimer()}>
						<Text>Stop Timer</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	text: {
		fontSize: 40
	},
	button: {
		padding: 30,
		borderWidth: 1
	},
	timerContainer: {
		backgroundColor: 'green',
		marginVertical: 20,
		padding: 20,
		width: '100%'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});
