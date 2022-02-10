import React from 'react';

function Input(props: any) {
  return (
    <div className="relative">
      {!!props.label && <label className="text-gray-700">{props.label}</label>}
      <input
        type="text"
        className="ring-gray-400 ring-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
}

export default Input;
