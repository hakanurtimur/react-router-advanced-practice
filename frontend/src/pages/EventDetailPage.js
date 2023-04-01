
import { Suspense } from "react";
import { json, useRouteLoaderData, defer, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
  const { events, event } = useRouteLoaderData('event-detail')
 
  

  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={event}>
        {(event) => <EventItem event={event} />}
      </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(events) => <EventsList events={events} />}
      </Await>
      </Suspense>
    </>
  );
}


const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  // burada use state kullanmaıyoruz çünkü burası bir react komponenti değil bir browser özelliği ..

  if (!response.ok) {
    // throw new Response(JSON.stringify({message: 'Test' }), {status: 500})
    //   throw {message: 'A problem occured'} // bu erroru fırlattığımız zaman root page e herhangi bir error çıktoğında render edeceği error sayfasına bir göndermede bulunuyoruz..
    //   return {isError: true, message: 'A problem occured.'} ALTERNATİF
    throw json({ message: "Test error" }, { status: 500 });
  } else {
        const resData = await response.json()
        console.log(resData.events)
      return resData.events;
       // something we can do easyly
  }
  // const resData = await response.json();

  // return resData.events;

};

const loadEvent = async(id) => {

    const response = await fetch('http://localhost:8080/events/' + id);

    if(!response.ok) {
        throw json({message: 'Event is not found'}, {
            status: 112
        })
    } else {
        const resData = await response.json()
        return resData.event;
    }
}



export const loader = async({request, params}) => {
  const id = params.eventId

  return defer( {
    events: loadEvents(),
    event: await loadEvent(id),

  })
}

