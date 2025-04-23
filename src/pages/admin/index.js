import { useRouter } from "next/router";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import EditProductModal from "@/components/EditProductModal"; // Ensure this is a default import
import axios from "axios";

export async function getServerSideProps(context) {
  const { query } = context;
  const password = query.password;

  if (password !== process.env.ADMIN_PASSWORD) {
    return {
      props: {
        authorized: false,
        products: [],
      },
    };
  }

  try {
    const response = await axios.get("http://127.0.0.1:8000/api/products"); // Updated URL
    return {
      props: {
        authorized: true,
        products: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    return {
      props: {
        authorized: true,
        products: [],
      },
    };
  }
}

export default function AdminPage({ authorized, products }) {
  const router = useRouter();
  const [passwordInput, setPasswordInput] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    type: "", // Added
    color: "", // Added
  });
  const fieldLabels = {
    name: "Name",
    description: "Description",
    image: "Image URL",
    price: "Price (DKK)",
    type: "Type", // Added
    color: "Color", // Added
  };

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Add success message state
  const [errorMessage, setErrorMessage] = useState(""); // Add error message state

  const handleEditClick = (product) => {
    setCurrentProduct({ ...product });
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      Object.entries(currentProduct).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.put(`http://127.0.0.1:8000/api/products/${currentProduct.id}`, formData, { // Updated URL
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowModal(false);
      setSuccessMessage("Product updated successfully!"); // Set success message
      setErrorMessage(""); // Clear error message
      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
      router.replace(router.asPath); // Refresh page
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "An error occurred while updating the product."
      ); // Set error message
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log("FormData content:", Array.from(formData.entries())); // Debugging log

      const response = await axios.post("http://127.0.0.1:8000/api/products", formData, { // Updated URL
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Product created:", response.data);
      setNewProduct({
        name: "",
        description: "",
        image: "",
        price: "",
        type: "",
        color: "",
      });
      setSuccessMessage("Product saved successfully!"); // Set success message
      setErrorMessage(""); // Clear error message
      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
      router.replace(router.asPath); // Refresh page
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message); // Log full error details
      setErrorMessage(
        error.response?.data?.message || "An error occurred while saving the product."
      ); // Display error message
    }
  };

  if (!authorized) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="mb-4">Admin Login</h2>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/admin?password=${passwordInput}`);
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Log in
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center mb-4">Admin Panel</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Create New Product */}
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <h4 className="mb-4">Create New Product</h4>
          <Form>
            <Row>
              {Object.entries(newProduct).map(([key, value]) => (
                <Col md={6} key={key} className="mb-3">
                  <Form.Group controlId={`form${key}`}>
                    <Form.Label>{fieldLabels[key] || key}</Form.Label>
                    <Form.Control
                      type={key === "image" ? "file" : "text"} // Use file input for 'image'
                      placeholder={key === "image" ? undefined : `Enter ${fieldLabels[key] || key}`}
                      value={key === "image" ? undefined : value} // Prevent React warning for file input
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          [key]: key === "image" ? e.target.files[0] : e.target.value, // Handle file input
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <Button variant="success" type="button" onClick={handleCreate}>
              Save Product
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Existing Products */}
      <h4 className="mb-3">Existing Products</h4>
      <Row>
        {products.map((p) => (
          <Col md={4} sm={6} xs={12} key={p.id} className="mb-4">
            <Card className="h-100 d-flex flex-column shadow-sm">
              <Card.Img
                variant="top"
                src={p.image}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>{p.description}</Card.Text>
                </div>
                <div>
                  <div>
                    <strong>Price:</strong> {p.price} DKK
                  </div>
                  <div>
                    <strong>Type:</strong> {p.type}
                  </div>
                  <div>
                    <strong>Color:</strong> {p.color}
                  </div>
                </div>
                <Button
                  variant="warning"
                  size="sm"
                  className="mt-3 w-100"
                  onClick={() => handleEditClick(p)}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Modal */}
      <EditProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        product={currentProduct}
        onSave={handleSaveEdit}
      />
    </Container>
  );
}
