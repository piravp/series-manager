import React from 'react';

import SeriesListItem from './SeriesListItem';

export default class SeriesList extends React.Component {
    render() {
        return (
            <div className="tableContainer">
                <table>
                    <tbody>
                        {/*Row*/}
                        <tr className="col-labels">
                            <th>#</th>
                            <th></th>    
                            <th>Show</th>
                            <th>Rating</th>
                            <th>First Air Date</th>
                            <th>Add to list</th>
                        </tr>
                        {this.props.shows.map((item, index) => {
                                return <SeriesListItem index={index+1} key={item.id} id={item.id} poster_path={item.poster_path} name={item.name} vote_avg={item.vote_average} air_date={item.first_air_date}/>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
};
