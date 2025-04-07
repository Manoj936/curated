"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof loginFormSchema>;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    
  } = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data)
    // You can now call your API with the validated `data`
  }
  return (
    <div className="max-w-md mx-auto ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  required
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  required
                  id="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button variant="outline"  onClick={() => reset()}>Reset</Button>
              <Button type="submit" >Login</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-1">
        <small className="text-gray-500">Don't have an account?</small>
          <Link href="/register">
            <Button variant="link"> Signup</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
