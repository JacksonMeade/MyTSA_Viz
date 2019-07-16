document.getElementById("pageTxt").innerText = "▼";
var sidebar;
// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function () { scrollFunction(); };

function changeSidebar() {
    if (sidebar === null) {
        sidebar = document.getElementById("sidenav").style;
    }
    if (sidebar.transform === "initial") {
        sidebar.transform = "translate(-100vw)";
    }
    else {
        sidebar.transform = "initial";
    }
}

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("opener").style.height = "20vh";
        document.getElementById("opener").style.paddingTop = "3.8rem";
        document.getElementById("info").style.opacity = "0";
        document.getElementById("info").style.display = "none";
        document.getElementById("info").classList.remove('col-md-6');
        document.getElementById("notifier").classList.remove('col-md-6');
        document.getElementById("notifier").classList.add('col-md-12');
        document.getElementById("pageTxt").innerText = "Events";
        document.getElementById("previous").style.opacity = "0.7";
        document.getElementById("next").style.opacity = "0.7";
        document.getElementById("previous").style.display = "";
        document.getElementById("next").style.display = "";
    } else {
        document.getElementById("opener").style.height = "50vh";
        document.getElementById("opener").style.paddingTop = "0";
        document.getElementById("info").style.opacity = "1";
        document.getElementById("info").style.display = "";
        document.getElementById("info").classList.add('col-md-6');
        document.getElementById("notifier").classList.remove('col-md-12');
        document.getElementById("notifier").classList.add('col-md-6');
        document.getElementById("previous").style.opacity = "0";
        document.getElementById("next").style.opacity = "0";
        document.getElementById("previous").style.display = "none";
        document.getElementById("next").style.display = "none";
    }
    if (document.body.scrollTop > 175 || document.documentElement.scrollTop > 175) {
        document.getElementById("nav").classList.add('navbar-short');
        document.getElementById("nav").classList.remove('transparent');
    } else {
        document.getElementById("nav").classList.remove('navbar-short');
        document.getElementById("nav").classList.add('transparent');
    }
}