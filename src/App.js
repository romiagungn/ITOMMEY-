import React from "react";
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './components/Layout/Index';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <AppLayout/>
        </BrowserRouter>
    );
}

export default App;