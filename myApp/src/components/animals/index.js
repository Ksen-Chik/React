import React from "react";
import Animal from "../animal";

function Animals() {

  return (
    <div>
      <h4>Animals</h4>
      <Animal index={0} />
      <Animal index={1} />
      <Animal index={2} />
    </div>
  );
};

export default Animals;