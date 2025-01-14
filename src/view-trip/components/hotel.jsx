import { Link } from "react-router-dom"

const Hotel = ({ trip }) => {
    return (
        <div>
            <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-3">
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <Link key={index} to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotel_name + "," + hotel?.hotel_address} target="_blank">
                        <div className="hover:scale-105 transition-all cursor-pointer">
                            {/* <img src="/noImage.jpg" className="rounded-xl" /> */}
                            <img src={hotel?.hotel_image_url} className="w-[130px] h-[130px] rounded-xl" />
                            <div className="my-2 flex flex-col gap-2">
                                <h2 className="font-medium">{hotel?.hotel_name}</h2>
                                <h2 className="text-xs text-gray-500">📍 {hotel?.hotel_address}</h2>
                                <h2 className="text-[13px]">💵 {hotel?.hotel_price}</h2>
                                <h2 className="text-[13px]">⭐ {hotel?.ratings}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default Hotel