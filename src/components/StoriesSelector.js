import StoriesSelectorLink from "./StoriesSelectorLink";

const StoriesSelector = () => {
  return (
    <nav>
      <ul>
        <StoriesSelectorLink type="beststories">Hot</StoriesSelectorLink>
        <StoriesSelectorLink type="newstories">New</StoriesSelectorLink>
        <StoriesSelectorLink type="topstories">Top</StoriesSelectorLink>
        <StoriesSelectorLink type="top10stories">Top 10</StoriesSelectorLink>
      </ul>
    </nav>
  );
};

export default StoriesSelector;
