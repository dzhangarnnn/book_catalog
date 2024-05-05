import { IComment } from "../models/IComment";
import httpService from "./http.service";
const commentEndpoint = "comment/";

const commentService = {
  createComment: async (payload: { content: string; bookPageId: string }) => {
    const { data } = await httpService.post<{ content: IComment }>(
      commentEndpoint,
      payload,
    );
    return data;
  },
  getComments: async (bookPageId: string) => {
    const { data } = await httpService.get<{ content: IComment[] }>(
      commentEndpoint,
      {
        params: {
          orderBy: "bookPageId",
          equalTo: `${bookPageId}`,
        },
      },
    );
    return data;
  },
  removeComment: async (commentId: string) => {
    const { data } = await httpService.delete<{ content: "" }>(
      commentEndpoint + commentId,
    );
    return data;
  },
};
export default commentService;
