import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { BsAppIndicator } from 'react-icons/bs';


export const ProfilePage = () => {
    return (
        <div className="mt-4 text-center">
            <h3>
              <span><BsAppIndicator /></span>
              <span> Profile</span>
            </h3>
            <hr />
            
            <Container fluid className='mx-auto mb-3'>
                <p>Here we should siplay some analytics and overall Data about the user</p>
            </Container>

          </div>
    )
}