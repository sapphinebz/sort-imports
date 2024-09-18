const EXTRACT_IMPORT_STATEMENT_REGEXP =
  /import\s*{\s*([^}]*)\s*}\s*from\s*['"]([^'"]+)['"]/;
export function extractImportStatement(inputString) {
  const matches = inputString.match(EXTRACT_IMPORT_STATEMENT_REGEXP);
  if (matches) {
    // Group 1: Items in the import statement
    let items = [];
    const importItems = matches[1]?.trim();
    for (const item of importItems.split(/\s*,\s*/)) {
      if (item !== "") {
        items.push(item);
      }
    }

    // Group 2: Path after the 'from' keyword
    const path = matches[2];

    return {
      items,
      path,
    };
  }
  return null;
}
