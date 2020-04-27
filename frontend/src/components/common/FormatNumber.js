import React from "react";

const FormatNumber = ({ number }) => {
  return (
    <span style={{ color: "red" }}>
      {new Intl.NumberFormat("ES-AR", {
        style: "currency",
        currency: "$",
      }).format(number)}
    </span>
  );
};

export default FormatNumber;
