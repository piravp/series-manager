import React from 'react';
import { Button, Tooltip, Upload, Icon, message } from 'antd'; 
import moment from 'moment';
import downloadjs from 'downloadjs'

const Dragger = Upload.Dragger;

// Local
import { setAPIKey } from '../../../utils/localStorage';

const props = {
    disabled: true,
    name: 'file',
    multiple: false,
    action: '/settings',
    accept: '.json',
    onChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };


export const SettingsUpload = () => (
    <div>
        <h3 id="upload">
            <a href="#upload" className="anchor">#</a>        
            <span>Upload</span>&nbsp;
        </h3>
        <span>
            <div style={{width: '500px'}}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single JSON file with all your shows, collections, settings, calendar- and timeline events.</p>
                </Dragger>
            </div>
            Upload your collection of series as a JSON formatted file.
        </span>
    </div>
);


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