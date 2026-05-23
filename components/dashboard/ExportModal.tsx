"use client"

import { useGridStore } from "@/store/useGridStore"
import { X, Copy, Check } from "lucide-react"
import { useState } from "react"

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { items, columns, gap } = useGridStore()
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'tailwind' | 'css' | 'jsx'>('tailwind')

  if (!isOpen) return null;

  const generateTailwindCode = () => {
    let code = `const gridItems = [\n`;
    items.forEach((item, index) => {
      const colClass = `col-span-${item.colSpan}`;
      const rowClass = `row-span-${item.rowSpan}`;
      const styles = item.styles;
      const combinedClasses = `${colClass} ${rowClass} ${styles.bg} ${styles.textColor} ${styles.border} ${styles.shadow} ${styles.padding} ${styles.radius} text-${styles.align}`;
      
      code += `  {\n`;
      code += `    id: ${index + 1},\n`;
      code += `    contentType: "${item.content.contentType || 'text'}",\n`;
      code += `    title: "${item.content.title}",\n`;
      code += `    description: "${item.content.description}",\n`;
      if (item.content.image) {
        code += `    image: "${item.content.image}",\n`;
      }
      code += `    className: "${combinedClasses}",\n`;
      if (styles.opacity < 100) {
        code += `    opacity: ${styles.opacity / 100},\n`;
      }
      code += `  },\n`;
    });
    code += `];\n\n`;

    code += `export default function GridLayout() {\n`;
    code += `  return (\n`;
    code += `    <div className="grid grid-cols-${columns} gap-[${gap}px] h-full">\n`;
    code += `      {gridItems.map((item) => (\n`;
    code += `        <div \n`;
    code += `          key={item.id} \n`;
    code += `          className={item.className}\n`;
    code += `          style={item.opacity ? { opacity: item.opacity } : undefined}\n`;
    code += `        >\n`;
    code += `          {item.contentType === 'image' && item.image ? (\n`;
    code += `            <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />\n`;
    code += `          ) : (\n`;
    code += `            <>\n`;
    code += `              <h3 className="font-bold mb-2">{item.title}</h3>\n`;
    code += `              <p className="opacity-80">{item.description}</p>\n`;
    code += `            </>\n`;
    code += `          )}\n`;
    code += `        </div>\n`;
    code += `      ))}\n`;
    code += `    </div>\n`;
    code += `  );\n`;
    code += `}`;
    
    return code;
  }

  const generateHTMLCode = () => {
    let html = `<div class="grid-container">\n`;
    
    items.forEach((item, index) => {
      html += `  <div class="grid-item item-${index + 1}">\n`;
      if (item.content.contentType === 'image' && item.content.image) {
        html += `    <img src="${item.content.image}" alt="${item.content.title}" class="item-image" />\n`;
      } else {
        html += `    <h3>${item.content.title}</h3>\n`;
        html += `    <p>${item.content.description}</p>\n`;
      }
      html += `  </div>\n`;
    });
    
    html += `</div>`;
    return html;
  }

  const generateCSSCode = () => {
    let css = `.grid-container {\n`;
    css += `  display: grid;\n`;
    css += `  grid-template-columns: repeat(${columns}, minmax(0, 1fr));\n`;
    css += `  gap: ${gap}px;\n`;
    css += `  height: 100%;\n`;
    css += `}\n\n`;
    
    css += `.grid-item {\n`;
    css += `  padding: 24px;\n`;
    css += `  border-radius: 12px;\n`;
    css += `  background-color: #f4f4f5;\n`;
    css += `  border: 1px solid #e4e4e7;\n`;
    css += `  font-family: system-ui, -apple-system, sans-serif;\n`;
    css += `}\n\n`;
    
    css += `.grid-item h3 {\n`;
    css += `  margin-top: 0;\n`;
    css += `  margin-bottom: 8px;\n`;
    css += `  font-weight: bold;\n`;
    css += `}\n\n`;
    
    css += `.grid-item p {\n`;
    css += `  margin: 0;\n`;
    css += `  opacity: 0.8;\n`;
    css += `}\n\n`;
    
    css += `.grid-item img.item-image {\n`;
    css += `  width: 100%;\n`;
    css += `  height: 100%;\n`;
    css += `  object-fit: cover;\n`;
    css += `  border-radius: 8px;\n`;
    css += `}\n\n`;
    
    items.forEach((item, index) => {
      css += `.item-${index + 1} {\n`;
      css += `  grid-column: span ${item.colSpan} / span ${item.colSpan};\n`;
      css += `  grid-row: span ${item.rowSpan} / span ${item.rowSpan};\n`;
      css += `  text-align: ${item.styles.align};\n`;
      if (item.styles.opacity < 100) {
        css += `  opacity: ${item.styles.opacity / 100};\n`;
      }
      css += `}\n`;
      if (index < items.length - 1) css += '\n';
    });
    
    return css;
  }

  const generateJSXCode = () => {
    let jsx = `import React from 'react';\n`;
    jsx += `import './Grid.css'; // Adjust path as needed\n\n`;
    
    jsx += `const gridItems = [\n`;
    items.forEach((item, index) => {
      jsx += `  {\n`;
      jsx += `    id: ${index + 1},\n`;
      jsx += `    contentType: "${item.content.contentType || 'text'}",\n`;
      jsx += `    title: "${item.content.title}",\n`;
      jsx += `    description: "${item.content.description}",\n`;
      if (item.content.image) {
        jsx += `    image: "${item.content.image}",\n`;
      }
      jsx += `    className: "grid-item item-${index + 1}",\n`;
      jsx += `  },\n`;
    });
    jsx += `];\n\n`;

    jsx += `export default function GridLayout() {\n`;
    jsx += `  return (\n`;
    jsx += `    <div className="grid-container">\n`;
    jsx += `      {gridItems.map((item) => (\n`;
    jsx += `        <div key={item.id} className={item.className}>\n`;
    jsx += `          {item.contentType === 'image' && item.image ? (\n`;
    jsx += `            <img src={item.image} alt={item.title} className="item-image" />\n`;
    jsx += `          ) : (\n`;
    jsx += `            <>\n`;
    jsx += `              <h3>{item.title}</h3>\n`;
    jsx += `              <p>{item.description}</p>\n`;
    jsx += `            </>\n`;
    jsx += `          )}\n`;
    jsx += `        </div>\n`;
    jsx += `      ))}\n`;
    jsx += `    </div>\n`;
    jsx += `  );\n`;
    jsx += `}`;
    return jsx;
  }

  const tailwindCode = generateTailwindCode();
  const cssGridCode = `<!-- HTML -->\n${generateHTMLCode()}\n\n/* CSS */\n${generateCSSCode()}`;
  const jsxCode = `/* JSX (Save as GridLayout.jsx) */\n${generateJSXCode()}\n\n/* CSS (Save as Grid.css) */\n${generateCSSCode()}`;

  let currentCode = tailwindCode;
  if (activeTab === 'css') currentCode = cssGridCode;
  else if (activeTab === 'jsx') currentCode = jsxCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Export Code</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-4">
          <button
            onClick={() => setActiveTab('tailwind')}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'tailwind' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            Tailwind + React
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'css' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            CSS Grid (HTML/CSS)
          </button>
          <button
            onClick={() => setActiveTab('jsx')}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'jsx' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            React (JSX + CSS)
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 bg-zinc-50 dark:bg-zinc-950 relative group">
          <button
            onClick={handleCopy}
            className="absolute top-6 right-6 p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            {copied ? <><Check size={14} className="text-emerald-500" /> Copied</> : <><Copy size={14} /> Copy to Clipboard</>}
          </button>
          <pre className="text-sm font-mono text-zinc-800 dark:text-zinc-300 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
            <code>{currentCode}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end bg-white dark:bg-zinc-900">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            Close
          </button>
          <button 
            onClick={handleCopy}
            className="ml-3 px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
      </div>
    </div>
  )
}
