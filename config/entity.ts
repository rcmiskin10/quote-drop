import { FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type FieldType =
  | 'text'
  | 'rich-text'
  | 'number'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'multi-select'
  | 'tags'
  | 'url'
  | 'email'

export interface EntityField {
  name: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  description?: string
  options?: string[]
  defaultValue?: string | number | boolean
  showInList?: boolean
  showInForm?: boolean
}

export interface EntityConfig {
  name: string
  pluralName: string
  slug: string
  icon: LucideIcon
  fields: EntityField[]
  titleField: string
  descriptionField?: string
  defaultSort: { field: string; direction: 'asc' | 'desc' }
  allowCreate: boolean
  allowEdit: boolean
  allowDelete: boolean
  allowExport: boolean
}

export const entityConfig: EntityConfig = {
  name: 'Proposal',
  pluralName: 'Proposals',
  slug: 'proposals',
  icon: FileText,

  fields: [
    {
      name: 'title',
      label: 'Proposal Title',
      type: 'text',
      required: true,
      placeholder: 'e.g., Website Redesign for Acme Corp.',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'client_name',
      label: 'Client Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., Acme Corp.',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'total_amount',
      label: 'Total Amount',
      type: 'currency',
      required: true,
      placeholder: 'e.g., 1500.00',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: ['draft', 'sent', 'viewed', 'accepted', 'rejected', 'archived'],
      defaultValue: 'draft',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'date_sent',
      label: 'Date Sent',
      type: 'date',
      required: false,
      showInList: false,
      showInForm: true,
    },
    {
      name: 'acceptance_date',
      label: 'Acceptance Date',
      type: 'date',
      required: false,
      showInList: false,
      showInForm: true,
    },
    {
      name: 'shareable_link',
      label: 'Shareable Link',
      type: 'url',
      required: false,
      placeholder: 'https://quotedrop.app/q/...',
      showInList: false,
      showInForm: true,
    }
  ],

  titleField: 'title',
  descriptionField: 'client_name',
  defaultSort: { field: 'created_at', direction: 'desc' },

  allowCreate: true,
  allowEdit: true,
  allowDelete: true,
  allowExport: false,
}

export function getListFields(): EntityField[] {
  return entityConfig.fields.filter((f) => f.showInList !== false)
}

export function getFormFields(): EntityField[] {
  return entityConfig.fields.filter((f) => f.showInForm !== false)
}

export function fieldTypeToSql(type: FieldType): string {
  const mapping: Record<FieldType, string> = {
    text: 'TEXT',
    'rich-text': 'TEXT',
    number: 'INTEGER',
    currency: 'NUMERIC(10,2)',
    date: 'DATE',
    datetime: 'TIMESTAMPTZ',
    boolean: 'BOOLEAN DEFAULT FALSE',
    select: 'TEXT',
    'multi-select': 'TEXT[]',
    tags: 'TEXT[]',
    url: 'TEXT',
    email: 'TEXT',
  }
  return mapping[type] || 'TEXT'
}

export function fieldTypeToZod(field: EntityField): string {
  const base: Record<FieldType, string> = {
    text: 'z.string()',
    'rich-text': 'z.string()',
    number: 'z.coerce.number()',
    currency: 'z.coerce.number()',
    date: 'z.string()',
    datetime: 'z.string()',
    boolean: 'z.boolean()',
    select: `z.enum([${field.options?.map((o) => `'${o}'`).join(', ') || "'draft'"}])`,
    'multi-select': 'z.array(z.string())',
    tags: 'z.array(z.string())',
    url: 'z.string().url()',
    email: 'z.string().email()',
  }
  let schema = base[field.type] || 'z.string()'
  if (!field.required) {
    schema += '.optional()'
  }
  return schema
}
