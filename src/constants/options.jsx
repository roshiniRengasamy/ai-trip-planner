export const SelectTravelsList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveler in exploration',
        people: '1 People',
        icon: '🙋'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        people: '2 People',
        icon: '🥂'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adventure',
        people: '3 - 5 People',
        icon: '👪    '
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        people: '5 - 10 People',
        icon: '🚞'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay consious of costs',
        icon: '💲'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about cost",
        icon: '💸'
    },

]

export const AI_PROMPT = 'Generate Travel Plan for Location :{Location} for {Days} Days for {Traveler} with {Budget} budget, Give me hotel options list with hotel name, hotel address, hotel price, hotel image url, geo coordinates, ratings, description. Suggest itinerary with place name, place details, place image url, ticket pricing, geo coordinates. Time to travel each of the location for {Days} days with each day plan with best time to visit in JSON format'