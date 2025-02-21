import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Form, Button } from 'react-bootstrap';
import { Search, ChefHat } from 'lucide-react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      setIsLoggedIn(true);
      setUserName(storedData.fullName);
    }
  }, []);

  useEffect(() => {
    const handleUserLogin = () => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (storedData) {
        setIsLoggedIn(true);
        setUserName(storedData.fullName);
      }
    };
    window.addEventListener('userLogin', handleUserLogin);
    return () => window.removeEventListener('userLogin', handleUserLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const brandLink = isLoggedIn ? "/dashboard" : "/";

  return (
    <BootstrapNavbar 
      fixed="top" 
      bg="light" 
      variant="light"
      className="shadow-sm"
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to={brandLink} className="d-flex align-items-center">
          <ChefHat className="me-2" size={24} />
          <span className="font-weight-bold">CulinaryShare</span>
        </BootstrapNavbar.Brand>

        <Form className="d-flex mx-auto w-50">
          <div className="position-relative w-100">
            <Form.Control
              type="search"
              placeholder="Search recipes..."
              aria-label="Search"
              className="pe-5"
            />
            <Search 
              size={20} 
              className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
            />
          </div>
        </Form>

        <div className="d-flex align-items-center">
          <Link to="/about" className="btn btn-link me-3 text-decoration-none">About</Link>
          {isLoggedIn ? (
            <>
              <Link to="/create-recipe" className="btn btn-outline-primary me-2">Create Recipe</Link>
              <Link to="/edit-recipe" className="btn btn-outline-secondary me-2">Edit Recipe</Link>
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              <span className="ms-3">{userName}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;