import { db } from "@/service/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const MyTrip = () => {

    // Hook used for navigation
    const navigate = useNavigate()

    const imageIndex = Math.floor(Math.random() * 17) + 1

    // State variable to store the user trips
    const [userTrips, setUserTrip] = useState([])

    // Hook to call the method when page renders
    useEffect(() => {
        getUserTrips();
    }, [])

    // Method to get the user trips from firebase
    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('User'))
        if (!user) {
            navigate('/');
            return;
        }
        setUserTrip([])
        const q = query(collection(db, 'TripData'), where('userEmail', '==', user?.email))
        const querySnapshot = await getDocs(q)
        querySnapshot?.forEach((doc) => {
            setUserTrip(prev => [...prev, doc.data()])
        })
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 my-10 flex-1">
            <h2 className="font-bold text-3xl">My Trips</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                {userTrips?.length > 0 ?
                    <>
                        {userTrips?.map((trip, index) => (
                            <Link key={index} to={{ pathname: `/view-trip/1740027335230`, state: { index: imageIndex } }} >
                                <div className="hover:scale-105 transition-all my-5 ">
                                    <img src={`/placeholder${imageIndex}.jpg`} className="object-contain rounded-xl h-[150px]" />
                                    <div>
                                        <h2 className="font-bold text-lg">{trip?.userSelection?.Location}</h2>
                                        <h2 className="text-sm text-gray-500">{trip?.userSelection?.Days} Day trip with {trip?.userSelection?.Budget} Budget</h2>
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">Paris</h2>
                                        <h2 className="text-sm text-gray-500">2 Day trip with moderate Budget</h2>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </>
                    :
                    [1, 2, 3, 4, 5]?.map((item, index) => (
                        <div key={index} className="h-[150px] w-full bg-slate-200 animate-pulse rounded-xl">
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyTrip