// services/auth.ts  эсвэл admin/services/auth.ts

import { apiFetch } from "@/lib/api";

const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

// Backend-ийн жинхэнэ URL (Vercel дээрх API project)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://food-delivery-psi-pearl.vercel.app";

const setAuthCookie = (token: string): void => {
  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

const clearAuthCookie = (): void => {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
};

const persistAuth = (token: string): void => {
  localStorage.setItem("accessToken", token);
  setAuthCookie(token);
};

// ====================== ЗАСВАРЛАСАН ХЭСЭГ ======================

export const login = async (payload: AuthPayload): Promise<AuthResponse> => {
  const data = await apiFetch<AuthResponse>(`${API_BASE_URL}/api/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (data.accessToken) persistAuth(data.accessToken);
  return data;
};

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const data = await apiFetch<AuthResponse>(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (data.accessToken) persistAuth(data.accessToken);
  return data;
};

export const logout = (): void => {
  localStorage.removeItem("accessToken");
  clearAuthCookie();
};