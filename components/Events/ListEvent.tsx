"use client"; // Marca este componente como um "Client Component"

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Event {
  id: number;
}

export default function EventDetails({ id }: Event) {
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  // if (!event) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h2>Detalhes do Evento</h2>
      {/* <p>Título: {event.title}</p> */}
    </div>
  );
}
