import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={classes.wrapper}>
      <svg
        className={classes.spinner}
        id="loading-spinner"
        viewBox="0 0 50 50"
      >
        <circle
          className={classes.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="7"
        ></circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
