import React from 'react';
import { connect } from 'react-redux';

import HomeListItem from './HomeListItem';
import selectSeries from '../../selectors/series';
import HomeSeriesFilter from './HomeSeriesFilter';


const HomePage = (props) => (
        <div>
            <HomeSeriesFilter />
            <div className="tableContainer">
                {
                    props.series.length===1 ? 
                        <p>Showing 1 show.</p> :
                        <p>Showing {props.series.length} shows.</p>
                }


                <table>
                    <tbody>
                        {/*Row*/}
                        <tr className="col-labels">
                            <th>#</th>
                            <th></th>    
                            <th>Show</th>
                            <th>Rating</th>
                            <th>First Air Date</th>
                            <th>Clear</th>
                        </tr>
                        {props.series.map((show, index) => {
                                return <HomeListItem  key={show.id} index={index+1} {...show}/>
                            })
                        }
                    </tbody>
                </table>
                {props.series.length === 0 && <p>Add some series</p>}
            </div>
        </div>
);

const mapStateToProps = (state) => {
    return {
        series: selectSeries(state.series, state.filters)
    }
};

export default connect(mapStateToProps)(HomePage);