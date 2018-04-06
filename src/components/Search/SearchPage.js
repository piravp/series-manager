import React from 'react';

import SeriesList from './SeriesList';
import SeriesListRenderer from './SeriesListRenderer';
import SearchBar from './SearchBar';


export default class SearchPage extends React.Component {
    
    state = {
        searchTerm: "",
        submitted: false
    }
    
    handleSearch = (e) => {
        const value = e.target.value;

        if(this.state.submitted) {
            this.setState({
                   searchTerm: value, 
                   submitted: false
            });
        }
        
        this.setState({ searchTerm: value });
    };

    handleOnSearchSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
    }

    render() {
        return (
            <div>
                <SearchBar handleSearch={this.handleSearch} 
                         searchTerm={this.state.searchTerm}
                         handleOnSearchSubmit={this.handleOnSearchSubmit}/>


                <SeriesListRenderer searchTerm={this.state.searchTerm} 
                                    submitted={this.state.submitted}
                                    resetSubmitted={() => this.setState({ submitted: false })}/>




            </div>
        )
    }
};

//<TMDBConfiguration />