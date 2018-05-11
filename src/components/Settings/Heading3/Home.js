import React from 'react';
import { Switch } from 'antd'; 

//Actions
import { settingsHome_ToggleListAnimation, settingsHome_ToggleCardAnimation } from '../../../actions/settings';


const SettingsCardAnimation = (props) => (
    <span style={{ marginTop: '1rem' }}>
        <Switch style={{ marginRight: '1rem' }} checked={props.settings.animateCard} size="small" onChange={checked => props.dispatchAction(settingsHome_ToggleCardAnimation({ animateCard: checked }))} />        
        Turn on/off animation for the card view in home.
    </span>
);

const SettingsListAnimation = (props) => (
    <span style={{ marginTop: '1rem' }}>
        <Switch style={{ marginRight: '1rem' }} checked={props.settings.animateList} size="small" onChange={checked => props.dispatchAction(settingsHome_ToggleListAnimation({ animateList: checked }))} />        
        Turn on/off animation for the list view in home.
    </span>
);


export const SettingsAnimation = (props) => (
    <div>
        <h3 id="animation">
            <a href="#animation" className="anchor">#</a>        
            <span>Animation</span>&nbsp;
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsCardAnimation settings={props.settings} dispatchAction={props.dispatchAction}/>
            <SettingsListAnimation settings={props.settings} dispatchAction={props.dispatchAction}/>
        </div>
    </div>
);


