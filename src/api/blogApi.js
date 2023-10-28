import { privateService, publicService } from ".";

export function getAllBlogsApi() {
  return publicService.get("/blog/all");
}

export function getSinlgeBlogApi(id) {
  return publicService.get(`/specificBlog/${id}`);
}

export function getAllUserBlogsApi(userId) {
  return publicService.get(`/AllUserBlogs/${userId}`);
}

export function createBlogApi(blog) {
  return privateService.post("/blog/create", blog);
}
export function editBlogApi(blog) {
  return privateService.post("/blog/update", blog);
}

export function deleteBlogApi(id) {
  return privateService.post("/blog/delete", { blogid: id });
}
