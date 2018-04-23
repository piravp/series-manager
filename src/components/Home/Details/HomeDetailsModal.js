import React, { Component } from 'react';
import { Modal, Button, Divider, Tag } from 'antd'; 
import { doRequest } from '../../../utils/utilities';

import config from '../../../../config.json';
import { POSTER_IMG_154, PROFILE_IMG_185, DETAILS_BASE_URL } from '../../../../config';
import SimilarShow from './SimilarShow';

const { api_key: API_KEY } = config;
const NOT_AVAILABLE = (
    <span className="dataNotAvailable">Not available</span>
);

export default class HomeDetailsModal extends Component {
  state = { 
      visible: true,
      detailedResponse: {
          generalDetails: undefined,
          credits: undefined,
          keywords: undefined,
          similarShows: undefined
      },
      showSimilarShows: false
    }
    
    getDetailedResponse = () => {
        //Get general details
        doRequest(`${DETAILS_BASE_URL}${this.props.modalShowId}?api_key=${API_KEY}&language=en-US`, (response) => {
            console.log(response);
            this.setState({ 
                detailedResponse: {
                    generalDetails: response
                } 
            });
        });

        // Get details about the actors
        doRequest(`${DETAILS_BASE_URL}${this.props.modalShowId}/credits?api_key=${API_KEY}&language=en-US`, (response) => {
            //console.log(response);
            this.setState((prevState) => { 
                return {
                    detailedResponse: {
                        ...prevState.detailedResponse,
                        credits: response.cast
                    } 
                }
            });
        });


        // Get keywords related to the show
        //TODO: Show tags using antd tags component
        // Get details about the actors
        doRequest(`${DETAILS_BASE_URL}${this.props.modalShowId}/keywords?api_key=${API_KEY}&language=en-US`, (response) => {
            //console.log(response);
            this.setState((prevState) => { 
                return {
                    detailedResponse: {
                        ...prevState.detailedResponse,
                        keywords: response.results
                    } 
                }
            });
        });

        // Find similar shows (https://developers.themoviedb.org/3/tv/get-tv-recommendations)
        doRequest(`${DETAILS_BASE_URL}${this.props.modalShowId}/similar?api_key=${API_KEY}&language=en-US`, (response) => {
            //console.log(response);
            this.setState((prevState) => { 
                return {
                    detailedResponse: {
                        ...prevState.detailedResponse,
                        similarShows: response.results
                    } 
                }
            });
        });


        // TODO: Find trailer (https://developers.themoviedb.org/3/tv/get-tv-videos)
    }

    componentDidMount(){
        this.setState({
            visible: true,
          });
          console.log(`HomeDetailsModal was mounted, showing show with id ${this.props.modalShowId}`)
          

          this.getDetailedResponse();
          
    }

    //------------For testing purposes
    // componentDidUpdate() {
    //     console.log('State: ', this.state)
    // };
    //-------------------------------

  handleOk = (e) => {
    this.setState({
      visible: false
    });

    this.props.handleCloseModalInParent();
  }
  handleCancel = (e) => {
    //console.log(e);

    this.setState({
      visible: false
    });

    //Update state in parent
    this.props.handleCloseModalInParent();
  }
  render() {
      const { generalDetails, credits, keywords, poster_path } = this.state.detailedResponse;
    return (
      <div className="detailContainer">
        <Modal
          title={generalDetails ? generalDetails.name : NOT_AVAILABLE}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        {/**/}
        <div className="modalElementsContainer">
            <div className="descriptionImageContainer">
                {generalDetails && generalDetails.poster_path && <img src={`${POSTER_IMG_154}${generalDetails.poster_path}`}/>}
                <div className="descriptionContainer">
                    <h3>Description</h3>
                    <p>{generalDetails ? generalDetails.overview : NOT_AVAILABLE}</p>
                </div>
            </div>
            <Divider type="horizontal" />
            <div className="generalInfoModal">
                <div>
                    <h3>Seasons</h3>
                    <p>{generalDetails ? generalDetails.seasons.length : NOT_AVAILABLE}</p>
                </div>
                <Divider type="vertical" />
                <div>
                    <h3>Type</h3>
                    <p>{generalDetails ? generalDetails.type : NOT_AVAILABLE}</p>
                </div>
                <Divider type="vertical" />
                <div>
                    <h3>In production</h3>
                    <p>{generalDetails ?  (generalDetails.in_production ? "Yes" : "No") : NOT_AVAILABLE}</p>
                </div>
                <Divider type="vertical" />
                <div>
                    <h3>Status</h3>
                    <p>{generalDetails ?  generalDetails.status : NOT_AVAILABLE}</p>
                </div>
                <Divider type="vertical" />
                <div>
                    <h3>First Air Date</h3>
                    <p>{generalDetails ?  generalDetails.first_air_date : NOT_AVAILABLE}</p>
                </div>
                <Divider type="vertical" />
                <div>
                    <h3>Last Air Date</h3>
                    <p>{generalDetails ?  generalDetails.last_air_date : NOT_AVAILABLE}</p>
                </div>
            </div>
            <Divider type="horizontal" />
            <h3>Cast</h3>
            <div className="creditsCastContainer">
            {credits ? credits.map(person => (
                <div key={`${person.id}${person.profile_path}`}>
                    
                    <p>{person.name} as {person.character}</p>
                    {person.profile_path && <img src={`${PROFILE_IMG_185}${person.profile_path}`} width="60"></img>}
                      
                </div>
            )) : NOT_AVAILABLE}
            </div>
            <Divider type="horizontal" />
            <h3>Keywords</h3>
            <div className="keywordContainer">
                {
                    keywords ? keywords.map(keyword => (
                        <Tag key={keyword.id}>{keyword.name}</Tag>
                    )) : NOT_AVAILABLE
                }
            </div>
            <Divider type="horizontal" />
            <div className="similarShowsParentContainer" >
                <h3>Similar Shows</h3>
                <Button onClick={(e) => this.setState((prevState) => {
                    return {
                        showSimilarShows: !prevState.showSimilarShows
                    }
                })}>{this.state.showSimilarShows ? "Hide similar shows" : "Show similar shows"}</Button>
            </div>

            {this.state.showSimilarShows && <SimilarShow similarShows={this.state.detailedResponse.similarShows}/>}
        </div>
        </Modal>
      </div>
    );
  }
}