import React from 'react';
import { ImSpinner9 } from "react-icons/im";

function Loading() {
    return (
        
        <div className="w-full h-screen flex ">
          <ImSpinner9 className="m-auto text-4xl text-gray-600 animate-spin" />
        </div>
      
        
    )}

export default Loading;
