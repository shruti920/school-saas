"use client";

import { useState } from "react";
import { login } from "../services/authService";

export default function useLogin() {
  const [loading, setLoading] = useState(false);

  async function handleLogin(values) {
    try {
      setLoading(true);

      await login(values.email, values.password);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    handleLogin,
  };
}