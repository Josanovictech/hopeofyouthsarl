// LANGUAGE SWITCH
function setLanguage(lang) {
    document.querySelectorAll("[data-en]").forEach(el => {
        el.textContent = el.getAttribute("data-" + lang);
    });
    localStorage.setItem("lang", lang);
}

// AUTO LANGUAGE
document.addEventListener("DOMContentLoaded", () => {
    let savedLang = localStorage.getItem("lang");

    if (!savedLang) {
        let browserLang = navigator.language.startsWith("fr") ? "fr" : "en";
        setLanguage(browserLang);
    } else {
        setLanguage(savedLang);
    }

    // DARK MODE LOAD
    if(localStorage.getItem("dark") === "on"){
        document.body.classList.add("dark");
    }
});

// DARK MODE TOGGLE
function toggleDark(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("dark","on");
    }else{
        localStorage.setItem("dark","off");
    }
}
