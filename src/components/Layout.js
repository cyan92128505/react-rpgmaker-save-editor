import React, { useState } from "react";
import Footer from "./Footer";
import SaveSelector from "./SaveSelector";
import Viewer from "./Viewer";

const Layout = () => {
  const [index, setIndex] = useState();
  const [save, setSave] = useState();
  const [setting, setSetting] = useState();

  return (
    <div data-testid="Layout">
      <SaveSelector
        index={index}
        onSelectIndex={setIndex}
        save={save}
        onSave={setSave}
        onSetting={setSetting}
      ></SaveSelector>
      <Viewer save={save} onSave={setSave} setting={setting} />
      <Footer setting={setting}></Footer>
    </div>
  );
};

export default Layout;
