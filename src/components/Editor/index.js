import React, { useEffect, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";

const ReactEditorJS = createReactEditorJS();

export default function RichTextEditor({ value, onChange }) {
  const instanceRef = useRef(null)

  const onSave = async (e) => {
    const savedData = await instanceRef.current.save();

    onChange(savedData);
  }

  const handleInitialize = React.useCallback((instance) => {
    instanceRef.current = instance
  }, [])

  return (
    <ReactEditorJS
      defaultValue={JSON.parse(value)}
      onInitialize={handleInitialize}
      tools={EDITOR_JS_TOOLS}
      onChange={onSave}
    />
  );
}
