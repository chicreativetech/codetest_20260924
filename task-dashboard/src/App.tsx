import { Dashboard } from './pages/Dashboard/Dashboard';
import { SAMPLE_TASKS } from './data/sampleTasks';

function App() {
  return <Dashboard tasks={SAMPLE_TASKS} />;
}

export default App;
