import { Container } from 'react-bootstrap';
import { Recording } from './components/Recording';
import { Profile } from './pages/Profile';
import { NavBarHeader } from './components/NavBarHeader';
import { LandingPage } from './components/LandingPage';

function App() {
  const userName = sessionStorage.getItem('user');
  const NotLandingPage = () => {
    return (
      <>
        {sessionStorage.getItem('actualQuestion') ? <Recording /> : <Profile />}
      </>
    )
  }

  return (
    <div className="App">
      <NavBarHeader />
      <Container fluid className='mx-auto col-md-8'>
        {userName ? <NotLandingPage /> : <LandingPage />}
      </Container>
      
      {/* Footer at the bottom of the page */}
      <footer className="py-3" style={{ position: "absolute", bottom: 0, width: "100vw" }}>
        <Container className='text-center'>
          <small className="text-muted">&copy; 2024 by Us</small>
        </Container>
      </footer>
    </div>
  );
}

export default App;