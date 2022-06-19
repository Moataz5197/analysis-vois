import type { NextPage } from "next";
import fs from "fs";
import Analysis from "../components/Analysis";
import Layout from "../components/Layout";

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
      <Layout>
        <main className="flex-col justify-center items-center dark:bg-black dark:text-white transition duration-500 mt-16 dark:shadow-slate-400">
          <Analysis />
        </main>
      </Layout>
    </div>
  );
};

export default Home;
