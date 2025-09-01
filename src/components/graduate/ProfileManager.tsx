// Graduate - Profile Manager
// This is a simplified ProfileManager. A real-world app would have more complex state handling.
import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUserProfile } from '../../features/auth/authSlice';
import { GraduateProfile } from '../../types';

export const ProfileManager: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector(state => state.auth);
    const [profile, setProfile] = useState<GraduateProfile>({
        university: '', degree: '', graduationYear: new Date().getFullYear(), skills: []
    });
    const [skillsInput, setSkillsInput] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (currentUser?.profile) {
            const currentProfile = currentUser.profile as GraduateProfile;
            setProfile(currentProfile);
            setSkillsInput(currentProfile.skills.join(', '));
        }
    }, [currentUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };
    
    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkillsInput(e.target.value);
        setProfile({ ...profile, skills: e.target.value.split(',').map(s => s.trim()) });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentUser) {
            dispatch(updateUserProfile({ userId: currentUser.id, profileData: profile }));
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        }
    };

    return (
        <div>
            <h3 className="mb-4">Manage Your Profile</h3>
            <Card>
                <Card.Body>
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>University</Form.Label>
                            <Form.Control type="text" name="university" value={profile.university} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Degree</Form.Label>
                            <Form.Control type="text" name="degree" value={profile.degree} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Graduation Year</Form.Label>
                            <Form.Control type="number" name="graduationYear" value={profile.graduationYear} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Skills (comma-separated)</Form.Label>
                            <Form.Control type="text" name="skills" value={skillsInput} onChange={handleSkillsChange} />
                        </Form.Group>
                        <Button type="submit">Save Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};