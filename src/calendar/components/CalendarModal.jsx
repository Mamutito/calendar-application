import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInSeconds } from "date-fns";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCalendarStore } from "../../hooks/useCalendarStore";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const CalendarModal = ({ onClose, modalIsOpen }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: null,
  });

  const { activeEvent: event, startSavingEvent } = useCalendarStore();

  useEffect(() => {
    if (event) {
      setFormValues({
        _id: event._id,
        title: event.title,
        notes: event.notes,
        start: event.start,
        end: event.end,
        user: {
          _id: "123",
          name: "Aitor",
        },
      });
    } else {
      setFormValues({
        title: "",
        notes: "",
        start: new Date(),
        end: null,
        user: {
          _id: "123",
          name: "Aitor",
        },
      });
    }
  }, [event]);
  const onInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onDateChange = (date, field) => {
    setFormValues({ ...formValues, [field]: date });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formValues.title.trim().length <= 0) {
      return;
    }
    if (
      isNaN(formValues.start.getTime()) ||
      isNaN(formValues.end.getTime()) ||
      differenceInSeconds(formValues.end, formValues.start) <= 0
    ) {
      Swal.fire(
        "Invalid date",
        "The end date cannot be empty or before the start date",
        "error"
      );
      return;
    }
    console.log(formValues);
    await startSavingEvent(formValues);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1> New Event </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Start Date and Time</label>
            <DatePicker
              dateFormat={"Pp"}
              className="form-control"
              selected={formValues.start}
              onChange={(e) => onDateChange(e, "start")}
              showTimeSelect
            />
          </div>

          <div className="form-group mb-2">
            <label>End Date and Time</label>
            <DatePicker
              minDate={formValues.start}
              className="form-control"
              selected={formValues.end}
              onChange={(e) => onDateChange(e, "end")}
              dateFormat={"Pp"}
              showTimeSelect
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Title and Notes</label>
            <input
              type="text"
              className="form-control"
              placeholder="Event Title"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChange}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              A short description
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notes"
              rows="5"
              name="notes"
              value={formValues.notes}
              onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Additional information
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Save</span>
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CalendarModal;
