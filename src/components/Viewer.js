import React, { useRef, useEffect } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { Flex } from "@chakra-ui/react";

const Viewer = ({ save = {}, onSave = () => {} }) => {
  const editor = useRef();

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
  }, [editor.current]);

  return (
    <Flex>
      <div
        ref={editor}
        style={{ overflowY: "scroll", height: "64vh", width: "100vw" }}
      />
    </Flex>
  );
};

export default Viewer;
