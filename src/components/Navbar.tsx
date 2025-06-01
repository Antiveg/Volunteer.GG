"use client";
import { useState } from "react"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function CustomizedNavbar(){

  const { status } = useSession()
  // const status = "authenticated"

  const router = useRouter();
  const navItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      status: status,
    },
    {
        name: "Events",
        link: "/events",
    },
    {
        name: "Community",
        link: "/community",
    },
    {
        name: "Leaderboard",
        link: "/leaderboard",
    },
    {
        name: "Shop",
        link: "/shop",
    },
    {
        name: "About Us",
        link: "/about",
    },
  ]
    
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (status === "loading") return null;

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          {status === "unauthenticated" && <NavbarButton variant="dark" onClick={() => signIn()}>Sign In</NavbarButton>}
          {status === "unauthenticated" && <NavbarButton variant="primary" onClick={() => router.push('/auth/signup')}>Sign Up</NavbarButton>}
          {status === "authenticated" && <NavbarButton variant="dark" onClick={() => signOut()}>Sign Out</NavbarButton>}
          {status === "authenticated" && 
            <div className="relative h-9 aspect-square">
              <Image
                // src={session?.user?.img_url || "/assets/userIcon.png"} 
                src="/assets/userIcon.png"
                alt="User avatar"
                fill
                className="object-cover rounded-full"
              />
            </div>
          }
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Login
            </NavbarButton>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Register
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}