import React from 'react';
import { Icon, Divider } from 'antd';

const Footer = () => (
    <div className="footerContainer">
        <Divider type="horizontal"/>
        <footer>
            <div className="footerInner">
            <div className="footerCol">
                <h4>General</h4>
                <a href="/about"><Icon type="team" />&nbsp;&nbsp;About</a>
                <a href="/settings"><Icon type="setting" />&nbsp;&nbsp;Settings</a>                             
            </div>
            
            <div className="footerCol">
                <h4>Social media</h4>
                <a href="https://github.com/piravp/series-manager"><Icon type="github" />&nbsp;&nbsp;GitHub</a>
                <a href="https://youtu.be/mGudgU-Nn2U"><Icon type="youtube" />&nbsp;&nbsp;YouTube</a>                            
            </div>
            </div>

            <img className="poweredBy" width="140" src="https://www.themoviedb.org/static_cache/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png" />
            <a className="designedBy" target="_blank" href="https://github.com/piravp/series-manager">Designed and developed by Piraveen P</a>
        </footer>
        
    </div>
);

export default Footer;