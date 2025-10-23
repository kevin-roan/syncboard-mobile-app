import { Status } from './status';

export type Task = {
  id: string;
  title: string;
  description?: string;
  markdown: string;
  status: Status;
  dueDate: string;
  assignedTo: string[];
  assignedBy: string;
};
