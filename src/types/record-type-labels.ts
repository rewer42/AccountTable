import { RecordType } from "./record-type.enum";

export const RecordTypeLabelsKeys = Object.values(RecordType);

export const RecordTypeLabels: Record<RecordType, string> = {
  [RecordType.LDAP]: 'LDAP',
  [RecordType.Local]: 'Локальная'
};
