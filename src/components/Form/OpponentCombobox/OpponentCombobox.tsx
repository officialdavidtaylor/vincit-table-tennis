import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { people } from "./testData";

const OpponentCombobox = () => {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <Combobox
      name="opponent-name"
      value={selectedPerson}
      onChange={setSelectedPerson}
      as="div"
      className="relative"
    >
      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
        <span className=" text-sm font-bold">Opponent Name</span>
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
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
          {filteredPeople.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none py-2 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredPeople.map((person, index) => (
              <Combobox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${
                    active ? "bg-purple-700 text-white" : "text-gray-900"
                  }`
                }
                value={person}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {person}
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
};

export default OpponentCombobox;
