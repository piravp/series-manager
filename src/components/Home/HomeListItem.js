import React from 'react';
import { connect } from 'react-redux';

import { removeShow } from '../../actions/series';

const IMAGE_BASE_URI = 'http://image.tmdb.org/t/p/w185/';

const HomeListItem = ({id, index, poster_path, name, vote_avg, first_aired, dispatch}) => (
       
        <tr>
            <td>{index}</td>
            <td>
                {poster_path && <img src={`${IMAGE_BASE_URI}${poster_path}`} width="60"></img>}
            </td>
            <td>{name}</td>
            <td>{vote_avg}</td>
            <td>{first_aired}</td>
            {<td>
                <button onClick={(e) => {
                    dispatch(removeShow({ id }))
                }}>Remove</button>
            </td>}
        </tr>

);

export default connect()(HomeListItem);