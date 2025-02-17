import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";

const Dialog = ({ dialogRef, closeDialog, login }) => {

    return (
        <div>
            <dialog ref={dialogRef} className="px-10 py-5 rounded-xl">
                <div className="flex flex-row justify-between">
                    <img src="./logo.svg" />
                    <IoClose onClick={closeDialog} size={28} />
                </div>
                <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                <p>Sign in to the App with Google Authentication securely</p>
                <button onClick={login} className='w-full mt-5 px-5 py-2 rounded-xl flex gap-4 items-center justify-center text-white bg-black'>
                    <FcGoogle className="w-7 h-7" />Sign in With Google
                </button>
            </dialog>
        </div>
    )
}

export default Dialog