var opennav = true;
var sidebar;
// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function () { scrollFunction(); };

function blinds(id) {
    if (document.getElementById(("dropdown-" + id)).style.display === "none") {
        document.getElementById(("dropdown-" + id)).style.display = "inherit";
        document.getElementById(("arrow-" + id)).style.transform = "rotate(180deg)";

    }
    else {
        document.getElementById(("dropdown-" + id)).style.display = "none";
        document.getElementById(("arrow-" + id)).style.transform = "rotate(0deg)";
    }
}


function changeSidebar(override,input) {
    if ($(window).width() > 768) {
        // do something for big screens
        if (!document.getElementById("sm-slide")) {
            document.getElementById("sidenav").id = "sm-slide";
            document.getElementById("md-slide").id = "sidenav";
        }
    }
    else {
        // do something for small screens
        if (!document.getElementById("md-slide")) {
            document.getElementById("sidenav").id = "md-slide";
            document.getElementById("sm-slide").id = "sidenav";
        }
    }

    sidebar = document.getElementById("sidenav");

    if (sidebar.style.transform === "initial" || (override && input === "left")) {
        opennav = false;
        var fullstring= String("transition:0.2s;transform:translate(-"+String(document.getElementsByClassName('sidebar')[0].offsetWidth)+"px);");
        //if ($(window).width() < 768) {
        //    // do something for small screens
        //    sidebar.transform = "translate(-100vw)";
        //}
        //else if ($(window).width() >= 768 && $(window).width() <= 992) {
        //    // do something for medium screens
        //    sidebar.setAttribute("style",fullstring);
        //}
        //else if ($(window).width() > 992) {
        //    // do something for big screens
        //    sidebar.setAttribute("style", fullstring);
        //}
        sidebar.setAttribute("style", fullstring);

        if ($(window).width() > 768) {
            fullstring = String("width:100vw;transition:0.2s;transform:translate(" + String(document.getElementsByClassName('sidebar')[0].offsetWidth) + "px);");

            document.getElementsByClassName('main')[0].setAttribute("class", "col-12 main");

            document.getElementsByClassName('main')[0].setAttribute("style", fullstring);

            document.getElementById("toolt-arrow").setAttribute("style", "transform:rotate(-90deg)");
        }

    }
    else {
        if (!override || (override && input === "right")) {
            opennav = true;
            document.getElementsByClassName('main')[0].setAttribute("style", "");
            document.getElementsByClassName('main')[0].setAttribute("class", "offset-lg-3 col-lg-9 offset-md-4 col-md-8 col-sm-12 main");
            sidebar.setAttribute("style", "transition:0.2s;transform:initial");
            document.getElementById("toolt-arrow").setAttribute("style", "");
        }
    }
}

function scrollFunction() {

    if (document.body.offsetWidth < 768 && opennav) {
        window.scrollTo(0,0);
    }

    //if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //    document.getElementById("opener").style.height = "20vh";
    //    document.getElementById("opener").style.paddingTop = "3.8rem";
    //    document.getElementById("info").style.opacity = "0";
    //    document.getElementById("info").style.display = "none";
    //    document.getElementById("info").classList.remove('col-md-6');
    //    document.getElementById("notifier").classList.remove('col-md-6');
    //    document.getElementById("notifier").classList.add('col-md-12');
    //    document.getElementById("pageTxt").innerText = "Events";
    //    document.getElementById("previous").style.opacity = "0.7";
    //    document.getElementById("next").style.opacity = "0.7";
    //    document.getElementById("previous").style.display = "";
    //    document.getElementById("next").style.display = "";
    //} else {
    //    document.getElementById("opener").style.height = "50vh";
    //    document.getElementById("opener").style.paddingTop = "0";
    //    document.getElementById("info").style.opacity = "1";
    //    document.getElementById("info").style.display = "";
    //    document.getElementById("info").classList.add('col-md-6');
    //    document.getElementById("notifier").classList.remove('col-md-12');
    //    document.getElementById("notifier").classList.add('col-md-6');
    //    document.getElementById("previous").style.opacity = "0";
    //    document.getElementById("next").style.opacity = "0";
    //    document.getElementById("previous").style.display = "none";
    //    document.getElementById("next").style.display = "none";
    //}
    //if (document.body.scrollTop > 175 || document.documentElement.scrollTop > 175) {
    //    document.getElementById("nav").classList.add('navbar-short');
    //    document.getElementById("nav").classList.remove('transparent');
    //} else {
    //    document.getElementById("nav").classList.remove('navbar-short');
    //    document.getElementById("nav").classList.add('transparent');
    //}
}