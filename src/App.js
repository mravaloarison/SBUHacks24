import { Container } from 'react-bootstrap';
import { Recording } from './components/Recording';
import { NavBarHeader } from './components/NavBarHeader';
import { LandingPage } from './components/LandingPage';
import {ProfilePage} from './screens/ProfilePage';
import {DashboardPage} from './screens/DashboardPage';

import './global.css';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const userName = sessionStorage.getItem('user');

  return (
    <div className="App">
      <Router>
        <NavBarHeader  className="clickeable" />
        <Container fluid className='mx-auto col-md-8'>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/interview" element={<Recording />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Container>

        <footer className="py-3" style={{ position: "absolute", bottom: 0, width: "100vw" }}>
          <Container className='text-center'>
            <small className="text-muted">&copy; 2024 by Us</small>
          </Container>
        </footer>
      </Router>
    </div>
  );
}

export default App;