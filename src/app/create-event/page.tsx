"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import TipTapEditor from "@/components/TipTapEditor";
import { ErrorBox, Footer, LoadingBox } from "@/components";
import { FileUploadUI } from "@/components"
import { SelectInput } from "@/components/SelectInput";
import { useCategories } from "@/hooks/useCategories";
import { useSessionRedirect } from "@/hooks/useSessionRedirect";

const EventCreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    start_datetime: "",
    end_datetime: "",
    description: "",
    base_points: 0,
    category: 1,
  });

  const [descriptionHtml, setDescriptionHtml] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const { isLoading, error, isError, data } = useCategories()
  const category_data = data?.map((cat : any) => ({
    value: cat.id,
    text: cat.category,
    color: cat.color
  })) ?? []
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("location", formData.location);
    formPayload.append("start_datetime", formData.start_datetime);
    formPayload.append("end_datetime", formData.end_datetime);
    formPayload.append("description", descriptionHtml);
    formPayload.append("base_points", String(formData.base_points));
    formPayload.append("category", String(formData.category));

    files.forEach((file) => {
      formPayload.append("event_images", file);
    });

    try {
      const res = await fetch("/api/event/create", {
        method: "POST",
        body: formPayload,
      });

      if (!res.ok) throw new Error("Failed to create event");
      router.push("/events");
    } catch (error) {
      setFormError("Failed to create event. Please try again.");
    }
  }

  const { session } = useSessionRedirect()

  if (!session) {
      return <LoadingBox message="Redirecting to sign in page..."/>
  }

  if (isError){
      return <ErrorBox error={error as any}/>
  }

  if(isLoading){
    return <LoadingBox message="Fetching event category choices"/>
  }

  if(isError){
    return <ErrorBox error={error as any}/>
  }

  return (
    <div className="min-h-screen min-w-screen h-auto w-full">
      <div className="px-32 flex flex-1 flex-col p-6 shadow-md bg-white rounded-lg gap-4 h-auto pb-20">
        <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white p-6 rounded-lg shadow-lg border border-1">
          <h2 className="text-2xl text"><b>Create a New Event</b></h2>
          <hr className="my-4"/>
          <div className="flex flex-row flex-1">
            <div className="max-w-xs w-full">

              <LabelInputContainer className="relative mb-4">
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  placeholder="Enter event name"
                  className={errors.name ? "bg-red-100" : ""}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="absolute bottom-[-15px] right-2 text-red-500 text-xs">{errors.name}</p>
                )}
              </LabelInputContainer>

              <LabelInputContainer className="relative mb-4">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  placeholder="Enter location"
                  className={errors.location ? "bg-red-100" : ""}
                  onChange={handleChange}
                />
                {errors.location && (
                  <p className="absolute bottom-[-15px] right-2 text-red-500 text-xs">{errors.location}</p>
                )}
              </LabelInputContainer>

              <LabelInputContainer className="relative mb-4">
                <Label htmlFor="start_datetime">Start Date and Time</Label>
                <Input
                  id="start_datetime"
                  name="start_datetime"
                  type="datetime-local"
                  value={formData.start_datetime}
                  className={errors.start_datetime ? "bg-red-100" : ""}
                  onChange={handleChange}
                />
                {errors.start_datetime && (
                  <p className="absolute bottom-[-15px] right-2 text-red-500 text-xs">{errors.start_datetime}</p>
                )}
              </LabelInputContainer>

              <LabelInputContainer className="relative mb-4">
                <Label htmlFor="end_datetime">End Date and Time</Label>
                <Input
                  id="end_datetime"
                  name="end_datetime"
                  type="datetime-local"
                  value={formData.end_datetime}
                  className={errors.end_datetime ? "bg-red-100" : ""}
                  onChange={handleChange}
                />
                {errors.end_datetime && (
                  <p className="absolute bottom-[-15px] right-2 text-red-500 text-xs">{errors.end_datetime}</p>
                )}
              </LabelInputContainer>

              <LabelInputContainer className="relative mb-4">
                <Label htmlFor="base_points">Base Points</Label>
                <Input
                  id="base_points"
                  name="base_points"
                  type="number"
                  value={formData.base_points}
                  placeholder="Enter base points"
                  className={errors.base_points ? "bg-red-100" : ""}
                  onChange={handleChange}
                />
                {errors.base_points && (
                  <p className="absolute bottom-[-15px] right-2 text-red-500 text-xs">{errors.base_points}</p>
                )}
              </LabelInputContainer>

              <LabelInputContainer className="relative mb-4">
                <Label htmlFor="categories">Event Categories</Label>
                <SelectInput data={category_data} title="Category" value={formData?.category}
                onChange={(value: string) => {
                  setFormData((prev : any) => ({
                    ...prev,
                    category: value,
                  }))}}/>
                {errors.categories && (
                  <p className="absolute bottom-[-15px] right-2 text-red-500 text-xs">{errors.category}</p>
                )}
              </LabelInputContainer>
            </div>

            <div className="w-[1px] bg-gray-200 mx-4"/>

            <div className="flex flex-1 flex-col gap-4 h-full">

              <div className="flex flex-1 flex-col gap-2">
                  <Label htmlFor="event_images">Event Images</Label>
                  <FileUploadUI files={files} setFiles={setFiles}/>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor="description">Event Description</Label>
                <TipTapEditor content={descriptionHtml} onChange={setDescriptionHtml} />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>
            </div>
          </div>

          <p className="my-2 text-red-500 text-center">{formError ?? "\u00A0"}</p>

          <Button type="submit" className="w-full bg-blue-600 text-white">Create Event</Button>
        </form>
      </div>
      <Footer/>
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

export default EventCreateForm