import { ProjectRepositoryImpl } from "./data/repositories/ProjectRepositoryImpl";
import { GetProjects } from "./domain/use-cases/GetProjects";
import { HomeView } from "./presentation/views/HomeView";
import "./style.css";

const projectRepository = new ProjectRepositoryImpl();

const getProjectsUseCase = new GetProjects(projectRepository);

const homeView = new HomeView(getProjectsUseCase);

document.addEventListener("DOMContentLoaded", () => {
    homeView.init();
});
