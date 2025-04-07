"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { sellerRole, userRole } from "../libs/constant"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(3, "Name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword : z.string(),
  role: z.enum([userRole, sellerRole], {
    required_error: "Role is required",
  }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data)
    // You can now call your API with the validated `data`
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Signup</CardTitle>
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
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value : any) => setValue("role", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={userRole}>Customer</SelectItem>
                    <SelectItem value={sellerRole}>Seller</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
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
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
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

              <Button variant="outline"  onClick={() => reset()}>Reset</Button>
              <Button type="submit" >Signup</Button>
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
  )
}

export default Register
