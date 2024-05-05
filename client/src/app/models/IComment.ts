export interface IComment {
  _id: string;
  bookPageId: string;
  userId: string;
  content: string;
  created_at: Date;
  updatedAt: Date;
  __v: number;
}
