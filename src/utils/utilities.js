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

export const arraysEqual = (a,b) => {
    /*
        Array-aware equality checker:
        Returns whether arguments a and b are == to each other;
        however if they are equal-lengthed arrays, returns whether their 
        elements are pairwise == to each other recursively under this
        definition.
    */
    if (a instanceof Array && b instanceof Array) {
        if (a.length!=b.length)  // assert same length
            return false;
        for(var i=0; i<a.length; i++)  // assert each element equal
            if (!arraysEqual(a[i],b[i]))
                return false;
        return true;
    } else {
        return a==b;  // if not both arrays, should be the same
    }
}