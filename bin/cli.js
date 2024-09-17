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

  if (filePath) {
    return sortImports(filePath);
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return readTypeScriptFiles(__dirname).pipe(
    mergeMap((tsFilePath) => sortImports(tsFilePath))
  );
}).subscribe();
