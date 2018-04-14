import React, { Component } from 'react';
import { Modal, Button, Divider, Tag } from 'antd'; 
import { doRequest } from '../../utils/utilities';

import config from '../../../config.json';
const { PROFILE_IMG_185, api_key: API_KEY } = config;
const DETAILS_BASE_URL = `https://api.themoviedb.org/3/tv/`


const NOT_AVAILABLE = (
    <span className="dataNotAvailable">Not available</span>
);

export default class HomeDetailsModal extends Component {
  state = { 
      visible: true,
      detailedResponse: {
          generalDetails: undefined,
          credits: undefined,
          keywords: undefined
      }
    }
    
    getDetailedResponse = () => {
        //Get general details
        doRequest(`${DETAILS_BASE_URL}${this.props.modalShowId}?api_key=${API_KEY}&language=en-US`, (response) => {
            //console.log(response);
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

        // Find trailer (https://developers.themoviedb.org/3/tv/get-tv-videos)
    }

    componentDidMount(){
        this.setState({
            visible: true,
          });
          console.log(`HomeDetailsModal was mounted, showing show with id ${this.props.modalShowId}`)
          

          this.getDetailedResponse();
          
    }

    //------------For testing purposes
    componentDidUpdate() {
        console.log('State: ', this.state)
    };
    //-------------------------------

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });

    this.props.closeModalInParent();
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });

    //Update state in parent
    this.props.closeModalInParent();
  }
  render() {
      const { generalDetails, credits, keywords } = this.state.detailedResponse;
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
            <div>
                <h3>Description</h3>
                <p>{generalDetails ? generalDetails.overview : NOT_AVAILABLE}</p>
                <Divider type="horizontal" />
            </div>
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
                <div  key={person.id}>
                    
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

        </div>
        </Modal>
      </div>
    );
  }
}