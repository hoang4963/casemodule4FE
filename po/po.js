let tk = localStorage.getItem("token");
let rl = localStorage.getItem("role");
if (tk == null){
    window.location.href = "caseStudy4-application-lover-rental-FE/login.html"
}
else if (rl == "ROLE_ADMIN"){
    window.location.href = "AccessDenied.html"
}
else if (rl == "ROLE_PROVIDER"){
    window.location.href = "AccessDenied.html"
}
else if (rl == "ROLE_USER"){
    window.location.href = "AccessDenied.html"
}
