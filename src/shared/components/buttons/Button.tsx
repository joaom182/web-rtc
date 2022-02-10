import React from 'react';

export default function Button(props: any) {
  return (
    <button
      type={props.type || 'button'}
      className="py-4 px-6  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
      {...props}
    >
      {props.children}
    </button>
  );
}
