import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"

export default function InterviewListItem(props) {

  function formatSelected(props) {
    if(props.selected) {
      return props.name;
    } else {
      return ''
    }
  }

  const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected})

return (
<li className={interviewerClass} onClick={props.setInterviewer}> 
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {formatSelected(props)}
</li>

);
}