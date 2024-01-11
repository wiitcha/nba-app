import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TeamDetails = ({ team }) => {
    if (!team) {
        return null; // Don't render anything if no team is selected
    }

    return (
        <View style={styles.teamDetailsContainer}>
            <View style={styles.logoContainer}>
                <Image source={{ uri: team.WikipediaLogoUrl }} style={styles.logo} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.teamName}>{team.City + ' ' + team.Name}</Text>
                <Text>{'Conference: ' + team.Conference}</Text>
                <Text>{'Head Coach: ' + team.HeadCoach}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    teamDetailsContainer: {
        flexDirection: 'column', // Change the direction to column
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
    },
    logoContainer: {
        marginBottom: 10, // Add margin to separate the logo and details
    },
    logo: {
        width: 240,
        height: 240,
        resizeMode: 'contain',
    },
    detailsContainer: {
        flex: 1,
    },
    teamName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#212529',
    },
    viewPlayersButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
    },
    viewPlayersButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#007bff',
    },
});

export default TeamDetails;
