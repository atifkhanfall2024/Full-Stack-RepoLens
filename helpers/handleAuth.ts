import { NextRequest } from "next/server";

const HandleToken = async(req:NextRequest)=>{

    const token = await req.cookies.get('')?.value
    console.log(token);

}

export default HandleToken