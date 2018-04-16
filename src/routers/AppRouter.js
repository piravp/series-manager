import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// Custom components
import HomePage from '../components/Home/HomePage';
import Header from '../components/Header/Header';
import NotFoundPage from '../components/NotFoundPage';
import SearchPage from '../components/Search/SearchPage';
import PopularPage from '../components/Popular/PopularPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/search" component={SearchPage} />
                <Route path="/popular" component={PopularPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;