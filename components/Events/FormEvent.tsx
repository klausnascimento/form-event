"use client";

import {
  IconAbc,
  IconArrowBackUp,
  IconDeviceFloppy
} from "@tabler/icons-react";

import { Event } from "@/lib/types";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

export default function FormEvent() {
  const [selectedSortfirstName, setSelectedSortfirstName] = useState(""); // Estado para armazenar o título selecionado
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [nameData, setNameData] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<Event[]>("/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching sort data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Event>("/api/events", {
        title,
        nameData,
      });
      setEvents([...events, response.data]);
      setTitle("");
      setNameData(new Date());
      location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Adicione lógica para lidar com o erro, como exibir uma mensagem de erro para o usuário
    }
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedSortfirstName(event.target.value);
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <div className="mb-4 grid grid-flow-col grid-cols-2 grid-rows-1">
        <div className="flex items-center">
          <Label>Vamos criar seu evento</Label>
        </div>
        <div className="flex items-center justify-end">
          <Label>-</Label>
        </div>
      </div>
      <hr className="border-gray-300 my-2" />
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="fullName"
            >
              Título do Evento
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <IconAbc />
              </span>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="fullName"
            >
              Título do Evento
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <IconAbc />
              </span>
              <DatePicker
                multiple
                minDate={new Date()} // Define a data mínima como a data atual
                plugins={[
                  // eslint-disable-next-line react/jsx-key
                  <DatePanel />,
                ]}
                value={nameData}
                onChange={(date) => {
                  if (date instanceof Date) {
                    setNameData(date);
                  } else if (
                    Array.isArray(date) &&
                    date.length > 0 &&
                    date[0] instanceof Date
                  ) {
                    setNameData(date[0]);
                  }
                }}
              />
            </div>
          </div>

          {/* <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="fileUpload"
            >
              Enviar Arquivo
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <IconMapPins />
              </span>
              <input
                className="hidden"
                type="file"
                id="fileUpload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              ></label>
            </div>
          </div> */}
        </div>

        <div className="mb-5.5">
          <hr />
        </div>

        <div className="mb-4 grid grid-flow-col grid-cols-2 grid-rows-1">
          <div className="flex items-center">
            <button onClick={() => history.go(-1)}>
              <IconArrowBackUp />
              Voltar
            </button>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              type="submit"
            >
              <IconDeviceFloppy /> SALVAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
