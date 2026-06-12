import { ProjectRepositoryImpl } from "./data/repositories/ProjectRepositoryImpl";
import { GetProjects } from "./domain/use-cases/GetProjects";
import { HomeView } from "./presentation/views/HomeView";
import "./style.css";

const baseUrl = import.meta.env.BASE_URL;

const projectRepository = new ProjectRepositoryImpl(baseUrl);
const getProjectsUseCase = new GetProjects(projectRepository);

const homeView = new HomeView(getProjectsUseCase);
homeView.init();
