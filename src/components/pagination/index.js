import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const createArray = (active, totalPage) => {
  let activeLThree = active < 3;
  let activeGTotal = active > totalPage - 3;
  return [
    activeLThree ? 1 : activeGTotal ? totalPage - 4 : active - 2,
    activeLThree ? 2 : activeGTotal ? totalPage - 3 : active - 1,
    activeLThree ? 3 : activeGTotal ? totalPage - 2 : active,
    activeLThree ? 4 : activeGTotal ? totalPage - 1 : active + 1,
    activeLThree ? 5 : activeGTotal ? totalPage : active + 2,
  ];
};

const Paginatnor = ({ total, pageChanged, selected }) => {
  const [active, setActive] = useState(
    Number.isInteger(selected) ? selected : 1
  );
  const [totalPage, setTotalPage] = useState(Math.ceil(total / 20));

  useEffect(() => {
    setTotalPage(Math.ceil(total / 20));
  }, [total]);

  return (
    <Pagination className="justify-content-center">
      <Pagination.First
        onClick={() => {
          pageChanged(1);
          setActive(1);
        }}
      />
      <Pagination.Prev
        onClick={() => {
          if (active - 1 < 1) return;
          pageChanged(active - 1);
          setActive((a) => a - 1);
        }}
      />
      <Pagination.Ellipsis />
      {createArray(active, totalPage).map((value) => (
        <Pagination.Item
          key={value}
          active={active === value}
          onClick={() => {
            if (active === value) return;
            pageChanged(value);
            setActive(value);
          }}
        >
          {value}
        </Pagination.Item>
      ))}

      <Pagination.Ellipsis />
      <Pagination.Next
        onClick={() => {
          if (active + 1 > totalPage) return;
          pageChanged(active + 1);
          setActive((a) => a + 1);
        }}
      />
      <Pagination.Last
        onClick={() => {
          pageChanged(totalPage);
          setActive(totalPage);
        }}
      />
    </Pagination>
  );
};

export default Paginatnor;
