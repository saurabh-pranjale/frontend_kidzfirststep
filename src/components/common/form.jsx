function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="form-control"
          />
        );
      case "select":
        return (
          <select
            name={getControlItem.name}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="form-select"
          >
            <option value="" disabled>
              {getControlItem.label}
            </option>
            {getControlItem.options?.map((optionItem) => (
              <option key={optionItem.id} value={optionItem.id}>
                {optionItem.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="form-control"
            rows={3}
          />
        );
      default:
        return (
          <input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="form-control"
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {formControls.map((controlItem) => (
        <div className="mb-3" key={controlItem.name}>
          <label htmlFor={controlItem.name} className="form-label">
            {controlItem.label}
          </label>
          {renderInputsByComponentType(controlItem)}
        </div>
      ))}

      <button
        disabled={isBtnDisabled}
        type="submit"
        className="btn btn-warning w-100 mt-2"
      >
        {buttonText || "Submit"}
      </button>
    </form>
  );
}

export default CommonForm;
