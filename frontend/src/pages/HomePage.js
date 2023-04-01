import { useNavigate } from "react-router-dom"

export default function HomePage() {

    const navigator = useNavigate();


    const navigateHandler = () => {

        navigator('events')
    }


    return <>
        <h1>This is home page</h1>
        <button onClick={navigateHandler}>Events</button>
    </>
}