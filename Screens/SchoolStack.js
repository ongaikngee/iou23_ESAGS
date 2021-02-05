import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import SchoolsListingScreen from '../Screens/SchoolsListingScreen';
import SchoolsDetailScreen from '../Screens/SchoolsDetailScreen';

const Stack = createStackNavigator();

export default function SchoolStack()  {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Schools Listing" component={SchoolsListingScreen} />
			<Stack.Screen name="Schools Details" component={SchoolsDetailScreen} />
 		</Stack.Navigator>
	);
};
