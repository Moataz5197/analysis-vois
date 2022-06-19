import React, { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

interface ListMenu {
  label?: string;
  show_all: string;
  uniqueSet: string[];
  selectedState: string;
  setSelectedState: Dispatch<SetStateAction<string>>;
}

function ListMenu({
  label = "Select Somethings",
  show_all = "Show all",
  setSelectedState,
  selectedState = "",
  uniqueSet,
}: ListMenu) {
  return (
    <div className="flex space-x-3 mt-4">
      <label className="mt-3">{label}</label>
      <div className="top-16 w-64">
        <Listbox value={selectedState} onChange={setSelectedState}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-violet-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate h-6">
                {selectedState == "" ? show_all : selectedState}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {uniqueSet.map((element, elementIdx) => (
                  <>
                    <Listbox.Option
                      key={elementIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={element}
                    >
                      {
                        <>
                          <span
                            className={`block truncate ${
                              selectedState ? "font-medium" : "font-normal"
                            }`}
                          >
                            {element == "" ? "Show All" : element}
                          </span>
                          {selectedState == element ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      }
                    </Listbox.Option>
                    {elementIdx == 0 ? <hr key={elementIdx} /> : ""}
                  </>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}

export default ListMenu;
