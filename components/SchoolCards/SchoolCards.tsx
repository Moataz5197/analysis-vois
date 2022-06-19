import { Dispatch, SetStateAction, useState } from "react";
import { useSchools } from "../../store";

interface SchoolCards {
  school: string;
  items: string[];
  onItemClick: Dispatch<SetStateAction<string[]>>;
}

function SchoolCards({ school, onItemClick, items }: SchoolCards) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { schools } = useSchools();
  let lessons = 0;

  schools
    .filter((s, i) => s.school == school)
    .map((e, i) => (lessons += e.lessons));

  const handleOnClick = () => {
    const schoolIdx = items.findIndex((item) => item == school);

    if (schoolIdx > -1) {
      const newItems = [...items];
      newItems.splice(schoolIdx, 1);
      onItemClick(newItems);
    } else {
      onItemClick([...items, school]);
    }
    setIsActive(!isActive);
  };
  return school == "" ? null : (
    <button
      className={`flex justify-center space-x-3 m-5 ${
        isActive ? "text-red-500" : " opacity-25"
      }`}
      onClick={handleOnClick}
    >
      <div className="mt-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <h2> {lessons} Lessons </h2>
        <h3> in {school}</h3>
      </div>
    </button>
  );
}

export default SchoolCards;
