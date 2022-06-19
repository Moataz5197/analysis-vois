import React from "react";
import { useSchools } from "../../store";
import ListMenu from "../ListMenu";
import SchoolCards from "../SchoolCards";
import LineChart from "../LineChart";

const Analysis: React.FunctionComponent = () => {
  const {
    schools,
    uniqueCountries,
    selectedCountry,
    setSelectedCountry,
    uniqueCamps,
    selectedCamp,
    setSelectedCamp,
    selectedSchool,
    setSelectedSchool,
    selectedGraphData,
    setSelectedGraphData,
  } = useSchools();
  let countedLessons = 0;
  const SelectedSchools = schools
    .map((element, index) => element.school)
    .filter((value, index, self) => self.indexOf(value) === index);
  SelectedSchools?.unshift("");
  schools.map((element, index) => {
    countedLessons += element.lessons;
  });
  return (
    <section>
      <div className="container h-64 mx-10 mt-2">
        <h1 className="text-4xl text-violet-700 mb-10">Analysis chart</h1>
        <h2 className="text-xl text-violet-700 mb-10">Number of lessons</h2>
        <div className="flex justify-around">
          <ListMenu
            key={0}
            label={"Select Countries"}
            uniqueSet={uniqueCountries}
            selectedState={selectedCountry}
            setSelectedState={setSelectedCountry}
          />
          <ListMenu
            key={1}
            label={"Select Camps"}
            uniqueSet={uniqueCamps}
            selectedState={selectedCamp}
            setSelectedState={setSelectedCamp}
          />
          <ListMenu
            key={2}
            label={"Select Schools"}
            uniqueSet={SelectedSchools}
            selectedState={selectedSchool}
            setSelectedState={setSelectedSchool}
          />
        </div>
      </div>
      <div className="container h-96 mx-10 flex space-x-2 rounded-md">
        <div className="w-2/3 shadow-lg h-fit">
          <h3>No of Lessons</h3>
          <div>
            <LineChart FilteredData={schools} GraphData={selectedGraphData} />
          </div>
        </div>
        <div className=" w-1/3 shadow-lg overflow-auto">
          <div className="container flex justify-center">
            <div className="flex-col items-center justify-center">
              <div className=" mb-10">
                <h1 className="text-3xl">{countedLessons} Lessons</h1>
                <h2>{selectedCamp == "" ? "Overall" : `in ${selectedCamp}`}</h2>
              </div>
              {SelectedSchools.map((school: string, schoolIdx: number) => (
                <SchoolCards
                  key={schoolIdx}
                  school={school}
                  items={selectedGraphData}
                  onItemClick={setSelectedGraphData}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analysis;
