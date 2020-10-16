import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Navigation from "./components/navigation";
import Homepage from "./components/homepage";
import AddRepository from "./components/addrepo";
import ErrorWrapper from "./components/errorwrapper";

const App = () => {
  const [showAddPage, setShowAddPage] = useState(false);
  const [repositories, setRepositories] = useState([]);

  const handlePathUpdate = (route = "home") => {
    setShowAddPage(!(route === "home"));
  };

  const updateRepos = (repo) => {
    setRepositories((s) => [...s, repo]);
  };

  return (
    <ErrorWrapper>
      <Container fluid className="p-5">
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
    </ErrorWrapper>
  );
};

export default App;
