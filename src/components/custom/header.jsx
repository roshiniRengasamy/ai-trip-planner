import { Button } from "../ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import axios from "axios"

const Header = () => {

    // Get the user details from local storage
    const User = JSON.parse(localStorage.getItem('User'))

    // State varibale for controling popover visibility
    const [openDialog, setOpenDialog] = useState(false)

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
                setOpenDialog(false)
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
            <div>
                {
                    User ?
                        <div className="flex items-center gap-3">
                            <a href="/create-trip ">
                                <Button variant="outline" className="rounded-full">+ Create trips</Button>
                            </a>
                            <a href="/my-trip ">
                                <Button variant="outline" className="rounded-full">My trips</Button>
                            </a>
                            <div>
                                <Popover>
                                    <PopoverTrigger><img src={User?.picture} className="h-[35px] w-[35px]" /></PopoverTrigger>
                                    <PopoverContent><h2 className="cursor-pointer" onClick={() => { googleLogout(), localStorage.clear(), window.location.reload(); }}>Logout</h2></PopoverContent>
                                </Popover>
                            </div>

                        </div>
                        :
                        <Button onClick={() => { setOpenDialog(true) }}>Sign In</Button>
                }
            </div>
            <Dialog open={openDialog} >
                <DialogContent >
                    <DialogHeader >
                        <DialogDescription >
                            <img src="./logo.svg" />
                            <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                            <p>Sign in to the App with Google Authentication securely</p>
                            <Button onClick={login} className='w-full mt-5 flex gap-4 items-center'>
                                <FcGoogle className="w-7 h-7" />Sign in With Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Header