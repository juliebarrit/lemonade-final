import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function EditProductModal({ show, onHide, product, onSave }) {
  const [edited, setEdited] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      const { id, created_at, updated_at, ...safeProduct } = product;
      setEdited({ ...safeProduct });
      setImagePreview(product.image || null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setEdited({ ...edited, [name]: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setEdited({ ...edited, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!edited.name || !edited.description) {
      alert("Name and description are required.");
      return;
    }

    const formData = new FormData();
    const fieldsToSend = ["name", "description", "price", "color", "type", "image"];

    fieldsToSend.forEach((key) => {
      const value = edited[key];
      if (key === "image" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value || "");
      }
    });

    onSave(formData);
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
              ["id", "created_at", "updated_at"].includes(key) ? null : (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>{key}</Form.Label>
                  {key === "image" ? (
                    <>
                      <Form.Control
                        type="file"
                        name={key}
                        onChange={handleChange}
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <small>Current Image:</small>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ maxWidth: "100%", maxHeight: "150px" }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <Form.Control
                      type="text"
                      name={key}
                      value={value || ""}
                      onChange={handleChange}
                    />
                  )}
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
