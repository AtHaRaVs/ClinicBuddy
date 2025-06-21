// components/ui/FormField.jsx
export const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  formik,
  disabled = false,
  options = null, // for select fields
}) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {type === "select" ? (
        <select
          id={name}
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          disabled={disabled}
          className={hasError ? "error" : ""}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          disabled={disabled}
          rows={3}
        />
      ) : type === "checkbox" ? (
        <input
          type="checkbox"
          id={name}
          name={name}
          onChange={formik.handleChange}
          checked={formik.values[name]}
          disabled={disabled}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          disabled={disabled}
          className={hasError ? "error" : ""}
        />
      )}
      {hasError && <div className="error-message">{formik.errors[name]}</div>}
    </div>
  );
};
