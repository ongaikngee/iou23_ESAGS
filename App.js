import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserScreen from './Screens/UserScreen';
import SchoolStack from './Screens/SchoolStack';
import TestScreen from './Screens/TestScreen';
import SchoolScreen from './Screens/SchoolScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Schools') {
							iconName = focused ? 'school' : 'school-outline';
						} else if (route.name === 'User') {
							iconName = focused ? 'ios-people' : 'people-outline';
						} else if (route.name === 'Tools') {
							iconName = focused ? 'ios-battery-dead' : 'battery-charging';
						}else if (route.name === 'OldSchool') {
							iconName = focused ? 'school' : 'school-outline';
						}

						// You can return any component that you like here!
						return <Ionicons name={iconName} size={size} color={color} />;
					}
				})}
				tabBarOptions={{
					activeTintColor: 'blue',
					inactiveTintColor: 'gray'
				}}
			>
				<Tab.Screen name="Schools" component={SchoolScreen} />
				<Tab.Screen name="User" component={UserScreen} />
				{/* <Tab.Screen name="OldSchool" component={SchoolStack} /> */}
				<Tab.Screen name="Tools" component={TestScreen} />
				
				{/* <Tab.Screen name="School" component={SchoolScreen} /> */}
			</Tab.Navigator>
		</NavigationContainer>
	);
}
