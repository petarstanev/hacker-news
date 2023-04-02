import { useContext } from "react";
import StoriesContext from "../store/stories-context";

const StoriesSelectorLink = (props: {category: string, children: React.ReactNode}) => {
  const context = useContext(StoriesContext);

  const selectorHandler = () => {
    context.setCategory(props.category);
  };

  return (
    <li
      style={
        context.category === props.category
          ? { fontWeight: "bold", cursor: "pointer" }
          : { cursor: "pointer" }
      }
      onClick={selectorHandler}
    >
      {props.children}
    </li>
  );
};

export default StoriesSelectorLink;
