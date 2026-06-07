"use client"

import { useGridStore } from "@/store/useGridStore"
import { X, Copy, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

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
      if (item.content.image) code += `    image: "${item.content.image}",\n`;
      code += `    className: "${combinedClasses}",\n`;
      if (styles.opacity < 100) code += `    opacity: ${styles.opacity / 100},\n`;
      code += `  },\n`;
    });
    code += `];\n\nexport default function GridLayout() {\n  return (\n    <div className="grid grid-cols-${columns} gap-[${gap}px] h-full">\n      {gridItems.map((item) => (\n        <div \n          key={item.id} \n          className={item.className}\n          style={item.opacity ? { opacity: item.opacity } : undefined}\n        >\n          {item.contentType === 'image' && item.image ? (\n            <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />\n          ) : (\n            <>\n              <h3 className="font-bold mb-2">{item.title}</h3>\n              <p className="opacity-80">{item.description}</p>\n            </>\n          )}\n        </div>\n      ))}\n    </div>\n  );\n}`;
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
    let css = `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${columns}, minmax(0, 1fr));\n  gap: ${gap}px;\n  height: 100%;\n}\n\n`;
    css += `.grid-item {\n  padding: 24px;\n  border-radius: 12px;\n  background-color: #f4f4f5;\n  border: 1px solid #e4e4e7;\n  font-family: system-ui, -apple-system, sans-serif;\n}\n\n`;
    css += `.grid-item h3 {\n  margin-top: 0;\n  margin-bottom: 8px;\n  font-weight: bold;\n}\n\n`;
    css += `.grid-item p {\n  margin: 0;\n  opacity: 0.8;\n}\n\n`;
    css += `.grid-item img.item-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 8px;\n}\n\n`;
    items.forEach((item, index) => {
      css += `.item-${index + 1} {\n  grid-column: span ${item.colSpan} / span ${item.colSpan};\n  grid-row: span ${item.rowSpan} / span ${item.rowSpan};\n  text-align: ${item.styles.align};\n`;
      if (item.styles.opacity < 100) css += `  opacity: ${item.styles.opacity / 100};\n`;
      css += `}\n`;
      if (index < items.length - 1) css += '\n';
    });
    return css;
  }

  const generateJSXCode = () => {
    let jsx = `import React from 'react';\nimport './Grid.css';\n\nconst gridItems = [\n`;
    items.forEach((item, index) => {
      jsx += `  {\n    id: ${index + 1},\n    contentType: "${item.content.contentType || 'text'}",\n    title: "${item.content.title}",\n    description: "${item.content.description}",\n`;
      if (item.content.image) jsx += `    image: "${item.content.image}",\n`;
      jsx += `    className: "grid-item item-${index + 1}",\n  },\n`;
    });
    jsx += `];\n\nexport default function GridLayout() {\n  return (\n    <div className="grid-container">\n      {gridItems.map((item) => (\n        <div key={item.id} className={item.className}>\n          {item.contentType === 'image' && item.image ? (\n            <img src={item.image} alt={item.title} className="item-image" />\n          ) : (\n            <>\n              <h3>{item.title}</h3>\n              <p>{item.description}</p>\n            </>\n          )}\n        </div>\n      ))}\n    </div>\n  );\n}`;
    return jsx;
  }

  const tailwindCode = generateTailwindCode();
  const cssGridCode = `<!-- HTML -->\n${generateHTMLCode()}\n\n/* CSS */\n${generateCSSCode()}`;
  const jsxCode = `/* JSX (Save as GridLayout.jsx) */\n${generateJSXCode()}\n\n/* CSS (Save as Grid.css) */\n${generateCSSCode()}`;

  const currentCode = activeTab === 'css' ? cssGridCode : activeTab === 'jsx' ? jsxCode : tailwindCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const TABS = [
    { id: 'tailwind' as const, label: 'Tailwind + React' },
    { id: 'css' as const, label: 'CSS Grid' },
    { id: 'jsx' as const, label: 'React + CSS' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface/50">
          <h2 className="text-base font-semibold text-foreground">Export Code</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-150 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border bg-muted/30 px-5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-150 cursor-pointer",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code area */}
        <div className="flex-1 overflow-auto p-4 bg-muted/20 relative">
          <button
            onClick={handleCopy}
            className="absolute top-6 right-6 z-10 px-3 py-1.5 bg-background border border-border rounded-md shadow-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors duration-150 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            {copied
              ? <><Check size={13} className="text-green-500" /> Copied</>
              : <><Copy size={13} /> Copy</>
            }
          </button>
          <pre className="text-sm font-mono text-foreground bg-background p-5 rounded-lg border border-border overflow-x-auto leading-relaxed">
            <code>{currentCode}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border flex justify-end gap-2 bg-background">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-150 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors duration-150 flex items-center gap-2 cursor-pointer"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
      </div>
    </div>
  )
}
