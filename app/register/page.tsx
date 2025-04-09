"use client";

import React, { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { postDataUsingServiceAndBodyData } from "../libs/apiClinet";
import { URLConsatnts } from "../libs/urlConstants";
import LoaderComponent from "../components/Loader";
import { showToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(3, "Name is too short"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

function Register() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    try {
      console.log( URLConsatnts.userRegistrationApiUrl , "sadadsa")
      setLoading(true);
      const res = await postDataUsingServiceAndBodyData(
        URLConsatnts.userRegistrationApiUrl,
        formData
      );
      console.log(res);

      showToast({
        title: "Registred Successfully! 👍👍",
        variant: "success",
      });

      router.push('/login')
    } catch (err : any) {
      showToast({
        title: `${err ?  err.error + ' 😔😔' : 'Unexpected error 😔😔'}`,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoaderComponent show={isLoading} />
      <div className="lg:max-w-md sm:max-w-lg mt-10 md:mt-10  mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl">Customer Signup</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPass">Password</Label>
                  <Input
                    id="confirmPass"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button variant="outline" onClick={() => reset()}>
                  Reset
                </Button>
                <Button type="submit">Signup</Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center items-center gap-1">
            <small className="text-gray-500">Already have an account?</small>
            <Link href="/login">
              <Button variant="link">Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Register;
