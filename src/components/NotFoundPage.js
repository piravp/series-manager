import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div className="notFoundPage">
        <h1> Seems like you triggered a 404...#thuglyfe</h1>
		    <img src="http://i.imgur.com/dixIICo.jpg" height="820 width="520">
		    <div style="position:relative;width:267px;height:25px;overflow:hidden;">
        <div style="position:absolute;top:-276px;left:-5px">
            <iframe width="0" height="0" 
                src="https://www.youtube.com/embed/U_ZUQhySsnk?rel=0&loop=1&autoplay=1">
            </iframe>
        </div>
        <p>Sorry, this site doesn't exist. Navigate to the <Link to="/">&nbsp;home page</Link>.</p>
    </div>
);

export default NotFoundPage;
