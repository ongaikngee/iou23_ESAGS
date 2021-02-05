import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserScreen from './Screens/UserScreen';
import SchoolStack from './Screens/SchoolStack';
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
				<Tab.Screen name="Schools" component={SchoolStack} />
				<Tab.Screen name="User" component={UserScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
