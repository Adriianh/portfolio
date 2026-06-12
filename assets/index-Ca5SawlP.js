(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{id;title;description;programmingLanguages;technologies;repositoryUrl;interfaceType;constructor(e,t,n,r,i,a,o){this.id=e,this.title=t,this.description=n,this.programmingLanguages=r,this.technologies=i,this.repositoryUrl=a,this.interfaceType=o}},t=class{baseUrl;constructor(e){this.baseUrl=e}async getProjects(){let t=await fetch(`${this.baseUrl}data/projects.json`);if(!t.ok)throw Error(`Failed to fetch projects: ${t.statusText}`);return(await t.json()).map(t=>new e(t.id,t.title,t.description,t.programmingLanguages||[],t.technologies||[],t.repositoryUrl,t.interfaceType))}},n=class{isSatisfiedBy(e){return!0}},r=class{language;constructor(e){this.language=e}isSatisfiedBy(e){return e.programmingLanguages.some(e=>e.toLowerCase()===this.language.toLowerCase())}},i=class{interfaceType;constructor(e){this.interfaceType=e}isSatisfiedBy(e){return e.interfaceType===this.interfaceType}},a=class{projectRepository;constructor(e){this.projectRepository=e}async execute(e=new n){return(await this.projectRepository.getProjects()).filter(t=>e.isSatisfiedBy(t))}},o=class{project;constructor(e){this.project=e}render(){let e=this.project.technologies.map(e=>`<span class="badge">${e}</span>`).join(``);return`
            <div class="card">
                <div class="card-header">
                    <h3>${this.project.title}</h3>
                    <span class="interface-tag ${this.project.interfaceType.toLowerCase()}">
                        ${this.project.interfaceType}
                    </span>
                </div>
                <p class="card-description">${this.project.description}</p>
                <div class="card-techs">
                    ${e}
                </div>
                <div class="card-footer">
                    <a href="${this.project.repositoryUrl}" target="_blank" class="btn-repo">
                        Ver Código Fuente 📂
                    </a>
                </div>
            </div>
        `}},s=class{left;right;constructor(e,t){this.left=e,this.right=t}isSatisfiedBy(e){return this.left.isSatisfiedBy(e)&&this.right.isSatisfiedBy(e)}};new class{getProjectsUseCase;container=null;currentPlatformSpec=new n;currentLanguageSpec=new n;constructor(e){this.getProjectsUseCase=e}async init(){if(this.container=document.getElementById(`projects-container`),this.container)try{let e=await this.getProjectsUseCase.execute(new n),t=Array.from(new Set(e.map(e=>e.interfaceType))),r=Array.from(new Set(e.flatMap(e=>e.programmingLanguages)));this.container.innerHTML=`
                <div class="filters-bar">
                    <div class="filter-group">
                        <label for="platform-select">Platform</label>
                        <select id="platform-select" class="filter-dropdown">
                            <option value="All">All Platforms</option>
                            ${t.map(e=>`<option value="${e}">${e}</option>`).join(``)}
                        </select>
                    </div>

                    <div class="filter-group">
                        <label for="language-select">Language</label>
                        <select id="language-select" class="filter-dropdown">
                            <option value="All">All Languages</option>
                            ${r.map(e=>`<option value="${e}">${e}</option>`).join(``)}
                        </select>
                    </div>
                </div>
                <div class="projects-grid" id="projects-grid"></div>
            `,this.setupFilterEvents(),this.renderProjects(e)}catch{this.renderErrorState()}}setupFilterEvents(){let e=document.getElementById(`platform-select`),t=document.getElementById(`language-select`);!e||!t||(e.addEventListener(`change`,()=>{let t=e.value;this.currentPlatformSpec=t===`All`?new n:new i(t),this.applyCombinedFilters()}),t.addEventListener(`change`,()=>{let e=t.value;this.currentLanguageSpec=e===`All`?new n:new r(e),this.applyCombinedFilters()}))}async applyCombinedFilters(){let e=document.getElementById(`projects-grid`);if(e){e.innerHTML=`<p class="loading-text">Applying structural criteria...</p>`;try{let e=new s(this.currentPlatformSpec,this.currentLanguageSpec),t=await this.getProjectsUseCase.execute(e);this.renderProjects(t)}catch{this.renderErrorState()}}}renderProjects(e){let t=document.getElementById(`projects-grid`);if(t){if(e.length===0){t.innerHTML=`<p class="empty-text">No projects match the selected criteria.</p>`;return}t.innerHTML=e.map(e=>new o(e).render()).join(``)}}renderErrorState(){let e=document.getElementById(`projects-grid`);e&&(e.innerHTML=`<p class="error-text">⚠️ Architectural evaluation failed.</p>`)}}(new a(new t(`/portfolio/`))).init();