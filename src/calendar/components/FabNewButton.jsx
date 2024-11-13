const FabNewButton = ({ onAddEvent }) => {
  return (
    <button className="btn btn-primary fab" onClick={onAddEvent}>
      <i className="fas fa-plus"></i>
    </button>
  );
};

export default FabNewButton;
