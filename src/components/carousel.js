import React from "react";
import { Carousel } from "react-bootstrap";
import meca from "../assets/images/img/meca.jpg";
import meca1 from "../assets/images/img/meca1.jpg";
import meca2 from "../assets/images/img/meca2.jpg";
import brico from "../assets/images/img/brico.jpg";
import brico1 from "../assets/images/img/brico1.jpg";
import brico2 from "../assets/images/img/brico2.jpg";
import peint from "../assets/images/img/peint.jpg";
import peint1 from "../assets/images/img/peint1.jpg";
import peint2 from "../assets/images/img/peint2.jpg";
import peint3 from "../assets/images/img/peint3.jpg";
import peint4 from "../assets/images/img/peint4.jpg";
import peint5 from "../assets/images/img/peint5.jpg";
import peint6 from "../assets/images/img/peint6.jpg";

const handleHomeClick = () => {
  window.location.reload(); // Refresh the page
};
class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item key="2" interval={2000}>
            <img
              className="d-block w-100"
              src={meca}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="3" interval={2000}>
            <img
              className="d-block w-100"
              src={meca1}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="4" interval={2000}>
            <img
              className="d-block w-100"
              src={meca2}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="5" interval={2000}>
            <img
              className="d-block w-100"
              src={brico}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="6" interval={2000}>
            <img
              className="d-block w-100"
              src={brico1}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="7" interval={2000}>
            <img
              className="d-block w-100"
              src={brico2}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="8" interval={2000}>
            <img
              className="d-block w-100"
              src={peint}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="9" interval={2000}>
            <img
              className="d-block w-100"
              src={peint4}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="10" interval={2000}>
            <img
              className="d-block w-100"
              src={peint1}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="11" interval={2000}>
            <img
              className="d-block w-100"
              src={peint2}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="12" interval={2000}>
            <img
              className="d-block w-100"
              src={peint3}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="13" interval={2000}>
            <img
              className="d-block w-100"
              src={peint5}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
          <Carousel.Item key="14" interval={2000}>
            <img
              className="d-block w-100"
              src={peint6}
              style={{ height: "80vh" }}
              alt="carousel"
            />
            <h1
              className="welcome-text"
              onClick={handleHomeClick}
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Ajouter un fond semi-transparent
              }}
            >
              Bienvenue chez Brico-Pro
            </h1>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
export default Banner;
