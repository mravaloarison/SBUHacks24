import { Card } from "react-bootstrap";

export const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="col-md-6 mb-4 text-start">
            <Card>
                <Card.Body>
                <h5 className="card-title">
                    <span>{icon}</span>
                    <span> {title}</span>
                </h5>
                <p className="card-text text-muted">{description}</p>
                </Card.Body>
            </Card>
        </div>
    )
};