import React from 'react';
import PropTypes from 'prop-types';
import '../css/TopBar.css';

function TopBar({ title }) {
    return (
        <header className="TopBar">
            <h1>{title}</h1>
        </header>
    );
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TopBar;
