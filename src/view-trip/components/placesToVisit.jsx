import { Link } from "react-router-dom";

const PlacesToVisit = ({ trip }) => {
    return (
        <div>
            <h2 className="font-bold text-lg ">Places to Visit</h2>
            <div>
                {trip?.tripData?.itinerary?.map((item, index) => (
                    <div key={index}>
                        <h2 className="font-bold text-lg">Day {item?.day}</h2>
                        {/* <div className="grid grid-cols-2 gap-5"> */}
                        {item?.activities?.map((activity, i) => (
                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + activity?.place_name} target="_blank">
                                <div key={i} className="my-2 border rounded-xl p-3 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
                                    {/* <img src="/placeholder.jpg" className="w-[130px] h-[130px] rounded-xl" /> */}
                                    <img src={`/places${Math.floor(Math.random() * 14) + 1}.jpg`} className="w-[130px] h-[130px] object-cover rounded-xl" />
                                    <div className="justify-center items-center">
                                        <h2 className="font-bold text-lg text-black">{activity?.place_name}</h2>
                                        <p className="text-sm text-gray-500">{activity?.place_details}</p>
                                        <div className="flex my-2">
                                            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">🕖 {activity?.best_time_to_visit}</h2>
                                            <h2 className="p-1 px-3 mx-5 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">💵 {activity?.ticket_pricing}</h2>
                                        </div>
                                        {/* <Button size="sm"><FaMapLocationDot /></Button> */}
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {/* </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit;