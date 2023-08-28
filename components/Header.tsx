'use client'

import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Avatar from 'react-avatar'

function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div 
          className="
            absolute
            top-0
            left-0
            w-full
            h-96
            bg-gradient-to-br
            from-pink-400
            to-[#0055D1]
            rounded-md
            filter
            blur-3xl
            opacity-50
            -z-50
          " 
        />
        {/* Logo */}
        <Image
          src="https://1000logos.net/wp-content/uploads/2021/05/Trello-logo.png"
          alt="Trello Logo"
          width={300}
          height={50}
          className="w-44 md:w-38 md:pb-0 object-contain"
        />

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* Searchbox */}
          <form action="" className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400"/>
            <input type="text" placeholder="Search" className="flex-1 outline-none p-2" />
            <button hidden type="submit">Search</button>
          </form>

          {/* Avatar */}
          <Avatar name="Asif Khan" round color="#0055D1" size="50" />
        </div>
      </div>

      {/* Suggestion */}
      <div className="flex items-center justify-center px-5 md: py-5">
        <p className="flex items-center text-sm font-light p-5 pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon className="inline-block h-10 w-10 text-[#0055D1] mr-1" />
          GPT is summarizing your tasks for the day......
        </p>
      </div>
    </header>
  )
}

export default Header