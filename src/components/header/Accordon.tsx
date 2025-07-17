import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import styles from "./header.module.css";
import { PopoverButton, PopoverPanel } from "@headlessui/react";
import { Fragment } from "react";
export default async function FlyoutMenu() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("jsonwebtoken")?.value || "";
  const payload = verifyTokenForPage(myCookie);

  return (
    <div className="md:hidden px-2 relative z-50 ">
      <Popover className="relative">
        <PopoverButton className="flex items-center gap-2 font-bold text-[#70664e]">
          Navigation Links
          <ChevronDownIcon className="size-5" aria-hidden="true" />
        </PopoverButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            className="absolute z-50 mt-3  rounded-md w-full  space-y-7  p-4 "
            style={{ backgroundColor: "#dfdccf" }}
          >
            <PopoverButton
              as={Link}
              href="/"
              className={`${styles.link} block transition`}
            >
              Home
            </PopoverButton>
            <PopoverButton
              as={Link}
              href="/articles?pageNumber=1"
              className={`${styles.link} block transition`}
            >
              Articles
            </PopoverButton>
            <PopoverButton
              as={Link}
              href="/about"
              className={`${styles.link} block transition`}
            >
              About
            </PopoverButton>
            {payload?.isAdmin && (
              <PopoverButton
                as={Link}
                href="/admin"
                className={`${styles.link} block transition`}
              >
                Admin Dashboard
              </PopoverButton>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  );
}
