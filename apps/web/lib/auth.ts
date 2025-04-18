import { z } from "zod";
import { BACKEND_URL } from "./constants";
import axios, { AxiosError } from "axios";
import { createSession } from "./session";

const baseUrl = BACKEND_URL + "/auth";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  isAdmin: z.boolean(),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const registerUser = async (input: RegisterInput) => {
  try {
    const res = await axios.post(baseUrl + "/register", input);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
  }
};

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const loginUser = async (input: LoginInput) => {
  try {
    const res = await axios.post(baseUrl + "/login", input);

    if (res.status === 200)
      await createSession({
        user: {
          id: res.data.id,
          name: res.data.name,
        },
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });

    return res;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;
  }
};

export async function refreshToken(
  oldRefreshToken: string,
): Promise<string | null> {
  try {
    const res = await axios.post(
      "refresh-token",
      { refreshToken: oldRefreshToken },
      { baseURL: baseUrl },
    );

    const { accessToken, refreshToken: newRefreshToken } = res.data;

    // Update tokens on the server
    const updateRes = await fetch("http://localhost:3000/api/auth/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, refreshToken: newRefreshToken }),
    });

    if (!updateRes.ok) {
      console.error("Failed to update tokens on the server");
      return null;
    }

    return accessToken;
  } catch (error) {
    // Unified error handling
    console.error(
      "Error refreshing token:",
      error instanceof AxiosError
        ? error.response?.data || error.message
        : error,
    );
    return null;
  }
}
