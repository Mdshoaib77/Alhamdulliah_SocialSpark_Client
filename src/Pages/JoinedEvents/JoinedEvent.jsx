import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const JoinedEvents = () => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view your joined events.");
      return;
    }

    // Fetching the joined events of the logged-in user
    fetch(`/joined-events?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJoinedEvents(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load joined events.");
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-purple-800">Joined Events</h2>
      {joinedEvents.length === 0 ? (
        <p>No events joined yet.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {joinedEvents.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-purple-800">{event.title}</h3>
              <p>{event.description}</p>
              <p className="mt-2 text-sm text-gray-600">{event.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;
