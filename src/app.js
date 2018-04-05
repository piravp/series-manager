import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Custom components
import MainPage from './components/MainPage';

// Styles
import './styles/styles.scss';

const SearchComp = () => (
    <div>
        This is the search page
    </div>
);

const NotFoundPage = () => (
    <div>
        404!
    </div>
);

const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={MainPage} exact />
            <Route path="/search" component={SearchComp} />
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);


ReactDOM.render(routes, document.getElementById('app'));