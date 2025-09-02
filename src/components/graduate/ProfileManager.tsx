import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert, Row, Col, Badge } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUserProfile } from "../../features/auth/authSlice";
import { GraduateProfile } from "../../types";
import { Save, Upload, Award, Book, Calendar, MapPin } from "lucide-react";
import styles from "../../styles/GraduateDashboard.module.css";

export const ProfileManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [profile, setProfile] = useState<GraduateProfile>({
    university: "",
    degree: "",
    graduationYear: new Date().getFullYear(),
    skills: [],
    bio: "",
    location: "",
    phone: "",
  });
  const [skillsInput, setSkillsInput] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser?.profile) {
      const currentProfile = currentUser.profile as GraduateProfile;
      setProfile(currentProfile);
      setSkillsInput(currentProfile.skills.join(", "));
    }
  }, [currentUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsInput(e.target.value);
    setProfile({
      ...profile,
      skills: e.target.value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      try {
        dispatch(
          updateUserProfile({ userId: currentUser.id, profileData: profile })
        );
        setSuccess("Profile updated successfully!");
        setError("");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err: any) {
        setError(err.message);
        setSuccess("");
      }
    }
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>My Profile</h3>
        <p className={styles.sectionSubtitle}>
          Manage your professional information and preferences
        </p>
      </div>

      <Row>
        <Col lg={8}>
          <Card className={styles.profileCard}>
            <Card.Header className={styles.cardHeader}>
              <h5 className={styles.cardTitle}>Personal Information</h5>
            </Card.Header>
            <Card.Body>
              {success && (
                <Alert variant="success" className={styles.alert}>
                  {success}
                </Alert>
              )}
              {error && (
                <Alert variant="danger" className={styles.alert}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label className={styles.inputLabel}>
                        Full Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={currentUser?.name || ""}
                        disabled
                        className={styles.formInput}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label className={styles.inputLabel}>
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={currentUser?.email || ""}
                        disabled
                        className={styles.formInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label className={styles.inputLabel}>
                        <MapPin size={16} className="me-2" />
                        Location
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        placeholder="e.g., Port Harcourt, Nigeria"
                        value={profile.location || ""}
                        onChange={handleChange}
                        className={styles.formInput}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label className={styles.inputLabel}>
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="+234 800 000 0000"
                        value={profile.phone || ""}
                        onChange={handleChange}
                        className={styles.formInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.inputLabel}>
                    Bio/Summary
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    placeholder="Write a brief summary about yourself and your career goals..."
                    value={profile.bio || ""}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label className={styles.inputLabel}>
                        <Award size={16} className="me-2" />
                        University
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="university"
                        placeholder="Your university name"
                        value={profile.university}
                        onChange={handleChange}
                        className={styles.formInput}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label className={styles.inputLabel}>
                        <Book size={16} className="me-2" />
                        Degree
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="degree"
                        placeholder="e.g., B.Sc Computer Science"
                        value={profile.degree}
                        onChange={handleChange}
                        className={styles.formInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.inputLabel}>
                    <Calendar size={16} className="me-2" />
                    Graduation Year
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="graduationYear"
                    value={profile.graduationYear}
                    onChange={handleChange}
                    className={styles.formInput}
                    min={2000}
                    max={2030}
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.inputLabel}>
                    Skills & Technologies
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., JavaScript, React, Node.js, Python (comma separated)"
                    value={skillsInput}
                    onChange={handleSkillsChange}
                    className={styles.formInput}
                  />
                  <Form.Text className="text-muted">
                    Separate skills with commas
                  </Form.Text>
                </Form.Group>

                <div className={styles.formActions}>
                  <Button
                    type="submit"
                    variant="primary"
                    className={styles.saveButton}
                  >
                    <Save size={18} className="me-2" />
                    Save Profile
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className={styles.profileSidebar}>
            <Card.Header className={styles.cardHeader}>
              <h5 className={styles.cardTitle}>Profile Preview</h5>
            </Card.Header>
            <Card.Body>
              <div className={styles.previewAvatar}>
                <div className={styles.avatarPlaceholder}>
                  {currentUser?.name?.charAt(0) || "U"}
                </div>
                <h6 className={styles.previewName}>{currentUser?.name}</h6>
                <p className={styles.previewTitle}>Graduate</p>
              </div>

              <div className={styles.previewSection}>
                <h6>Education</h6>
                {profile.university ? (
                  <p>
                    {profile.degree} at {profile.university}
                    <br />
                    <small className="text-muted">
                      Graduated {profile.graduationYear}
                    </small>
                  </p>
                ) : (
                  <p className="text-muted">No education information</p>
                )}
              </div>

              <div className={styles.previewSection}>
                <h6>Skills</h6>
                <div className={styles.skillsPreview}>
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.slice(0, 5).map((skill, index) => (
                      <Badge
                        key={index}
                        bg="light"
                        text="dark"
                        className={styles.skillPreviewTag}
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted">No skills added</p>
                  )}
                </div>
              </div>

              <div className={styles.previewSection}>
                <h6>Profile Completion</h6>
                <div className={styles.completionProgress}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <span className={styles.progressText}>65% Complete</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
