import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function UserScreen(){
    return(
    <View style={styles.container}>
        <Text style={styles.text}>!This is the User Screen. I will decide what to do with it later. </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        height:"100%",
    },
    text:{
        fontSize:40,
    }
});