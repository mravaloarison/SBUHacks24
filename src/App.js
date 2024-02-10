import { Container } from 'react-bootstrap';
import { Recording } from './components/Recording';
import { NavBarHeader } from './components/NavBarHeader';
import { LandingPage } from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const userName = sessionStorage.getItem('user');

  return (
    <div className="App">
      <Router>
        <NavBarHeader />
        <Container fluid className='mx-auto col-md-8'>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Recording />} />
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