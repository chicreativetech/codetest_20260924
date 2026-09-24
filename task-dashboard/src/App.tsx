import { TaskFiltersProvider } from './context/taskFilters/TaskFiltersProvider';
import { Dashboard } from './pages/Dashboard/Dashboard';

function App() {
  return (
    <TaskFiltersProvider>
      <Dashboard />
    </TaskFiltersProvider>
  );
}

export default App;
