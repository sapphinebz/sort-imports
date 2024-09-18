const EXTRACT_IMPORT_STATEMENT_REGEXP =
  /import\s*{([^}]*)}\s*from\s*['"]([^'"]+)['"]/;
export function extractImportStatement(inputString) {
  const matches = inputString.match(EXTRACT_IMPORT_STATEMENT_REGEXP);
  if (matches) {
    // Group 1: Items in the import statement
    let items = [];
    for (const item of matches[1].split(/\s*,\s*/)) {
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
