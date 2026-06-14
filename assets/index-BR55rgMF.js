(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{id;title;description;programmingLanguages;technologies;repositoryUrl;interfaceType;constructor(e,t,n,r,i,a,o){this.id=e,this.title=t,this.description=n,this.programmingLanguages=r,this.technologies=i,this.repositoryUrl=a,this.interfaceType=o}},t=class{baseUrl;constructor(e){this.baseUrl=e}async getProjects(){let t=await fetch(`${this.baseUrl}data/projects.json`);if(!t.ok)throw Error(`Failed to fetch projects: ${t.statusText}`);return(await t.json()).map(t=>new e(t.id,t.title,t.description,t.programmingLanguages||[],t.technologies||[],t.repositoryUrl,t.interfaceType))}},n=class{isSatisfiedBy(e){return!0}},r=class{language;constructor(e){this.language=e}isSatisfiedBy(e){return e.programmingLanguages.some(e=>e.toLowerCase()===this.language.toLowerCase())}},i=class{interfaceType;constructor(e){this.interfaceType=e}isSatisfiedBy(e){return e.interfaceType===this.interfaceType}},a=class{query;constructor(e){this.query=e}isSatisfiedBy(e){if(!this.query||this.query.trim()==``)return!0;let t=this.query.toLowerCase().trim();return e.title.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)}},o=class{projectRepository;constructor(e){this.projectRepository=e}async execute(e=new n){return(await this.projectRepository.getProjects()).filter(t=>e.isSatisfiedBy(t))}},s=class{project;constructor(e){this.project=e}render(){let e=this.project.technologies.map(e=>`<span class="badge">${e}</span>`).join(``);return`
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
        `}},c=class{left;right;constructor(e,t){this.left=e,this.right=t}isSatisfiedBy(e){return this.left.isSatisfiedBy(e)&&this.right.isSatisfiedBy(e)}};new class{getProjectsUseCase;container=null;currentPlatformSpec=new n;currentLanguageSpec=new n;currentSearchSpec=new n;allProjects=[];cardEntries=[];constructor(e){this.getProjectsUseCase=e}async init(){if(this.container=document.getElementById(`projects-container`),this.container)try{this.allProjects=await this.getProjectsUseCase.execute(new n);let e=Array.from(new Set(this.allProjects.map(e=>e.interfaceType))),t=Array.from(new Set(this.allProjects.flatMap(e=>e.programmingLanguages)));this.container.innerHTML=`
                <div class="filters-bar">
                    <div class="filter-group search-group">
                        <input 
                            type="text" 
                            id="search-input" 
                            placeholder="Buscar proyecto por título o descripción..." 
                            class="form-input"
                        />
                    </div>

                    <div class="filter-group">
                        <label for="platform-select">Platform</label>
                        <select id="platform-select" class="filter-dropdown">
                            <option value="All">All Platforms</option>
                            ${e.map(e=>`<option value="${e}">${e}</option>`).join(``)}
                        </select>
                    </div>

                    <div class="filter-group">
                        <label for="language-select">Language</label>
                        <select id="language-select" class="filter-dropdown">
                            <option value="All">All Languages</option>
                            ${t.map(e=>`<option value="${e}">${e}</option>`).join(``)}
                        </select>
                    </div>
                </div>
                <div class="projects-grid" id="projects-grid"></div>
            `;let r=document.getElementById(`projects-grid`);this.cardEntries=this.allProjects.map(e=>{let t=new s(e).render(),n=document.createElement(`div`);n.innerHTML=t.trim();let i=n.firstElementChild;return r?.appendChild(i),{project:e,element:i}}),this.setupFilterEvents()}catch{this.renderErrorState()}}setupFilterEvents(){let e=document.getElementById(`search-input`),t=document.getElementById(`platform-select`),o=document.getElementById(`language-select`);e?.addEventListener(`input`,async e=>{let t=e.target.value;this.currentSearchSpec=new a(t),await this.applyCombinedFilters()}),t?.addEventListener(`change`,async e=>{let t=e.target.value;this.currentPlatformSpec=t===`All`?new n:new i(t),await this.applyCombinedFilters()}),o?.addEventListener(`change`,async e=>{let t=e.target.value;this.currentLanguageSpec=t===`All`?new n:new r(t),await this.applyCombinedFilters()})}async applyCombinedFilters(){let e=document.getElementById(`projects-grid`);if(!e)return;let t=0;try{let n=new c(this.currentSearchSpec,new c(this.currentPlatformSpec,this.currentLanguageSpec));this.cardEntries.forEach(({project:e,element:r})=>{n.isSatisfiedBy(e)?(r.classList.remove(`hidden`),t++):r.classList.add(`hidden`)}),this.manageEmptyState(t,e)}catch{this.renderErrorState()}}manageEmptyState(e,t){let n=document.getElementById(`empty-state`);if(e===0){if(!n){let e=document.createElement(`div`);e.id=`empty-state`,e.className=`empty-state-container`,e.innerHTML=`
                <span class="empty-state-icon">🔍</span>
                <h3>No se encontraron proyectos</h3>
                <p>Prueba cambiando el término de búsqueda o relajando los selectores de plataforma y lenguaje.</p>
                `,t.appendChild(e)}}else n?.remove()}renderErrorState(){let e=document.getElementById(`projects-grid`);e&&(e.innerHTML=`<p class="error-text">⚠️ Architectural evaluation failed.</p>`)}}(new o(new t(`/portfolio/`))).init();