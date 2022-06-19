import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { graphData, School } from "../../utiils/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Default",
      data: [],
    },
  ],
};

interface Props {
  GraphData: string[];
  FilteredData: School[];
}

const LineChart: React.FunctionComponent<Props> = ({
  GraphData,
  FilteredData,
}) => {
  const timeMap: any = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const dataFromSchools: graphData[] = [];
  GraphData.map((schoolName: string, index: number) => {
    let label: string = schoolName;
    let data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    FilteredData.filter(
      (element: School, index: number) => element.school == schoolName
    ).map((element: School, index: number) => {
      let i = timeMap[element.month];
      data[timeMap[element.month]] = element.lessons;
    });
    if (label !== "") {
      dataFromSchools.push({
        label,
        data,
      });
    }
  });

  return (
    <Line
      data={
        dataFromSchools.length > 0
          ? { labels, datasets: dataFromSchools }
          : data
      }
      options={{ responsive: true, plugins: { legend: { display: false } } }}
    />
  );
};

export default LineChart;
