import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
	SCHOOL_DATA_ALL,
	SCHOOL_DATA_WEST_FINAL_SMALL,
	SCHOOL_DATA_EAST_FINAL_SMALL,
	SCHOOL_DATA_NORTH_FINAL_SMALL,
	SCHOOL_DATA_SOUTH_FINAL_SMALL,
	CATEGORIES
} from '../data/schoolDataSmall';
import { ProgressChart, BarChart, StackedBarChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function SchoolScreen() {
	const MyProgressChart = () => {
		return (
			<View>
				<ProgressChart
					data={[ 0.8 ]}
					width={CARD_WIDTH / 2 - 16}
					height={CARD_HEIGHT - 100}
					chartConfig={{
						backgroundColor: '#1cc910',
						backgroundGradientFrom: '#eff3ff',
						backgroundGradientTo: '#eff3ff',
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(3, 123, 0, ${opacity})`,
						style: {
							borderRadius: 16
						}
					}}
					style={{
						marginTop: 5,
						borderRadius: 25
					}}
					radius={50}
					strokeWidth={16}
					hideLegend={true}
				/>
				<Text
					style={{
						position: 'absolute',
						top: 53,
						left: 53,
						fontWeight: 'bold',
						color: 'green',
						fontSize: 24
					}}
				>
					80%
				</Text>
			</View>
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
				// width={CARD_WIDTH / 2 - 16}
				// height={CARD_HEIGHT - 100}
				width={150}
				height={100}
				//   yAxisLabel={'R'}
				chartConfig={{
					backgroundColor: '#1cc910',
					backgroundGradientFrom: '#eff32f',
					backgroundGradientTo: '#eff3ff',
					decimalPlaces: 0,
					barPercentage: 0.3,
					strokeWidth: 20,
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

	const MyStackedBarChart = () => {
		return (
			<StackedBarChart
				data={{
					labels: [ 'Test1' ],
					legend: [ '1A', '2A(1)', '2A(2)' ],
					data: [ [ 60, 30, 60, 20 ] ],
					barColors: [ '#D0F0C0', '#ACE1AF', '#138808', '#dfe4ea' ]
				}}
				width={CARD_WIDTH / 2 - 16}
				height={CARD_HEIGHT - 100}
				chartConfig={{
					backgroundColor: '#1cc910',
					backgroundGradientFrom: '#eff3ff',
					backgroundGradientTo: '#efefef',
					decimalPlaces: 0,
					color: (opacity = 1) => `rgba(0, 120, 0, ${opacity})`,
					style: {
						borderRadius: 16
					}
				}}
				style={{
					marginVertical: 8,
					borderRadius: 16
				}}
				barPercentage={0.1}
				showLegend={true}
				withVerticalLabels={false}
				withHorizontalLabels={false}
			/>
		);
	};

	const SCHOOL_DATA = [ ...SCHOOL_DATA_ALL ];
	const [ data, setData ] = useState({
		SCHOOL_DATA,
		region: {
			latitude: 1.2921,
			longitude: 103.8198,
			latitudeDelta: 0.5,
			longitudeDelta: 0.1
		},
		CATEGORIES
	});

	let mapIndex = 0;
	let mapAnimation = new Animated.Value(0);
	const cardFlipAnimation = new Animated.Value(0);

	useEffect(() => {
		console.log('You are in SchoolScreen UseEffect()');
		const unsubscribe = mapAnimation.addListener(({ value }) => {
			// console.log(value);
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
							latitudeDelta: data.region.latitudeDelta - 0.49,
							longitudeDelta: data.region.longitudeDelta - 0.08
						},
						350
					);
				}
			}, 10);
		});
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

	const onChipPressed = (zone) => {
		console.log('OnChipPressed is pressed');
		console.log(zone);

		let SCHOOL_DATA = [];
		if (zone == 'SCHOOL_DATA_WEST') {
			SCHOOL_DATA = SCHOOL_DATA_WEST_FINAL_SMALL;
		} else if (zone == 'SCHOOL_DATA_EAST') {
			SCHOOL_DATA = SCHOOL_DATA_EAST_FINAL_SMALL;
		} else if (zone == 'SCHOOL_DATA_NORTH') {
			SCHOOL_DATA = SCHOOL_DATA_NORTH_FINAL_SMALL;
		} else if (zone == 'SCHOOL_DATA_SOUTH') {
			SCHOOL_DATA = SCHOOL_DATA_SOUTH_FINAL_SMALL;
		}

		setData({
			SCHOOL_DATA,
			region: {
				latitude: 1.2921,
				longitude: 103.8198,
				latitudeDelta: 0.5,
				longitudeDelta: 0.1
			},
			CATEGORIES
		});
	};

	const _map = useRef(null);
	const _scrollView = useRef(null);

	return (
		<View style={styles.container}>
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
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
				height={50}
				style={styles.chipsScrollView}
			>
				{data.CATEGORIES.map((category, index) => (
					<TouchableOpacity
						key={index}
						style={styles.chipsItem}
						onPress={() => {
							onChipPressed(category.data);
						}}
					>
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
					<View key={index}>
						<Animated.View
							style={[
								styles.card,
								{
									position: 'absolute',
									zIndex: cardFlipAnimation.interpolate({
										inputRange: [ 0, 1 ],
										outputRange: [ 1, 0 ]
									}),
									transform: [
										{
											rotateY: cardFlipAnimation.interpolate({
												inputRange: [ 0, 1 ],
												outputRange: [ '0deg', '180deg' ]
											})
										}
									]
								}
							]}
						>
							<View style={styles.textContent}>
								<Text numberOfLines={1} style={styles.cardSchoolName}>
									{/* {marker.school_name} */}
									{marker.school_name}
								</Text>
								<Text numberOfLines={1} style={styles.cardSchoolAddress}>
									{marker.address}, Singapore({marker.postal_code})
								</Text>
								<View style={[ styles.contentContainer, { flexDirection: 'row' } ]}>
									<MyProgressChart />
									{/* <MyBarChart /> */}
									<MyStackedBarChart />
								</View>
								<TouchableOpacity
									style={styles.cardTO}
									onPress={() => {
										console.log('Click Click');
										Animated.timing(cardFlipAnimation, {
											toValue: 1,
											duration: 1000,
											useNativeDriver: true
										}).start();
									}}
								>
									<Text style={styles.cardButton}>Information</Text>
								</TouchableOpacity>
							</View>
						</Animated.View>
						<Animated.View
							style={[
								styles.card,
								{
									zIndex: cardFlipAnimation.interpolate({
										inputRange: [ 0, 1 ],
										outputRange: [ 0, 1 ]
									}),
									transform: [
										{
											rotateY: cardFlipAnimation.interpolate({
												inputRange: [ 0, 1 ],
												outputRange: [ '180deg', '0deg' ]
											})
										}
									]
								}
							]}
						>
							<View style={styles.textContent}>
								<Text numberOfLines={1} style={styles.cardSchoolName}>
									{/* {marker.school_name} */}
									{marker.school_name}
								</Text>
								<Text numberOfLines={1} style={styles.cardSchoolAddress}>
									{marker.address}, Singapore({marker.postal_code})
								</Text>
								<View style={[ styles.contentContainer, { padding: 5 } ]}>
									<Text>{marker.email_address}</Text>
									<Text>{marker.url_address}</Text>
									<Text>{marker.nature_code}</Text>
									<Text>{marker.type_code}</Text>
									<Text>Session: {marker.session_code}</Text>
									<Text>Autonomous: {marker.autonomous_ind}</Text>
									<Text style={styles.cardSchoolName}>Programme</Text>
									<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>



									{/* postal_code: '319765',
		email_address: 'CHIJTPPS@MOE.EDU.SG',
		url_address: 'http://www.chijpritoapayoh.moe.edu.sg', */}
										<Text>
											Gifted:{' '}
											{marker.gifted_ind === 'Yes' ? (
												<Ionicons name="heart" size={18} color="red" />
											) : (
												<Ionicons
													name="heart-dislike-sharp"
													size={18}
													color="rgba(255, 0, 0, 0.3)"
												/>
											)}
											{'  '}
										</Text>
										<Text>SAP:{' '}
										{marker.sap_ind === 'Yes' ? (
											<Ionicons name="heart" size={18} color="paleturquoise" />
										) : (
											<Ionicons name="heart-dislike-sharp" size={18} color="rgba(255, 0, 0, 0.3)" />
										)}</Text>
										<Text>IP:{' '}
										{marker.ip_ind === 'Yes' ? (
											<Ionicons name="heart" size={18} color="red" />
										) : (
											<Ionicons name="heart-dislike-sharp" size={18} color="rgba(255, 0, 0, 0.3)" />
										)}</Text>
									</View>
									{/* <Text>
										Gifted:{' '}
										{marker.gifted_ind === 'Yes' ? (
											<Ionicons name="heart" size={18} color="red" />
										) : (
											<Ionicons name="heart-dislike-sharp" size={18} color="rgba(255, 0, 0, 0.3)" />
										)}{'  '}
										SAP:{' '}
										{marker.sap_ind === 'Yes' ? (
											<Ionicons name="heart" size={18} color="red" />
										) : (
											<Ionicons name="heart-dislike-sharp" size={18} color="rgba(255, 0, 0, 0.3)" />
										)}{'  '}
										IP:{' '}
										{marker.ip_ind === 'Yes' ? (
											<Ionicons name="heart" size={18} color="red" />
										) : (
											<Ionicons name="heart-dislike-sharp" size={18} color="rgba(255, 0, 0, 0.3)" />
										)}
									</Text> */}
								</View>
								<TouchableOpacity
									style={styles.cardTO}
									onPress={() => {
										console.log('Click Click back');
										Animated.timing(cardFlipAnimation, {
											toValue: 0,
											duration: 1000,
											useNativeDriver: true
										}).start();
									}}
								>
									<Text style={styles.cardButton}>Done</Text>
								</TouchableOpacity>
							</View>
						</Animated.View>
					</View>
				))}
			</Animated.ScrollView>
		</View>
	);
}

// 		id: 19,
// 		address: '3    Tampines Street 22',
// 		postal_code: '529366',
// 		email_address: 'angsana_pri@moe.edu.sg',
// 		url_address: 'www.angsanapri.moe.edu.sg',
// 		dgp_code: 'TAMPINES',
// 		school_name: 'ANGSANA PRIMARY SCHOOL',
// 		autonomous_ind: 'No',
// 		gifted_ind: 'No',
// 		ip_ind: 'No',
// 		sap_ind: 'No',
// 		zone_code: 'EAST',
// 		mainlevel_code: 'PRIMARY',
// 		nature_code: 'CO-ED SCHOOL',
// 		session_code: 'SINGLE SESSION',
// 		type_code: 'GOVERNMENT SCHOOL'

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
	searchBox: {
		position: 'absolute',
		top: 0,
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
		width: CARD_WIDTH,
		backfaceVisibility: 'hidden'
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
	contentContainer: {
		// flexDirection: 'row',
		backgroundColor: '#eff3ff',
		borderRadius: 25
	},
	cardTO: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 8
	},
	cardButton: {
		fontSize: 18,
		borderWidth: 1,
		paddingVertical: 4,
		paddingHorizontal: 40
	}
});
