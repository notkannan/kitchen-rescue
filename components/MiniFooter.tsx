import React from 'react'
import LocalDiningIcon from '@mui/icons-material/LocalDining'

export default function() {
  return (
    

<footer className="bg-white rounded-lg dark:bg-white m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://github.com/notkannan/kitchen-rescue" className="flex items-center">
                  <LocalDiningIcon fontSize='medium' sx={{color: '#4f46e5', mr: 1}}/>
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-indigo-600">Kitchen Rescue</span>
                </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="https://kannankarthikeyan.com" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="https://github.com/notkannan" className="hover:underline me-4 md:me-6">Github</a>
                </li>
                <li>
                    <a href="https://kannankarthikeyan.com" className="hover:underline me-4 md:me-6">Contact</a>
                </li>
                <li>
                    <a href="https://nextjs.org" className="hover:underline me-4 md:me-6">NextJS </a>
                </li>
                <li>
                    <a href="https://mui.com" className="hover:underline me-4 md:me-6">Material UI </a>
                </li>
                <li>
                    <a href="https://tailwindcss.com" className="hover:underline me-4 md:me-6">Tailwind CSS</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://github.com/notkannan/kitchen-rescue" className="hover:underline">Kitchen Rescue</a>. All Rights Reserved.</span>
    </div>
</footer>


  )
}
