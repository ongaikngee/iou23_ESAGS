import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import SchDetailsComponent from '../components/SchDetailsComponent';
import MapView, { Circle, Marker, MarkerAnimated } from 'react-native-maps';

import { useGeoCode } from '../hooks/api';

export default function SchoolsDetailScreen({ route }) {
	// console.log(route.params);
	const [ leftScreen, setLeftScreen ] = useState(true);
	const { id, school_name, address, postal_code, url_address, email_address } = route.params;

	// import element from custom hooks
	const [ loading, latitude, longitude, getGeoCode ] = useGeoCode();

	const setScreen = (bool) => {
		setLeftScreen(bool);
	};

	useEffect(() => {
		getGeoCode(address);
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{school_name}</Text>
			<Text>{id}</Text>
			<Text>{url_address}</Text>
			<Text>{address}</Text>
			<Text>{postal_code}</Text>
			<Text>{email_address}</Text>
			<View>
				{loading ? (
					<ActivityIndicator size="large" />
				) : (
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: latitude,
							longitude: longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						}}
					>
						<Marker coordinate={{ latitude: latitude, longitude: longitude }} />

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
				)}
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.touchButton} onPress={() => setScreen(true)}>
					<Text>Details information</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.touchButton} onPress={() => setScreen(false)}>
					<Text>Primary 1 Registraion</Text>
				</TouchableOpacity>
			</View>
			{leftScreen ? (
				<ScrollView>
					<SchDetailsComponent details={route.params} />
				</ScrollView>
			) : (
				<View>
					<Text>This is Primary 1 Section</Text>
					<Text>This is the placement for the charts.</Text>
					<Image
						style={{ width: '100%', height: 200 }}
						source={{ uri: 'https://ksppublic.s3.amazonaws.com/kiasu/files/u133359/cc.jpg' }}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'orange'
	},
	title: {
		fontSize: 36
	},
	header: {
		fontSize: 24
	},
	text: {
		margin: 4
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 15
	},
	touchButton: {
		padding: 10,
		borderWidth: 1
	},
	safeAreaContainer: {
		flex: 1,
		height: 200
	},
	map: {
		width: '100%',
		height: 200,
		borderRadius: 15
	}
});
