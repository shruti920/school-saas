"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/loginSchema";
import useLogin from "../hooks/useLogin";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();

  const { loading, handleLogin } = useLogin();

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

    const result = await handleLogin(values);

    if (!result.success) {
      setError(result.message);
      return;
    }

    router.push("/dashboard");
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
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}