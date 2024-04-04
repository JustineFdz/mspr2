import "./navbar.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className=""></div>
      <img src="logo.png" alt="" className="logo" />
      <span>Nester</span>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notifications">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img src="" alt="" />
          <span>John</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
}
