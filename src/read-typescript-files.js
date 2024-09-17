import fs from "node:fs";
import path from "node:path";
import { Observable } from "rxjs";

export function readTypeScriptFiles(folderPath) {
  return new Observable((subscriber) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(`Unable to scan directory: ${err}`);
        subscriber.error(err);
        return;
      }

      // Filter out only .ts files
      const tsFiles = files.filter((file) => path.extname(file) === ".ts");

      // Print out the .ts files
      tsFiles.forEach((file) => {
        subscriber.next(path.join(folderPath, file));
      });

      subscriber.complete();
    });
  });
}
