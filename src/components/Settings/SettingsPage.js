import React from 'react';
import { Anchor, Tag } from 'antd';
const { Link } = Anchor;
import { connect } from 'react-redux';

import { SettingsAddKey, SettingsDownload } from './Heading3/General';
import { SettingsAnimation, SettingsTimeline } from './Heading3/Home';


const SettingsPage = (props) => {
    return (
        <div className="settingsPageContainer">
    
            <Anchor showInkInFixed affix={false}>
                <Link href="#general" title="General" >
                    <Link href="#add-key" title="Add API key" />
                    <Link href="#download" title="Download data" />
                </Link>   
                <Link href="#home" title="Home" >
                    <Link href="#animation" title="Animation" />
                    <Link href="#timeline" title="Timeline" />
                </Link>
                <Link href="#search" title="Search" /> 
                <Link href="#danger" title="Danger" >
                    <Link href="#remove-everything" title="Remove everything" />            
                </Link>
                      
            </Anchor>
    
            <div className="settingsPageContent">
                <h1>Settings</h1>
    
                <h2 id="general">
                    <a href="#general" className="anchor">#</a>            
                    <span>General</span>&nbsp;
                </h2>
                <SettingsAddKey />
                <SettingsDownload series={props.series}/>
    
    
                <h2 id="home">
                    <a href="#home" className="anchor">#</a>
                    <span>Home</span>&nbsp;
                </h2>
                <SettingsAnimation settings={props.settings} dispatchAction={props.dispatch}/>
                <SettingsTimeline settings={props.settings} dispatchAction={props.dispatch}/>
    
    
                <h2 id="search">
                <a href="#search" className="anchor">#</a>
                <span>Search</span>&nbsp;
                </h2>
    
    
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        series: state.series,
        settings: state.settings
    }
}

export default connect(mapStateToProps)(SettingsPage)