/**
 * Rich bio text: `*segment*` or `"segment"` → italic (quotes shown for
 * double-quoted spans). Plain segments pass through unchanged.
 */
export function AsteriskItalic({ text }: { text: string }) {
  const chunks = text.split(/(\*[^*]+\*|"[^"]*")/g).filter(Boolean);
  return chunks.map((chunk, i) => {
    if (chunk.startsWith("*") && chunk.endsWith("*") && chunk.length > 2) {
      return <em key={i}>{chunk.slice(1, -1)}</em>;
    }
    if (chunk.startsWith('"') && chunk.endsWith('"') && chunk.length >= 2) {
      const inner = chunk.slice(1, -1);
      return (
        <em key={i}>
          {"\""}
          {inner}
          {"\""}
        </em>
      );
    }
    return <span key={i}>{chunk}</span>;
  });
}
