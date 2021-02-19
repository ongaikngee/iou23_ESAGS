import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SCHOOL_DATA } from '../data/schoolDataSmall';
import { ProgressChart, BarChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function SchoolScreen() {
	const MyProgressChart = () => {
		return (
			<ProgressChart
				data={[ 0.4, 0.6, 0.8 ]}
				width={CARD_WIDTH / 2 - 16}
				height={CARD_HEIGHT - 80}
				chartConfig={{
					backgroundColor: '#1cc910',
					backgroundGradientFrom: '#eff3ff',
					backgroundGradientTo: '#efefef',
					decimalPlaces: 2,
					color: (opacity = 1) => `rgba(3, 123, 0, ${opacity})`,
					style: {
						borderRadius: 16
					}
				}}
				style={{
					marginVertical: 8,
					borderRadius: 16
				}}
				radius={24}
				strokeWidth={8}
				hideLegend={true}
			/>
		);
	};

	const MyBarChart = () => {
		return (
			<BarChart
				data={{
					labels: [ '1', '2A(1)', '2A(2)', '2B', '2C', '2C(S)' ],
					datasets: [
						{
							data: [ 20, 45, 28, 80, 99, 43 ]
						}
					]
				}}
				width={CARD_WIDTH / 2 - 16}
				height={CARD_HEIGHT - 80}
				//   yAxisLabel={'R'}
				chartConfig={{
					backgroundColor: '#1cc910',
					backgroundGradientFrom: '#eff3ff',
					backgroundGradientTo: '#efefef',
					decimalPlaces: 0,
					barPercentage: 0.4,
					strokeWidth: 1,
					color: (opacity = 1) => `rgba(3, 123, 0, ${opacity})`,
					style: {
						borderRadius: 16
					}
				}}
				style={{
					marginVertical: 8,
					borderRadius: 0
				}}
				withVerticalLabels={true}
				withHorizontalLabels={false}
				showValuesOnTopOfBars={true}
				withInnerLines={false}
			/>
		);
	};

	console.log(SCHOOL_DATA[0]);
	console.log(CARD_WIDTH);
	const [ data, setDate ] = useState({
		SCHOOL_DATA,
		region: {
			latitude: 1.2921,
			longitude: 103.8198,
			latitudeDelta: 0.5,
			longitudeDelta: 0.1
		},
		categories: [
			{
				name: 'North'
				// icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
			},
			{
				name: 'South'
				// icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
			},
			{
				name: 'East'
				// icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
			},
			{
				name: 'West'
				// icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
			},
			{
				name: 'Central'
				// icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
			}
		]
	});

	let mapIndex = 0;
	let mapAnimation = new Animated.Value(0);

	useEffect(() => {
		console.log('You are in SchoolScreen UseEffect()');
		const unsubscribe = mapAnimation.addListener(({ value }) => {
			console.log(value);
			let index = Math.floor(value / CARD_WIDTH + 0.3); //animated 30% away
			if (index >= data.SCHOOL_DATA.length) {
				index = data.SCHOOL_DATA.length - 1;
			}
			if (index <= 0) {
				index = 0;
			}
			clearTimeout(regionTimeout);
			const regionTimeout = setTimeout(() => {
				if (mapIndex !== index) {
					mapIndex = index;
					const { latitude, longitude } = data.SCHOOL_DATA[index];
					_map.current.animateToRegion(
						{
							// ...coordinate,
							latitude: latitude,
							longitude: longitude,
							latitudeDelta: data.region.latitudeDelta -0.49,
							longitudeDelta: data.region.longitudeDelta -0.08
						},
						350
					);
				}
			}, 10);
		});

		// NTS: Should I return the listener?
		// return () => {
		// 	unsubscribe();
		// };
	});

	const interpolations = data.SCHOOL_DATA.map((marker, index) => {
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

		let x = markerID * CARD_WIDTH + markerID * 20;
		if (Platform.OS === 'ios') {
			x = x - SPACING_FOR_CARD_INSET;
		}
		_scrollView.current.scrollTo({ x: x, y: 0, animated: true });
	};

	const _map = useRef(null);
	const _scrollView = useRef(null);

	return (
		<View style={styles.container}>
			<Text>Welcome to School Screen</Text>
			<MapView ref={_map} style={styles.map} initialRegion={data.region}>
				{data.SCHOOL_DATA.map((marker, index) => {
					const scaleStyle = {
						transform: [
							{
								scale: interpolations[index].scale
							}
						]
					};
					return (
						<Marker
							key={index}
							coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
							onPress={(e) => onMarkerPress(e)}
						>
							<Animated.Image
								source={require('../assets/map_marker.png')}
								style={[ styles.marker, scaleStyle ]}
								// resizeMode="cover"
							/>
						</Marker>
					);
				})}
			</MapView>
			<ScrollView
				horizontal
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
				height={50}
				style={styles.chipsScrollView}
			>
				{data.categories.map((category, index) => (
					<TouchableOpacity key={index} style={styles.chipsItem}>
						{/* {category.icon} */}
						<Text>{category.name}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
			<Animated.ScrollView
				ref={_scrollView}
				horizontal
				style={styles.bottomScrollView}
				pagingEnabled
				snapToAlignment="center"
				snapToInterval={CARD_WIDTH + 20}
				scrollEventThrottle={16}
				onScroll={Animated.event([ { nativeEvent: { contentOffset: { x: mapAnimation } } } ], {
					useNativeDriver: true
				})}
			>
				{data.SCHOOL_DATA.map((marker, index) => (
					<View key={index} style={styles.card}>
						<View style={styles.textContent}>
							<Text numberOfLines={1} style={styles.cardSchoolName}>
								{marker.name}
							</Text>
							<Text numberOfLines={1} style={styles.cardSchoolAddress}>
								{marker.address}
							</Text>
							<View style={styles.chartContainer}>
								<MyProgressChart />

								<MyBarChart />
							</View>
						</View>
					</View>
				))}
			</Animated.ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	map: {
		// flex: 1,
		width: '100%',
		height: '100%'
	},
	marker: {
		width: 30,
		height: 30
	},
	bottomScrollView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 10
	},
	card: {
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
	},
	textContent: {
		flex: 2,
		padding: 10
	},
	cardSchoolName: {
		fontSize: 12,
		// marginTop: 5,
		fontWeight: 'bold'
	},
	cardSchoolAddress: {
		fontSize: 12,
		color: '#444'
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
	chartContainer: {
		flexDirection: 'row'
	}
});

{
	/* <Animated.Image
	source={require('../assets/map_marker.png')}
	style={[ styles.marker, scaleStyle ]}
	resizeMode="cover"
/>; */
}
