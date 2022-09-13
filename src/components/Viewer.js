import React, { useRef, useEffect, useState, useCallback } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { Flex, List, ListItem, Box } from "@chakra-ui/react";
import VariableTerm from "./VariableTerm";
import SwitchTerm from "./SwitchTerm";

const Viewer = ({ save = {}, onSave = () => {}, setting = {} }) => {
  const editor = useRef();
  const [variableTermList, setVariableTermList] = useState([
    <ListItem key={"No Variable"}>No Variable</ListItem>,
  ]);
  const [swtichTermList, setSwtichTermList] = useState([
    <ListItem key={"No Swtich"}>No Swtich</ListItem>,
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

  const _applyVariableList = useCallback(() => {
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
          <ListItem key={"variable_" + index} p={2}>
            <VariableTerm
              index={index}
              save={save}
              onSave={onSave}
              setting={setting}
            ></VariableTerm>
          </ListItem>
        );
      }
      setVariableTermList(_list);
    }
  }, [onSave, save, setting]);

  const _applySwitchList = useCallback(() => {
    if (setting["switches"] && save["switches"]) {
      let _list = [];
      for (let index = 0; index < setting["switches"].length; index++) {
        if (
          !setting["variables"][index] ||
          setting["variables"][index].length === 0
        ) {
          continue;
        }

        _list.push(
          <ListItem key={"switch_" + index} p={2}>
            <SwitchTerm
              index={index}
              save={save}
              onSave={onSave}
              setting={setting}
            ></SwitchTerm>
          </ListItem>
        );
      }
      setSwtichTermList(_list);
    }
  }, [onSave, save, setting]);

  useEffect(() => {
    _applySwitchList();
    _applyVariableList();
  }, [onSave, save, setting, _applyVariableList, _applySwitchList]);

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [save, setContainer]);

  return (
    <div>
      <Flex key="editor">
        <div
          ref={editor}
          style={{ overflowY: "scroll", height: "40vh", width: "100vw" }}
        />
      </Flex>
      <Box h="8px" w="100%"></Box>
      <Flex>
        <Box
          flex="1"
          shadow="md"
          borderWidth="1px"
          height="50vh"
          overflowY="scroll"
        >
          <List>{variableTermList}</List>
        </Box>
        <Box
          flex="1"
          shadow="md"
          borderWidth="1px"
          height="50vh"
          overflowY="scroll"
        >
          <List>{swtichTermList}</List>
        </Box>
      </Flex>
    </div>
  );
};

export default Viewer;
