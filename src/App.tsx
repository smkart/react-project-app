import './App.css';

import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomePage from './home/HomePage';
import ProjectPage from './projects/ProjectPage';
import ProjectsPages from './projects/projects';
import React from 'react';

// import logo from './logo.svg';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Test React
    //     </a>
    //   </header>
    // </div>
    // <blockquote cite='Benjamin Franklin' >
    //   <ProjectsPages/>
    // </blockquote>

    <Router>
      <header>
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/"  className="button rounded">
        <span className="icon-home"></span>
        Home
        </NavLink>
        <NavLink to="/projects"  className="button rounded">
        <span className="icon-home"></span>
        Projects
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/projects" element={<ProjectsPages />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
