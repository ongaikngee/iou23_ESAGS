import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function SchoolsDetailScreen({ route }) {
	// console.log('Welcome to schools details screen');
	console.log(route.params);
	const [ leftScreen, setLeftScreen ] = useState(true);
	const {
		id,
		school_name,
		address,
		postal_code,
		url_address,
		email_address,
		fax_no,
		telephone_no,
		missionstatement_desc,
		visionstatement_desc,
		philosophy_culture_ethos,
		special_sdp_offered,
		principal_name,
		dgp_code,
		zone_code,
		mainlevel_code,
		nature_code,
		session_code,
		type_code,
		autonomous_ind,
		gifted_ind,
		ip_ind,
		sap_ind,
		bus_desc,
		mrt_desc
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
					<Text style={styles.header}>Statement</Text>
					<Text style={styles.text}>School Mission: {missionstatement_desc}</Text>
					<Text style={styles.text}>School Vision: {visionstatement_desc}</Text>
					<Text style={styles.text}>philosophy_culture_ethos: {philosophy_culture_ethos}</Text>
					<Text style={styles.text}>special_sdp_offered: {special_sdp_offered}</Text>
					<Text style={styles.header}>Principal</Text>
					<Text style={styles.text}>principal_name: {principal_name}</Text>

					<Text style={styles.header}>Contact Info</Text>
					<Text style={styles.text}>email_address: {email_address}</Text>
					<Text style={styles.text}>telephone_no: {telephone_no}</Text>
					<Text style={styles.text}>fax_no: {fax_no}</Text>
					<Text style={styles.header}>Area Information</Text>
					<Text style={styles.text}>zone_code: {zone_code}</Text>
					<Text style={styles.text}>DGP Code: {dgp_code}</Text>
					<Text style={styles.text}>MainLevel Code: {mainlevel_code}</Text>
					<Text style={styles.text}>nature_code: {nature_code}</Text>
					<Text style={styles.text}>session_code: {session_code}</Text>
					<Text style={styles.text}>type_code: {type_code}</Text>
					<Text style={styles.header}>Options</Text>
					<Text style={styles.text}>autonomous_ind: {autonomous_ind}</Text>
					<Text style={styles.text}>gifted_ind: {gifted_ind}</Text>
					<Text style={styles.text}>ip_ind: {ip_ind}</Text>
					<Text style={styles.text}>sap_ind: {sap_ind}</Text>
					<Text style={styles.header}>Transport</Text>
					<Text style={styles.text}>Bus: {bus_desc}</Text>
					<Text style={styles.text}>MRT: {mrt_desc}</Text>
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
	}
});

// Parameter that deems useful. address, postal_code, bus_desc, mrt_desc, session_code,visionstatement_desc, type_code,email_address, fax_no, gifted_ind, id, ip_ind, mainlevel_code, missionstatement_desc, nature_code
