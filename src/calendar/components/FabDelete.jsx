import Swal from "sweetalert2";
import { useCalendarStore } from "../../hooks/useCalendarStore";

const FabDelete = () => {
  const { startDeletingEvent, hasEventActive } = useCalendarStore();
  const handleDelete = () => {
    Swal.fire({
      title: "Do you want to delete this event?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        startDeletingEvent();
      }
    });
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{ display: hasEventActive ? "" : "none" }}
    >
      <i className="fas fa-trash"></i>
    </button>
  );
};

export default FabDelete;
