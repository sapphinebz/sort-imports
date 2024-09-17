#!/usr/bin/env node

import { distinctSetOfImportContext } from "../src/distinct-set-of-import-context.js";
import { sortingImportStatement } from "../src/sorting-import-statement.js";
import { readStatements } from "../src/read-statements.js";
import { switchMap } from "rxjs";
import { writeStatements } from "../src/write-statements.js";

// import path from 'node:path';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Please provide a file name.");
  process.exit(1);
}

const filePath = args[0];

readStatements(filePath)
  .pipe(
    switchMap(({ importString, contentWithoutImports }) => {
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
  )
  .subscribe();
