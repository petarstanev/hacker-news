import { useRouter } from "next/router";
import Link from "next/link";

const links = [
  { id: 0, name: "Top", url: "top", default: true },
  { id: 1, name: "Best", url: "best", default: false },
  { id: 2, name: "New", url: "new", default: false },
  { id: 3, name: "Ask", url: "ask", default: false },
  { id: 4, name: "Show", url: "show", default: false },
  { id: 5, name: "Jobs", url: "job", default: false },
];

const Navigation = () => {
  const router = useRouter();

  let isMatchingUrl = (matchingUrl: string, def: boolean): boolean => {
    if (router.query.id) {
      return false;
    }

    if (router.query.category) {
      return router.query.category === matchingUrl;
    }
    return def;
  };

  return (
    <nav className="max-w-3xl mx-auto flex justify-around py-2 border-b">
      {links.map((l) => (
        <Link
          key={l.id}
          className={
            isMatchingUrl(l.url, l.default)
              ? "text-center w-12 py-1 bg-orange-500 text-white rounded-md "
              : "text-center w-12 py-1 border-solid border border-black rounded-md"
          }
          href={"/" + l.url}
        >
          {l.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
