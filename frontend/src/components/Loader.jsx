import "./loader.css";

export function Loader() {
  return (
    <div className="lds-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
