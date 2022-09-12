import React, { useState } from "react";
import SaveSelector from "./SaveSelector";
import Viewer from "./Viewer";

const Editor = () => {
  const [index, setIndex] = useState();
  const [save, setSave] = useState();
  const [setting, setSetting] = useState();

  return (
    <div data-testid="Editor">
      <SaveSelector
        index={index}
        onSelectIndex={setIndex}
        save={save}
        onSave={setSave}
        onSetting={setSetting}
      ></SaveSelector>
      <Viewer save={save} onSave={setSave} setting={setting} />
    </div>
  );
};

export default Editor;
