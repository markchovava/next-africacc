"use client";
import React from 'react'
import RichTiptap from './RichTiptap';


export default function RichTextEditor({ content, setContent }) {
    function handleContent(e) {
        setContent(e)
    } 
  return (
    <div className='overflow-hidden'>
        <RichTiptap 
            content={content} 
            onChange={handleContent} />
    </div>
  )
}
