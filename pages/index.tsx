import type { NextPage } from "next";
import fs from "fs";
import Analysis from "../components/Analysis";

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
  return (
    <div>
      <main className="flex-col justify-center items-center">
        <Analysis />
      </main>
    </div>
  );
};

export default Home;
