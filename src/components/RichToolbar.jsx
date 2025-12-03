"use client";
import React from 'react'
import { FaHeading, FaStrikethrough, FaBold, FaItalic, FaUnderline, FaQuoteRight, FaUndo, FaRedo, FaCode, FaList, } from 'react-icons/fa';
import { GoListOrdered } from 'react-icons/go';



export default function RichToolbar({editor}) {
  return (
    <div
        className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700">
        <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
           editor?.chain().focus().toggleBold().run();
          }}
          className={
          editor?.isActive("bold")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-gray-700 p-2"
          }
        >
          <FaBold className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
          editor?.chain().focus().toggleItalic().run();
          }}
          className={
          editor?.isActive("italic")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-gray-700 p-2"
          }
        >
          <FaItalic className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
           editor?.chain().focus().toggleUnderline().run();
          }}
          className={
          editor?.isActive("underline")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-gray-700 p-2"
          }
        >
          <FaUnderline className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
          editor?.chain().focus().toggleStrike().run();
          }}
          className={
           editor?.isActive("strike")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-gray-700 p-2"
          }
        >
          <FaStrikethrough className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
           editor?.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
          editor?.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-gray-700 p-2"
          }
        >
          <FaHeading className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
           editor?.chain().focus().toggleBulletList().run();
          }}
          className={
          editor?.isActive("bulletList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-gray-700 p-2"
          }
        >
          <FaList className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
           editor?.chain().focus().toggleOrderedList().run();
          }}
          className={
          editor?.isActive("orderedList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-gray-700 p-2"
          }
        >
          <GoListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
          editor?.chain().focus().toggleBlockquote().run();
          }}
          className={
          editor?.isActive("blockquote")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "p-2 text-gray-700"
          }
        >
          <FaQuoteRight className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
           editor?.chain().focus().setCode().run();
          }}
          className={
          editor?.isActive("code")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "p-2 text-gray-700 p-2"
          }
        >
          <FaCode className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
           editor?.chain().focus().undo().run();
          }}
          className={
          editor?.isActive("undo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "p-2 text-gray-700 p-2 hover:bg-sky-700 hover:text-white hover:rounded-lg"
          }
        >
          <FaUndo className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
           editor?.chain().focus().redo().run();
          }}
          className={
          editor?.isActive("redo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "p-2 text-gray-700 p-2 hover:bg-sky-700 hover:text-white hover:rounded-lg"
          }
        >
          <FaRedo className="w-4 h-4" />
        </button>
        </div>

    </div>
  )
}
