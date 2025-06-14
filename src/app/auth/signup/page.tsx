"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function Signup() {

  const router = useRouter()

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";
    const location = formData.get("location")?.toString().trim() || "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const locationRegex = /^[^,]+,\s*[^,]+,\s*[^,]+$/;

    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "name is required";
    if (!emailRegex.test(email)) newErrors.email = "invalid email format";
    if (!locationRegex.test(location)) newErrors.location = "must in format: 'city, province, country'";
    if (!password) newErrors.password = "password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormError("Register failed. Please check your input again.");
      return;
    }

    const payload = { name, email, password, location };

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      router.push("/auth/signin");
    } catch (err: any) {
      console.error(err);
      setFormError("Register failed due to internal issues");
    }
  }

  return (
    <div className="w-full h-auto pb-32">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-[rgba(255,255,255,1)] p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <img 
        src="/assets/AboutUsFeatureImg4.png" 
        alt="no image" 
        className="top-0 right-0 w-screen h-screen fixed z-[-1] object-cover blur-sm scale-105"/>
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
          Welcome to Volunteer.GG
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 text-center">
          When service meets ambition, we change the world—together. Join us!
        </p>

        <form className="my-4" onSubmit={handleSubmit}>
          <LabelInputContainer className="relative mb-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="ex. John Doe" type="text"
            className={errors.name ? "bg-red-100" : ""}
            onChange={() => {
              if (errors.name) {
                setErrors((prev) => {
                  const { name, ...rest } = prev;
                  return rest
                })
              }
            }}/>
            {errors.name && <p className="absolute bottom-[-15] right-2 text-red-500 text-xs">{errors.name}</p>}
          </LabelInputContainer>

          <LabelInputContainer className="relative mb-4">
            <Label htmlFor="location">City, Province, Country</Label>
            <Input id="location" name="location" placeholder="ex. Jakarta, DKI Jakarta, Indonesia" type="text"
            className={errors.location ? "bg-red-100" : ""} 
            onChange={() => {
              if (errors.location) {
                setErrors((prev) => {
                  const { location : _unused, ...rest } = prev;
                  return rest;
                })
              }
            }}/>
            {errors.location && <p className="absolute bottom-[-15] right-2 text-red-500 text-xs">{errors.location}</p>}
          </LabelInputContainer>

          <LabelInputContainer className="relative mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" placeholder="ex. john.doe@example.com" type="text"
            className={errors.email ? "bg-red-100" : ""}
            onChange={() => {
              if (errors.email) {
                setErrors((prev) => {
                  const { email : _unused, ...rest } = prev;
                  return rest;
                })
              }
            }}/>
            {errors.email && <p className="absolute bottom-[-15] right-2 text-red-500 text-xs">{errors.email}</p>}
          </LabelInputContainer>

          <LabelInputContainer className="relative mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" placeholder="••••••••" type="password"
            className={errors.password ? "bg-red-100" : ""}
            onChange={() => {
              if (errors.password) {
                setErrors((prev) => {
                  const { password : _unused, ...rest } = prev;
                  return rest;
                })
              }
            }}/>
            {errors.password && <p className="absolute bottom-[-15] right-2 text-red-500 text-xs">{errors.password}</p>}
          </LabelInputContainer>
          <p className="text-sm text-center mt-6">Already have an account? 
            <Link className="text-blue-500" href="/auth/signin"> <u>Sign in here!</u></Link>
          </p>
          <button
            className="mt-4 group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
          {formError && (
            <div className="my-4 text-center text-red-600 font-medium text-sm">
              {formError}
            </div>
          )}

          <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
