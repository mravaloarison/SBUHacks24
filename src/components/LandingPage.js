import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { FeatureCard } from './FeaturedCard';
import { signInWithGoogle } from '../authentication';



export const LandingPage = () => {
    
    return (
        <div className="mt-4 text-center">
            <h3>
              <span> Welcome to Slay The Interview</span>
            </h3>
            <hr />
            <p className='mb-4'>Be more confident with your next job Interview using our AI based trainer.</p>
            
            <Container fluid className='mx-auto mb-3'>
                <Row>
                    <FeatureCard
                        icon="🌐"
                        title="AI-Generated Questions"
                        description="Experience cutting-edge technology as QPrep generates dynamic and relevant interview questions tailored to your industry and career level."
                    />
                    <FeatureCard
                        icon="🧠"
                        title="Personalized Training"
                        description="Elevate your interview skills with personalized coaching. Receive instant feedback, tips, and strategies to refine your responses and stand out from the crowd."
                    />
                </Row>
                <Row>
                    <FeatureCard
                        icon="🔥"
                        title="Realistic Simulations"
                        description="Immerse yourself in lifelike interview simulations that replicate the pressure of real-world scenarios. Practice makes perfect, and QPrep makes practicing enjoyable."
                    />
                    <FeatureCard
                        icon="🚀"
                        title="Seamless Integration"
                        description="Effortlessly sync your progress across devices. Your personalized training experience is just a click away, anytime, anywhere."
                    />
                </Row>
            </Container>

            <Button size='lg' variant='outline-primary' onClick={signInWithGoogle}>Continue with Google</Button>
          
            <div className='mb-3'></div>
          </div>
    )
}