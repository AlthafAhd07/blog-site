import { privateService } from ".";

export function createCommentApi(comment) {
  return privateService.post(`/blog/comment`, { comment });
}
