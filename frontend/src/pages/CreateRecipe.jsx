import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function CreateRecipe() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    cookingTime: '',
    difficulty: 'Easy',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push({ ...formData, id: Date.now() });
    localStorage.setItem('recipes', JSON.stringify(recipes));
    alert('Recipe created successfully');
  };

  return (
    <Container className="py-5 mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <h1>Create Recipe</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter recipe title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Enter recipe description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cooking Time (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="cookingTime"
                placeholder="Enter cooking time"
                value={formData.cookingTime}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Difficulty</Form.Label>
              <Form.Select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Enter recipe category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create Recipe
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateRecipe;