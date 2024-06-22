import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from "./App.jsx";
import Login from "./Login.jsx";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/:email" element={<Login />}/>
        </Routes>
    );
}

export default Routing;