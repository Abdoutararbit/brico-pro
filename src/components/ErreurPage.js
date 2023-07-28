import React from "react";
const ErreurPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Oops! Une erreur s'est produite.</h1>
      <p className="lead">
        Nous sommes désolés, mais la page que vous recherchez n'existe pas.
      </p>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Retourner à la page précédente
      </button>
    </div>
  );
};

export default ErreurPage;
