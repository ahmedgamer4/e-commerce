import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type AsyncWrapperResponse<T> =
  | { error: null; data: T }
  | { error: any; data: null };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function asyncWrapper<T>(
  fn: () => Promise<T>,
): Promise<AsyncWrapperResponse<T>> {
  try {
    const data = await fn();
    return { error: null, data };
  } catch (error) {
    console.error(error);
    return { error, data: null };
  }
}
