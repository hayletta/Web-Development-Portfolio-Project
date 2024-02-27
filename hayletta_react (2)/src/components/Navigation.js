import React from "react";
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <div></div>
            <Link to="/add-exercise">Create Exercise</Link>
        </nav>
    )
}

export default Navigation;