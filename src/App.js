import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Navigation from "./components/navigation";
import Homepage from "./components/homepage";
import AddRepository from "./components/addrepo";
import "./App.css";

const App = () => {
  const [showAddPage, setShowAddPage] = useState(false);
  const [repositories, setRepositories] = useState([]);

  const handlePathUpdate = (route = "home") => {
    setShowAddPage(route === "home" ? false : true);
  };

  const updateRepos = (repo) => {
    setRepositories((s) => [...s, repo]);
  };

  return (
    <Container fluid className="wrapper p-5">
      <Navigation
        showAddPage={showAddPage}
        goto={handlePathUpdate}
      ></Navigation>
      {showAddPage ? (
        <AddRepository addRepository={updateRepos}></AddRepository>
      ) : (
        <Homepage repositories={repositories}></Homepage>
      )}
    </Container>
  );
};

export default App;
