export interface Account {
  id: string;
  login: string;
  password: string | null;
  tags: Tag[];
  recordType: string;
}

export interface Tag {
  text: string;
}

export enum RecordType {
  LDAP= "LDAP",
  Local= "Local"
}

export const RecordTypeLabelsKeys: string[] = Object.values(RecordType);
export const RecordTypeLabels: Record<string, string> = {
  [RecordType.LDAP]: 'LDAP',
  [RecordType.Local]: 'Локальная'
}
