import React from "react";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PulseLoader
        css={override}
        size={15}
        margin={2}
        color={"#1fa1fc"}
        loading={true}
      />
    </div>
  );
};

export default Spinner;
