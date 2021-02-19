import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SCHOOL_DATA, MARKERS } from '../data/schoolData';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons/MaterialCommunityIcons';
import { Fontisto } from '@expo/vector-icons/Fontisto';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
// import { useEffect } from 'react/cjs/react.development';
// import { useRef } from 'react';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function TestScreen() {
	const [ latitude, setlatitude ] = useState(1.275439);
	const [ longitude, setLongitude ] = useState(103.840013);
	const [ schoolCoordinate, setSchoolCoordinate ] = useState(SCHOOL_DATA);

	const initialMapState = {
		MARKERS,
		categories: [
			{
				name: 'Fastfood Center'
				// icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
			},
			{
				name: 'Restaurant'
				// icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
			},
			{
				name: 'Dineouts'
				// icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
			},
			{
				name: 'Snacks Corner'
				// icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
			},
			{
				name: 'Hotel'
				// icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
			}
		],
		region: {
			latitude: 22.62938671242907,
			longitude: 88.4354486029795,
			latitudeDelta: 0.04864195044303443,
			longitudeDelta: 0.040142817690068
		}
	};

	const [ state, setState ] = React.useState(initialMapState);

	let mapIndex = 0;
	let mapAnimation = new Animated.Value(0);

	useEffect(() => {
		mapAnimation.addListener(({ value }) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
			if (index >= state.MARKERS.length) {
				index = state.MARKERS.length - 1;
			}
			if (index <= 0) {
				index = 0;
			}

			clearTimeout(regionTimeout);

			const regionTimeout = setTimeout(() => {
				if (mapIndex !== index) {
					mapIndex = index;
					const { coordinate } = state.MARKERS[index];
					_map.current.animateToRegion(
						{
							...coordinate,
							latitudeDelta: state.region.latitudeDelta,
							longitudeDelta: state.region.longitudeDelta
						},
						350
					);
				}
			}, 10);
		});
	});

	const interpolations = state.MARKERS.map((marker, index) => {
		const inputRange = [ (index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH ];

		const scale = mapAnimation.interpolate({
			inputRange,
			outputRange: [ 1, 1.5, 1 ],
			extrapolate: 'clamp'
		});

		return { scale };
	});

	const onMarkerPress = (mapEventData) => {
		const markerID = mapEventData._targetInst.return.key;
		console.log(markerID);

		let x = markerID * CARD_WIDTH + markerID * 20;
		if (Platform.OS === 'ios') {
			x = x - SPACING_FOR_CARD_INSET;
		}

		_scrollView.current.scrollTo({ x: x, y: 0, animated: true });
	};

	const _map = useRef(null);
	const _scrollView = React.useRef(null);

	return (
		<View style={styles.container}>
			<MapView
				ref={_map}
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={state.region}
				mapType={'standard'}
				showsUserLocation={true}
			>
				{state.MARKERS.map((marker, index) => {
					const scaleStyle = {
						transform: [
							{
								scale: interpolations[index].scale
							}
						]
					};
					return (
						<MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
							<Animated.View style={[ styles.markerWrap ]}>
								<Animated.Image
									source={require('../assets/map_marker.png')}
									style={[ styles.marker, scaleStyle ]}
									resizeMode="cover"
								/>
								{/* <Ionicons name="location" size={24} color="red" style={[styles.newStyle]}/> */}
							</Animated.View>
						</MapView.Marker>
					);
				})}
			</MapView>
			<View style={styles.searchBox}>
				<TextInput
					placeholder="Search here"
					placeholderTextColor="#000"
					autoCapitalize="none"
					style={{ flex: 1, padding: 0 }}
				/>
				<Ionicons name="ios-search" size={20} />
			</View>
			<ScrollView
				horizontal
				scrollEventThrottle={1}
				showsHorizontalScrollIndicator={false}
				height={50}
				style={styles.chipsScrollView}
			>
				{state.categories.map((category, index) => (
					<TouchableOpacity key={index} style={styles.chipsItem}>
						{category.icon}
						<Text>{category.name}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			<Animated.ScrollView
				ref={_scrollView}
				horizontal
				scrollEventThrottle={1}
				showsHorizontalScrollIndicator={false}
				style={styles.scrollView}
				pagingEnabled
				snapToInterval={CARD_WIDTH + 20}
				snapToAlignment="center"
				contentInset={{ top: 0, bottom: 0, left: SPACING_FOR_CARD_INSET, right: SPACING_FOR_CARD_INSET }}
				onScroll={Animated.event([ { nativeEvent: { contentOffset: { x: mapAnimation } } } ], {
					useNativeDriver: true
				})}
			>
				{state.MARKERS.map((marker, index) => (
					<View style={styles.card} key={index}>
						{/* <Image source={marker.image} style={styles.cardImage} resizeMode="cover" /> */}
						<View style={styles.textContent}>
							<Text numberOfLines={1} style={styles.cardtitle}>
								{marker.title}
							</Text>
							{/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
							<Text numberOfLines={1} style={styles.cardDescription}>
								{marker.description}
							</Text>
							{/* <View style={styles.button}>
								<TouchableOpacity
									onPress={() => {}}
									style={[
										styles.signIn,
										{
											borderColor: '#FF6347',
											borderWidth: 1
										}
									]}
								>
									<Text
										style={[
											styles.textSign,
											{
												color: '#FF6347'
											}
										]}
									>
										Order Now
									</Text>
								</TouchableOpacity>
							</View> */}
						</View>
					</View>
				))}
			</Animated.ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// justifyContent: 'center',
		// alignItems: 'center',
		// height: '100%'
		flex: 1
	},
	map: {
		width: '100%',
		height: '100%'
	},
	markerWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 50
	},
	searchBox: {
		position: 'absolute',
		marginTop: Platform.OS === 'ios' ? 40 : 20,
		flexDirection: 'row',
		backgroundColor: '#fff',
		width: '90%',
		alignSelf: 'center',
		borderRadius: 5,
		padding: 10,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
	},
	chipsScrollView: {
		position: 'absolute',
		top: Platform.OS === 'ios' ? 90 : 80,
		paddingHorizontal: 10
	},
	chipsItem: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 8,
		paddingHorizontal: 20,
		marginHorizontal: 10,
		height: 35,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
	},
	scrollView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 10
	},
	textContent: {
		flex: 2,
		padding: 10
	},
	cardtitle: {
		fontSize: 12,
		// marginTop: 5,
		fontWeight: 'bold'
	},
	cardDescription: {
		fontSize: 12,
		color: '#444'
	},
	card: {
		// padding: 10,
		elevation: 2,
		backgroundColor: '#FFF',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		marginHorizontal: 10,
		shadowColor: '#000',
		shadowRadius: 5,
		shadowOpacity: 0.3,
		shadowOffset: { x: 2, y: -2 },
		height: CARD_HEIGHT,
		width: CARD_WIDTH
		// overflow: 'hidden'
	},
	button: {
		alignItems: 'center',
		marginTop: 5
	},
	marker: {
		width: 30,
		height: 30
	}
});
