import { Link } from "react-router-dom";
import { Button } from "../ui/button";

//Home page
const Hero = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center mx-40 my-20 gap-9">
                <h1 className="font-extrabold text-[60px] text-center mt-16">
                    <span className="text-[#f56551]">Discover Your Next Adventure with AI: </span>
                    Personalized Itineraries at Your Fingertips
                </h1>
                <p className="text-xl text-gray-500 text-center">Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
                <Link to={'/create-trip'}>
                    <Button>Get Started, it's free</Button>
                </Link>
            </div>
        </div>
    )
}

export default Hero;