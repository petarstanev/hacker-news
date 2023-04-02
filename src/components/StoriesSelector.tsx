import StoriesSelectorLink from "./StoriesSelectorLink";

const StoriesSelector = () => {
  return (
    <nav>
      <ul className="flex justify-around">
        <StoriesSelectorLink category="beststories">Hot</StoriesSelectorLink>
        <StoriesSelectorLink category="newstories">New</StoriesSelectorLink>
        <StoriesSelectorLink category="topstories">Top</StoriesSelectorLink>
      </ul>
    </nav>
  );
};

export default StoriesSelector;
