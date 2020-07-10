import User from 'entities/User';
import {DocumentsRevision} from 'entities/Documents';

export default interface Courier {
  id: string;
  user: User;
  revision: DocumentsRevision | undefined;
}
