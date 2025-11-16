export interface Subtask {
  id: string;
  text: string;
  done?: boolean;
}

export interface Task {
  id: string;
  title: string;
  list: string;
  tags?: string[];
  due?: string | null;
  subtasks?: Subtask[];
  description?: string;
}
