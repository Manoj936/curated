"use client";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  BookOpenIcon,
  InformationCircleIcon,
  PhotoIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, PhoneIcon } from "@heroicons/react/20/solid";
import {
  GalleryVerticalEndIcon,
  DramaIcon,
  LogOutIcon,
  ShoppingBasketIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import Link from "next/link";
import { showToast } from "@/components/ui/toast";
import { AppName, sellerRole, superuserRole, userRole } from "../libs/constant";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const products = [
  {
    name: "Image Gallery",
    description: "Get images for personal and commercial uses",
    href: "#",
    icon: PhotoIcon,
  },
  {
    name: "Video Gallery",
    description: "Get videos for personal and commercial use",
    href: "#",
    icon: VideoCameraIcon,
  },
  {
    name: "Ebooks",
    description: "Get your ebooks",
    href: "#",
    icon: BookOpenIcon,
  },
];
const callsToAction = [
  { name: "About Us", href: "#", icon: InformationCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const shouldHideHeader =
    pathname.startsWith("/seller") || pathname.startsWith("/superuser");
  const handleSignOut = async () => {
    try {
      await signOut();
      showToast({
        title: "Alert",
        description: "Signout Successfully",
        variant: "success",
      });
    } catch {
      showToast({
        title: "Alert",
        description: "Unexpected Error",
        variant: "warning",
      });
    }
  };

  return (
    <header className="bg-white ">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl  items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch={true}
            onClick={() =>
              showToast({
                title: "Welcome to Curated",
                description: "",
                variant: "info",
              })
            }
          >
            <div className="flex justify-between gap-3">
              <GalleryVerticalEndIcon className="w-5 h-5 " />
              <span className="mt-[-2.5px] uppercase"> {AppName} </span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        {!shouldHideHeader && (
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                Product
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 flex-none text-gray-400"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                    >
                      <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          aria-hidden="true"
                          className="size-6 text-gray-600 group-hover:text-indigo-600"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="size-5 flex-none text-gray-400"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Features
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Marketplace
            </a>
            <Link
              href="/seller-register"
              className="flex justify-between text-sm/6 font-bold text-gray-900"
            >
              <DramaIcon></DramaIcon>
              Seller!
            </Link>
          </PopoverGroup>
        )}

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {session && (
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                  Hey, {session.user?.email?.split("@")[0]}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-5 flex-none text-gray-400"
                  />
                </PopoverButton>
                <PopoverPanel
                  transition
                  className="absolute top-full  z-10 mt-2 overflow-hidden rounded-sm bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                >
                  <div className="p-2">
                    {/* Logout */}
                    <div
                      onClick={handleSignOut}
                      className="group relative flex items-left gap-x-3 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                    >
                      <div className="flex size-6 flex-none items-left justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <LogOutIcon></LogOutIcon>
                      </div>
                      <div className="flex-auto">
                        <Button className="block font-semibold text-gray-900">
                          Logout
                          <span className="absolute inset-0" />
                        </Button>
                      </div>
                    </div>
                    {/* User  dropdowns */}
                    {session.user?.role === userRole && (
                      <Link
                        href="/orders"
                        className="group relative flex items-left gap-x-3 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex size-6 flex-none items-left justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <ShoppingBasketIcon></ShoppingBasketIcon>
                        </div>
                        <div className="flex-auto">
                          <Button className="block font-semibold text-gray-900">
                            Orders
                            <span className="absolute inset-0" />
                          </Button>
                        </div>
                      </Link>
                    )}

                    {/* superuser  dropdowns */}
                    {session.user?.role === superuserRole && (
                      <Link
                        href="/superuser/dashboard"
                        className="group relative flex items-left gap-x-3 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex size-6 flex-none items-left justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <LayoutDashboardIcon></LayoutDashboardIcon>
                        </div>
                        <div className="flex-auto">
                          <Button className="block font-semibold text-gray-900">
                            Dashboard
                            <span className="absolute inset-0" />
                          </Button>
                        </div>
                      </Link>
                    )}

                    {/* seller dropdowns */}
                    {session.user?.role === sellerRole && (
                      <>
                        <Link
                          href="/orders"
                          className="group relative flex items-left gap-x-3 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                        >
                          <div className="flex size-6 flex-none items-left justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <ShoppingBasketIcon></ShoppingBasketIcon>
                          </div>
                          <div className="flex-auto">
                            <Button className="block font-semibold text-gray-900">
                              Orders
                              <span className="absolute inset-0" />
                            </Button>
                          </div>
                        </Link>
                        <Link
                          href="/seller/dashboard"
                          className="group relative flex items-left gap-x-3 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                        >
                          <div className="flex size-6 flex-none items-left justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <LayoutDashboardIcon></LayoutDashboardIcon>
                          </div>
                          <div className="flex-auto">
                            <Button className="block font-semibold text-gray-900">
                              Dashboard
                              <span className="absolute inset-0" />
                            </Button>
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                </PopoverPanel>
              </Popover>
            </PopoverGroup>
          )}
          {status !== "loading" && !session && (
            <Link
              href="/login"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-3 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">CURATED</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {!shouldHideHeader && (
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Product
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="size-5 flex-none group-data-open:rotate-180"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {[...products, ...callsToAction].map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/seller-register"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-bold text-gray-900 hover:bg-gray-50"
                  >
                    Seller!
                  </Link>
                </div>
              )}
              <div className="py-3">
                {session && (
                  <div className="flex gap-2 items-left justify-around">
                    {/* Logout */}

                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="group relative flex items-left gap-x-3 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                    >
                      <div className="flex size-6 flex-none items-left justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <LogOutIcon></LogOutIcon>
                      </div>
                      <div className="flex-auto">
                        <Button className="block font-semibold text-gray-900">
                          Logout
                          <span className="absolute inset-0" />
                        </Button>
                      </div>
                    </Button>

                    {/* Orders */}
                    {session.user?.role !== superuserRole && (
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          router.push("/orders");
                        }}
                        className="group relative flex items-left gap-x-3 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex size-6 flex-none items-left justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <ShoppingBasketIcon></ShoppingBasketIcon>
                        </div>
                        <div className="flex-auto">
                          <Button className="block font-semibold text-gray-900">
                            Orders
                            <span className="absolute inset-0" />
                          </Button>
                        </div>
                      </Button>
                    )}
                    {/* Seller dashboard */}
                    {session.user?.role === sellerRole && (
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          router.push("/seller/dashboard");
                        }}
                        className="group relative flex items-left gap-x-3 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex size-6 flex-none items-left justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <LayoutDashboardIcon></LayoutDashboardIcon>
                        </div>
                        <div className="flex-auto">
                          <Button className="block font-semibold text-gray-900">
                            Dashboard
                            <span className="absolute inset-0" />
                          </Button>
                        </div>
                      </Button>
                    )}
                  </div>
                )}
                {status !== "loading" && !session && (
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
