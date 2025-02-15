import { Button } from "../ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import Dialog from "@/components/custom/dialog";
import { useRef } from "react"
import axios from "axios"

const Header = () => {

    const dialogRef = useRef(null);

    const openDialog = () => dialogRef.current.showModal();
    const closeDialog = () => dialogRef.current.close();

    // Get the user details from local storage
    const User = JSON.parse(localStorage.getItem('User'))

    // Method to login using google authentication 
    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

    // Method to get the user information
    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenInfo.access_token}`,
                    Accept: 'Application/json'
                }
            }).then((res) => {
                localStorage.setItem('User', JSON.stringify(res.data))
                closeDialog()
                window.location.reload()
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="p-3 shadow-sm flex justify-between items-center px-5">
            <div className="flex items-center">
                <img src="/logo.svg" className="w-10 h-10" alt="Logo" />
                <span className="py-2 px-2 font-bold text-[#f56551] text-xl">Travel Planner</span>
            </div>
            <div className="flex items-right">
                {
                    User ?
                        <div className="flex items-center gap-3 ">
                            <a href="/create-trip ">
                                <Button variant="outline" className="rounded-full text-black">+ Create trips</Button>
                            </a>
                            <a href="/my-trip ">
                                <Button variant="outline" className="rounded-full text-black">My trips</Button>
                            </a>
                            <div>
                                <Popover>
                                    <PopoverTrigger style={{ backgroundColor: 'white' }}><img src={User?.picture} className="h-[35px] w-[35px]" /></PopoverTrigger>
                                    <PopoverContent><h2 className="cursor-pointer" onClick={() => { googleLogout(), localStorage.clear(), window.location.reload() }}>Logout</h2></PopoverContent>
                                </Popover>
                            </div>

                        </div>
                        :
                        <Button onClick={() => { openDialog() }}>Sign In</Button>
                }
                <Dialog dialogRef={dialogRef} openDialog={openDialog} closeDialog={closeDialog} login={login} />
            </div>
        </div>
    )
}

export default Header