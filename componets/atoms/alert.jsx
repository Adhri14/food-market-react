import PropTypes from "prop-types";

export default function Alert(props) {
  const { title, className } = props;
  return (
    <div
      className={`alert ${className} alert-dismissible fade show`}
      role="alert"
    >
      {title}
    </div>
  );
}

Alert.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};
