import React, { useState } from "react";
import SaveSelector from "./SaveSelector";
import Viewer from "./Viewer";

const Editor = () => {
  const [index, setIndex] = useState();
  const [save, setSave] = useState();

  return (
    <div data-testid="Editor">
      <SaveSelector
        index={index}
        save={save}
        onSave={setSave}
        onSelectIndex={setIndex}
      ></SaveSelector>
      <Viewer save={save} onSave={setSave} />
    </div>
  );
};

export default Editor;
