const DISTINCT_IMPORT_STATEMENT = /^import\s+{([^}]+)}\s+from\s+['"][^'"]+['"]/;
export function distinctImportStatement(importStatement, singleSet, multiplesSet) {
    const importMatch = importStatement.match(
        DISTINCT_IMPORT_STATEMENT
    );
    if (importMatch) {
      const imports = importMatch[1].split(",").map((item) => item.trim());
      if (imports.length > 1) {
        multiplesSet.add(importStatement);
      } else {
        singleSet.add(importStatement);
      }
    } else {
      singleSet.add(importStatement);
    }
  }
  