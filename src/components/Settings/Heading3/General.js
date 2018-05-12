import React from 'react';
import { Button, Tooltip } from 'antd'; 
import moment from 'moment';
import downloadjs from 'downloadjs'

// Local
import { setAPIKey } from '../../../utils/localStorage';


export const SettingsAddKey = () => (
    <div>
        <h3 id="add-key">
            <a href="#add-key" className="anchor">#</a>        
            <span>Add API key</span>&nbsp;
        </h3>
        <span>
            <div>
                <Button onClick={(e) => {
                    const key = prompt('Please provide API key here')
                    setAPIKey(key)
                }}
                type="primary"
                ghost
                >
                    Add key
                </Button>
            </div>
            Add your API key here. An API key from TMDb is required to use the app. It's free and only take a minute. 
        </span>
    </div>
);

export const SettingsDownload = (props) => (
    <div>
        <h3 id="download">
            <a href="#download" className="anchor">#</a>        
            <span>Download</span>&nbsp;
        </h3>
        <span>
            <div>
                <Button onClick={(e) => {
                    downloadjs( JSON.stringify(props.series), `TDS-${moment().format('YYYYMMDD')}.json`, 'text/json')
                }}
                disabled={props.seriesListItems === 0}
                type="primary"
                ghost
                >
                    Download
                </Button>
            </div>
            Download your collection of series as a JSON formatted file.
        </span>
    </div>
);