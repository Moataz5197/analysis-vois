import type { NextPage } from "next";
import fs from "fs";
import Analysis from "../components/Analysis";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Circles } from "react-loader-spinner";
import { analysis } from "../utiils/types";
import { useSchools } from "../store";

export async function getServerSideProps({ locale }: any) {
  const resp = fs.readFileSync(
    `${process.cwd()}/store/data/data.json`,
    "utf-8"
  );
  const schools = JSON.parse(resp);
  return {
    props: {
      schools: schools,
      ...(await serverSideTranslations(locale, ["common", "analysis"])),
    },
  };
}
const Home: NextPage = () => {
  const { t } = useTranslation();
  const analysis: analysis = {
    analysis_main: t("analysis:Analysis_Main"),
    analysis_sub: t("analysis:Analysis_Sub"),
    list_1: t("analysis:List_1"),
    list_2: t("analysis:List_2"),
    list_3: t("analysis:List_3"),
    show_all: t("analysis:Show_All"),
    chart_main: t("analysis:Chart_Main"),
    schools_main: t("analysis:Schools_Main"),
  };
  const { schools } = useSchools();
  return (
    <div>
      <Layout>
        <main className="flex-col justify-center items-center dark:bg-black dark:text-white transition duration-500 mt-20 dark:shadow-slate-400">
          {schools ? (
            <Analysis {...analysis} />
          ) : (
            <div className=" flex h-screen justify-center items-center">
              <Circles color="#00BFFF" height={80} width={80} />
              <h2>Loading.....</h2>
            </div>
          )}
        </main>
      </Layout>
    </div>
  );
};

export default Home;
