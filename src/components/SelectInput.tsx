"use client"
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectInput({data, title = "Unknown", value, onChange} : any) {
  const selectedItem = data?.find((item: any) => item.value == value);
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600">
        <SelectValue>{selectedItem ? selectedItem?.text : title}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Hello</SelectLabel>
          {data && data.map((d : any) => (
            <SelectItem key={d?.value} value={d?.value}>{d?.text}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
