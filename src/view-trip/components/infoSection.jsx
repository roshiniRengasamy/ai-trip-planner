const InfoSection = ({ trip }) => {
    return (
        <div>
            <img src={`/placeholder${Math.floor(Math.random() * 13)}.jpg`} className="h-[300px] w-full object-cover  rounded-xl" />
            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.Location}</h2>
                    <div className="flex gap-7">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">📅 {trip?.userSelection?.Days} Days</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">💰 {trip?.userSelection?.Budget} Budget</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">🥂 No. of Traveler(s) {trip?.userSelection?.Traveler}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection