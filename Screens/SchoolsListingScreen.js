import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const QUERY = 'https://data.gov.sg/api/action/datastore_search';
const RESOURCE_ID = 'ede26d32-01af-4228-b1ed-f05c45a1d8ee';
const LIMIT = 500;

export default function SchoolsListingScreen({ navigation }) {
	const [ data, setData ] = useState([]);

	async function getDetails() {
		try {
			const response = await axios.get(QUERY, {
				params: {
					resource_id: RESOURCE_ID,
					limit: LIMIT
					//   q:"Primary"
				}
			});
			let getData = response.data.result.records;
			//NTS: Only needs the Primary School, using Hi-Level filter
			getData = getData.filter((item) => item.mainlevel_code == 'PRIMARY');
			getData.map((item) => (item.id = item._id.toString()));
			setData(getData);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getDetails();
	}, []);

	const renderItem = ({ item }) => (
		<View style={styles.flatlist}>
			<TouchableOpacity onPress={() => navigation.navigate('Schools Details', item)}>
				<Text>{item.school_name}</Text>
				<Text>{item.url_address}</Text>
				<Text>{item.principal_name}</Text>
				<Text>{item.mainlevel_code}</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button}>
					<Text>List</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text>Map</Text>
				</TouchableOpacity>
			</View>
			<FlatList data={data} renderItem={renderItem} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'yellow'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent:'center',
	},
	button: {
		backgroundColor: 'grey',
		padding: 20,
		paddingHorizontal:80,
		borderWidth:1,
		marginVertical:20,

	},
	flatlist: {
		borderWidth: 1,
		padding: 10,
		margin: 1,
		backgroundColor: 'red'
	}
});
