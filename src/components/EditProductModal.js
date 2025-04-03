import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function EditProductModal({ show, onHide, product, onSave }) {
  const [edited, setEdited] = useState(product || {});

  useEffect(() => {
    setEdited(product || {});
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited({ ...edited, [name]: value });
  };

  const handleSubmit = () => {
    onSave(edited);
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
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
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
