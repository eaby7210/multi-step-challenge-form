import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {
    EditorState,
    Editor as Ed ,
    // convertToRaw 
    } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorStateChange = (state) => {
    setEditorState(state);
  };

//   const getContent = () => {
//     const rawContentState = editorState.getCurrentContent();
//     const htmlContent = draftToHtml(convertToRaw(rawContentState));
//     return DOMPurify.sanitize(htmlContent);
//   };

  return (
    <div className="editor-container">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        wrapperClassName="ed-wrapper"
        editorClassName="ed-editor"
        toolbarClassName="ed-toolbar"


  toolbar={{
            options: [
                'inline', 'list',
                 'textAlign',
                //  'emoji',
                'colorPicker'
                ],
            inline: {
            options: ['bold', 'italic', 'underline'],
            },
            list: {
            options: ['unordered'],
            },
            textAlign: {
            options: ['left', 'center', 'right'],
            },
            colorPicker:[
                    '#f00','#0f0', '#00f'
                
            ]
        }}

      />
      {/* <div className="output">
        <div dangerouslySetInnerHTML={{ __html: getContent() }} />
      </div> */}
    </div>
  );
};

export default TextEditor