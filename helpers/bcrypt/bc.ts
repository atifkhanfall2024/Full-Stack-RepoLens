
import bcryptjs from 'bcryptjs'
export const HashPassward = async(password:string)=>{

    const encrypt = await bcryptjs.hash(password , 10)
    return encrypt

}

export const Comparepass = async(password:string , comparepassword:string)=>{
    const compare = await bcryptjs.compare(password , comparepassword)
    return compare
}


