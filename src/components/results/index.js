import React from "react";
import { Button, Table } from "react-bootstrap";
import "./index.css";

const ResultsTable = ({
  dataHeaders,
  dataset,
  noRowsMessage,
  showButtonOption,
  isLoading,
  buttonAction,
  buttonText,
}) => (
  <Table striped bordered hover className="mt-3">
    <thead>
      <tr>
        {dataHeaders.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
        {showButtonOption && <th></th>}
      </tr>
    </thead>
    <tbody>
      {isLoading || dataset.length === 0 ? (
        <tr>
          <td className="no-rows-message" colSpan={6}>
            {isLoading ? "Loading..." : noRowsMessage}
          </td>
        </tr>
      ) : (
        dataset.map((data, index) => (
          <tr key={index}>
            {dataHeaders.map((header, innerIndex) => (
              <td key={innerIndex}>
                {header === "Index" ? (
                  index + 1
                ) : data[header].isLink ? (
                  <a
                    href={data["URL"].value}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data[header].value}
                  </a>
                ) : (
                  data[header].value
                )}
              </td>
            ))}
            {showButtonOption && (
              <td>
                <Button onClick={() => buttonAction(index)}>
                  {buttonText}
                </Button>
              </td>
            )}
          </tr>
        ))
      )}
    </tbody>
  </Table>
);

export default ResultsTable;
