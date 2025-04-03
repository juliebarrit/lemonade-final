import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import EditProductModal from "@/components/EditProductModal";
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

export async function getServerSideProps(context) {
    const { query } = context;
    const password = query.password;
  
    // Hvis adgangskoden er forkert eller mangler
    if (password !== process.env.ADMIN_PASSWORD) {
      return {
        props: {
          authorized: false,
          products: [],
        },
      };
    }
  
    // Adgangskode er korrekt – hent produkter
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return {
      props: {
        authorized: true,
        products,
      },
    };
  }
  

export default function AdminPage({ authorized, products }) {
  const router = useRouter();
  const [passwordInput, setPasswordInput] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    lemonsUsed: "",
  });
  const fieldLabels = {
    name: "Name",
    description: "Description",
    image: "Image URL",
    price: "Price (DKK)",
    lemonsUsed: "Lemons Used",
  };

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditClick = (product) => {
    setCurrentProduct({ ...product });
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    const ref = doc(db, "products", currentProduct.id);
    await updateDoc(ref, {
      ...currentProduct,
      price: Number(currentProduct.price),
      lemonsUsed: Number(currentProduct.lemonsUsed),
    });
    setShowModal(false);
    router.replace(router.asPath); // Refresh page
  };

  const handleCreate = async () => {
    try {
      await addDoc(collection(db, "products"), {
        ...newProduct,
        price: Number(newProduct.price),
        lemonsUsed: Number(newProduct.lemonsUsed),
      });
      setNewProduct({
        name: "",
        description: "",
        image: "",
        price: "",
        lemonsUsed: "",
      });
      router.replace(router.asPath);
    } catch (error) {
      console.error("Error adding product:", error);
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
                      type="text"
                      placeholder={`Enter ${fieldLabels[key] || key}`}
                      value={value}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, [key]: e.target.value })
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
                    <strong>Lemons used:</strong> {p.lemonsUsed}
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
        onSave={async (updatedProduct) => {
          const ref = doc(db, "products", updatedProduct.id);
          await updateDoc(ref, {
            ...updatedProduct,
            price: Number(updatedProduct.price),
            lemonsUsed: Number(updatedProduct.lemonsUsed),
          });
          setShowModal(false);
          router.replace(router.asPath); // Refresh page
        }}
      />
    </Container>
  );
}
