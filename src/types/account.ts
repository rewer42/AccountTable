import type {Tag} from "@/types/tag.ts";

export interface Account {
  id: string;
  login: string;
  password: string | null;
  tags: Tag[];
  recordType: string;
}
