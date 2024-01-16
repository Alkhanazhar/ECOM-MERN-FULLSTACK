import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="h-50 ms-0 mt-5">
        <div className="mb-3  d-flex gap-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
