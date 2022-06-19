import {
  useState,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
interface School {
  id: string;
  month: string;
  camp: string;
  country: string;
  school: string;
  lessons: number;
  children: ReactNode;
}

const useSchoolsController = (schools: School[]) => {
  const uniqueCountries: string[] = schools
    ?.map((school: School) => school.country)
    ?.filter((value, index, self) => self.indexOf(value) === index);
  const uniqueCamps: string[] = schools
    ?.map((school: School) => school.camp)
    ?.filter((value, index, self) => self.indexOf(value) === index);

  uniqueCamps.unshift("");
  uniqueCountries.unshift("");

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCamp, setSelectedCamp] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedGraphData, setSelectedGraphData] = useState<string[]>([""]);
  const [selectedGraphColor, setSelectedGraphColor] = useState<string[]>([""]);
  const [theme, setTheme] = useState<string>("dark");
  const colorTheme: string = theme === "dark" ? "light" : "dark";
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme, colorTheme]);
  useEffect(() => {}, [selectedCountry, selectedCamp, selectedSchool]);
  const filteredSchools = useMemo(
    () =>
      schools.filter(
        (element: School) =>
          element.country.includes(selectedCountry) &&
          element.camp.includes(selectedCamp) &&
          element.school.includes(selectedSchool)
      ),
    [selectedCountry, selectedCamp, selectedSchool, schools]
  );

  return {
    uniqueCountries,
    uniqueCamps,
    selectedCountry,
    setSelectedCountry,
    selectedCamp,
    setSelectedCamp,
    selectedSchool,
    setSelectedSchool,
    schools: filteredSchools,
    selectedGraphData,
    setSelectedGraphData,
    selectedGraphColor,
    setSelectedGraphColor,
    setTheme,
    colorTheme,
  };
};

const SchoolsContext = createContext<ReturnType<typeof useSchoolsController>>({
  uniqueCountries: [],
  uniqueCamps: [],
  selectedCountry: "",
  setSelectedCountry: () => {},
  selectedCamp: "",
  setSelectedCamp: () => {},
  selectedSchool: "",
  setSelectedSchool: () => {},
  schools: [],
  selectedGraphData: [],
  setSelectedGraphData: () => {},
  selectedGraphColor: [],
  setSelectedGraphColor: () => {},
  setTheme: () => {},
  colorTheme: "",
});

export const SchoolsProvider = ({
  schools,
  children,
}: {
  schools: School[];
  children: ReactNode;
}) => (
  <SchoolsContext.Provider value={useSchoolsController(schools)}>
    {children}
  </SchoolsContext.Provider>
);

export const useSchools = () => useContext(SchoolsContext);
