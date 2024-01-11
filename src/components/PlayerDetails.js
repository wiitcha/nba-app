import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const TeamDetails = ({ team, players }) => {
    if (!team || !players) {
        return null;
    }

    const teamPlayers = players.filter((player) => player.TeamID === team.TeamID);

    const renderPlayerItem = ({ item }) => {
        const playerImageUri =
            item.NbaDotComPlayerID
                ? `https://cdn.nba.com/headshots/nba/latest/1040x760/${item.NbaDotComPlayerID}.png`
                : 'https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png';

        return (
            <View style={styles.playerItemContainer}>
                <Image source={{ uri: playerImageUri }} style={styles.playerImage} />
                <View style={styles.playerInfo}>
                    <Text style={styles.playerJersey}>{item.Jersey}</Text>
                    <View style={styles.playerInfoDetails}>
                        <Text style={styles.playerName}>{item.DraftKingsName}</Text>
                        <Text style={styles.position}>{item.Position}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.teamDetailsContainer}>
            <Text style={styles.roster}>Roster</Text>
            <FlatList
                data={teamPlayers}
                keyExtractor={(item) => item.PlayerID.toString()}
                renderItem={renderPlayerItem}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    roster: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        width: '100%',
    },

    teamDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: '#ccc',
        boxSizing: 'border-box',
        flexWrap: 'wrap',
    },
    playerItemContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        borderBottomColor: '#ccc',
        width: '50%',
        borderWidth: 0.5,
    },
    playerJersey: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        alignItems: 'center',
    },
    playerImage: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    playerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    playerInfo: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },

    playerInfoDetails: {
        flex: 2
    },

    position: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
});

export default TeamDetails;
