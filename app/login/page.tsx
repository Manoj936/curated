"use client";
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
import { getSession, signIn } from "next-auth/react";
import { showToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { sellerRole, superuserRole, userRole } from "../libs/constant";

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
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(result);

    if (result?.error) {
      showToast({
        title: result.error,
        variant: "error",
      });
    } else {
      showToast({
        title: "Login successful!",
        variant: "success",
      });
      const session = await getSession(); 
      console.log("Session:", session);

      if (session?.user?.role === userRole) {
        router.push("/");
      }
      if (session?.user?.role === sellerRole) {
        router.push("/seller");
      }
      if (session?.user?.role === superuserRole) {
        router.push("/superuser");
      }
    }
  };
  return (
    <div className="lg:max-w-md sm:max-w-lg mt-10 md:mt-10  mx-auto">
      <Card className="w-full ">
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
              <Button variant="outline" onClick={() => reset()}>
                Reset
              </Button>
              <Button type="submit">Login</Button>
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
