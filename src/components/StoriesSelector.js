import StoriesSelectorLink from "./StoriesSelectorLink";

const StoriesSelector = () => {
  return (
    <nav style={{ display: "flex" }}>
      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          flex: "1",
          justifyContent: "space-around",
          padding: '0',
        }}
      >
        <StoriesSelectorLink category="beststories">Hot</StoriesSelectorLink>
        <StoriesSelectorLink category="newstories">New</StoriesSelectorLink>
        <StoriesSelectorLink category="topstories">Top</StoriesSelectorLink>
        <StoriesSelectorLink category="top10stories">
          Top 10
        </StoriesSelectorLink>
      </ul>
    </nav>
  );
};

export default StoriesSelector;
