import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SchDetailsComponent(props){

    return(
        <View>
        <Text style={styles.header}>Statement</Text>
        <Text style={styles.text}>School Mission: {props.details.missionstatement_desc}</Text>
        <Text style={styles.text}>School Vision: {props.details.visionstatement_desc}</Text>
        <Text style={styles.text}>philosophy_culture_ethos: {props.details.philosophy_culture_ethos}</Text>
        <Text style={styles.text}>special_sdp_offered: {props.details.special_sdp_offered}</Text>
        <Text style={styles.header}>Principal</Text>
        <Text style={styles.text}>principal_name: {props.details.principal_name}</Text>
        <Text style={styles.header}>Contact Info</Text>
        <Text style={styles.text}>email_address: {props.details.email_address}</Text>
        <Text style={styles.text}>telephone_no: {props.details.telephone_no}</Text>
        <Text style={styles.text}>fax_no: {props.details.fax_no}</Text>
        <Text style={styles.header}>Area Information</Text>
        <Text style={styles.text}>zone_code: {props.details.zone_code}</Text>
        <Text style={styles.text}>DGP Code: {props.details.dgp_code}</Text>
        <Text style={styles.text}>MainLevel Code: {props.details.mainlevel_code}</Text>
        <Text style={styles.text}>nature_code: {props.details.nature_code}</Text>
        <Text style={styles.text}>session_code: {props.details.session_code}</Text>
        <Text style={styles.text}>type_code: {props.details.type_code}</Text>
        <Text style={styles.header}>Options</Text>
        <Text style={styles.text}>autonomous_ind: {props.details.autonomous_ind}</Text>
        <Text style={styles.text}>gifted_ind: {props.details.gifted_ind}</Text>
        <Text style={styles.text}>ip_ind: {props.details.ip_ind}</Text>
        <Text style={styles.text}>sap_ind: {props.details.sap_ind}</Text>
        <Text style={styles.header}>Transport</Text>
        <Text style={styles.text}>Bus: {props.details.bus_desc}</Text>
        <Text style={styles.text}>MRT: {props.details.mrt_desc}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        fontSize:18,
        color: 'green'
    },
    text:{
        fontSize:12,
        color:'purple',
    }
});