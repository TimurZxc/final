import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar';
import HomePage from './components/Home';
import SignupPage from './components/Signup';
import CreatePostPage from './components/CreatePost';
import MyPosts from './components/MyPosts'
import './styles/main.css'
import {
    BrowserRouter as Router, Routes, Route
} from 'react-router-dom'
import LoginPage from './components/Login';

const App = () => {

    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/create" element={<CreatePostPage />} />
                </Routes>
            </div>
        </Router>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);