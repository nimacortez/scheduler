import React from 'react';
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }


  function confirm() {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT);
  }

  function deleteAppointment(){
    transition(DELETE); 
    props.cancelInterview(props.id)
      .then(() => { 
        transition(EMPTY)
      })
      .catch(error => 
        transition(ERROR_DELETE, true)
      )
  }

return (
  <article className="appointment" data-testid="appointment">
  <Header time = {props.time} />
  {mode === EMPTY && 
  <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
  <Show
    student={props.interview?.student}
    interviewer={props.interview?.interviewer}
    onDelete={confirm}
    onEdit={edit}
  />
  )}    
  {mode === CREATE && 
  <Form 
    student = {props.interview?.student}
    interviewer = {props.interview?.interviewer}
    interviewers = {props.interviewers}
    onCancel = {back}
    onSave = {save}
    />
  } 
  {mode === SAVING && 
  <Status 
    message = "Saving"
  />}
  {mode === DELETE &&
  <Status 
    message = "Deleting"
  />}
  {mode === CONFIRM &&
  <Confirm 
    message = "Are you sure you would like to delete?"
    onCancel = {back}
    onConfirm = {deleteAppointment}
  />
  }
  {mode === EDIT &&
  <Form 
    student = {props.interview?.student}
    interviewer = {props.interview?.interviewer.id}
    interviewers = {props.interviewers}
    onCancel = {back}
    onSave = {save}
  />
  }
  {mode === ERROR_SAVE && (
  <Error 
    message = "Could not save appointment"
    onClose = {back}
    /> 
  )}
  {mode === ERROR_DELETE && (
  <Error 
    message = "Could not delete appointment"
    onClose = {()=> transition(SHOW)}
  />)}      

</article>
)
};