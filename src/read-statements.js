import { Observable } from "rxjs";
import fs from "node:fs";

export function readStatements(filePath) {
  return new Observable((subscriber) => {
    // Read the file asynchronously
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      // Regular expression to match the import statements
      const importRegex = /^import .* from .*;$/gm;

      // Find all import statements
      const importStatements = data.match(importRegex);

      // Join import statements into a single string
      const importString = importStatements ? importStatements.join("\n") : "";

      // Remove import statements from the original content
      const contentWithoutImports = data.replace(importRegex, "").trim();

      subscriber.next({ importString, contentWithoutImports });
      subscriber.complete();
    });
  });
  // Read the file asynchronously
}
