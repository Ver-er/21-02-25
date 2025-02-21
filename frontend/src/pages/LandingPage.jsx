import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';

const LandingPage = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem('userData')) ? true : false;
  const getStartedLink = isLoggedIn ? "/dashboard" : "/register";

  return (
    <div 
      className="hero min-vh-100 d-flex align-items-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: '56px'
      }}
    >
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="display-3 text-white mb-4 font-weight-bold">
                Share Your Culinary Journey
              </h1>
              <p className="lead text-white mb-5">
                Join our community of food enthusiasts, share your favorite recipes, 
                and discover amazing dishes from around the world.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={getStartedLink} className="btn btn-primary btn-lg px-5 py-3">
                  Start Sharing Today
                </Link>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
