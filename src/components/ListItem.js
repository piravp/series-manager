import React from 'react';

const IMAGE_BASE_URI = 'http://image.tmdb.org/t/p/w185/';

const ListItem = ({index, poster_path, name, vote_avg, vote_count}) => (
       
        <tr>
            <td>{index}</td>
            <td>
                {poster_path && <img src={`${IMAGE_BASE_URI}${poster_path}`} width="60"></img>}
            </td>
            <td>{name}</td>
            <td>{vote_avg}</td>
            <td>{vote_count}</td>
        </tr>

);

export default ListItem;