import React, { useState, useEffect } from 'react';

const Router = ({ routes }) => {
    const [currentPage, setCurrentPage] = useState(window.location.pathname || '/');
    const [queryParams, setQueryParams] = useState(() => {
        const query = new URLSearchParams(window.location.search);
        return Object.fromEntries(query.entries());
    });

    useEffect(() => {
        const handlePopState = () => {
            const pathname = window.location.pathname;
            setCurrentPage(pathname);

            const query = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(query.entries());
            setQueryParams(params);
        };

        handlePopState(); // Call on mount to initialize state with current URL

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const navigate = (path) => {
        window.history.pushState({}, '', path);
        const query = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(query.entries());
        setQueryParams(params);
        setCurrentPage(path.split('?')[0]); // Normalize to just the pathname
    };

    // Normalize currentPage by removing any query parameters
    const normalizedPage = currentPage.split('?')[0];
    const PageComponent = routes[normalizedPage] || routes['/404'];

    return <PageComponent navigate={navigate} queryParams={queryParams} />;
};

export default Router;
