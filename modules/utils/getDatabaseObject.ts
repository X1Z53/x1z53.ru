export default function getDatabaseObject(
  database: { name: string; title: string; description?: string }[],
  objectName,
) {
  return database.find(({ name }) => name === objectName)
}
