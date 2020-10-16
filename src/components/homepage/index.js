import React from "react";
import WrapperUI from "./../wrapper";
import ResultsTable from "./../results";

const Homepage = ({ repositories }) => (
  <WrapperUI heading="Home">
    <ResultsTable
      dataHeaders={["Index", "Name", "Maintainer", "Created", "URL"]}
      dataset={repositories}
      noRowsMessage="No repos added yet"
    ></ResultsTable>
  </WrapperUI>
);

export default Homepage;
