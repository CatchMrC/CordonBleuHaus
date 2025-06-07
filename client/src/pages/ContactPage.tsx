import React from 'react';
import Container from '@mui/material/Container';
import Contact from '../components/Contact';
import Location from '../components/Location';

const ContactPage: React.FC = () => (
  <Container sx={{ mt: 4 }}>
    <Contact />
    <Location />
  </Container>
);

export default ContactPage;
