import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebase.config";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Dialog from "@/components/custom/dialog";

const CreateTrip = () => {

    const dialogRef = useRef(null);

    const openDialog = () => dialogRef.current.showModal();
    const closeDialog = () => dialogRef.current.close();

    // State varible to store the places for user
    const [places, setPlaces] = useState([]);

    // State varible for storing query for firebase
    const [query, setQuery] = useState('');

    // State varible used for storing the user specification for the trip
    const [formData, setFormData] = useState([])

    // State variable used for loading
    const [loading, setLoading] = useState(false)

    // Hook used for navigation
    const navigate = useNavigate()

    // Fetch suggestions from Mapbox Geocoding API
    const fetchSuggestions = async (searchQuery) => {
        if (!searchQuery) {
            setPlaces([]);
            return;
        }

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${import.meta.env.VITE_MAPBOX_PLACE_API_KEY}`
            );
            const data = await response.json();
            setPlaces(data.features); // Store the places in the state
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    // Handle input change
    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        fetchSuggestions(value);
    };

    // Handle place selection from suggestions
    const handleSelect = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
        name === 'Location' && setQuery(value); // Set the query to the selected place's name
        name === 'Location' && setPlaces([]); // Clear the suggestions
    };

    // Generate personalised trip based on user specification from Gemini AI modal
    const onGeneratetrip = async () => {
        const user = localStorage.getItem('User')
        if (!user) {
            openDialog()
            return;
        }
        else {
            if (formData.Days > 5 || !formData?.Location || !formData?.Days || !formData?.Budget || !formData?.Traveler) {
                toast('Please fill all the fields!')
                return;
            }
            setLoading(true)
            const FINAL_PROMPT = AI_PROMPT
                .replace('{Location}', formData?.Location)
                .replace('{Days}', formData?.Days)
                .replace('{Budget}', formData?.Budget)
                .replace('{Traveler}', formData?.Traveler)
                .replace('{Days}', formData?.Days)
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            saveTrip(result?.response?.text())
        }
    }

    // Saving the personalized trip plan in firebase
    const saveTrip = async (tripData) => {
        const user = JSON.parse(localStorage.getItem('User'))
        const docId = Date.now().toString()
        await setDoc(doc(db, "TripData", docId), {
            userSelection: formData,
            tripData: JSON.parse(tripData),
            userEmail: user?.email,
            id: docId
        })
        setLoading(false)
        navigate('/view-trip/' + docId)
    }

    // User authentication using google
    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

    // Get user information
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
                onGeneratetrip()
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 my-10 flex-1">
            <h2 className="font-bold text-2xl" onClick={() => { openDialog() }}>Tell us your travel preferences 🏕️🌴</h2>
            <p className="mt-3 text-gray-500 text-lg">Just provide some basic information, and our trip planner will generate a customized itinery based on your preferences.</p>
            <div className="mt-10 flex flex-col gap-9">
                <div>
                    <h2 className="text-lg my-3 font-medium" >What is destination of choice?</h2>
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Search for a place"
                        className="w-full p-2 rounded border border-gray-300"
                    />
                    {/* Suggestions List */}
                    {places.length > 0 && (
                        <ul className=" list-none p-0 m-0 border border-gray-300 max-h-52 overflow-y-auto bg-white w-full">
                            {places.map((place) => (
                                <li
                                    key={place.id}
                                    onClick={() => handleSelect('Location', place.place_name)}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {place.place_name}
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
                <div>
                    <h2 className="text-lg my-3 font-medium" >How many days are you planning your trip?</h2>
                    <Input placeholder="Ex: 3" type="number" onChange={(event) => handleSelect('Days', event.target.value)} />
                </div>
                <div>
                    <h2 className="text-lg my-3 font-medium" >What is your budget?</h2>
                    <div className="grid grid-cols-3 gap-10">
                        {
                            SelectBudgetOptions?.map((item, index) => (
                                <div key={index} onClick={() => handleSelect('Budget', item.title)} className={`p-4 cursor-pointer rounded-lg border hover:shadow-lg ${formData?.Budget == item?.title && 'shadow-lg border-black'}`}>
                                    <h2 className="text-3xl">{item.icon}</h2>
                                    <h2 className="font-bold text-lg">{item.title}</h2>
                                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-lg my-3 font-medium" >Who do you plan on traveling with on your next adventure?</h2>
                    <div className="grid grid-cols-3 gap-10">
                        {
                            SelectTravelsList?.map((item, index) => (
                                <div key={index} onClick={() => handleSelect('Traveler', item.people)} className={`p-4 cursor-pointer rounded-lg border hover:shadow-lg ${formData?.Traveler == item?.people && 'shadow-lg border-black'}`}>
                                    <h2 className="text-3xl">{item.icon}</h2>
                                    <h2 className="font-bold text-lg">{item.title}</h2>
                                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-end ">
                <Button disabled={loading} onClick={onGeneratetrip}>
                    {
                        loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip'
                    }
                </Button>
            </div>
            <Dialog dialogRef={dialogRef} openDialog={openDialog} closeDialog={closeDialog} login={login} />
        </div>
    )
}

export default CreateTrip