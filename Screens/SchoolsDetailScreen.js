import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
// import MapView from 'react-native-maps';
import SchDetailsComponent from "./components/SchDetailsComponent";

export default function SchoolsDetailScreen({ route }) {
	// console.log('Welcome to schools details screen');
	// console.log(route.params);
	const [ leftScreen, setLeftScreen ] = useState(true);
	const {
		id,
		school_name,
		address,
		postal_code,
		url_address,
		email_address,
	} = route.params;

	const setScreen = (bool) => {
		setLeftScreen(bool);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{school_name}</Text>
			<Text>{id}</Text>
			<Text>{url_address}</Text>
			<Text>{address}</Text>
			<Text>{postal_code}</Text>
			<Text>{email_address}</Text>
			<View>
				{/* <MapView style={styles.map}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				/> */}
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
	map:{
		width:300,
		height:300,
		borderRadius:15,
	}
});
