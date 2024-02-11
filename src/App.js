import { Container } from 'react-bootstrap';
import { Recording } from './components/Recording';
<<<<<<< HEAD
import { Profile } from './pages/Profile';
=======

>>>>>>> origin/main
import { NavBarHeader } from './components/NavBarHeader';
import { LandingPage } from './components/LandingPage';
import { ProfilePage } from './screens/ProfilePage';
import { InterviewPage } from './screens/InterviewPage';

import { DashboardPage } from './screens/DashboardPage';

import './global.css';



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  console.log(user, 'user')
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const userName = sessionStorage.getItem('user');
<<<<<<< HEAD
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
=======
  return (
    <div className="App">
      <Router>
        <NavBarHeader className="clickeable" />
        <Container fluid className='mx-auto col-md-8'>
          <Routes>
            <Route path="/" element={<Recording />} />
            <Route path="recording" element={<Recording />} />
            <Route
              path="interview"
            >
              <Route path="" element={<InterviewPage />} />
              <Route path=":collectionId" element={<InterviewPage />} />

            </Route>

            <Route path=":userId" element={<ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>} />
            <Route path="/profile" element={
              <ProtectedRoute user={userName}>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute user={userName}>
                <DashboardPage />
              </ProtectedRoute>
            } />
          </Routes>
>>>>>>> origin/main
        </Container>

        <footer className="py-3" style={{ position: "absolute", bottom: 0, width: "100vw" }}>
          <Container className='text-center'>
            <small className="text-muted">&copy; 2024 by SBU Hacks</small>
          </Container>
        </footer>
      </Router>
    </div>
  );
}

export default App;