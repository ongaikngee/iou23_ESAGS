import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SchoolsDetailScreen() {
	return (
		<View style={styles.container}>
			<Text>This is the school details</Text>
		</View>
	);
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"orange",
    }
});