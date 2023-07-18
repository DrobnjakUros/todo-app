interface Todo {
  _id: number;
  title: string;
  status: "New" | "InProgress" | "Done";
  priority: number;
}
interface User {
  user: string;
  password: string;
}
interface Token {
    token: string;
}
