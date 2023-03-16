import './App.css';
import TaskContainer from './components/task/TaskContainer';
import { Provider } from "react-redux";
import store from './redux/store';
import AddTaskForm from './components/AddTaskForm';

function App() {

  return (
    <Provider store={store}>
      <AddTaskForm />
      <TaskContainer />
    </Provider>
  );
}

export default App;

