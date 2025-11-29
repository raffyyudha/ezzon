"use client";

import { useState, useRef, useEffect } from "react";

interface ModernRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ModernRichTextEditor({ 
  value, 
  onChange, 
  placeholder 
}: ModernRichTextEditorProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [imageLibrary, setImageLibrary] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load image library from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('imageLibrary');
    if (saved) {
      try {
        setImageLibrary(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load image library', e);
      }
    }
  }, []);

  // Save image library to localStorage
  const saveImageLibrary = (images: string[]) => {
    setImageLibrary(images);
    localStorage.setItem('imageLibrary', JSON.stringify(images));
  };

  // Auto-format plain text to HTML with proper paragraph tags
  const formatPlainTextToHTML = (text: string): string => {
    // Split by double line breaks (paragraph separator)
    const paragraphs = text.split(/\n\n+/);
    
    return paragraphs
      .map(para => {
        const trimmed = para.trim();
        if (!trimmed) return '';
        
        // Check if already has HTML tags
        if (trimmed.startsWith('<')) {
          return trimmed;
        }
        
        // Replace single line breaks with <br>
        const withBreaks = trimmed.replace(/\n/g, '<br>');
        
        // Wrap in paragraph tag
        return `<p class="mb-4">${withBreaks}</p>`;
      })
      .filter(Boolean)
      .join('\n\n');
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text/plain');
    
    // Only auto-format if pasted text doesn't contain HTML tags
    if (pastedText && !pastedText.includes('<')) {
      e.preventDefault();
      
      const formatted = formatPlainTextToHTML(pastedText);
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + formatted + value.substring(end);
      
      onChange(newValue);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + formatted.length, start + formatted.length);
      }, 0);
    }
  };

  // Insert text at cursor position
  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  // Wrap selected text with tags
  const wrapSelection = (openTag: string, closeTag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newValue = value.substring(0, start) + openTag + selectedText + closeTag + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length);
    }, 0);
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar');
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/news/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Gagal upload gambar');

      const data = await res.json();
      if (data.url) {
        // Add to library
        const newLibrary = [data.url, ...imageLibrary];
        saveImageLibrary(newLibrary);
        
        // Insert into content
        insertAtCursor(`<img src="${data.url}" alt="Gambar artikel" loading="lazy" class="w-full rounded-lg my-4" />`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengupload gambar');
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  // Insert image from library
  const insertImageFromLibrary = (url: string) => {
    insertAtCursor(`<img src="${url}" alt="Gambar artikel" loading="lazy" class="w-full rounded-lg my-4" />`);
    setShowImageLibrary(false);
  };

  // Insert link
  const insertLink = (url: string, text: string) => {
    const linkHtml = `<a href="${url}" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">${text}</a>`;
    insertAtCursor(linkHtml);
    setShowLinkModal(false);
  };

  // Quick format buttons
  const formatButtons = [
    { label: 'H2', icon: 'H2', action: () => wrapSelection('<h2 class="text-2xl font-bold mt-6 mb-4">', '</h2>'), title: 'Heading 2' },
    { label: 'H3', icon: 'H3', action: () => wrapSelection('<h3 class="text-xl font-semibold mt-4 mb-3">', '</h3>'), title: 'Heading 3' },
    { label: 'B', icon: '𝐁', action: () => wrapSelection('<strong>', '</strong>'), title: 'Bold' },
    { label: 'I', icon: '𝐼', action: () => wrapSelection('<em>', '</em>'), title: 'Italic' },
    { label: 'P', icon: '¶', action: () => wrapSelection('<p class="mb-4">', '</p>'), title: 'Paragraph' },
  ];

  return (
    <div className="modern-editor border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Format Buttons */}
          <div className="flex gap-1 border-r pr-2">
            {formatButtons.map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={btn.action}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary transition-all text-sm font-semibold shadow-sm"
                title={btn.title}
              >
                {btn.icon}
              </button>
            ))}
          </div>

          {/* List Buttons */}
          <div className="flex gap-1 border-r pr-2">
            <button
              type="button"
              onClick={() => insertAtCursor('<ul class="list-disc list-inside mb-4 space-y-2">\n  <li></li>\n  <li></li>\n</ul>')}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary transition-all text-sm shadow-sm"
              title="Bullet List"
            >
              • List
            </button>
            <button
              type="button"
              onClick={() => insertAtCursor('<ol class="list-decimal list-inside mb-4 space-y-2">\n  <li></li>\n  <li></li>\n</ol>')}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary transition-all text-sm shadow-sm"
              title="Numbered List"
            >
              1. List
            </button>
          </div>

          {/* Image & Link Buttons */}
          <div className="flex gap-1 border-r pr-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="px-3 py-2 bg-primary text-white border border-primary rounded-lg hover:bg-primary/90 transition-all text-sm font-semibold shadow-sm disabled:opacity-50"
              title="Upload Gambar"
            >
              {uploadingImage ? '⏳ Upload...' : '🖼️ Upload'}
            </button>
            <button
              type="button"
              onClick={() => setShowImageLibrary(true)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary transition-all text-sm shadow-sm"
              title="Galeri Gambar"
            >
              📚 Galeri
            </button>
            <button
              type="button"
              onClick={() => setShowLinkModal(true)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary transition-all text-sm shadow-sm"
              title="Insert Link"
            >
              🔗 Link
            </button>
          </div>

          {/* Quote Button */}
          <button
            type="button"
            onClick={() => wrapSelection('<blockquote class="border-l-4 border-primary pl-4 italic my-4 text-gray-700">', '</blockquote>')}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary transition-all text-sm shadow-sm"
            title="Quote"
          >
            💬 Quote
          </button>

          {/* Preview Toggle */}
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                showPreview 
                  ? 'bg-primary text-white' 
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {showPreview ? '👁️ Preview ON' : '👁️ Preview OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
        className="hidden"
      />

      {/* Editor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-gray-300">
        {/* Editor */}
        <div 
          className={`relative ${dragActive ? 'bg-blue-50' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onPaste={handlePaste}
            placeholder={placeholder || "Mulai menulis artikel Anda di sini...\n\nCopy-paste teks langsung dari Word/dokumen lain - akan otomatis diformat!\n\nGunakan toolbar di atas untuk format teks dan insert gambar.\n\nAnda juga bisa drag & drop gambar langsung ke sini!"}
            className="w-full px-4 py-4 min-h-[500px] focus:outline-none font-mono text-sm leading-relaxed resize-none"
            style={{ minHeight: '500px' }}
          />
          
          {dragActive && (
            <div className="absolute inset-0 bg-blue-100 bg-opacity-90 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-6xl mb-4">📤</div>
                <p className="text-xl font-bold text-blue-700">Drop gambar di sini</p>
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-gray-50 px-6 py-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
            <div className="prose prose-sm max-w-none">
              <div className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                📱 Preview
              </div>
              {value ? (
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              ) : (
                <p className="text-gray-400 italic">Preview akan muncul di sini...</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t-2 border-gray-300 px-4 py-3">
        <div className="flex items-start gap-2 text-xs text-gray-700">
          <span className="text-lg">💡</span>
          <div>
            <p className="font-semibold mb-1">Tips Menulis Artikel:</p>
            <ul className="space-y-1 text-gray-600">
              <li>• <strong>MUDAH:</strong> Copy-paste langsung dari Word/dokumen - jarak paragraf otomatis diatur!</li>
              <li>• Pisahkan paragraf dengan 2x Enter (baris kosong) untuk jarak yang benar</li>
              <li>• Gunakan heading (H2, H3) untuk struktur artikel yang jelas</li>
              <li>• Upload gambar dengan drag & drop atau tombol Upload</li>
              <li>• Simpan gambar ke Galeri untuk digunakan kembali di artikel lain</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Image Library Modal */}
      {showImageLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">📚 Galeri Gambar</h3>
              <button
                onClick={() => setShowImageLibrary(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
              {imageLibrary.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-gray-500">Belum ada gambar di galeri</p>
                  <p className="text-sm text-gray-400 mt-2">Upload gambar untuk menyimpannya di galeri</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imageLibrary.map((url, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-all"
                      onClick={() => insertImageFromLibrary(url)}
                    >
                      <img
                        src={url}
                        alt={`Gallery ${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 font-semibold">
                          Klik untuk Insert
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newLibrary = imageLibrary.filter((_, i) => i !== idx);
                          saveImageLibrary(newLibrary);
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <LinkModal
          onInsert={insertLink}
          onClose={() => setShowLinkModal(false)}
        />
      )}
    </div>
  );
}

// Link Modal Component
function LinkModal({ 
  onInsert, 
  onClose 
}: { 
  onInsert: (url: string, text: string) => void; 
  onClose: () => void;
}) {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [linkType, setLinkType] = useState<'custom' | 'datasheet' | 'brochure'>('custom');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUrl = url.trim();
    const trimmedText = text.trim();

    if (!trimmedUrl || !trimmedText) {
      setValidationError("Teks dan URL tidak boleh kosong");
      return;
    }

    if (!/^https?:\/\/.+/i.test(trimmedUrl)) {
      setValidationError("URL harus diawali dengan http:// atau https://");
      return;
    }

    setValidationError(null);
    onInsert(trimmedUrl, trimmedText);
    setUrl('');
    setText('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h3 className="text-xl font-bold">🔗 Insert Link</h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Link Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipe Link
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLinkType('custom')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  linkType === 'custom'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Custom
              </button>
              <button
                type="button"
                onClick={() => setLinkType('datasheet')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  linkType === 'datasheet'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📄 Datasheet
              </button>
              <button
                type="button"
                onClick={() => setLinkType('brochure')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  linkType === 'brochure'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📑 Brosur
              </button>
            </div>
          </div>

          {/* Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teks Link
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (validationError) setValidationError(null);
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={
                linkType === 'datasheet' 
                  ? 'Download Datasheet Produk' 
                  : linkType === 'brochure'
                  ? 'Download Brosur Produk'
                  : 'Teks yang akan ditampilkan'
              }
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (validationError) setValidationError(null);
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/file.pdf"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {linkType === 'datasheet' || linkType === 'brochure'
                ? '💡 Pastikan link mengarah ke file PDF atau halaman download'
                : '💡 Masukkan URL lengkap dengan https://'}
            </p>
            {validationError && (
              <p className="text-xs text-red-600 mt-1">
                {validationError}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              Insert Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
