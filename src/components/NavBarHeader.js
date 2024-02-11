import { Navbar, Container, Button } from 'react-bootstrap';
import { signInWithGoogle, signOut } from '../authentication';
<<<<<<< HEAD
import { BsAppIndicator } from 'react-icons/bs';

export const NavBarHeader = () => {
    const userName = sessionStorage.getItem('user');
    return (
      <Navbar className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand><BsAppIndicator /> InsightAssist</Navbar.Brand>
            {userName ? 
              <Button className="ms-auto" variant="outline-secondary" 
                onClick={signOut}
=======
import { useNavigate } from 'react-router-dom';

export const NavBarHeader = () => {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem('user');


  const handleLogin = () => {
    signInWithGoogle(navigate);
  };

  const handleLogout = () => {
    signOut(navigate);
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand
          onClick={() => navigate('/dashboard')}
        >
          InsightAssist
        </Navbar.Brand>
        {userName ?
          (
            <div className="ms-auto">
        
        <a className="linkStyle" onClick={handleProfile}>
          Profile
        </a>
              {/* Some pdding */}
              <Button className="" variant="outline-secondary"
                onClick={handleLogout}
>>>>>>> origin/main
              >
                Logout
              </Button>

            </div>

          )
          :
          (
            <>

              <Button className="ms-auto" variant="outline-primary"
                onClick={handleLogin}
              >
                Login
              </Button>
            </>
          )
        }
      </Container>
    </Navbar>
  )
}