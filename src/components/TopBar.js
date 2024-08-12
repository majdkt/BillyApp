import React from 'react';
import PropTypes from 'prop-types';
import '../css/TopBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

function TopBar({ title, onLogout, onProfileNavigate }) {
    return (
        <header className="TopBar">
            <button className="icon-button" onClick={onProfileNavigate}>
                <FontAwesomeIcon icon={faUser} />
            </button>
            <h1>{title}</h1>
            <button className="icon-button" onClick={onLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
        </header>
    );
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
    onProfileNavigate: PropTypes.func.isRequired,
};

export default TopBar;
