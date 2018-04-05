import React from 'react';

import SeriesList from './SeriesList';
import Header from './Header';
import SearchBar from './SearchBar';
import Toolbar from './Toolbar';
import TMDBConfiguration from './TMDBConfiguration';
export default class MainPage extends React.Component {
    
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
                <Toolbar handleSearch={this.handleSearch} 
                         searchTerm={this.state.searchTerm}
                         handleOnSearchSubmit={this.handleOnSearchSubmit}/>


                <SearchBar searchTerm={this.state.searchTerm} 
                            submitted={this.state.submitted}
                            resetSubmitted={() => this.setState({ submitted: false })}/>




            </div>
        )
    }
};

//<TMDBConfiguration />