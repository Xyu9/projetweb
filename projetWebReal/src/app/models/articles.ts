import { v4 as uuidv4 } from 'uuid';
import {UUID} from "node:crypto"

export interface Article {
  id: UUID | null;
  title: string;
  content: string;
  date: string;
  user: string;
}


