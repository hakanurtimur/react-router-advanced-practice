import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";


import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  console.log(data);

  return (
    <Form method={method} className={classes.form}>
      {" "}
      {/* actiona gönderdiği istek */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err} </li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export const action = async ({ request, params }) => {
  const data = await request.formData(); // request objesinin içersiinde bir property

  const method = await request.method



  const event = {
    title: data.get("title"), // form elementindeki name attiributeler ile çalışıyor get ile access aldık
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  let url = "http://localhost:8080/events";
  let methodRequest = 'POST'
  
  if(method === 'PATCH') {

    url = url + '/' + params.eventId;
    methodRequest = method;
  }

  const response = await fetch(url, {
    method: methodRequest,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (response.status === 422) {
    return response; // hata objesi
  }

  if (!response.ok) {
    throw json({ message: "New event couldn't sent" }, { status: 500 });
  } else {
    return redirect("/events");
  }
};

export default EventForm;
