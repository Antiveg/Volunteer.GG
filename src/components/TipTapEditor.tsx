import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';

const TipTapEditor = ({
  content = '',
  onChange,
}: {
  content?: string;
  onChange?: (html: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Strike],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col border border-dashed rounded flex-1 p-4 gap-2 bg-gray-100/25 h-full">
      <EditorContent editor={editor} className="bg-white min-h-[150px] max-h-[275px] p-2 rounded h-auto break-words break-all overflow-y-auto overflow-x-hidden" />
      <div className="flex flex-wrap gap-2 ml-auto">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive('bold') ? 'font-bold text-blue-600' : ''} bg-gray-200 px-2 py-1 my-1 rounded-md`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive('italic') ? 'italic text-blue-600' : ''} bg-gray-200 px-2 py-1 my-1 rounded-md`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${editor.isActive('underline') ? 'underline text-blue-600' : ''} bg-gray-200 px-2 py-1 my-1 rounded-md`}
        >
          Underline
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${editor.isActive('strike') ? 'line-through text-blue-600' : ''} bg-gray-200 px-2 py-1 my-1 rounded-md`}
        >
          Strike
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${editor.isActive('codeBlock') ? 'bg-gray-200 text-blue-600' : ''} bg-gray-200 px-2 py-1 my-1 rounded-md`}
        >
          Code Block
        </button>
      </div>
    </div>
  );
};

export default TipTapEditor;
