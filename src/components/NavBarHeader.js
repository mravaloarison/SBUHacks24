import { Navbar, Container, Button } from 'react-bootstrap';
import { signInWithGoogle, signOut } from '../authentication';
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

  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>InsightAssist</Navbar.Brand>
        {userName ?
          <Button className="ms-auto" variant="outline-secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
          :
          <Button className="ms-auto" variant="outline-primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        }
      </Container>
    </Navbar>
  )
}