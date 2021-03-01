import React, { useRef, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';

export default () => {
	const fadeAnimated = useRef(new Animated.Value(0)).current;
	const [ isfinished, setisFinished ] = useState('To be updated');

	const fadeIn = () => {
		console.log('FadeIn Function');
		Animated.timing(fadeAnimated, { toValue: 1, duration: 3000, useNativeDriver: true }).start(({ finished }) => {
			console.log(finished);
			setisFinished(finished);
		});
	};

	const fadeOut = () => {
		console.log('FadeOut function');
		Animated.timing(fadeAnimated, { toValue: 0, duration: 3000, useNativeDriver: true }).start();
	};

	return (
		<View style={styles.container}>
			<Animated.View style={[ styles.animatedContainer, { opacity: fadeAnimated } ]}>
				<Text>This is going to be animated.</Text>
			</Animated.View>
			<Text>User Screen. To be added later. </Text>
			<Text>{isfinished}</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={fadeIn}>
					<Text>Fade in</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={fadeOut}>
					<Text>Fade in</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	button: { padding: 20, margin: 20, backgroundColor: 'red' },
	animatedContainer: {
		marginVertical: 40,
		borderWidth: 1,
		borderRadius: 10,
		padding: 40,
		backgroundColor: '#C2A878'
	},
	buttonContainer: { flexDirection: 'row' }
});
