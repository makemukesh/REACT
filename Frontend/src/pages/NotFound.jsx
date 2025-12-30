import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <div className="notfound-icon">404</div>
                <h1>Oops! Page Not Found</h1>
                <p>The road you're looking for doesn't exist. Maybe you took a wrong turn?</p>
                <Link to="/" className="btn-return-home">Back to Safety</Link>
            </div>
        </div>
    );
};

export default NotFound;
