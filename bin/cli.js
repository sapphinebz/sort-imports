#!/usr/bin/env node

import { defer, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { sortImports } from "../src/sort-imports.js";
import { readTypeScriptFiles } from "../src/read-typescript-files.js";
import fs from "node:fs";

const args = process.argv.slice(2);

function sortImportsByDirectory(directoryPath) {
  return readTypeScriptFiles(directoryPath).pipe(
    mergeMap((tsFilePath) => {
      console.log(`target file: ${tsFilePath}`);
      return sortImports(tsFilePath);
    })
  );
}

defer(() => {
  const inputCli = args[0];

  if (inputCli) {
    let directoryPath = "";
    let filePath = "";
    if (fs.existsSync(inputCli)) {
      const stats = fs.statSync(inputCli);
      if (stats.isDirectory()) {
        console.log(`${inputCli} is a directory.`);
        directoryPath = inputCli;
      } else if (stats.isFile()) {
        console.log(`${inputCli} is a file.`);
        filePath = inputCli;
      }
    } else {
      console.log(`${inputCli} does not exist.`);
      return EMPTY;
    }

    if (filePath) {
      console.log(`target file: ${filePath}`);
      return sortImports(filePath);
    } else if (directoryPath) {
      return sortImportsByDirectory(directoryPath);
    }
    return EMPTY;
  }

  return sortImportsByDirectory(process.cwd());
}).subscribe({
  complete: () => {
    console.log("sort-imports complete");
  },
});
