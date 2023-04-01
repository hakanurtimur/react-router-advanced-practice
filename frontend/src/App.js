import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditEventPage, {action as deleteEventAction} from "./pages/EditEventPage";
import ErrorPage from "./pages/ErrorPage";
import EventDetailPage, { loader as loadEventDetails } from "./pages/EventDetailPage";
import EventsPage, { loader as eventLoader } from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import NewEventPage from "./pages/NewEventPage";
import RoutPage from "./pages/RoutPage";
import { action as manipulateEventAction } from "./components/EventForm"

import NewsletterPage, { action as newsletterAction } from './pages/NewsletterPage';

// Challenge / Exercise
const router = createBrowserRouter([
  {
    path: "",
    element: <RoutPage />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            //burada loader sayesinde fetch ediyoruz  standart fetch kodunu yazıyoruz
            loader: eventLoader,
          },
          {
            path: ":eventId",
            loader: loadEventDetails,
            id: 'event-detail',
            children: [
              { index: true, element: <EventDetailPage />, action: deleteEventAction },
              { path: "edit", element: <EditEventPage />, action: manipulateEventAction },
            ],
          },
          { path: "new", element: <NewEventPage />, action: manipulateEventAction },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);
// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage

// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
