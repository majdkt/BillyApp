// src/components/TopBar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/TopBar.css';

const TopBar = ({ title, onLogout, onProfileNavigate }) => {
    return (
        <div className="TopBar">
            <button className="icon-button" onClick={onProfileNavigate} aria-label="Profile">
                <FontAwesomeIcon icon={faUser} />
            </button>
            <h1>{title}</h1>
            <button className="icon-button" onClick={onLogout} aria-label="Logout">
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
        </div>
    );
};

export default TopBar;
