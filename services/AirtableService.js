// services/AirtableService.js
import Airtable from 'airtable'

export async function getAirtableRecords(tableName, apiKey) {
  if (!apiKey) {
    throw new Error('Airtable API key is required')
  }

  const base = new Airtable({ apiKey }).base('appErImxpeRDom8je')
  const records = await base(tableName).select({ view: 'Grid view' }).all()
  
  return records.map(record => ({
    id: record.id,
    fields: record.fields
  }))
}