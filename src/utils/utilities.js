import axios from 'axios';
import { API_KEY } from '../../configKey';

export const doRequest = (URL, callback) => {
        

    let result = "";
    axios.get(URL).then(function(response){
        result = response.data
        callback(result);
        
        }).catch(function(error){
            console.log(error);
        });
};

//TODO: Run a genre set-up the first time (need to use localStorage or something like that)
export const getGenre = (genreList, id) => {
    // Temporarily store genre object retrieved from api
    let genresDict = [];
    let genresDict2 = {};


    genresDict = genreList;
    genresDict.forEach(element => {
        genresDict2[element[Object.keys(element)[0]]]=element[Object.keys(element)[1]]
    });
        
      
     return genresDict2[id];
};