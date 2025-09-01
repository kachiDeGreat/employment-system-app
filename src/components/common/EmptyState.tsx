import React from 'react';
import { Card } from 'react-bootstrap';
import { Archive } from 'lucide-react';

interface EmptyStateProps {
    message: string;
    details?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, details }) => {
    return (
        <Card className="text-center py-5" style={{borderStyle: 'dashed'}}>
            <Card.Body>
                <Archive size={48} className="text-secondary mb-3" />
                <h4 className="text-secondary">{message}</h4>
                {details && <p className="text-muted">{details}</p>}
            </Card.Body>
        </Card>
    );
};