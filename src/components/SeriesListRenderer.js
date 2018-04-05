import React from 'react';
import axios from 'axios';

// Custom components
import SeriesList from './SeriesList';

// Config
import CONFIG from '../../config.json'

// Constants
const API_KEY = CONFIG.api_key;
const BASE_URL = 'https://api.themoviedb.org/3'
const SEARCH = `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=`; 
export default class SeriesListRenderer extends React.Component {
    
    state = {
        result: []
    }

    getSearchResults = (callback) => {
        
        // If search term is provided
        if(this.props.searchTerm){
            let result = "";
            axios.get(SEARCH+this.props.searchTerm).then(function(response){
                result = response.data.results;
                callback(result);
              }).catch(function(error){
                console.log(error);
              });
              this.props.resetSubmitted();
              return result;
        }
    };
    
    componentDidUpdate() {
        // User pressed enter
        if(this.props.submitted){
            this.getSearchResults((response) => {
                
                this.setState({
                    result: response
                });
                //console.log(response);
            });
        }

    };

    render() {
        return (
            <div className="searchContainer">
                {
                    this.state.result.length > 0 ? <SeriesList shows={this.state.result}/> : <p>Uh-oh, no results to show. Perform a search to get going!</p>
                }

            </div>
        )
    }
}