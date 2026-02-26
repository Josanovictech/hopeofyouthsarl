// DARK MODE
document.getElementById("darkToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < window.innerHeight - 100){
            el.classList.add("active");
        }
    });
});

// SMOOTH SCROLL
document.querySelectorAll("a[href^='#']").forEach(link=>{
    link.onclick=e=>{
        e.preventDefault();
        document.querySelector(link.getAttribute("href"))
        .scrollIntoView({behavior:"smooth"});
    }
});
