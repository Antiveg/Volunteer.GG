"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TipTapEditor from "@/components/TipTapEditor";
import { Footer, LoadingBox } from "@/components";
import { FileUploadUI } from "@/components";
import { useSessionRedirect } from "@/hooks/useSessionRedirect";

const OrganizationCreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    active_time: "",
    location: "",
    phone: "",
    instagram: "",
    twitter: "",
    discord: "",
    other: "",
  });

  const [descriptionHtml, setDescriptionHtml] = useState('');
  const [logoUrl, setLogoUrl] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();

  const { session } = useSessionRedirect();

  if (!session) {
    return <LoadingBox message="Redirecting to sign in page..." />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("description", descriptionHtml);
    formPayload.append("logo_url", logoUrl as Blob)

    if (formData.active_time) formPayload.append("active_time", formData.active_time);
    if (formData.location) formPayload.append("location", formData.location);
    if (formData.phone) formPayload.append("phone", formData.phone);
    if (formData.instagram) formPayload.append("instagram", formData.instagram);
    if (formData.twitter) formPayload.append("twitter", formData.twitter);
    if (formData.discord) formPayload.append("discord", formData.discord);
    if (formData.other) formPayload.append("other", formData.other);

    try {
      const res = await fetch("/api/organization/create", {
        method: "POST",
        body: formPayload,
      });

      if (!res.ok) throw new Error("Failed to create organization");
      router.push("/community");
    } catch (error) {
      setFormError("Failed to create organization. Please try again.");
    }
  };

  return (
    <div className="min-h-screen min-w-screen h-auto w-full">
      <div className="px-32 flex flex-1 flex-col p-6 shadow-md bg-white rounded-lg gap-4 h-auto pb-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full bg-white p-6 rounded-lg shadow-lg border border-1"
        >
          <h2 className="text-2xl text">
            <b>Create a New Organization</b>
          </h2>
          <hr className="my-4" />

          <div className="flex flex-row flex-1">

            <div className="flex flex-col max-w-xs w-full justify-between">
              <LabelInputContainer className="relative mb-4">
                <Label htmlFor="name">Organization Name*</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  placeholder="Enter organization name"
                  className={errors.name ? "bg-red-100" : ""}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="absolute bottom-[-15px] right-2 text-red-500 text-xs">{errors.name}</p>
                )}
              </LabelInputContainer>

              <LabelInputContainer className="relative mb-4">
                <Label htmlFor="location">Location*</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  placeholder="Enter location"
                  onChange={handleChange}
                />
              </LabelInputContainer>

              <LabelInputContainer className="relative mb-4">
                <Label htmlFor="logo_url">Logo*</Label>
                <FileUploadUI
                  files={logoUrl ? [logoUrl] : []}
                  setFiles={(files : any) => setLogoUrl(files[0] ?? null)}
                />
                {errors.logo_url && (
                  <p className="absolute bottom-[-15px] right-2 text-red-500 text-xs">{errors.logo_url}</p>
                )}
              </LabelInputContainer>
            </div>

            <div className="w-[1px] bg-gray-200 mx-4" />

            <div className="flex flex-1 flex-col gap-2 h-full">
              <Label htmlFor="description">Organization Description*</Label>
              <TipTapEditor content={descriptionHtml} onChange={setDescriptionHtml} />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
          </div>

          <hr className="gap-2"/>
          <p className="my-4 text-lg"><b>Optional Fields</b></p>

          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-auto">
            <LabelInputContainer className="relative">
              <Label htmlFor="active_time">Active Time</Label>
              <Input
                id="active_time"
                name="active_time"
                type="text"
                value={formData.active_time}
                placeholder="Enter active time"
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="relative">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                placeholder="Enter phone number"
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="relative">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                name="instagram"
                type="text"
                value={formData.instagram}
                placeholder="Instagram handle"
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="relative">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                name="twitter"
                type="text"
                value={formData.twitter}
                placeholder="Twitter handle"
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="relative">
              <Label htmlFor="discord">Discord</Label>
              <Input
                id="discord"
                name="discord"
                type="text"
                value={formData.discord}
                placeholder="Discord handle"
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="relative">
              <Label htmlFor="other">Other Information</Label>
              <Input
                id="other"
                name="other"
                type="text"
                value={formData.other}
                placeholder="Any other details"
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>

          <p className="my-2 text-red-500 text-center">{formError ?? "\u00A0"}</p>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Create Organization
          </Button>
        </form>
      </div>
      <Footer />
    </div>
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

export default OrganizationCreateForm;
