export default ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="hover:scale-90"
    style={{
      border: "solid white",
      borderWidth: "0px 3px 3px 0px",
      padding: "9px",
      rotate: "135deg",
      position: "absolute",
      top: "60px",
      right: "60px",
      cursor: "pointer",
    }}
  ></div>
);
