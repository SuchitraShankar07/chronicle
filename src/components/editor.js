/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Mention from '@tiptap/extension-mention';

import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';


const Editor = ({ user, provider, ydoc }) => {
  const TiptapExtensions = [
    Document,
    Paragraph,
    Text,
    TaskList,
    TaskItem,
    Mention, 
    StarterKit,
    HorizontalRule,
    Highlight,
    Heading,
    Collaboration.configure({
      document: ydoc,
    }),
    CollaborationCursor.configure({
      provider: provider,
      user: { 
        name: user.name,
        color: '#0F0F',
      },
    }),
  ];

  const editor = useEditor({
    extensions: TiptapExtensions,
    content: ydoc.getText('content').toString(),
    onUpdate: ({ editor }) => {
      const text = editor.getHTML();
      console.log('Editor updated:', text);},
  });

  return (
    <div className="markdown-editor tiptap border rounded shadow">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
