import React from 'react';

export default function ToolsPromo() {
    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm max-w-[1400px] mx-auto">
                    <p className="text-center text-gray-500 text-sm md:text-base font-bold uppercase tracking-widest mb-8">
                        Recommended Free Tools for Business Owners
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 items-center">

                        {/* DraftKit */}
                        <a
                            href="https://draftkit.online"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-6 group bg-white hover:bg-blue-50 p-6 rounded-xl border border-gray-100 hover:border-blue-200 transition-all shadow-sm hover:shadow-md h-full"
                        >
                            <div className="bg-blue-100 text-blue-600 p-4 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
                            </div>
                            <div className="text-left">
                                <p className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 mb-1">DraftKit Invoice Generator</p>
                                <p className="text-lg text-gray-600">100% free, no signup required. Generate professional invoices instantly.</p>
                            </div>
                        </a>

                        {/* FreeReceipt */}
                        <a
                            href="https://freereceipt.online"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-6 group bg-white hover:bg-green-50 p-6 rounded-xl border border-gray-100 hover:border-green-200 transition-all shadow-sm hover:shadow-md h-full"
                        >
                            <div className="bg-green-100 text-green-600 p-4 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1v-20l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" /><path d="M14 8h-4" /><path d="M14 12h-4" /><path d="M14 16h-4" /></svg>
                            </div>
                            <div className="text-left">
                                <p className="text-2xl font-bold text-gray-800 group-hover:text-green-700 mb-1">FreeReceipt.online</p>
                                <p className="text-lg text-gray-600">Create custom receipts instantly without any hassle.</p>
                            </div>
                        </a>

                    </div>
                </div>
            </div>
        </section>
    );
}
