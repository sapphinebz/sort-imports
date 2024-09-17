import { Observable } from "rxjs";
import fs from "node:fs";

export function writeStatements(filePath, finalContent) {
  return new Observable((subscriber) => {
    fs.writeFile(filePath, finalContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        subscriber.error(err);
        return;
      }
      subscriber.next();
      subscriber.complete();
    });
  });
}
