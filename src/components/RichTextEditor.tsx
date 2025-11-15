"use client";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const insertTag = (openTag: string, closeTag: string = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + openTag + selectedText + closeTag + value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length);
    }, 0);
  };

  return (
    <div className="rich-text-editor border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => insertTag("<h2>", "</h2>")}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm font-semibold"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => insertTag("<h3>", "</h3>")}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm font-semibold"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => insertTag("<strong>", "</strong>")}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm font-bold"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => insertTag("<em>", "</em>")}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm italic"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => insertTag("<p>", "</p>")}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
          title="Paragraph"
        >
          P
        </button>
        <button
          type="button"
          onClick={() => insertTag('<a href="">', "</a>")}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
          title="Link"
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => insertTag('<img src="" alt="" loading="lazy" />')}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
          title="Image"
        >
          Img
        </button>
        <button
          type="button"
          onClick={() => insertTag("<ul>\n  <li>", "</li>\n</ul>")}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
          title="Unordered List"
        >
          UL
        </button>
        <button
          type="button"
          onClick={() => insertTag("<ol>\n  <li>", "</li>\n</ol>")}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
          title="Ordered List"
        >
          OL
        </button>
        <button
          type="button"
          onClick={() => insertTag("<blockquote>", "</blockquote>")}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
          title="Blockquote"
        >
          Quote
        </button>
      </div>

      {/* Editor Area */}
      <textarea
        id="content-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Tulis artikel lengkap dengan HTML tags di sini...\n\nContoh:\n<h2>Judul Artikel</h2>\n<p>Paragraf pertama...</p>\n<strong>Teks tebal</strong>"}
        className="w-full px-4 py-3 min-h-[400px] focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm leading-relaxed resize-y"
        style={{ minHeight: "400px" }}
      />

      {/* Helper Text */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-600">
        💡 Gunakan toolbar di atas untuk insert HTML tags atau tulis langsung. HTML akan di-render di halaman detail berita.
      </div>
    </div>
  );
}
