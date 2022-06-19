import React from "react";
import { useSchools } from "../../store";
import ListMenu from "../ListMenu";
import SchoolCards from "../SchoolCards";
import LineChart from "../LineChart";

interface Props {
  analysis_main: string;
  analysis_sub: string;
  list_1: string;
  list_2: string;
  list_3: string;
  show_all: string;
  chart_main: string;
  schools_main: string;
}

const Analysis: React.FunctionComponent<Props> = ({
  analysis_main = "Default",
  analysis_sub = "Default",
  list_1 = "Default",
  list_2 = "Default",
  list_3 = "Default",
  show_all = "Show all",
  chart_main = "Default",
  schools_main = "Default",
}) => {
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
    selectedGraphColor,
    setSelectedGraphColor,
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
        <h1 className="text-4xl text-violet-700 mb-10">{analysis_main}</h1>
        <h2 className="text-xl text-violet-700 mb-10">{analysis_sub}</h2>
        <div className="flex justify-around">
          <ListMenu
            key={1}
            label={list_1}
            show_all={show_all}
            uniqueSet={uniqueCountries}
            selectedState={selectedCountry}
            setSelectedState={setSelectedCountry}
          />
          <ListMenu
            key={2}
            label={list_2}
            show_all={show_all}
            uniqueSet={uniqueCamps}
            selectedState={selectedCamp}
            setSelectedState={setSelectedCamp}
          />
          <ListMenu
            key={3}
            label={list_3}
            show_all={show_all}
            uniqueSet={SelectedSchools}
            selectedState={selectedSchool}
            setSelectedState={setSelectedSchool}
          />
        </div>
      </div>
      <div className="container h-[28rem] mx-10 flex space-x-2 rounded-md">
        <div className="w-2/3 shadow-lg h-fit  dark:shadow-slate-400">
          <h3>{chart_main}</h3>
          <div>
            <LineChart
              FilteredData={schools}
              GraphData={selectedGraphData}
              GraphColor={selectedGraphColor}
            />
          </div>
        </div>
        <div className=" w-1/3 shadow-lg overflow-auto  dark:shadow-slate-400">
          <div className="container flex justify-center">
            <div className="flex-col items-center justify-center">
              <div className=" mb-10 mt-5">
                <h1 className="text-3xl">
                  {countedLessons} {schools_main}
                </h1>
                <h2>{selectedCamp == "" ? "Overall" : `in ${selectedCamp}`}</h2>
              </div>
              {SelectedSchools.map((school: string, schoolIdx: number) => (
                <SchoolCards
                  key={schoolIdx}
                  school={school}
                  items={selectedGraphData}
                  colors={selectedGraphColor}
                  onItemClick={setSelectedGraphData}
                  onItemClickColor={setSelectedGraphColor}
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
