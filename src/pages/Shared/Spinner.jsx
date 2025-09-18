const Spinner = ({ title = "Loading...", description = "" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <span className="loading loading-spinner text-primary w-12 h-12 mb-4"></span>
      <h2 className="text-xl font-semibold text-primary">{title}</h2>
      {description && (
        <p className="text-sm text-base-content mt-2">{description}</p>
      )}
    </div>
  );
};

export default Spinner;
