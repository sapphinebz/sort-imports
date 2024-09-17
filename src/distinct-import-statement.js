export function distinctImportStatement(
  importStatements,
  singleSet,
  multiplesSet
) {
  for (const statement of importStatements) {
    const matched = /^import[\s\n]+\{([^}]+)\}/.exec(statement);
    const importMatch = matched[1];
    if (importMatch) {
      const imports = importMatch
        .replace(/[\s\n]/g, "")
        .split(",")
        .filter((item) => Boolean(item.trim()));

      if (imports.length > 1) {
        multiplesSet.add(statement);
      } else if (imports.length === 1) {
        singleSet.add(statement);
      }
    }
  }
}
