import { useRouter } from "next/router";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import EditProductModal from "@/components/EditProductModal";
import axios from "axios";
import Navbar from "@/components/Navbar";

export async function getServerSideProps(context) {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/products");
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
        error: error.response?.data?.message || "Failed to fetch products.",
      },
    };
  }
}

export default function AdminPage({ authorized, products, error }) {
  const router = useRouter();
  const [passwordInput, setPasswordInput] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    type: "",
    color: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fieldLabels = {
    name: "Navn",
    description: "Beskrivelse",
    image: "Billede URL",
    price: "Pris (DKK)",
    type: "Type",
    color: "Farve",
  };

  const handleEditClick = (product) => {
    setCurrentProduct({ ...product, productID: product.productID || product.id });
    setShowModal(true);
  };

  const handleSaveEdit = async (formData) => {
    try {
      // Debugging: Log currentProduct to ensure productID is defined
      console.log("Current Product:", currentProduct);

      if (!currentProduct || !currentProduct.productID) {
        throw new Error("Product ID is undefined.");
      }

      // Add logging to see form data
      console.log("Sending form data to server:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? 'File object' : value}`);
      }

      // We'll use POST with _method=PUT for better FormData compatibility
      formData.append('_method', 'PUT');
      
      await axios.post(
        `http://127.0.0.1:8000/api/products/${currentProduct.productID}`,
        formData
      );

      setShowModal(false);
      setSuccessMessage("Product updated successfully!");
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
      router.replace(router.asPath);
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "An error occurred while updating the product."
      );
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post("http://127.0.0.1:8000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewProduct({
        name: "",
        description: "",
        image: "",
        price: "",
        type: "",
        color: "",
      });
      setSuccessMessage("Product saved successfully!");
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
      router.replace(router.asPath);
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "An error occurred while saving the product."
      );
    }
  };

  const handleDelete = async (productID) => {
    console.log("Deleting product with ID:", productID); // Debugging log
    if (!confirm("Er du sikker på, at du vil slette dette produkt?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${productID}`);
      setSuccessMessage("Produktet blev slettet!");
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
      router.replace(router.asPath); // Refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "Der opstod en fejl under sletningen af produktet."
      );
    }
  };

  if (!authorized) {
    return null; // Remove the login form since authorization is always true
  }

  return (
    <>
      <Navbar />
      <Container className="mt-5 mb-5">
        <h1 className="text-center mb-4">Administratorpanel</h1>

        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}

        <Card className="mb-5 shadow-sm">
          <Card.Body>
            <h4 className="mb-4">Opret Nyt Produkt</h4>
            <Form>
              <Row>
                {Object.entries(newProduct).map(([key, value]) => (
                  <Col md={6} key={key} className="mb-3">
                    <Form.Group controlId={`form${key}`}>
                      <Form.Label>{fieldLabels[key] || key}</Form.Label>
                      <Form.Control
                        type={key === "image" ? "file" : "text"}
                        placeholder={key === "image" ? undefined : `Indtast ${fieldLabels[key] || key}`}
                        value={key === "image" ? undefined : value}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            [key]: key === "image" ? e.target.files[0] : e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
              <Button variant="success" type="button" onClick={handleCreate}>
                Gem Produkt
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <h4 className="mb-3">Eksisterende Produkter</h4>
        <Row>
          {products.map((p) => (
            <Col md={4} sm={6} xs={12} key={p.productID || p.id} className="mb-4">
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
                      <strong>Pris:</strong> {p.price} DKK
                    </div>
                    <div>
                      <strong>Type:</strong> {p.type}
                    </div>
                    <div>
                      <strong>Farve:</strong> {p.color}
                    </div>
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      className="w-50"
                      onClick={() => handleEditClick(p)}
                    >
                      Rediger
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="w-50"
                      onClick={() => handleDelete(p.productID || p.id)}
                    >
                      Slet
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <EditProductModal
          show={showModal}
          onHide={() => setShowModal(false)}
          product={currentProduct}
          onSave={handleSaveEdit}
        />
      </Container>
    </>
  );
}
