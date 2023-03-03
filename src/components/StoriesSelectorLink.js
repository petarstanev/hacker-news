import { useContext } from "react";
import StoriesContext from "../store/stories-context";

const StoriesSelectorLink = (props) => {
  const context = useContext(StoriesContext);

  const selectorHandler = () => {
    context.setCategory(props.category);
  };

  return (
    <li
      style={
        context.category === props.category ? { fontWeight: "bold" } : undefined
      }
      onClick={selectorHandler}
    >
      {props.children}

      {props.category === "best" && (
        <select>
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      )}
    </li>
  );
};

export default StoriesSelectorLink;
