const Icon = ({ iconname, size, color }) => {
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size, color }}>
      {iconname}
    </span>
  );
};

export default Icon;
