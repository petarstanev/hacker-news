import { useRouter } from "next/router";
import Link from "next/link";

const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="flex justify-around">
      <Link
        className={router.query.category === "beststories" ? "font-bold" : ""}
        href={"/beststories"}
        as={"/beststories"}
      >
        Hot
      </Link>
      <Link
        className={router.query.category === "newstories" ? "font-bold" : ""}
        href={"/newstories"}
        as={"/newstories"}
      >
        New
      </Link>
      <Link
        className={router.query.category === "topstories" ? "font-bold" : ""}
        href={"/topstories"}
        as={"/topstories"}
      >
        Top
      </Link>
    </nav>
  );
};

export default Navigation;
