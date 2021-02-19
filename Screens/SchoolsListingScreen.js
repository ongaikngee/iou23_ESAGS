import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, Image } from 'react-native';
import axios from 'axios';
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import { SCHOOL_DATA } from '../data/schoolData';
import { Ionicons } from '@expo/vector-icons';

const QUERY = 'https://data.gov.sg/api/action/datastore_search';
const RESOURCE_ID = 'ede26d32-01af-4228-b1ed-f05c45a1d8ee';
const LIMIT = 500;

export default function SchoolsListingScreen({ navigation }) {
	const [ leftScreen, setLeftScreen ] = useState(true);
	const [ loading, setLoading ] = useState(true);
	const [ data, setData ] = useState([]);
	const [ schoolCoordinate, setSchoolCoordinate ] = useState(SCHOOL_DATA);
	const [ latitude, setlatitude ] = useState(1.275439);
	const [ longitude, setLongitude ] = useState(103.840013);
	const setScreen = (bool) => {
		setLeftScreen(bool);
	};

	// Might need to move this to custom hooks
	async function getDetails() {
		try {
			setLoading(true);
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
			setLoading(false);
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
				<TouchableOpacity style={styles.button} onPress={() => setScreen(true)}>
					<Text>List</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => setScreen(false)}>
					<Text>Map</Text>
				</TouchableOpacity>
			</View>
			{leftScreen ? loading ? (
				<View>
					<ActivityIndicator />
					<Text>Getting School Information. </Text>
				</View>
			) : (
				<FlatList data={data} renderItem={renderItem} />
			) : (
				<View>
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: latitude,
							longitude: longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						}}
					>
						{schoolCoordinate.map((x) => (
							<Marker
								key={x.index}
								coordinate={{ latitude: x.latitude, longitude: x.longitude }}
								title={x.name}
								description={x.address}
							>
								<View>
									<Ionicons name="location" size={24} color="red" />
								</View>
							</Marker>
						))}

						<Marker
							draggable
							coordinate={{ latitude: latitude, longitude: longitude }}
							title={'This is the title.'}
							description={'This is the description.'}
						>
							<View>
								<Ionicons name="location" size={24} color="red" />
							</View>
						</Marker>
						<Circle
							center={{
								latitude: latitude,
								longitude: longitude
							}}
							radius={2000}
							fillColor={'rgba(0, 255, 0, 0.4)'}
							strokeColor={'rgba(0,255,0,1)'}
						/>
						<Circle
							center={{
								latitude: latitude,
								longitude: longitude
							}}
							radius={1000}
							fillColor={'rgba(255, 0, 0, 0.4)'}
							strokeColor={'rgba(255,0,0,1)'}
						/>
					</MapView>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'yellow',
		flex: 1
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	button: {
		backgroundColor: 'grey',
		padding: 20,
		paddingHorizontal: 80,
		borderWidth: 1,
		marginVertical: 20
	},
	flatlist: {
		borderWidth: 1,
		padding: 10,
		margin: 1,
		backgroundColor: 'red'
	},
	text: {
		fontSize: 30
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	tinyLogo: {
		width: 50,
		height: 50
	}
});
