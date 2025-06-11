"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { UserAttributes } from "@/types";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'

export function FriendList({ users } : { users: (UserAttributes & { is_friend?: boolean })[] }) {
  const [active, setActive] = useState<any>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const router = useRouter()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as any, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] h-full">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.img_url ?? "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"}
                  alt={active.name}
                  className="w-full h-40 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4 h-full max-h-60 overflow-scroll">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      <b className="text-lg">{active.name}</b>
                    </motion.h3>
                    <motion.h1
                      layoutId={`description-${active.name}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 "
                    >
                      <p className="text-md">{active.bio}
                      </p>
                    </motion.h1>
                  </div>
                </div>
                <div className="flex justify-end p-4">
                    <Button variant="default" className="ml-auto rounded-lg">ADD FRIEND</Button>
                    <Button variant="default" onClick={() => router.push(`/chat/${active.id}`)} className="ml-4 rounded-lg">CHAT</Button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="grid grid-cols-1 mx-auto w-full gap-2 h-auto">
        {users && users.map((user) => (
          <motion.div
            layoutId={`card-${user.name}-${id}`}
            key={`card-${user.id}-${id}`}
            onClick={() => setActive(user)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer bg-orange-100/25  shadow-sm"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${user.name}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={user.img_url ?? "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"}
                  alt={user.name}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex flex-1 flex-col">
                <motion.h3
                  layoutId={`title-${user.name}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {user.name}
                </motion.h3>
                <motion.p
                  layoutId={`description-${user.bio}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left line-clamp-2 text-sm"
                >
                  {user.bio}
                </motion.p>
              </div>
            </div>
            <div className="flex flex-row">
              <motion.button
                layoutId={`button-${user.name}-${id}`}
                className="ml-4 px-4 py-2 rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0 text-sm"
              >
                ADD
              </motion.button>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export const FriendCard = ({onClick = null, user} : any) => {
  return (
    <motion.div
      layoutId={`card-${user.name}`}
      className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer bg-orange-100/25  shadow-sm"
      onClick={onClick}
    >
      <div className="flex gap-4 flex-col md:flex-row ">
        <motion.div layoutId={`image-${user.name}`}>
          <img
            width={100}
            height={100}
            src={user.img_url ?? "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"}
            alt={user.name}
            className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
          />
        </motion.div>
        <div className="flex flex-1 flex-col">
          <motion.h3
            layoutId={`title-${user.name}`}
            className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
          >
            {user.name}
          </motion.h3>
          <motion.p
            layoutId={`description-${user.bio}`}
            className="text-neutral-600 dark:text-neutral-400 text-center md:text-left line-clamp-2 text-sm"
          >
            {user.bio}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}