let tk = localStorage.getItem("token");
let rl = localStorage.getItem("role");
console.log(tk, rl)
if (tk == null){
    window.location.href = "caseStudy4-application-lover-rental-FE/login.html"
}

function test() {
    let id = document.getElementById("id").value;
    let formData = new FormData();
    formData.append("image", document.getElementById("file"))
    $.ajax({
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
        },
        type: "POST",
        url: "http://localhost:8080/provider/save" + id,
        data: formData,
        contentType: false,
        processData: false,
        success: function (reponse) {
            if (reponse != 0) {
                alert("done");
            }
        }
    })
}
function getAllProvider(){

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/provider/lists",
        success: function (data){
            showAllProvider(data)
        }
    })
    event.preventDefault();
}
function showAllProvider(lists){
    let res = "<tr>\n" +
        "    <td>STT</td>\n" +
        "    <td>Name</td>\n" +
        "    <td>Delete</td>\n" +
        "    <td>Edit</td>\n" +
        // "    <td>Avatar</td>\n" +
        "</tr>\n";
    for (let i = 0; i < lists.length; i++) {
        let provider = lists[i];
        res += "<tr>\n" +
            "    <td>" + (i +1)       +   "</td>\n" +
            "    <td>" + provider.name  + "</td>\n" +
            // "    <td><img src='http://localhost:8080/avatar/get/avatar/"+ provider.avatar.name +"' style='height: 100,;width: 100'></td>\n" +
            `<td><a class="deleteProvider" onclick='deleteProviderById($(this))' href="${provider.id}">Delete</a></td>\n` +
            `<td><button class="EditProvider" onclick='showFormEdit(${provider.id})'>Edit</button></td>\n` +
            `</tr>` ;
    }
    document.getElementById("display").innerHTML = `<table>` + res + `</table>`;
}
function deleteProviderById(a){
    let providerId = a.attr("href");
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/provider/${providerId}`,
        success: function (data) {
            a.parent().parent().remove();
            location.reload();
            getAllProvider();
        },
        error: function (){
            alert("dang co order");
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function checkboxService(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serProvider/lists",
        success: function (data){
            document.getElementById("checkbox").innerHTML = createCheckboxService(data);
        }
    })
}
function serviceLength(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serProvider/lists",
        success: function (data){
            return data.length;
        }
    })
}
function createListServiceByCheckbox(){
    let array = new Array();
    for (let i = 1; i <= serviceLength(); i++) {
        let id = "service" + i;
        document.getElementById(id).onclick = function (){
            if (this.checked){
                array.push(document.getElementById(id).value);
            }
        }
    }
    return array;
}
function createCheckboxService(data){
    let checkbox = "";
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        checkbox += "<input type=\"checkbox\" id=\"service" + (i+1) +"\"" + "value=\"" + data[i].id + "\">"+name;
    }
    return checkbox;
}
function showFormAddProvider(userid){

    let form = "<input type=\"text\" id=\"name\" placeholder=\"Ho va ten\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"age\" placeholder=\"tuoi\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"city\" placeholder=\"thanh pho dang sinh song\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"gender\" placeholder=\"gioi tinh\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"nationality\" placeholder=\"quoc tich\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"hobby\" placeholder=\"so thich\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"height\" placeholder=\"chieu cao\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"weight\" placeholder=\"can nang\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"description\" placeholder=\"mo ta them\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"facebook\" placeholder=\"link facebook\">\n" +
        "<br>" +
        "<input type=\"number\" id=\"price\"placeholder=\"gia thue theo gio\">\n" +
        "<br>" +
        "<p>Chon dich vu:</p>" +
        "<div id=\"checkbox\"></div>" +
        "<br>" +
        "<button onclick=\"saveProvider()\">Save</button>" +
        "<br>" +
        "<input type=\"hidden\" id=\"userId\" value=\"" + userid + "\">\n"
    checkboxService();

    document.getElementById("display").innerHTML = form;
}

function saveProvider(){
    let array = createListServiceByCheckbox();
    let userId = document.getElementById("userId").value;
    let hobby = document.getElementById("hobby").value;
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;
    let gender = document.getElementById("gender").value;
    let nationality = document.getElementById("nationality").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let description = document.getElementById("description").value;
    let facebook = document.getElementById("facebook").value;
    let price = document.getElementById("price").value;
    let nal = {
        hobby: hobby,
        name: name,
        age: age,
        city: city,
        gender: gender,
        nationality: nationality,
        height: height,
        weight: weight,
        description: description,
        facebook: facebook,
        price: price,
        status: "active",
        hasBeenHired: 0,
        view: 0,
        userId: userId,
        servicesId: array
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8080/provider/save",
        data: JSON.stringify(nal),
        success: function (){
            alert("done");
        },
        error: function (err){
            console.log(err)
        }
    })
}
function showFormEdit(providerId){
    let form = "<input type=\"text\" id=\"name\" placeholder=\"Ho va ten\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"age\" placeholder=\"tuoi\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"city\" placeholder=\"thanh pho dang sinh song\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"gender\" placeholder=\"gioi tinh\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"nationality\" placeholder=\"quoc tich\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"hobby\" placeholder=\"so thich\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"height\" placeholder=\"chieu cao\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"weight\" placeholder=\"can nang\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"description\" placeholder=\"mo ta them\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"facebook\" placeholder=\"link facebook\">\n" +
        "<br>" +
        "<input type=\"number\" id=\"price\"placeholder=\"gia thue theo gio\">\n" +
        "<br>" +
        "<p>Chon dich vu:</p>" +
        "<div id=\"checkbox\"></div>" +
        "<br>" +
        "<button onclick=\"editProvider()\">Save</button>" +
        "<br>" +
        "<input type=\"hidden\" id=\"providerId\" value=\"" + providerId + "\">\n"
         checkboxService();

    document.getElementById("display").innerHTML = form;
}
function editProvider(){
    let id = document.getElementById("providerId").value;
    let array = createListServiceByCheckbox();
    let hobby = document.getElementById("hobby").value;
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;
    let gender = document.getElementById("gender").value;
    let nationality = document.getElementById("nationality").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let description = document.getElementById("description").value;
    let facebook = document.getElementById("facebook").value;
    let price = document.getElementById("price").value;
    let nal = {
        hobby: hobby,
        name: name,
        age: age,
        city: city,
        gender: gender,
        nationality: nationality,
        height: height,
        weight: weight,
        description: description,
        facebook: facebook,
        price: price,
        status: "active",
        hasBeenHired: 0,
        view: 0,
        servicesId: array
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "PUT",
        url: "http://localhost:8080/provider/" +id,
        data: JSON.stringify(nal),
        success: function (){
            alert("done");
        },
        error: function (err){
            console.log(err)
        }
    })
}

function checkboxService(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serProvider/lists",
        success: function (data){
            document.getElementById("checkbox").innerHTML = createCheckboxService(data);
        }
    })
}
function serviceLength(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serProvider/lists",
        success: function (data){
            return data.length;
        }
    })
}
function createListServiceByCheckbox(){
    let array = new Array();
    for (let i = 1; i <= serviceLength(); i++) {
        let id = "service" + i;
        document.getElementById(id).onclick = function (){
            if (this.checked){
                array.push(document.getElementById(id).value);
            }
        }
    }
    return array;
}
function createCheckboxService(data){
    let checkbox = "";
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        checkbox += "<input type=\"checkbox\" id=\"service" + (i+1) +"\"" + "value=\"" + data[i].id + "\">"+name;
    }
    return checkbox;
}
function showFormAddProvider(userid){

    let form = "<input type=\"text\" id=\"name\" placeholder=\"Ho va ten\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"age\" placeholder=\"tuoi\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"city\" placeholder=\"thanh pho dang sinh song\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"gender\" placeholder=\"gioi tinh\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"nationality\" placeholder=\"quoc tich\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"hobby\" placeholder=\"so thich\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"height\" placeholder=\"chieu cao\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"weight\" placeholder=\"can nang\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"description\" placeholder=\"mo ta them\">\n" +
        "<br>" +
        "<input type=\"text\" id=\"facebook\" placeholder=\"link facebook\">\n" +
        "<br>" +
        "<input type=\"number\" id=\"price\"placeholder=\"gia thue theo gio\">\n" +
        "<br>" +
        "<p>Chon dich vu:</p>" +
        "<div id=\"checkbox\"></div>" +
        "<br>" +
        "<button onclick=\"saveProvider()\">Save</button>" +
        "<br>" +
        "<input type=\"hidden\" id=\"userId\" value=\"" + userid + "\">\n"
    checkboxService();

    document.getElementById("display").innerHTML = form;
}

function saveProvider(){
    let array = createListServiceByCheckbox();
    let userId = document.getElementById("userId").value;
    let hobby = document.getElementById("hobby").value;
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;
    let gender = document.getElementById("gender").value;
    let nationality = document.getElementById("nationality").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let description = document.getElementById("description").value;
    let facebook = document.getElementById("facebook").value;
    let price = document.getElementById("price").value;
    let nal = {
        hobby: hobby,
        name: name,
        age: age,
        city: city,
        gender: gender,
        nationality: nationality,
        height: height,
        weight: weight,
        description: description,
        facebook: facebook,
        price: price,
        status: "active",
        hasBeenHired: 0,
        view: 0,
        userId: userId,
        servicesId: array
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8080/provider/save",
        data: JSON.stringify(nal),
        success: function (){
            location.reload();
            getAllProvider();
        },
        error: function (err){
            console.log(err)
        }
    })
}
function getAllProvider(){

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/provider/lists",
        success: function (data){
            showAllProvider(data)
        }
    })
    event.preventDefault();
}


