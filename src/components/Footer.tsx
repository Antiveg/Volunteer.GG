import Image from "next/image";

// Import icons from react-icons (using popular brands from react-icons/fa)
import { FaInstagram, FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#EEC8A4] pt-7 pb-7 px-5 border-t-4 border-[#B97200] text-[#333] font-inter">
      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between items-start gap-5">
        {/* Logo Section */}
        <div className="flex-shrink-0 mr-10">
          <Image src="/assets/footerLogo.png" alt="Company Logo" width={100} height={40} />
        </div>

        {/* Links Grid */}
        <div className="flex flex-grow justify-around gap-8 flex-wrap">
          {/* Column 1 */}
          <div className="min-w-[150px]">
            <ul className="list-none p-0 m-0 font-light text-sm text-[#444]">
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/cookie-policy">Cookie Policy</a>
              </li>
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/legal-notices">Legal Notices</a>
              </li>
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/support">Support</a>
              </li>
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/terms-conditions">Terms and Conditions</a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="min-w-[150px]">
            <h4 className="uppercase font-semibold text-[#555] text-xs mb-4">
              COUNTRIES
            </h4>
            <ul className="list-none p-0 m-0 font-light text-sm text-[#444]">
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/countries/germany">Germany</a>
              </li>
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/countries/indonesia">Indonesia</a>
              </li>
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/countries/usa">USA</a>
              </li>
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/countries/brazil">Brazil</a>
              </li>
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/countries/india">India</a>
              </li>
              <li className="mb-2 hover:underline hover:text-black">
                <a href="/countries/more">More countries</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="min-w-[150px]">
            <h4 className="uppercase font-semibold text-[#555] text-xs mb-4">
              CONTACT US
            </h4>
            <ul className="list-none p-0 m-0 font-light text-sm text-[#444]">
              <li className="mb-2 hover:underline hover:text-black">
                <a href="mailto:example@example.com">Email</a>
              </li>
              <li className="mb-2 hover:underline hover:text-black">
                <a
                  href="https://linkedin.com/company/example"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 (Social) */}
          <div className="min-w-[150px]">
            <h4 className="uppercase font-semibold text-[#555] text-xs mb-4">
              FOLLOW US ON !
            </h4>
            <div className="flex gap-4 text-[#444]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full p-2 hover:text-[#B97200] transition"
              >
                <FaInstagram size={40} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="rounded-full p-2 hover:text-[#B97200] transition"
              >
                <FaDiscord size={40} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="rounded-full p-2 hover:text-[#B97200] transition"
              >
                <FaTwitter size={40} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="rounded-full p-2 hover:text-[#B97200] transition"
              >
                <FaYoutube size={40} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}