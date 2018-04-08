import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


import { addShow } from '../../actions/series';
import { api_key} from '../../../config.json';

const IMAGE_BASE_URI = 'http://image.tmdb.org/t/p/w185/';


//const DETAILS_URI = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`


const getSeriesDetails = (id, callback) => {
    const DETAILS_URI = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`;
    axios.get(DETAILS_URI).then(function(response){
        callback(response);//console.log(response.data)
        //return response.data;
        }).catch(function(error){
        console.log(error);
    });
};


const seriesDetails = (({data}) => {
<p>Hello</p>
});


const SeriesListItem = ({id, index, poster_path, name, vote_avg, air_date, dispatch}) => (
       
        <tr onClick={(e) => 
            getSeriesDetails(id, seriesDetails)
            }
        >
            <td>{index}</td>
            <td>
                {poster_path && <img src={`${IMAGE_BASE_URI}${poster_path}`} width="60"></img>}
            </td>
            <td>{name}</td>
            <td>{vote_avg}</td>
            <td>{air_date}</td>
            {<td>
                <button onClick={(e) => {
                    dispatch(addShow({
                        id,
                        name,
                        vote_avg,
                        first_aired: air_date,
                        createdAt: index
                    }))
                }}>
                Add
                </button>
            </td>}
        </tr>

);

export default connect()(SeriesListItem);