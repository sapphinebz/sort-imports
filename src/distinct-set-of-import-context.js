import { distinctImportStatement } from "./distinct-import-statement.js";

export function distinctSetOfImportContext(importContext) {
  // สร้าง Sets สำหรับเก็บ import statements
  const multiplesSet = new Set();
  const singleSet = new Set();

  // แยกบรรทัดของโค้ด
  const lines = importContext.trim().split("\n");

  // สร้างตัวแปรสำหรับเก็บ import statement ชั่วคราว
  let currentImport = "";

  // วนลูปผ่านแต่ละบรรทัด
  for (const line of lines) {
    if (line.startsWith("import")) {
      // ถ้ามีการ import statement ใหม่ ให้จัดเก็บ import statement เดิมก่อน (ถ้ามี)
      if (currentImport) {
        distinctImportStatement(currentImport.trim(), singleSet, multiplesSet);
      }
      currentImport = line;
    } else if (currentImport) {
      // ต่อเนื่อง import statement เดิม
      currentImport += line;
    }
  }

  // จัดเก็บ import statement สุดท้าย
  if (currentImport) {
    distinctImportStatement(currentImport.trim(), singleSet, multiplesSet);
  }

  return [singleSet, multiplesSet];
}
