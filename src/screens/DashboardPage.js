import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { BsAppIndicator } from 'react-icons/bs';


export const DashboardPage = () => {
    return (
        <div className="mt-4 text-center">
            <h3>
              <span><BsAppIndicator /></span>
              <span> Dashboard</span>
            </h3>
            <hr />
            <p className='mb-4'>Be more confident with your next job Interview using our AI based trainer.</p>
            
            <Container fluid className='mx-auto mb-3'>
                <p>Here we should siplay some analytics and overall dashboard of questions</p>
            </Container>

          </div>
    )
}