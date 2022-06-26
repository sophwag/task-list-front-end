import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const APIURL = 'https://task-list-api-c17.herokuapp.com/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    axios
      .get(`${APIURL}`)
      .then((res) => {
        const newTasks = res.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            isComplete: task.is_complete,
            description: task.description,
          };
        });
        setTasks(newTasks);
        console.log(res.data);
      })
      .catch((err) => {
        console.log('its broken');
        console.log(err.response.data);
      });
  };

  useEffect(getTasks, []);

  // const toggleComplete = (id) => {
  //   const newTasks = [];
  //   for (const task of tasks) {
  //     if (task.id === id) {
  //       task.isComplete = !task.isComplete;
  //     }
  //     newTasks.push(task);
  //   }
  //   setTasks(newTasks);
  // };

  const toggleComplete = (id, markTo) => {
    const markURL = markTo
      ? `${APIURL}/${id}/mark_complete`
      : `${APIURL}/${id}/mark_incomplete`;
    axios
      .patch(markURL)
      .then(() => {
        const newTasks = tasks.map((task) => {
          return task.id === id
            ? { id: task.id, title: task.title, isComplete: !task.isComplete }
            : task;
        });
        setTasks(newTasks);
        console.log('updated task completion');
      })
      .catch(() => {
        console.log('problem with patch');
      });
  };

  // const deleteTask = (id) => {
  //   const newTasks = [];
  //   for (const task of tasks) {
  //     if (task.id !== id) {
  //       newTasks.push(task);
  //     }
  //   }
  //   setTasks(newTasks);
  // };

  const deleteTask = (id) => {
    axios
      .delete(`${APIURL}/${id}`)
      .then(() => {
        const newTasks = tasks.filter((task) => {
          return task.id !== id;
        });
        setTasks(newTasks);
        console.log(`deleted that sucker ${id}`);
      })
      .catch(() => {
        console.log('It shouldnt be that hard to delete stuff???');
      });
  };

  const addTask = (taskData) => {
    axios
      .post(`${APIURL}`, taskData)
      .then(() => {
        console.log('task posted');
        getTasks();
      })
      .catch(() => console.log('post error'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              completeCallback={toggleComplete}
              deleteCallback={deleteTask}
            />
          }
        </div>
        <NewTaskForm submitCallback={addTask} />
      </main>
    </div>
  );
};

export default App;
