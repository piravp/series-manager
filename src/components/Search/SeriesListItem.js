import React from 'react';
import { connect } from 'react-redux';

import { addShow } from '../../actions/series';

const IMAGE_BASE_URI = 'http://image.tmdb.org/t/p/w185/';

const SeriesListItem = ({id, index, poster_path, name, vote_avg, air_date, dispatch}) => (
       
        <tr>
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