import React from 'react';
import { ImSpinner9 } from "react-icons/im";

function Loading() {
    return (
        
        <div className=" fixed w-full h-screen flex z-50 top-0 bottom-0 right-0 left-0 bg-gray-200 ">
          <ImSpinner9 className="m-auto text-4xl text-gray-600 animate-spin" />
        </div>
      
        
    )}

export default Loading;
