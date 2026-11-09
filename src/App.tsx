import { Portfolio } from './components/Portfolio';
import { ProjectPage } from './components/ProjectPage';
import { projectSlugFromPath } from './utils/projects';

function App() {
    const slug = projectSlugFromPath(window.location.pathname);
    return slug ? <ProjectPage slug={slug} /> : <Portfolio />;
}

export default App;
