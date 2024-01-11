import React, {useEffect, useState} from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    StyleSheet,
    Image, Pressable,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { fetchTeams, fetchPlayers } from '../api/sportsdata';
import TeamDetails from "../components/TeamDetails";
import PlayerDetails from "../components/PlayerDetails";

const MainScreen = () => {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isFlatListVisible, setIsFlatListVisible] = useState(true);
    const [isTeamDetailsVisible, setIsTeamDetailsVisible] = useState(true);

    const fetchTeamsAndPlayers = async () => {
        try {
            const teamsData = await fetchTeams();
            const playersData = await fetchPlayers();

            setTeams(teamsData);
            setPlayers(playersData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTeamsAndPlayers().then(r => console.log(r));
    }, []);

    useEffect(() => {
        filterData();
        setIsTeamDetailsVisible(!searchText);
    }, [searchText]);

    const filterData = () => {
        const filtered = teams.filter(
            (item) => {
                const teamName = `${item.City} ${item.Name}`;
                return teamName.toLowerCase().includes(searchText.toLowerCase());
            }
        );

        setIsFlatListVisible(true);
        setFilteredData(filtered);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setSearchText('');
        setIsFlatListVisible(false); // Hide the FlatList
    };

    const renderItem = ({ item }) => (
        <Pressable
            onPress={() => handleItemClick(item)}
            underlayColor="#e0e0e0" // Sets the color for the highlight effect
            style={[
                styles.dropdownItem,
                selectedItem && selectedItem.TeamID === item.TeamID
                    ? styles.selectedItem
                    : null,
            ]}
        >
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.WikipediaLogoUrl }} style={styles.logo} />
                <Text style={styles.dropdownItemText}>{item.City + ' ' + item.Name}</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: 'https://cdn.nba.com/logos/leagues/logo-nba.svg'}} style={styles.nbaLogo}/>
                <Feather name="user" size={24} color="#fff" />
            </View>
            <View style={styles.searchBarContainer}>
                <Ionicons name="ios-search" size={24} color="#212529" style={styles.icon} />
                <TextInput
                    placeholder="Search teams"
                    placeholderTextColor="#6c757d"
                    style={[styles.input, {borderWidth: 0}]}
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                    selectionColor= 'black'
                    underlineColorAndroid={'transparent'}
                />
                {searchText !== '' && (
                    <Ionicons
                        name="ios-close"
                        size={24}
                        color="#212529"
                        style={styles.clearIcon}
                        onPress={() => {
                            setSearchText('')
                        }}
                    />
                )}
            </View>
            <View style={styles.dropdownList}>
                {isFlatListVisible && filteredData.length > 0 && searchText !== '' ? (
                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.TeamID.toString()}
                    />
                ) : (
                    searchText !== '' && (
                        <Text style={styles.noTeamsText}>
                            {isFlatListVisible ? `No teams found for "${searchText}"` : ''}
                        </Text>
                    )
                )}
            </View>
            {isTeamDetailsVisible && selectedItem && (
                <View id={'teamDetails'} style={styles.teamDetailsContainer}>
                    <TeamDetails team={selectedItem} />
                    <PlayerDetails team={selectedItem} players={players} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1B1F3B',
        paddingHorizontal: 24,
        paddingVertical: 15,
        justifyContent: 'space-between',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        color: '#212529',
        borderBottomWidth: 0,
        borderWidth: 0,
    },
    clearIcon: {
        marginLeft: 10,
    },
    dropdownList: {
        marginTop: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#6c757d',
        borderRadius: 5,
        maxHeight: 700,
        borderStyle: 'none',
        position: 'relative',
        zIndex: 2,
    },
    dropdownItem: {
        padding: 10,
        borderBottomColor: '#6c757d',
        zIndex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
    },
    logo: {
        width: 48,
        height: 48,
        marginRight: 10,
        resizeMode: 'contain',
    },

    nbaLogo: {
        width: 60,
        height: 60,
        resizeMode: 'stretch',
    },
    dropdownItemText: {
        color: '#212529',
    },
    selectedItem: {
        backgroundColor: '#007bff',
    },
    placeholderText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#6c757d',
    },
    noTeamsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#6c757d',
    },
});

export default MainScreen;
