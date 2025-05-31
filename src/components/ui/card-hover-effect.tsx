"use client"
import { cn } from "@/lib/utils";
import { ItemAttributes } from "@/types";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";
import { Button } from "./button";

export const HoverEffect = ({
  items,
  className,
}: {
  items: ItemAttributes[] | undefined;
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  pt-4 pb-12",
        className
      )}
    >
      {items && items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gray-100 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <img 
            src={item?.img_url || '/assets/landscape-placeholder.svg'} 
            alt="no img"
            className="w-full max-h-32 object-cover rounded-md" />
            <CardTitle className="text-center">{item?.name}</CardTitle>
            <CardDescription  className="my-3 text-center line-clamp-3 min-h-[4.5em]">
              <b>{item?.type?.charAt(0).toUpperCase() + item?.type.slice(1)}.</b> {item?.description}</CardDescription>
            <div className="w-full h-auto flex flex-row gap-4">
              {item?.money_price && <Button variant="outline" className="w-full">Rp. {item?.money_price}</Button>}
              {item?.point_price && <Button variant="outline" className="w-full">{item?.point_price} Pts</Button>}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden shadow-md border border-transparent dark:border-white/[0.2] relative z-20",
        className, `bg-orange-100 group-hover:border-orange-300`
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-black font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-zinc-500 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
