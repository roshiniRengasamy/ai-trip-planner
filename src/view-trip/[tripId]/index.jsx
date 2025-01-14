import { db } from "@/service/firebase.config"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "sonner";
import InfoSection from "../components/infoSection";
import Hotel from "../components/hotel";
import PlacesToVisit from "../components/placesToVisit";

const ViewTrip = () => {

    // Trip Id to retrive the specific plans
    const { tripId } = useParams();

    // State variable to store the trip details
    const [trip, setTrip] = useState([])

    // Hook to call the method when page renders
    useEffect(() => {
        tripId && getTripData()
    }, [tripId])

    // Method to retirve the specific trip plan
    const getTripData = async () => {
        const docRef = doc(db, 'TripData', tripId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setTrip(docSnap.data())
        }
        else {
            toast('No trip found!')
        }
    }

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recommended Hotels */}
            <Hotel trip={trip} />
            {/* Daily Plan */}
            <PlacesToVisit trip={trip} />
            <div className="my-7">
                <h2 className="text-center text-gray-400 text-sm">Create by Roshini Travel Planner @2025</h2>
            </div>
        </div>
    )
}

export default ViewTrip