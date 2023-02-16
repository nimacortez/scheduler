import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

function formatSpots(spots) {
  if (spots === 0) {
    return `no spots remaining`;
  } else if (spots === 1) {
    return `1 spot remaining`;
  } else {
  return `${spots} spots remaining`;
  }
};

export default function DayListItem(props) {
  
  let dayListClass = classNames("day-list__item", { "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0 });

  return (
    <li className={dayListClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text-regular">{props.name}</h2>
      <h3 className="test--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}