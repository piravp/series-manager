import React from 'react';
import { Anchor, Tag, Divider } from 'antd';
const { Link } = Anchor;

const AboutPage = () => (
    <div className="aboutPageContainer">

        <Anchor showInkInFixed affix={false}>
            <Link href="#credit" title="Credit" />
            <Link href="#faq" title="FAQ">
                <Link href="#what-is-tds" title="What is TDS?" />
                <Link href="#technology" title="What technology lies behind TDS?" />
                <Link href="#open-source" title="Is the project open source?" />                
                <Link href="#feature-request" title="How do I request a feature?" />
            </Link>
            <Link href="#known-issues" title="Known issues" />            
        </Anchor>

        <div className="aboutPageContent">
            <h1>About</h1>
            The Designated Show (TDS) is a series manager aimed at the professional binge-watcher. 
            TDS lets you find and keep track of all the series you have going on. Since the app is powered by 
            TMDb, it is able to offer a wide range of series to choose from. You might even find series on your own language.


            <Divider type="horizontal"/>
            <h2 id="credit">
                <a href="#credit" className="anchor">#</a>                
                <span>Credits</span>&nbsp;
            </h2>
            <img width="200" height="78" src="https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png" />
            

            <Divider type="horizontal"/>
            <h2 id="faq">
                <a href="#faq" className="anchor">#</a>
                <span>FAQ</span>&nbsp;
            </h2>

                <div>
                <h3 id="what-is-tds">
                    <a href="#what-is-tds" className="anchor">#</a>        
                    <span>What is TDS?</span>&nbsp;
                </h3>
                <span>
                    The Designated Show is a series manager aimed at the professional binge-watcher. 
                    TDS lets you find and keep track of all the series you have going on.
                </span>
                </div>

                <div>
                <h3 id="technology">
                    <a href="#technology" className="anchor">#</a>        
                    <span>What technology lies behind TDS?</span>&nbsp;
                </h3>
                <span>
                    The application is built using React for UI rendering and Redux for state management. The nice looking components are provided by Ant Design.
                    There are several other open-source components being used, a complete list can be found in this project's code base, inside the <i>package.json</i> file.
                    <br/><br/>
                    TDS is fully client-side. What this means is that apart from doing API calls against TMDb when you want to find a new series, everything is kept on your
                    local machine which eliminates the need for a server. 
                </span>
                </div>


                <div>
                <h3 id="open-source">
                    <a href="#open-source" className="anchor">#</a>        
                    <span>Is TDS open-source?</span>&nbsp;
                </h3>
                    <span>
                    Yes! You can visit the project repository <a target="_blank" href="https://www.github.com/piravp/series-manager">here</a>.
                    </span>
                </div>


                <div>
                <h3 id="feature-request">
                    <a href="#feature-request" className="anchor">#</a>        
                    <span>How do I request a feature?</span>&nbsp;
                </h3>
                    <span>
                    Features can be requested by filing an issue on this project's <a target="_blank" href="https://github.com/piravp/series-manager">GitHub page</a>.
                    Mark the issue with the <Tag style={{width: '9rem', color: 'white'}} color="#006b75">enhancement</Tag>label.
                    Similarily, bugs can be reported only with the <Tag style={{color: 'white'}} color="#d73a4a">bug</Tag>label instead.
                    </span>
                </div>

            <Divider type="horizontal"/>
            <div>
            <h2 id="known-issues">
                <a href="#known-issues" className="anchor">#</a>        
                <span>Known issues</span>&nbsp;
            </h2>
            <span>
                Here are some of the known issues which are yet to be solved. 
                <ul>
                    <li>
                        Manually adding series has not been implemented yet.

                    </li>
                    <li>
                        Sometimes opening the detail page in the home page doesn't fetch the details. 
                        The current fix is to close and re-open the modal (may require several attempts).
                    </li>
                    <li>
                        The list view in the home page shows two empty items even though list is empty. 
                    </li>
                </ul>

                For the complete list, please visit the <a target="_blank" href="https://github.com/piravp/series-manager/issues">GitHub page</a>.
            </span>
            </div>
        </div>
    </div>
);

export default AboutPage;