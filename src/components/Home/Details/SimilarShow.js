import React, { Component } from 'react';
import { Card, Radio } from 'antd'; 
const { Meta } = Card;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import queryString from 'query-string';

import config from '../../../../config.json';
const { BACKDROP_IMG_300 } = config;


const NOT_AVAILABLE = (
    <span className="dataNotAvailable">Not available</span>
);
/**
 *  This Component is shown inside the HomeDetailsModal. 
 *  It's used to show the user shows that look like the show the user is currently viewing.
 */
export default class SimilarShow extends Component {
    state = {
        n: 3
    }
    
    onChange = (e) => {
        this.setState({ n: e.target.value })
    }

    render() {
        // Deconstruct props
        const { similarShows } = this.props;

        return (
            <div>
            
                { similarShows ?
                    (
                        <div>
                            <div className="chooseSimilarShowsToShow-radioGroup">
                                <RadioGroup onChange={this.onChange} defaultValue="3">
                                    <RadioButton value="3">3</RadioButton>
                                    <RadioButton value="6">6</RadioButton>
                                    <RadioButton value="9">9</RadioButton>
                                    <RadioButton value="12">12</RadioButton>
                                    <RadioButton value="15">15</RadioButton>
                                    <RadioButton value="18">18</RadioButton>
                                    <RadioButton value="20">20</RadioButton>
                                </RadioGroup>
                            </div>
                            {
                            <div className="similarShowInnerContainer">
                            {
                                similarShows.map((show, index) => 
                                {
                                    if(index < this.state.n) {
                                        return (
                                            <a key={show.id} href={`/search?${queryString.stringify({ query: show.name})}`}>
                                                <Card
                                                hoverable
                                                style={{ width: 240 }}
                                                cover={<img alt="example" src={show.backdrop_path && `${BACKDROP_IMG_300}${show.backdrop_path}`} />}
                                                >
                                                    <Meta
                                                        title={show.name}
                                                        description={show.overview}
                                                    />
                                                <span style={{color: '#40a9ff'}}>Find out more</span>
                                                </Card>

                                            </a>
                                            
                                        )
                                    }

                                })
                            }
                            </div>
                            }
                        </div>
                        
                    )
                    : NOT_AVAILABLE
                }
            </div>
        )
    }
};