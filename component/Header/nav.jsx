'use client'
import axios from 'axios'
import { useRef, useState } from 'react';
import {toast} from 'react-toastify'
import { ClipLoader } from "react-spinners";
const ImportRepo = () => {
const [repo , setrepo] = useState("")
const [loading , setloading] = useState(false)
const fileInputRef = useRef(null)

 const handleClick = () => {
    fileInputRef.current.click();
  };
 const handleFiles = async(e) => {
     const files = Array.from(e.target.files);
      const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
     setloading(true)
     // IMPORTANT: key must be "file"
  });
    try {
    const res = await axios.post("/api/folderManage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log(res.data);
    toast.success("Files uploaded successfully");
    setloading(false)
  } catch (error) {
    console.log(error);
    toast.error("Upload failed");
    setloading(false)
  }
  };

const Handlerepo = async(e)=>{
             e.preventDefault()
             setloading(true)
             try {
                
                const res = await axios.post('/api/cloneRepo' , {repo:repo} , {withCredentials:true})
                console.log(res?.data?.message);
                toast.success(res?.data?.message || "Your Repository Success Clone")
                setrepo("")
                setloading(false)

             } catch (error) {
                console.log(error?.response?.data?.message || error?.message || "something Went Wrong");
                toast.error(error?.response?.data?.message || error?.message || "something Went Wrong")
                setloading(false)
             }
}

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="font-semibold text-gray-700">acme-corp</span>
          <span>/</span>
          <span className="font-semibold text-gray-700">frontend</span>

          <span className="ml-3 px-3 py-1 text-green-700 bg-green-100 rounded-full text-xs font-medium">
            Analysis Ready
          </span>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md">
            React
          </span>
          <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">
            Next.js
          </span>
        </div>

      </div>

      {/* Card Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-3xl">

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Import new repository
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Connect a GitHub URL to start chatting with your codebase.
        </p>

        {/* Input Section */}
        <div className="flex gap-3 mb-6 text-black">
          <input
            type="text"
            value={repo}
            onChange={(e)=>setrepo(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700" onClick={Handlerepo} disabled={loading}>
            {loading? <ClipLoader size={20} color='#fff' /> : 'Analyze'}
          </button>
        </div>
     <input
  type="file"
  ref={fileInputRef}
  onChange={handleFiles}
  className="hidden"
  webkitdirectory="true"
  directory=""
  multiple
/>
        {/* Drag & Drop */}
        <div className="border-2 border-dashed border-gray-200 rounded-lg py-12 flex flex-col items-center justify-center text-gray-400 text-sm hover:border-blue-400"  onClick={handleClick}>
          {loading? <div><p className="font-medium text-green-600 ">
            Uploading..............
          </p>
          <span className="text-gray-400 text-xs mt-1">
            
          </span></div>:<div><p className="font-medium text-gray-500 ">
            Drag and drop local folder
          </p>
          <span className="text-gray-400 text-xs mt-1">
            or click to browse
          </span></div>}
        </div>

      </div>
    </div>
  );
};

export default ImportRepo;