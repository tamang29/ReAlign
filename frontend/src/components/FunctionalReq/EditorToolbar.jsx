import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorToolbar = ({ editorState, onEditorStateChange }) => {
  const handleChange = (newEditorState) => {
    onEditorStateChange(newEditorState);
  };

  return (
    <div className="editor-toolbar">
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

export default EditorToolbar;
