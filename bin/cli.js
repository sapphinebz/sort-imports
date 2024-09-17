#!/usr/bin/env node

import { defer } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { sortImports } from "../src/sort-imports.js";
import { readTypeScriptFiles } from "../src/read-typescript-files.js";

const args = process.argv.slice(2);

// if (args.length === 0) {
//   console.log("Please provide a file name.");
//   process.exit(1);
// }

defer(() => {
  const filePath = args[0];

  console.log("no filePath args");
  if (filePath) {
    console.log(`target file: ${filePath}`);
    return sortImports(filePath);
  }

  return readTypeScriptFiles(process.cwd()).pipe(
    mergeMap((tsFilePath) => {
      return sortImports(tsFilePath);
    })
  );
}).subscribe();
