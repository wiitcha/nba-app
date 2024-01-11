import axios from 'axios';

export const fetchTeams = async () => {
    try {
        const response = await axios.get(
            'https://api.sportsdata.io/v3/nba/scores/json/teams?key=838f646a57d04ba1937e6aa5cda6c1db'
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const fetchPlayers = async () => {
    try {
        const response = await axios.get(
            'https://api.sportsdata.io/v3/nba/scores/json/Players?key=838f646a57d04ba1937e6aa5cda6c1db'
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
