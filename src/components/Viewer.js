import React, { useRef, useEffect, useState } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { Flex, List, ListItem } from "@chakra-ui/react";
import VariableTerm from "./VariableTerm";

const Viewer = ({ save = {}, onSave = () => {}, setting = {} }) => {
  const editor = useRef();
  const [settingTermList, setSettingTermList] = useState([
    <ListItem></ListItem>,
  ]);

  const { setContainer } = useCodeMirror({
    container: editor.current,
    value: JSON.stringify(save, null, 4),
    options: {
      tabSize: 2,
      mode: "json",
    },
    onChange: (value) => {
      try {
        let json = JSON.parse(value);
        onSave(json);
      } catch (error) {}
    },
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [save, setContainer]);

  useEffect(() => {
    if (setting["variables"] && save["variables"]) {
      let _list = [];
      for (let index = 0; index < setting["variables"].length; index++) {
        if (
          !setting["variables"][index] ||
          setting["variables"][index].length === 0
        ) {
          continue;
        }

        _list.push(
          <ListItem key={index} p={2}>
            <VariableTerm
              index={index}
              save={save}
              onSave={onSave}
              setting={setting}
            ></VariableTerm>
          </ListItem>
        );
      }
      setSettingTermList(_list);
    }
  }, [save, setting]);

  return (
    <div>
      <Flex>
        <div
          ref={editor}
          style={{ overflowY: "scroll", height: "50vh", width: "100vw" }}
        />
      </Flex>
      <List>{settingTermList}</List>
    </div>
  );
};

export default Viewer;
