import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function EditProductModal({ show, onHide, product, onSave }) {
  const [edited, setEdited] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      // Create a clean copy of the product, ensuring all needed fields
      setEdited({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        color: product.color || '',
        type: product.type || '',
        image: null  // Don't include the image URL, just track new file uploads
      });
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
      alert("Navn og beskrivelse er påkrævet.");
      return;
    }

    const formData = new FormData();
    
    // Add all fields explicitly to ensure they're included
    formData.append('name', edited.name);
    formData.append('description', edited.description);
    formData.append('price', edited.price);
    formData.append('color', edited.color || '');
    formData.append('type', edited.type || '');
    
    // Only append image if it's a File object
    if (edited.image instanceof File) {
      formData.append('image', edited.image);
    }

    // Add debugging
    console.log("Form data being sent:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value instanceof File ? 'File object' : value}`);
    }

    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rediger produkt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {edited && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Navn</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={edited.name || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Beskrivelse</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={edited.description || ""}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Pris</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={edited.price || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={edited.type || ""}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Farve</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={edited.color || ""}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Billede</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
              />
              {imagePreview && (
                <div className="mt-2">
                  <small>Nuværende Billede:</small>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "150px" }}
                  />
                </div>
              )}
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annuller
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Gem ændringer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
