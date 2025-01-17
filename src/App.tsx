import React from 'react';
import {Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';

//Использую HashRouter для корректной работы приложения при использовании GitHub Pages

const App: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/*" element={<NotFoundPage/>} />
            </Routes>
        </div>
    );
};

export default App;
