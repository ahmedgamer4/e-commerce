import { authFetch } from "./auth-fetch";
import { BACKEND_URL } from "./constants";
import { asyncWrapper } from "./utils";

const baseUrl = BACKEND_URL + "/users";

export const getCustomersCount = () =>
  asyncWrapper(async () => {
    return authFetch<{ count: number }>(baseUrl + "/customers-count", {
      method: "GET",
    });
  });
