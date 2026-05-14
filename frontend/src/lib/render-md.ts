import katex from 'katex';

function renderInlineLatex(text: string): string {
  return text.replace(/\$(.+?)\$/g, (_, formula: string) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return `<span class="text-red-400">$${formula}$</span>`;
    }
  });
}

export function renderMarkdown(text: string): string {
  if (!text) return '';

  const codeBlocks: string[] = [];
  let html = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const label = lang ? `<span class="text-xs text-gray-400 dark:text-gray-500 mb-1 block">${lang}</span>` : '';
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 my-3 overflow-x-auto text-sm leading-relaxed border dark:border-gray-700"><code>${label}${escaped}</code></pre>`);
    return `\x00CODEBLOCK_${idx}\x00`;
  });

  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, formula: string) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false });
    } catch {
      return `<div class="text-red-400">$$${formula}$$</div>`;
    }
  });

  html = renderInlineLatex(html);
  const lines = html.split('\n');
  const out: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('\x00CODEBLOCK_') || trimmed.includes('katex-display') || trimmed.startsWith('<pre')) {
      if (inList) { out.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = null; }
      out.push(trimmed);
      continue;
    }

    if (/^---+\s*$/.test(trimmed) || /^\*\*\*+\s*$/.test(trimmed)) {
      if (inList) { out.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = null; }
      out.push('<hr class="my-4 border-gray-200 dark:border-gray-700" />');
      continue;
    }

    const hMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (hMatch) {
      if (inList) { out.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = null; }
      const level = hMatch[1].length;
      const sizes: Record<number, string> = {
        1: 'text-xl font-bold mt-6 mb-3',
        2: 'text-lg font-semibold mt-5 mb-2',
        3: 'text-base font-semibold mt-4 mb-2',
        4: 'text-sm font-semibold mt-3 mb-1',
      };
      out.push(`<h${level} class="${sizes[level] || 'text-base font-semibold mt-3 mb-2'} text-gray-900 dark:text-gray-100">${hMatch[2]}</h${level}>`);
      continue;
    }

    const bqMatch = trimmed.match(/^>\s?(.+)$/);
    if (bqMatch) {
      if (inList) { out.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = null; }
      out.push(`<blockquote class="border-l-3 border-blue-400 dark:border-blue-500 pl-4 my-2 text-gray-600 dark:text-gray-400 italic text-sm">${bqMatch[1]}</blockquote>`);
      continue;
    }

    const ulMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) out.push(listType === 'ul' ? '</ul>' : '</ol>');
        out.push('<ul class="my-1 space-y-0.5">');
        inList = true;
        listType = 'ul';
      }
      out.push(`<li class="flex items-start gap-1.5 text-sm text-gray-700 dark:text-gray-300"><span class="text-gray-400 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></span><span>${ulMatch[1]}</span></li>`);
      continue;
    }

    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) out.push(listType === 'ul' ? '</ul>' : '</ol>');
        out.push('<ol class="my-1 space-y-0.5 list-decimal list-inside text-sm text-gray-700 dark:text-gray-300">');
        inList = true;
        listType = 'ol';
      }
      out.push(`<li class="pl-1">${olMatch[1]}</li>`);
      continue;
    }

    // Table row
    const tableMatch = trimmed.match(/^\|(.+)\|$/);
    if (tableMatch && !trimmed.includes('---')) {
      if (inList) { out.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = null; }
      const cells = tableMatch[1].split('|').map((c: string) => c.trim());
      const row = cells.map((c: string) => `<td class="px-3 py-1.5 border dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">${c}</td>`).join('');
      out.push(`<tr>${row}</tr>`);
      continue;
    }

    // Empty line closes lists
    if (trimmed === '') {
      if (inList) { out.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = null; }
      continue;
    }

    // Regular paragraph
    if (inList) { out.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = null; }

    // Process inline formatting for paragraph text
    let para = trimmed
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs font-mono text-pink-600 dark:text-pink-400">$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<del class="text-gray-400">$1</del>')
      // Auto-link
      .replace(/https?:\/\/[^\s<]+/g, (url: string) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 underline">${url}</a>`);

    out.push(`<p class="mb-2 last:mb-0 text-sm leading-relaxed text-gray-700 dark:text-gray-300">${para}</p>`);
  }

  if (inList) {
    out.push(listType === 'ul' ? '</ul>' : '</ol>');
  }

  html = out.join('\n');

  // Close open table tags
  html = html.replace(/((?:<tr>.*?<\/tr>\n?)+)/g, '<table class="min-w-full my-3 border-collapse rounded-lg overflow-hidden"><tbody>$1</tbody></table>');

  // Restore code blocks
  html = html.replace(/\x00CODEBLOCK_(\d+)\x00/g, (_, idx) => codeBlocks[parseInt(idx)] || '');

  return html;
}


