import { distinctSetOfImportContext } from "../src/distinct-set-of-import-context.js";
import { sortingImportStatement } from "../src/sorting-import-statement.js";
import { readStatements } from "../src/read-statements.js";
import { mergeMap } from "rxjs";
import { writeStatements } from "../src/write-statements.js";

export function sortImports(filePath) {
  return readStatements(filePath).pipe(
    mergeMap(({ importString, contentWithoutImports }) => {
      const [singleSet, multiplesSet] =
        distinctSetOfImportContext(importString);
      const resultsMultiplesSet = sortingImportStatement(multiplesSet, true);
      const resultsSingleSet = sortingImportStatement(singleSet, false);

      const finalResult =
        Array.from(resultsMultiplesSet)
          .concat(Array.from(resultsSingleSet))
          .join(";\n") + ";";

      return writeStatements(
        filePath,
        `${finalResult}\n${contentWithoutImports}`
      );
    })
  );
}
