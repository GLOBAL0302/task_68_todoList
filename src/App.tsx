import './App';
import { Container, Grid2 } from '@mui/material';
import Tasks from './components/Tasks/Tasks.tsx';
import CreateTask from './components/CreateTask/CreateTask.tsx';

const App = () => (
  <Container maxWidth="lg">
    <Grid2 marginTop={5} container justifyContent="space-around">
      <Grid2>
        <Tasks />
      </Grid2>
      <Grid2>
        <CreateTask />
      </Grid2>
    </Grid2>
  </Container>
);

export default App;
