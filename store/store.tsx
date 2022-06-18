import {
  useState,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useEffect
} from 'react';
interface Schools {
  id: string;
  month: string;
  camp: string;
  country: string;
  school: string;
  lessons: number;
  children: ReactNode;
}

const useSchoolsController = (schools: Schools[]) => {
  const uniqueCountries: string[] = schools
    ?.map((school: Schools) => school.country)
    ?.filter((value, index, self) => self.indexOf(value) === index);
  const uniqueCamps: string[] = schools
    ?.map((school: Schools) => school.camp)
    ?.filter((value, index, self) => self.indexOf(value) === index);

  uniqueCamps.unshift('');
  uniqueCountries.unshift('');

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCamp, setSelectedCamp] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  useEffect(() => {}, [selectedCountry, selectedCamp, selectedSchool]);
  const filteredSchools = useMemo(
    () =>
      schools.filter(
        (element: Schools) =>
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
    schools: filteredSchools
  };
};

const SchoolsContext = createContext<ReturnType<typeof useSchoolsController>>({
  uniqueCountries: [],
  uniqueCamps: [],
  selectedCountry: '',
  setSelectedCountry: () => {},
  selectedCamp: '',
  setSelectedCamp: () => {},
  selectedSchool: '',
  setSelectedSchool: () => {},
  schools: []
});

export const SchoolsProvider = ({
  schools,
  children
}: {
  schools: Schools[];
  children: ReactNode;
}) => (
  <SchoolsContext.Provider value={useSchoolsController(schools)}>
    {children}
  </SchoolsContext.Provider>
);

export const useSchools = () => useContext(SchoolsContext);
