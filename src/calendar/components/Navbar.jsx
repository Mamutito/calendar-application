const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i> Calendar
      </span>
      <button className="btn btn-outline-danger"> Logout </button>
    </div>
  );
};

export default Navbar;
