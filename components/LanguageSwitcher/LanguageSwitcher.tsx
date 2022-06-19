import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface LanguageInterface {
  English: string;
  French: string;
}
const LanguageSwitcher: React.FunctionComponent<LanguageInterface> = ({
  English,
  French,
}) => {
  const { locale, pathname, query, asPath } = useRouter();
  return (
    <div className="px-10 py-4 bg-primary flex items-center cursor-pointer group relative">
      <span className="text-purple-700 w-4">
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
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      <span className="capitalize ml-2 text-purple-700">
        {locale == "en" ? English : French}
      </span>
      <div className="absolute left-0 top-full w-full bg-purple-500 shadow-md py-3 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition duration-300 z-50 divide-y divide-gray-300 divide-dashed">
        <Link key={"en"} href={{ pathname, query }} as={asPath} locale={"en"}>
          <a className="px-6 py-3 flex items-center hover:bg-purple-900 transition">
            <span className="text-gray-600 text-sm">{English}</span>
          </a>
        </Link>
        <Link key={"de"} href={{ pathname, query }} as={asPath} locale={"fr"}>
          <a className="px-6 py-3 flex items-center hover:bg-purple-900 transition">
            <span className="text-gray-600 text-sm">{French}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
