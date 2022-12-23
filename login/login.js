function Login() {
    event.preventDefault();
    //lay du lieu
    //lay username, password
    let userName = $("#username").val();
    let password = $("#password").val();
    //tao object
    let user ={
        "userName": userName,
        "password": password
    }

    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role",data.roles[0].authority);
            localStorage.setItem("id",data.id);

            if (data.roles[0].authority == "ROLE_PO"){
                location.href = "caseStudy4-application-lover-rental-FE/ProviderFullList.html"
            }else if(data.roles[0].authority == "ROLE_ADMIN"){
                location.href = "caseStudy4-application-lover-rental-FE/ProviderFullList.html"
            }else if(data.roles[0].authority == "ROLE_PROVIDER"){
                location.href = "caseStudy4-application-lover-rental-FE/ProviderFullList.html"
            }else if(data.roles[0].authority == "ROLE_USER"){
                location.href = "caseStudy4-application-lover-rental-FE/ProviderFullList.html"
            }else {
                alert("lon")
                location.href = "caseStudy4-application-lover-rental-FE/user.html"
            }
            console.log(data)
        },
        error: function (err) {
            event.preventDefault();
            let mess = `<div class="alert alert-danger alert-dismissible fade show">
              <strong>Lỗi đăng nhập!</strong>Sai tài khoản hoặc mật khẩu.
              <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>`;
            document.getElementById("err-login").innerHTML = mess;
            console.log(err)
        }
    })

}