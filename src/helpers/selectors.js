export function getAppointmentsForDay(state, day) {
  let arr = [];
  for (const days of state.days){
    if (days.name === day){
      for (const id of days.appointments){
        if(state.appointments[id]){
          let result = state.appointments[id];
          arr.push(result)
        }
      }
    }  
  }
  return arr; 
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  else {
    const interviewer = state.interviewers[interview.interviewer];

    return interview = {
      "student": `${interview.student}`,
      "interviewer": {
        "id": interviewer.id,
        "name": interviewer.name,
        "avatar": interviewer.avatar
      }
    }
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day);
  const interviewerArray = [];

  if (filteredDay.length === 0) {
    return [];
  } else {
    filteredDay[0].interviewers.map(id => interviewerArray.push(id));
  };
}