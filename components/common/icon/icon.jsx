const Icon = ({ style = "outlined", iconname, size, color }) => {
  return (
    <span className={`material-symbols-${style}`} style={{ fontSize: size, color: color }}>
      {iconname}
    </span>
  );
};

export default Icon;
