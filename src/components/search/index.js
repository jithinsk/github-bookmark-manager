import React from "react";
import { Form } from "react-bootstrap";
import "./index.css";

const Search = ({ handleInputChage, handleSelectChange, fieldValue }) => (
  <Form inline className="justify-content-center">
    <div className="search-heading">Search Options:</div>
    <Form.Label htmlFor="type-select" className="ml-4 mr-1">
      Type:
    </Form.Label>
    <Form.Control
      as="select"
      id="type-select"
      defaultValue="user"
      onChange={handleSelectChange}
    >
      <option value="user">Users</option>
      <option value="repo">Repository</option>
    </Form.Control>
    <Form.Label htmlFor="search-box" className="ml-4 mr-1">
      Search:
    </Form.Label>
    <Form.Control
      id="search-box"
      type="text"
      placeholder="Enter text to search"
      onChange={handleInputChage}
      value={fieldValue}
    />
  </Form>
);

export default Search;
