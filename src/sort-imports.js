import { sortingImportStatement } from "../src/sorting-import-statement.js";
import { readStatements } from "../src/read-statements.js";
import { mergeMap, EMPTY } from "rxjs";
import { writeStatements } from "../src/write-statements.js";
import { distinctImportStatement } from "../src/distinct-import-statement.js";

export function sortImports(filePath) {
  return readStatements(filePath).pipe(
    mergeMap(({ importStatements, contentWithoutImports }) => {
      // สร้าง Sets สำหรับเก็บ import statements
      const multiplesSet = new Set();
      const singleSet = new Set();

      distinctImportStatement(importStatements, singleSet, multiplesSet);

      const resultsMultiplesSet = sortingImportStatement(multiplesSet, true);
      const resultsSingleSet = sortingImportStatement(singleSet, false);

      let finalResult = "";

      for (const result of resultsMultiplesSet) {
        finalResult += `${result};\n`;
      }

      for (const result of resultsSingleSet) {
        finalResult += `${result};\n`;
      }

      return writeStatements(
        filePath,
        `${finalResult.trim()}\n\n${contentWithoutImports.trim()}`
      );
    })
  );
}
