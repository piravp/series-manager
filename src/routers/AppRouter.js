import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// Custom components
import HomePage from '../components/Home/HomePage';
import Header from '../components/Header/Header';
import NotFoundPage from '../components/NotFoundPage';
import SearchPage from '../components/Search/SearchPage';
import PopularPage from '../components/Popular/PopularPage';
import Footer from '../components/Header/Footer';
import CalendarPage from '../components/Calendar/CalendarPage';
import AboutPage from '../components/AboutPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/search" component={SearchPage} />
                <Route path="/popular" component={PopularPage} />
                <Route path="/calendar" component={CalendarPage} />
                <Route path="/about" component={AboutPage} />
                <Route component={NotFoundPage} />
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
);

export default AppRouter;