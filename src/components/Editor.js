import React, { useState } from "react";
import SaveSelector from "./SaveSelector";
import Viewer from "./Viewer";
import SaveButton from "./SaveButton";

const Editor = () => {
  const [index, setIndex] = useState();
  const [save, setSave] = useState();

  return (
    <div data-testid="Editor">
      <SaveSelector onSave={setSave} onSelectIndex={setIndex}></SaveSelector>
      <Viewer save={save} onSave={setSave} />
      <SaveButton index={index} save={save} />
    </div>
  );
};

export default Editor;
