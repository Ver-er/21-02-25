import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Clock, Gauge, Heart, Bookmark, ChevronDown } from 'lucide-react';

function RecipeCard({ recipe, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card 
        className="h-100 border-0 shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="position-relative">
          <Card.Img 
            variant="top" 
            src={recipe.image} 
            style={{ 
              height: '200px', 
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            className={isHovered ? 'transform-scale-105' : ''}
          />
          <div className="position-absolute top-0 end-0 p-2">
            <Badge 
              bg={recipe.difficulty === 'Easy' ? 'success' : recipe.difficulty === 'Medium' ? 'warning' : 'danger'}
              className="me-2"
            >
              {recipe.difficulty}
            </Badge>
          </div>
        </div>
        <Card.Body>
          <div className="d-flex align-items-center mb-2">
            <img
              src={recipe.author.avatar}
              alt={recipe.author.name}
              className="rounded-circle me-2"
              width="30"
              height="30"
            />
            <small className="text-muted">{recipe.author.name}</small>
          </div>
          <Card.Title className="h5 text-truncate">{recipe.title}</Card.Title>
          <Card.Text className="text-muted small mb-3">
            {recipe.description.length > 100 
              ? `${recipe.description.substring(0, 100)}...` 
              : recipe.description}
          </Card.Text>
          <div className="d-flex align-items-center text-muted small">
            <Clock size={16} className="me-1" />
            <span className="me-3">{recipe.cookingTime} min</span>
            <Gauge size={16} className="me-1" />
            <span>{recipe.difficulty}</span>
          </div>
        </Card.Body>
        <Card.Footer className="bg-white border-top-0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Button 
                variant="link" 
                className="text-danger p-0 me-3"
                aria-label="Like recipe"
              >
                <Heart size={20} className={recipe.isLiked ? 'fill-current' : ''} />
                <span className="ms-1">{recipe.likes}</span>
              </Button>
              <Button 
                variant="link" 
                className="text-primary p-0"
                aria-label="Save recipe"
              >
                <Bookmark size={20} className={recipe.isSaved ? 'fill-current' : ''} />
              </Button>
            </div>
            <Badge bg="light" text="dark" className="text-muted">
              {recipe.category}
            </Badge>
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
  );
}

function LoadingCard() {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <div className="placeholder-glow">
        <div className="placeholder" style={{ height: '200px' }} />
      </div>
      <Card.Body>
        <div className="d-flex align-items-center mb-2">
          <div className="placeholder rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
          <div className="placeholder" style={{ width: '100px' }} />
        </div>
        <div className="placeholder-glow">
          <div className="placeholder col-7 mb-2" />
          <div className="placeholder col-12 mb-2" />
          <div className="placeholder col-4" />
        </div>
      </Card.Body>
    </Card>
  );
}

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Simulated recipe data
  const mockRecipes = [
    {
      id: 1,
      title: 'Classic Margherita Pizza',
      description: 'A traditional Italian pizza with fresh basil, mozzarella, and tomato sauce on a perfectly crispy crust.',
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Chef Maria',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      cookingTime: 45,
      difficulty: 'Medium',
      category: 'Italian',
      likes: 234,
      isLiked: false,
      isSaved: true
    },
    {
      id: 2,
      title: 'Spicy Thai Basil Chicken',
      description: 'A flavorful stir-fry dish with minced chicken, Thai basil, and chili garlic sauce.',
      image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Chef Tom',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      cookingTime: 30,
      difficulty: 'Easy',
      category: 'Asian',
      likes: 156,
      isLiked: true,
      isSaved: false
    },
    // Add more mock recipes as needed
  ];

  useEffect(() => {
    // Simulate API call
    const loadRecipes = () => {
      setLoading(true);
      setTimeout(() => {
        setRecipes(prev => [...prev, ...mockRecipes]);
        setLoading(false);
        setHasMore(page < 3); // Simulate pagination limit
      }, 1500);
    };

    loadRecipes();
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <Container className="py-5 mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">Discover Recipes</h1>
          <p className="text-muted">Explore our collection of delicious recipes shared by our community.</p>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {recipes.map((recipe, index) => (
          <Col key={recipe.id}>
            <RecipeCard recipe={recipe} index={index} />
          </Col>
        ))}
        
        {loading && [...Array(4)].map((_, index) => (
          <Col key={`loading-${index}`}>
            <LoadingCard />
          </Col>
        ))}
      </Row>

      {hasMore && (
        <div className="text-center mt-5">
          <Button
            variant="outline-primary"
            onClick={loadMore}
            disabled={loading}
            className="d-flex align-items-center mx-auto"
          >
            {loading ? 'Loading...' : 'Load More'}
            <ChevronDown size={20} className="ms-2" />
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Dashboard;