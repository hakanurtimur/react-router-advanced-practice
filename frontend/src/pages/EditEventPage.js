import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEventPage() {

    const data = useRouteLoaderData('event-detail')
  return(
  <>
    <EventForm method = 'PATCH' event={data.event} />
  </>
  )
}


export const action = async({request, params}) => {

const id = params.eventId

const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method
})
console.log(response)
if(!response.ok) {
    throw json({message: 'Event can\'t deleted'}, {status: 500})
} else {

    return redirect('/events')
}


}