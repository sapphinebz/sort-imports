import { extractImportStatement } from "./extract-import-statement.js";

export function sortingImportStatement(importsSet, sortItems = true) {
  const resultsSet = [];
  for (const inputString of importsSet) {
    const extracted = extractImportStatement(inputString);
    if (extracted) {
      if (sortItems) {
        extracted.items.sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );
      }

      resultsSet.push(extracted);
    }
  }

  return resultsSet
    .toSorted((a, b) =>
      a.items
        .join("")
        .toLowerCase()
        .localeCompare(b.items.join("").toLowerCase())
    )
    .map(({ items, path }) => `import { ${items.join(", ")} } from '${path}'`);
}
