"use client"
import { useState, useRef, useEffect } from "react"
import { options } from "@/app/data"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Map,
} from "react-feather"

const BigSearch = () => {
  const [active, setActive] = useState("stays")
  const [scrollX, setscrollX] = useState(0) // For detecting start scroll postion
  const [scrollEnd, setscrollEnd] = useState(false) // For detecting end of scrolling
  const scrollRef = useRef()

  const slide = (shift) => {
    const scrollLeft = scrollRef.current?.scrollLeft
    const maxScrollLeft =
      scrollRef.current?.scrollWidth - scrollRef.current.offsetWidth

    let targetScrollLeft = scrollLeft + shift
    if (targetScrollLeft < 0) {
      targetScrollLeft = 0
    } else if (targetScrollLeft > maxScrollLeft) {
      targetScrollLeft = maxScrollLeft
    }

    const duration = 500 // in milliseconds
    const startTime = performance.now()
    const endTime = startTime + duration

    const easeInOutQuad = (t) => {
      t /= duration / 2
      if (t < 1) return (shift / 2) * t * t + scrollLeft
      t--
      return (-shift / 2) * (t * (t - 2) - 1) + scrollLeft
    }

    const scroll = (currentTime) => {
      if (currentTime >= endTime) {
        scrollRef.current.scrollLeft = targetScrollLeft
        setscrollX(targetScrollLeft)
        return
      }
      const time = currentTime - startTime
      const newScrollLeft = easeInOutQuad(time)
      scrollRef.current.scrollLeft = newScrollLeft
      setscrollX(newScrollLeft)
      requestAnimationFrame(scroll)
    }

    requestAnimationFrame(scroll)
    setscrollEnd(targetScrollLeft >= maxScrollLeft)
  }
  const scrollCheck = () => {
    setscrollX(scrollRef.current.scrollLeft)
    if (
      Math.floor(
        scrollRef.current.scrollWidth - scrollRef.current.scrollLeft
      ) <= scrollRef.current.offsetWidth
    ) {
      setscrollEnd(true)
    } else {
      setscrollEnd(false)
    }
  }
  useEffect(() => {
    if (
      scrollRef.current &&
      scrollRef?.current?.scrollWidth === scrollRef?.current?.offsetWidth
    ) {
      setscrollEnd(true)
    } else {
      setscrollEnd(false)
    }
    return () => {}
  }, [scrollRef?.current?.scrollWidth, scrollRef?.current?.offsetWidth])

  return (
    <section className="sm:px-6 pb-8">
      <ul className="text-sm  sm:border dark:border-neutral-800 sm:mx-auto sm:mt-10 transition-all duration-100 ease-in-out sm:rounded-lg overflow-hidden sm:pb-6 max-w-[1210px]">
        <li
          ref={scrollRef}
          onScroll={scrollCheck}
          className="w-full flex justify-between items-center gap-7 sm:gap-4 overflow-x-scroll sm:px-20 md:px-40 lg:px-56 xl:px-[355px] xl:gap-0 relative stories group p-4 h-16 border-b dark:border-neutral-800"
        >
          {scrollX !== 0 && (
            <button
              id="left-arrow"
              onClick={() => slide((scrollRef.current.offsetWidth / 2) * -1)}
              className={`fixed left-6 top-16 bottom-0 flex items-center justify-center z-10 group-hover:opacity-100 opacity-0 bg-yellow-400/50 rounded-full h-9 w-9 transition-all duration-200 ease-in-out sm:hidden `}
            >
              <ChevronLeft
                className="text-neutral-800 dark:text-black/50"
                size={22}
              />
            </button>
          )}

          {options.map((option) => (
            <div
              onClick={() => {
                setActive(option)
              }}
              style={{ flex: "0 0 auto" }}
              key={option}
              className={`font-semibold flex whitespace-nowrap items-center relative capitalize after:absolute after:h-[2.5px] after:w-full cursor-pointer after:left-0 after:-bottom-[21.5px] transition-all duration-200 ease-in-out  ${
                active === option
                  ? "after:bg-blue-500 text-blue-500"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {option}
            </div>
          ))}
          {!scrollEnd && (
            <button
              id="right-arrow"
              onClick={() => slide(scrollRef.current.offsetWidth / 2)}
              className="fixed right-6 md:right-[44px] top-16 bottom-0 flex items-center justify-center opacity-0 z-10 bg-yellow-400/50 group-hover:opacity-100 rounded-full h-9 w-9 transition-all duration-200 ease-in-out sm:hidden"
            >
              <ChevronRight className="text-neutral-800" size={22} />
            </button>
          )}
        </li>

        <li className="w-full px-6 xl:px-1">
          <div className="h-[44px] xl:ml-auto w-full flex xl:justify-end items-center gap-1 text-blue-500 font-semibold xl:px-12 ">
            <p className="cursor-pointer">1 room, 2 travelers</p>
            <ChevronDown size={18} />
          </div>
          <div className="xl:flex items-center xl:gap-4 xl:px-12">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 ">
                <Map className="text-neutral-500" />
              </div>
              <input
                type="text"
                className="h-[55px] border dark:border-neutral-800 border-neutral-300 rounded-lg px-12 w-full dark:bg-neutral-800"
                placeholder="Going to"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 xl:mt-0">
              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Calendar className="text-neutral-500" />
                </div>
                <input
                  type="text"
                  className="h-[55px] w-full border rounded-lg pl-12 dark:border-neutral-800 dark:bg-neutral-800 border-neutral-300"
                  placeholder="Check-in"
                />
              </div>
              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Calendar className="text-neutral-500" />
                </div>
                <input
                  type="text"
                  className="h-[55px] border rounded-lg pl-12 w-full dark:bg-neutral-800 dark:border-neutral-800 border-neutral-300"
                  placeholder="Check-out"
                />
              </div>
            </div>
          </div>
          <div className="grid xl:flex xl:gap-14 gap-4 grid-cols-2 xl:px-12 mt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="add"
                id="add"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="add">Add a flight</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="add"
                id="add"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="add">Add a car</label>
            </div>
          </div>
          <button className="font-semibold text-lg text-white bg-blue-500 hover:bg-blue-600 w-full py-2.5 rounded-lg mt-8 sm:w-4/12 lg:w-3/12 block sm:mx-auto transition-all duration-200 ease-in-out">
            Search
          </button>
        </li>
      </ul>
    </section>
  )
}

export default BigSearch
