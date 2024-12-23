import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { updateUserAPI } from '../services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myprofile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (sessionStorage.getItem("users")) {
      const user = JSON.parse(sessionStorage.getItem("users"));
      setUsername(user.username);
      setEmail(user.email);
      setPhonenumber(user.phonenumber || ""); // Assuming phone number is stored in session storage
    }
    setShow(true);
  };

  useEffect(() => {
    if (sessionStorage.getItem("users")) {
      const user = JSON.parse(sessionStorage.getItem("users"));
      setUsername(user.username.split(" ")[0]);
      setEmail(user.email);
      setPhonenumber(user.phonenumber || ""); // Assuming phone number is stored in session storage
    }
  }, []);

  const handleSave = async () => {
    const userId = JSON.parse(sessionStorage.getItem("users"))._id;
    const updatedUser = { username, email, phonenumber };

    try {
      const result = await updateUserAPI(userId, updatedUser);
      if (result.status === 200) {
        sessionStorage.setItem("users", JSON.stringify(result.data));
        toast.success('Profile updated successfully');
        setShow(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="row">
        <div className="col-lg-6">
          <h4>{username}</h4> <hr />
          <h5 className='underline'>Contact Information</h5>
          <p className='font-bold'>Email id : <span className='text-blue-400'>{email}</span></p>
          <p className='font-bold'>Phone no : <span className='text-blue-400'>{phonenumber}</span></p>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleShow}>Edit</button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhonenumber">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="text"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="col-lg-6"></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Myprofile;