import { Observable } from "rxjs";
import fs from "node:fs";

function distinctImport(results, content) {
  const startIndex = content.search(/import[\n\s]+\{/);
  const fromIndex = content.search(/from[\n\s]+\'[^']+\'[\n\s]*;/);
  if (startIndex !== -1 && fromIndex !== -1) {
    const endIndex = content.search(/\;/);
    const semicolonIndex = endIndex + 1;
    const importStatement = content.substring(startIndex, semicolonIndex);
    results.push(importStatement);
    const newContent = content.replace(importStatement, "");
    return distinctImport(results, newContent);
  }

  return content;
}

export function readStatements(filePath) {
  return new Observable((subscriber) => {
    // Read the file asynchronously
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      let results = [];
      const newcontent = distinctImport(results, data);

      subscriber.next({
        importStatements: results,
        contentWithoutImports: newcontent,
      });
      subscriber.complete();
    });
  });
  // Read the file asynchronously
}
