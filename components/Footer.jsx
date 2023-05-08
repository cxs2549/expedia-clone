import Image from "next/image"
import { footerLinks } from "@/app/data"

const Footer = () => {
  return (
    <footer>
      <div className="max-w-[1210px] mx-auto px-6 py-8">
        <Image src="/logo-2.png" className="dark:invert" width={135} height={135} alt="logo" />
        <div className="grid grid-cols-2 sm:grid-cols-4 mt-4 border-b dark:border-neutral-800">
          {footerLinks.map((link) => (
            <div key={link.name}>
              <h4 className="text-sm font-bold">{link.name}</h4>
              <ul className="grid gap-4 mt-4 mb-8">
                {link.links.map((link) => (
                  <li
                    className="text-xs text-blue-600 font-semibold"
                    key={link}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-300 mt-6 mb-7">
          {" "}
          Expedia, Inc. is not responsible for content on external Web sites. ©
          2023 cs.dev for Expedia, Inc., an Expedia Group company. All rights
          reserved. Expedia and the Airplane Logo are trademarks or registered
          trademarks of Expedia, Inc. CST# 2029030-50.
        </p>
      </div>
    </footer>
  )
}

export default Footer
