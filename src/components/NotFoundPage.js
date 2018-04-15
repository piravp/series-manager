import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div className="notFoundPage">
        Sorry, this site doesn't exist. Navigate to the <Link to="/">&nbsp;home page</Link>.
    </div>
);

export default NotFoundPage;