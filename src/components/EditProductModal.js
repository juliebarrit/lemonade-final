import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function EditProductModal({ show, onHide, product, onSave }) {
  const [edited, setEdited] = useState(product || {});

  useEffect(() => {
    setEdited(product || {});
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEdited({ ...edited, [name]: files ? files[0] : value }); // Handle file input
  };

  const handleSubmit = () => {
    onSave(edited); // Pass edited product to parent component
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {edited && (
          <Form>
            {Object.entries(edited).map(([key, value]) => (
              key !== "id" && (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>{key}</Form.Label>
                  <Form.Control
                    type={key === "image" ? "file" : "text"} // Use file input for 'image'
                    name={key}
                    value={key === "image" ? undefined : value} // Prevent React warning for file input
                    onChange={(e) =>
                      setEdited({
                        ...edited,
                        [key]: key === "image" ? e.target.files[0] : e.target.value, // Handle file input
                      })
                    }
                  />
                </Form.Group>
              )
            ))}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
