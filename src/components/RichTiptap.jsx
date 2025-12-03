"use client";
import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import RichToolbar from './RichToolbar';
import Blockquote from '@tiptap/extension-blockquote';



export default function RichTiptap({content, onChange}) {
    function handleChange(e) {
        onChange(e)
    };

    const editor = useEditor({
        extensions: [
            StarterKit, 
            Underline, 
            Blockquote,
        ],
        editorProps: {
            attributes: {
                class:
                "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-700 t items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
            },
        },
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            handleChange(editor.getHTML());
        },
    });

    
  return (
    <div>
        <RichToolbar editor={editor} />
        <EditorContent style={{whiteSpace: 'pre-line',}} editor={editor} />
    </div>
  )
}
