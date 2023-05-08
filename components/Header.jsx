"use client"
import Link from "next/link"
import React, { useState, useRef } from "react"
import {
  Bell,
  Briefcase,
  ChevronDown,
  Globe,
  Search,
  User,
} from "react-feather"
import tw from "tailwind-styled-components"
import useOutsideClick from "@/hooks/useOutsideClick"
import { searchLinks, moreTravelIcons } from "@/app/data"
import { Logo } from "./Logo"
import { Save } from "./Save"
import Image from "next/image"

const HeaderWrapper = tw.header`
border-b dark:border-neutral-800 w-full  py-3  px-6 xs:py-6 transition--all duration-200 ease-in-out
`
const Container = tw.nav`
max-w-[1210px] w-full mx-auto flex items-center justify-between
`
const Left = tw.ul`
flex items-center gap-4
`
const Right = tw.ul`
flex items-center gap-6 xl:gap-8
`

const MoreTravelContainer = ({
  showMoreTravelModal,
  setShowMoreTravelModal,
  moreTravelModalRef,
}) => {
  return (
    <li
      onMouseEnter={() => setShowMoreTravelModal(true)}
      onMouseLeave={() => setShowMoreTravelModal(false)}
      className="text-sm hidden xs:flex items-center gap-2  hover:text-primary transition-all duration-200 ease-in-out h-full relative"
    >
      <span className="whitespace-nowrap font-semibold cursor-pointer">
        More travel
      </span>
      <ChevronDown size={17} />
      <MoreTravelModal
        moreTravelModalRef={moreTravelModalRef}
        showMoreTravelModal={showMoreTravelModal}
        setShowMoreTravelModal={setShowMoreTravelModal}
      />
    </li>
  )
}
const SearchContainer = ({
  showSearchModal,
  setShowSearchModal,
  searchModalRef,
}) => {
  return (
    <li
      onMouseEnter={() => setShowSearchModal(true)}
      onMouseLeave={() => setShowSearchModal(false)}
      className="text-sm flex items-center gap-3  hover:text-primary transition-all duration-200 ease-in-out h-full xs:hidden relative"
    >
      <Search className="cursor-pointer" size={22} />
      <SearchModal
        searchModalRef={searchModalRef}
        showModal={showSearchModal}
        setShowModal={setShowSearchModal}
      />
    </li>
  )
}
const UserContainer = ({
  showAccountModal,
  setShowAccountModal,
  accountModalRef,
}) => {
  return (
    <li
      onMouseEnter={() => setShowAccountModal(true)}
      onMouseLeave={() => setShowAccountModal(false)}
      className="text-sm flex items-center gap-3  hover:text-primary transition-all duration-200 ease-in-out h-full relative lg:hidden"
    >
      <User className="cursor-pointer" size={22} />
      <UserModal
        accountModalRef={accountModalRef}
        showModal={showAccountModal}
        setShowModal={setShowAccountModal}
      />
    </li>
  )
}

