// const projects = document.getElementById("container_projects");
// const project = document.querySelectorAll("#container_projects div");

// let idx = 0;

// let btnRelativeAtTheProject = document.getElementById(`project${idx+1}`);
// btnRelativeAtTheProject.classList.add("projectSelected");
// btnRelativeAtTheProject.classList.remove("projectsUnselected");
// const carousel = () => {
//     btnRelativeAtTheProject.classList.remove("projectSelected");
//     btnRelativeAtTheProject.classList.add("projectsUnselected");
//     clearInterval(interval);
//     interval = setInterval(carousel, 2000);

//     idx++;

//     if (idx > project.length - 1) {
//         idx = 0;
//     }
//     btnRelativeAtTheProject = document.getElementById(`project${idx + 1}`);
//     projects.style.transform = `translateX(${-idx * 277}px)`;
//     btnRelativeAtTheProject.classList.add("projectSelected");
//     btnRelativeAtTheProject.classList.remove("projectsUnselected");
// }

// let interval = setInterval(carousel, 2000);

// const showProject = (projectNumber) => {
//     if (projectNumber > project.length - 1) {
//         projectNumber = 0;
//     }else{
//         idx=projectNumber;
//     } 
//     btnRelativeAtTheProject.classList.remove("projectSelected");
    
//     btnRelativeAtTheProject.classList.add("projectUnselected");
//     btnRelativeAtTheProject = document.getElementById(`project${idx + 1}`);
//     clearInterval(interval);
//     projects.style.transform = `translateX(${-projectNumber * 277}px)`;
//     btnRelativeAtTheProject.classList.add("projectSelected");
//     btnRelativeAtTheProject.classList.remove("projectUnselected");
//     interval = setInterval(carousel, 4000);
// }
