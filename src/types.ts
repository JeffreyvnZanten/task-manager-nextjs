type Status = "todo" | "in-progress" | "done";

export type Card = {
  id: number;
  title: string;
  project_id: number;
  status: Status;
};

export type Project = {
  id: number;
  title: string;
  user_id: string;
};
