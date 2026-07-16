"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/loginSchema";
import useLogin from "../hooks/useLogin";
import  useAuth  from "../hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();
  const { loading: loginLoading, handleLogin } = useLogin();
  const { user, profile, loading: authLoading } = useAuth();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values) {
    setError("");
    setLoginSuccess(false);

    const result = await handleLogin(values);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Login succeeded, wait for auth state to update
    setLoginSuccess(true);
  }

  // Redirect based on role after login
  // We use useEffect to wait for the auth context to update with user and profile
  // and loginSuccess flag to be true.
  // Note: authLoading might be true while waiting for session to load.
  if (loginSuccess && user && profile && !authLoading) {
    // Redirect based on role
    let redirectTo = "/dashboard"; // default
    if (profile.role === "super_admin") {
      redirectTo = "/super-admin";
    } else if (profile.role === "admin") {
      redirectTo = "/admin";
    } else if (profile.role === "teacher") {
      redirectTo = "/teacher";
    } else if (profile.role === "student") {
      redirectTo = "/student";
    }
    router.push(redirectTo);
    // Reset loginSuccess to prevent redirect loop
    setLoginSuccess(false);
  }

  if (authLoading && !loginSuccess) {
    // Show loading state in the button via the loginLoading from useLogin
    // We don't need to show extra loading here.
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          School ERP Login
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label>Password</Label>

            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            className="w-full"
            disabled={loginLoading}
            type="submit"
          >
            {loginLoading ? "Signing in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}