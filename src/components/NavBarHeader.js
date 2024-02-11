import { Navbar, Container, Button } from 'react-bootstrap';
import { signInWithGoogle, signOut } from '../authentication';
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
              >
                Logout
              </Button>
              :
              <Button className="ms-auto" variant="outline-primary" 
                onClick={signInWithGoogle}
              >
                Login
              </Button>
            } 
          </Container>
      </Navbar>
    )
}