import React from 'react';
import { Icon, Divider } from 'antd';

const Footer = () => (
    <div className="footerContainer">
        <Divider type="horizontal"/>
        <footer>
            
            <div className="footerRow">
                <h4>General</h4>
                <a><Icon type="team" />&nbsp;&nbsp;About us</a>
                <a><Icon type="phone" />&nbsp;&nbsp;Contact</a>               
            </div>
            
            <div className="footerRow">
                <h4>Social media</h4>
                <a><Icon type="github" />&nbsp;&nbsp;GitHub</a>
                <a><Icon type="youtube" />&nbsp;&nbsp;YouTube</a>                            
            </div>
            
        </footer>
        
    </div>
);

export default Footer;