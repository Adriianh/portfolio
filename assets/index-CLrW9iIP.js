(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{id;title;description;technologies;repositoryUrl;interfaceType;constructor(e,t,n,r,i,a){this.id=e,this.title=t,this.description=n,this.technologies=r,this.repositoryUrl=i,this.interfaceType=a}},t=class{async getProjects(){let t=await fetch(`/data/projects.json`);if(!t.ok)throw Error(`Failed to fetch projects: ${t.statusText}`);return(await t.json()).map(t=>new e(t.id,t.title,t.description,t.technologies,t.repositoryUrl,t.interfaceType))}},n=class{projectRepository;constructor(e){this.projectRepository=e}async execute(){return(await this.projectRepository.getProjects()).sort((e,t)=>e.title.localeCompare(t.title))}},r=class{project;constructor(e){this.project=e}render(){let e=this.project.technologies.map(e=>`<span class="badge">${e}</span>`).join(``);return`
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
        `}},i=new class{getProjectsUseCase;constructor(e){this.getProjectsUseCase=e}async init(){let e=document.getElementById(`projects-container`);if(e)try{e.innerHTML=(await this.getProjectsUseCase.execute()).map(e=>new r(e).render()).join(``)}catch(t){e.innerHTML=`
                <div class="error-container">
                    <p class="error-title">❌ Error de Arquitectura al cargar los proyectos:</p>
                    <p class="error-message">${t.message}</p>
                </div>
            `}}}(new n(new t));document.addEventListener(`DOMContentLoaded`,()=>{i.init()});