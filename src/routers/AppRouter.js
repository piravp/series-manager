import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// Custom components
import HomePage from '../components/HomePage';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import SearchPage from '../components/SearchPage';


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/search" component={SearchPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;