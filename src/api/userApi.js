import { privateService } from ".";

export function updateUserProfileApi(userData) {
  return privateService.put("/user/updateProfile", userData);
}
