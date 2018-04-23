import React, { Component } from 'react';
import Slider from 'react-slick';
import { Tag } from 'antd';

// Import local constants and components
import { PROFILE_IMG_185, POPULAR_BASE_URL } from '../../../config';
import config from '../../../config.json';
import { doRequest, getGenre } from '../../utils/utilities';

// Declare local constants
const { api_key: API_KEY } = config;

// Methods
const randomHexColor = () => {
    return '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
};

const PopularItem = (props) => {
    const { name, overview, poster_path, genre_ids } = props.showInfo;
    const { genresDict, index } = props;
    return (
        <div className="popularItemContainer">
            <div>

                <h2>{index}. {name}</h2>
                <img alt={name} src={`${PROFILE_IMG_185}${poster_path}`} />
            </div>
            <div className="popularItemTags">
                {genre_ids && genre_ids.map(id => (
                    <Tag key={id} color={randomHexColor()}>{getGenre(genresDict, id)}</Tag>
                ))}
            </div>
            <div>
                {/*<p>{overview}</p>*/}
                <div>{props.showInfo.genresDict && getGenre(props.showInfo.genresDict, props.showInfo.genre_ids[0])}</div>
            </div>
        </div>
    )
};

export default class PopularPage extends Component {
    state = {
        popularShows: undefined,
        total_pages: undefined,
        total_results: undefined,
        genresDict: undefined
    }
    
    componentDidMount() {
        //Get general details
        doRequest(`${POPULAR_BASE_URL}?api_key=${API_KEY}&language=en-US`, (response) => {
            console.log(response);
            
            this.setState({ 
                popularShows: response.results,
                total_pages: response.total_pages,
                total_results: response.total_results,
            });
        });

        // TODO: Get genres
        //Do a GET request to get the id:genre-name mapping. Then create a dictionary using this.
        doRequest(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`, ({genres}) => {
            this.setState({ 
                ...this.state,
                genresDict: genres
            });
          });


    };
    
    render() {

        const settings = {
            dots: true,
            infinite: false,
            speed: 400,
            slidesToShow: 3,
            slidesToScroll: 1
          };
        return (
            <div className="mainPopularContainer">
            {
                this.state.popularShows && 
                    <Slider className="sliderContainer" {...settings}>
                        {
                            this.state.popularShows && this.state.popularShows.map((item, index) => (
                                <PopularItem key={item.id} index={index+1} showInfo={item} genresDict={this.state.genresDict && this.state.genresDict}/>

                            ))
                            
                        }
                    </Slider>
            }
                
            


                
            </div>
        );
    }
};

