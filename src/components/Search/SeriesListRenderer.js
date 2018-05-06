import React from 'react';
import axios from 'axios';
import { Spin } from 'antd';

// Custom components
import SeriesList from './SeriesList';

// Config
import { API_KEY } from '../../../configKey'

// Constants
const BASE_URL = 'https://api.themoviedb.org/3'
const SEARCH = `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=`; 
export default class SeriesListRenderer extends React.Component {
    
    state = {
        result: [],
        loading: false
    }

    getSearchResults = (callback, page=1) => {
        
        const { searchTerm } = this.props;

        // If search term is provided
        if(searchTerm){
            let result = "";
            axios.get(`${SEARCH}${searchTerm}&page=${page}`).then(function(response){
                //result = response.data.results;
                //callback(result);
                callback(response);
                console.log("Shows: ",response);
              }).catch(function(error){
                console.log(error);
              });
              // Prevent requests being sent continously right after the user pressed enter
              // by resetting the submitted inside SearchPage's state
              this.props.resetSubmitted();

        }
    };
    
    componentDidUpdate() {
        // User pressed enter
        if(this.props.submitted){
            this.setState({ loading: true });
            
            this.getSearchResults((response) => {
                
                this.setState({
                    result: response.data.results,
                    totalResults: response.data.total_results,
                    totalPages: response.data.total_pages
                });
                //console.log(response);

                // Check if there are more than 10 results = (1 page)
                if (response.data.total_results > 10) {
                    // Query rest of the results in a loop
                    for (let i=2; i <= response.data.total_pages; i++ ){
                        this.getSearchResults((response) => {
                
                            this.setState((prevState) => { 
                                return {
                                    result: prevState.result.concat(response.data.results)
                            }});
                        }, i);
                    }
                };
                // Hide spinner
                this.setState({ loading: false }) ;
            });
        }
    };

    render() {
        return (
            <div className="seriesListResultContainer">
            {this.state.loading && <Spin className="spinner"/>}
                {
                    this.state.result.length > 0 ? <SeriesList shows={this.state.result}/> : <p>Uh-oh, no results to show. Perform a search to get going!</p>
                }

            </div>
        )
    }
}