const SearchModal = ({ searchModalRef, showModal, setShowModal }) => {
  return (
    <div
      style={{ boxShadow: "0px 0.5rem 1rem 0px rgba(0, 11, 38, 0.24)" }}
      ref={searchModalRef}
      className={`bg-white dark:bg-neutral-800 top-5 left-1/2 -translate-x-1/2 xs:left-0 xs:right-0 rounded-lg w-[310px] absolute transition-all duration-200 overflow-hidden ease-in-out z-20 ${
        showModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none scale-y-75"
      }`}
      onMouseEnter={() => setShowModal(true)}
      onMouseLeave={() => setShowModal(false)}
    >
      <ul className="font-semibold">
        {moreTravelIcons.map((link, i) => (
          <li
            key={link.text}
            className="py-4 hover:bg-[#FBDD3C] dark:hover:text-neutral-800  px-6 text-[14px] cursor-pointer flex items-center gap-3 group"
          >
            {moreTravelIcons[i].icon}
            <Link href="/">
              {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
const MoreTravelModal = ({
  moreTravelModalRef,
  showMoreTravelModal,
  setShowMoreTravelModal,
}) => {
  return (
    <div
      style={{ boxShadow: "0px 0.5rem 1rem 0px rgba(0, 11, 38, 0.24)" }}
      ref={moreTravelModalRef}
      className={`bg-white dark:bg-neutral-800 top-5 left-1/2 -translate-x-1/2 xs:left-0 xs:right-0 rounded-lg w-[310px] absolute transition-all duration-200 overflow-hidden ease-in-out z-20 ${
        showMoreTravelModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none scale-y-75"
      }`}
      onMouseEnter={() => setShowMoreTravelModal(true)}
      onMouseLeave={() => setShowMoreTravelModal(false)}
    >
      <ul className="font-semibold">
        {moreTravelIcons.map((link, i) => (
          <li
            key={link.text}
            className="py-4 hover:bg-[#FBDD3C] dark:hover:text-neutral-800  px-6 text-[14px] cursor-pointer flex items-center gap-3 group"
          >
            {moreTravelIcons[i].icon}
            <Link href="/">
              {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
const UserModal = ({ accountModalRef, showModal, setShowModal }) => {
  return (
    <div
      style={{ boxShadow: "0px 0.5rem 1rem 0px rgba(0, 11, 38, 0.24)" }}
      ref={accountModalRef}
      className={`bg-white dark:bg-neutral-800 top-5 right-0 rounded-lg w-[325px] absolute transition-all duration-200 overflow-hidden ease-in-out text-[14px] z-20 ${
        showModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none scale-y-75"
      }`}
      onMouseEnter={() => setShowModal(true)}
      onMouseLeave={() => setShowModal(false)}
    >
      <ul className=" pt-8">
        <li className="px-6 flex flex-col  justify-center  gap-6 mt-2">
          <Save />
          <p className="text-xl leading-6 mt-3 font-bold">
            {`Save an average of 15% on thousands of hotels when you're signed in`}
          </p>
          <div className="grid gap-0.5">
            <button className="font-semibold text-lg text-white bg-blue-500 w-full py-2.5 rounded-lg mt-4 block sm:mx-auto hover:bg-blue-600">
              Log in
            </button>
            <button className="font-semibold text-lg  hover:bg-neutral-200/60 w-full py-2.5 rounded-lg block sm:mx-auto">{`Sign up, it's free`}</button>
          </div>
        </li>
        <li className="py-4 px-6 mt-3 hover:bg-[#FBDD3C] dark:hover:text-neutral-800 font-semibold cursor-pointer  text-[14px]">
          Notifications
        </li>
        <li className="py-4 px-6 hover:bg-[#FBDD3C] dark:hover:text-neutral-800 font-semibold cursor-pointer  text-[14px]">
          List of favorites
        </li>
        <li className="py-4 px-6 border-b dark:border-neutral-700 hover:bg-[#FBDD3C] dark:hover:text-neutral-800 font-semibold cursor-pointer  text-[14px]">
          Expedia Rewards
        </li>
        <li className="py-4 px-6 hover:bg-[#FBDD3C] dark:hover:text-neutral-800 font-semibold cursor-pointer  text-[14px]">
          Customer support
        </li>
        <li className="py-4 px-6 hover:bg-[#FBDD3C] dark:hover:text-neutral-800 font-semibold cursor-pointer  text-[14px]">
          Feedback
        </li>
        <li className="py-4 px-6 hover:bg-[#FBDD3C] dark:hover:text-neutral-800 font-semibold cursor-pointer  text-[14px]">
          List your property
        </li>
        <li className="py-4 px-6 hover:bg-[#FBDD3C] dark:hover:text-neutral-800 font-semibold cursor-pointer  text-[14px] flex items-center">
          English &bull; USD $ &bull;{" "}
          <Image src="/flag.png" width={30} height={30} alt="flag" />
        </li>
      </ul>
    </div>
  )
}

const Header = () => {
  const searchModalRef = useRef(null)
  const accountModalRef = useRef(null)
  const moreTravelModalRef = useRef(null)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [showMoreTravelModal, setShowMoreTravelModal] = useState(false)
  useOutsideClick(searchModalRef, () => setShowSearchModal(false))
  useOutsideClick(accountModalRef, () => setShowAccountModal(false))
  useOutsideClick(moreTravelModalRef, () => setShowMoreTravelModal(false))
  return (
    <HeaderWrapper>
      <Container>
        <Left>
          <li>
            <Link href={`/`}>
              <Logo />
            </Link>
          </li>
          <MoreTravelContainer
            moreTravelModalRef={moreTravelModalRef}
            setShowMoreTravelModal={setShowMoreTravelModal}
            showMoreTravelModal={showMoreTravelModal}
          />
        </Left>
        <Right>
          <SearchContainer
            searchModalRef={searchModalRef}
            setShowSearchModal={setShowSearchModal}
            showSearchModal={showSearchModal}
          />
          <li className="lg:hidden">
            <Briefcase size={22} />
          </li>
          <li className="text-sm hidden lg:flex font-semibold gap-3 items-center">
            <Globe className="rotate-45" size={20} />
            <p>English</p>
          </li>
          <li className="text-sm hidden lg:block font-semibold">
            List your property
          </li>
          <li className="text-sm hidden lg:block font-semibold">Support</li>
          <li className="text-sm hidden lg:block font-semibold">Trips</li>
          <li>
            <Bell size={22} />
          </li>
          <UserContainer
            accountModalRef={accountModalRef}
            setShowAccountModal={setShowAccountModal}
            showAccountModal={showAccountModal}
          />
          <li className="text-sm font-semibold hidden lg:block">Sign in</li>
        </Right>
      </Container>
    </HeaderWrapper>
  )
}

export default Header
