import React, { useState } from 'react';
import PropTypes from 'prop-types';

const defaultTask = {
  title: '',
  description: '',
  // completed_at: false,
};

const NewTaskForm = ({ submitCallback }) => {
  const [formData, setFormData] = useState(defaultTask);
  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;
    const newFormData = { ...formData };
    newFormData[stateName] = inputValue;

    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitCallback(formData);
  };

  return (
    <form>
      <label htmlFor="title">Task Title</label>
      <input
        name="title"
        type="text"
        value={formData.title}
        onChange={onFormChange}
      ></input>
      <label htmlFor="description">Task Description</label>
      <input
        name="description"
        type="text"
        value={formData.description}
        onChange={onFormChange}
      ></input>
      <input type="submit" value="Add New Task" onClick={handleSubmit}></input>
    </form>
  );
};

// NewTaskForm.PropTypes = {
//   submitCallback: PropTypes.func,
// };
NewTaskForm.propTypes = { submitCallback: PropTypes.func };

export default NewTaskForm;
