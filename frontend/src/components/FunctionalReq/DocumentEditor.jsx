import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const DocumentEditor = ({ initialContent, onSave }) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      const contentState = convertFromRaw(JSON.parse(initialContent));
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    const rawContent = convertToRaw(newEditorState.getCurrentContent());
    const jsonContent = JSON.stringify(rawContent);
    onSave(jsonContent);
  };

  return (
    <div className="document-editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
          inline: { options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'] },
          blockType: { inDropdown: true },
          fontSize: { inDropdown: true },
          fontFamily: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          colorPicker: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </div>
  );
};

export default DocumentEditor;
