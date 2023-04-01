import { Await, defer, json, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import EventsList from "../components/EventsList";

function EventsPage() {
  const {events} = useLoaderData();

  const x = async() =>{

   const eventList = await events

   console.log(eventList)

  }

  x()



  // if(data.isError) { ALTERNATİF
  //     return <p>{data.message}</p>
  // }

  return (
    <Suspense fallback={<p>Loading...</p>}>
    <Await resolve={events}>
      {events => <EventsList events={events}></EventsList>}
    </Await>
    </Suspense>
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

export default EventsPage;

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
