// LoadingSkeleton.jsx
import React from 'react';

function LoadingSkeleton() {
  return (
    <div className="relative rounded-md p-8 py-12 max-w-screen-xl w-full mx-auto relative h-screen">
      {/* Skeleton content */}
      <div className="fixed animate-pulse flex space-x-4 p-4 py-8 fixed top-8 left-1/2 transform -translate-x-1/2 flex justify-between w-full z-50 mx-auto max-w-screen-xl">
        <div className="rounded-xl bg-[#757493] h-14 w-14"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 w-1/3 bg-[#757493] rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4">
              <div className="h-2 bg-[#757493] rounded col-span-1"></div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-[#757493] h-14 w-20"></div>
      </div>
      <div className='relative mx-auto max-w-screen-xl h-auto lg:px-10 mt-44 grid grid-cols-1 md:grid-cols-2 gap-6 z-[-99]'>
        <div className="animate-pulse bg-gray-100 rounded-xl text-wrap break-words relative px-10 py-8 max-h-56 h-32">
          <p className='text-lg font-bold pb-2'></p>
          <button
            className="pb-2 cursor-pointer"
            type="button">
          </button>
          <p className='text-sm'></p>
        </div>
        <div className="animate-pulse bg-gray-100 rounded-xl text-wrap break-words relative px-10 py-8 max-h-56 h-32">
          <p className='text-lg font-bold pb-2'></p>
          <button
            className="pb-2 cursor-pointer"
            type="button">
          </button>
          <p className='text-sm'></p>
        </div>
        <div className="animate-pulse bg-gray-100 rounded-xl text-wrap break-words relative px-10 py-8 max-h-56 h-32">
          <p className='text-lg font-bold pb-2'></p>
          <button
            className="pb-2 cursor-pointer"
            type="button">
          </button>
          <p className='text-sm'></p>
        </div>
        <div className="animate-pulse bg-gray-100 rounded-xl text-wrap break-words relative px-10 py-8 max-h-56 h-32">
          <p className='text-lg font-bold pb-2'></p>
          <button
            className="pb-2 cursor-pointer"
            type="button">
          </button>
          <p className='text-sm'></p>
        </div>
        <div className="animate-pulse bg-gray-100 rounded-xl text-wrap break-words relative px-10 py-8 max-h-56 h-32">
          <p className='text-lg font-bold pb-2'></p>
          <button
            className="pb-2 cursor-pointer"
            type="button">
          </button>
          <p className='text-sm'></p>
        </div>
        <div className="animate-pulse bg-gray-100 rounded-xl text-wrap break-words relative px-10 py-8 max-h-56 h-32">
          <p className='text-lg font-bold pb-2'></p>
          <button
            className="pb-2 cursor-pointer"
            type="button">
          </button>
          <p className='text-sm'></p>
        </div>
      </div>
      <div className='fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-8 h-14 w-[7.6rem] block rounded-lg bg-[#757493] px-5 py-3 animate-pulse' />
    </div>
  );
}

export default LoadingSkeleton;