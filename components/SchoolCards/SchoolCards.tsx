import { Dispatch, SetStateAction, useState } from "react";
import { useSchools } from "../../store";

interface SchoolCards {
  school: string;
  items: string[];
  colors: string[];
  onItemClick: Dispatch<SetStateAction<string[]>>;
  onItemClickColor: Dispatch<SetStateAction<string[]>>;
}

function SchoolCards({
  school,
  onItemClick,
  items,
  colors,
  onItemClickColor,
}: SchoolCards) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>("");
  const { schools } = useSchools();
  let lessons = 0;

  schools
    .filter((s, i) => s.school == school)
    .map((e, i) => (lessons += e.lessons));

  let color = "#";
  let letters = "0123456789ABCDEF";
  const calculateColor = () => {
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
  };
  const handleOnClick = () => {
    const schoolIdx = items.findIndex((item) => item == school);

    if (schoolIdx > -1) {
      const newItems = [...items];
      const newColors = [...colors];
      newItems.splice(schoolIdx, 1);
      newColors.splice(schoolIdx, 1);
      onItemClick(newItems);
      onItemClickColor(newColors);
    } else {
      onItemClick([...items, school]);
      calculateColor();
      setCurrentColor(color);
      onItemClickColor([...colors, color]);
    }
    setIsActive(!isActive);
  };
  return school == "" ? null : (
    <button
      className={`flex justify-center space-x-3 m-5 ${
        isActive ? `` : " opacity-25"
      }`}
      style={isActive ? { color: `${currentColor}` } : {}}
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
        <h2 className="text-2xl"> {lessons} Lessons </h2>
        <h3 className="text-xs"> in {school}</h3>
      </div>
    </button>
  );
}

export default SchoolCards;
