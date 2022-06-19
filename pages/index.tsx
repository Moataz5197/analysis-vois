import type { NextPage } from "next";
import { useSchools } from "../store";
import fs from "fs";
import ListMenu from "../components/ListMenu";
import SchoolCards from "../components/SchoolCards";
import LineChart from "../components/LineChart";

export function getServerSideProps() {
  const resp = fs.readFileSync(
    `${process.cwd()}/store/data/data.json`,
    "utf-8"
  );
  const schools = JSON.parse(resp);
  return {
    props: {
      schools: schools,
    },
  };
}
const Home: NextPage = () => {
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
  const SelectedSchools = schools
    .map((element, index) => element.school)
    .filter((value, index, self) => self.indexOf(value) === index);
  SelectedSchools.unshift("");
  return (
    <div>
      <main className="flex-col justify-center items-center">
        <div className="container h-72 mx-10 mt-2">
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
        <div className="container h-96  mx-10 flex space-x-2 rounded-md">
          <div className="w-2/3 shadow-lg">
            <h3>No of Lessons</h3>
            <div>
              <LineChart GraphData={"Hi"} />
            </div>
          </div>
          <div className=" w-1/3 shadow-lg overflow-auto">
            <div className="container flex justify-center">
              <div className="flex-col items-center justify-center">
                <div className=" mb-10">
                  <h1 className="text-3xl">80 Lessons</h1>
                  <h2>
                    {selectedCamp == "" ? "Overall" : `in ${selectedCamp}`}
                  </h2>
                </div>
                {schools.map((s, schoolIdx: number) => (
                  <SchoolCards
                    key={schoolIdx}
                    school={s.school}
                    lessons={s.lessons}
                    items={selectedGraphData}
                    onItemClick={setSelectedGraphData}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
