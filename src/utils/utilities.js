import axios from 'axios';

export const doRequest = (URL, callback) => {
        

    let result = "";
    axios.get(URL).then(function(response){
        result = response.data
        callback(result);
        
        }).catch(function(error){
            console.log(error);
        });
};