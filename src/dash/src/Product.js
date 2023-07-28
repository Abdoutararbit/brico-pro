import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Nav,
  Badge,
  InputGroup,
  Modal,
} from "react-bootstrap";

import React, { useState, useEffect } from "react";
import axios from "axios";

// function CartButton(props) {
//   return (
//     <Nav.Link
//       eventKey={2}
//       onClick={() => {
//         //console.log(carts);
//       }}
//     >
//       Carts <Badge bg="warning">{props.carts.length}</Badge>
//       <span className="visually-hidden">unread messages</span>
//     </Nav.Link>
//   );
// }

function Product({ navigation }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userId, setUserId] = useState(null);

  const handleDeleteProfile = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/deleteprofil?id=${userId}`
      );
      console.log(response.data.message);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Error deleting profile");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/admin_users`);

        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [navigation]);

  const [products, setProducts] = useState([
    {
      id: 1,
      brand: "user",
      name: "user",
      qty: 0,
      price: 10.0,
    },
  ]);

  const [carts, setCarts] = useState([]);

  const navigateToConsultation = (id, avatar, username) => {
    const url = `/UserTable/${id}?avatar=${encodeURIComponent(
      avatar
    )}&username=${encodeURIComponent(username)}`;
    window.location.href = url;
  };
  return (
    <React.Fragment>
      <br />
      <h4>Utilisateurs</h4>
      <Table bordered striped hover>
        <thead className="table-light">
          <tr>
            <td>Photo</td>
            <td>Pseudo</td>
            <td>Email</td>

            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr>
              <td>
                <img
                  src={`http://127.0.0.1:5000/${product.picture}`}
                  alt={`utilisateur ${index + 1}`}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "60px",
                  }}
                />
              </td>
              <td>{product.username}</td>
              <td>{product.email}</td>

              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    //handleShow();
                    // setUserId(product._id);
                    navigateToConsultation(
                      product._id,
                      product.picture,
                      product.username
                    );
                  }}>
                  consulter
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>vous les vous vraiment supprimer cet user</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteProfile}>
            oui
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default Product;
