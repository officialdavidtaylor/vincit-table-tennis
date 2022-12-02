import { Combobox, Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Players } from "./models";

// import { players } from "./testData";

// eslint-disable-next-line react/display-name
const OpponentCombobox = React.forwardRef<HTMLInputElement, any>(
  (props, ref) => {
    const {
      onChange,
      onBlur,
      valueSetter,
      name,
      players,
    }: {
      players: Players[];
      onChange: any;
      onBlur: any;
      valueSetter: (value: string) => null;
      name: string;
    } = props;
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    const setIdOfSelected = (selected: string) => {
      const id =
        players.find((player) => selected === player.playerName)?.id ?? null;
      valueSetter(id ?? "");
    };

    const filteredPeople =
      query === ""
        ? players
        : players?.filter((player) => {
            return player.playerName
              .toLowerCase()
              .includes(query.toLowerCase());
          });

    return (
      <Combobox
        as="div"
        className="relative"
        name="player2"
        ref={ref}
        onChange={(e: any) => {
          setIdOfSelected(e);
          setSelectedPerson(e);
        }}
      >
        <div className="relative w-full cursor-default overflow-hidden rounded-lg  text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <span className=" text-sm font-bold">Opponent Name</span>
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            spellCheck="false"
            placeholder="Opponent Name"
            className="input-box"
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople?.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredPeople?.map((person, index) => (
                <Combobox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-purple-700 text-white" : "text-gray-900"
                    }`
                  }
                  value={person.playerName}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.playerName}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    );
  }
);

export default OpponentCombobox;
