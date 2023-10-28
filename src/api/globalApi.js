import { publicService } from ".";

export function searchApi(searchValue) {
  return publicService.get(`/search?value=${searchValue}`);
}
