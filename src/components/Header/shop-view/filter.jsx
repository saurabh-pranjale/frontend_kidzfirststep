import { filterOptions } from "../../../config/index";
import { Fragment } from "react";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="h5 mb-0 fw-bold">Filters</h3>
      </div>
      <div className="card-body">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div className="mb-3">
              <h5 className="fw-semibold">{keyItem}</h5>
              <div className="form-check-group mt-2">
                {filterOptions[keyItem].map((option, i) => (
                  <div className="form-check" key={i}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`${keyItem}-${option.id}`}
                      checked={
                        filters &&
                        filters[keyItem] &&
                        filters[keyItem].includes(option.id)
                      }
                      onChange={() => handleFilter(keyItem, option.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${keyItem}-${option.id}`}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {index < Object.keys(filterOptions).length - 1 && <hr />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
