import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, completeCallback, deleteCallback }) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  const completeMe = () => {
    const markTo = !isComplete;
    completeCallback(id, markTo);
  };
  const deleteMe = () => {
    deleteCallback(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={completeMe}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={deleteMe}>
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  completeCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
};

export default Task;
