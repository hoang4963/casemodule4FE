let tk = localStorage.getItem("token");
if (tk == null){
    window.location.href = "caseStudy4-application-lover-rental-FE/login.html"
}

getListUser();
function getListUser() {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/user/lists",
        //xử lý khi thành công
        success: function (data) {
            // hien thi danh sach o day
            let content = '    <tr>\n' +
                '        <td>ID</td>\n' +
                '        <td>Name</td>\n' +
                '        <td>Email</td>\n' +
                '        <button><td>Delete</td></button>\n' +
                '        <button><td>Become Provider</td></button>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getUser(data[i]);
            }
            document.getElementById('userList').innerHTML = content;
        }
    });
}
function showOneUser(userId) {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/user/"+ userId,
        //xử lý khi thành công
        success: function (data) {
            // hien thi danh sach o day
            let content = '    <tr>\n' +
                '        <td>ID</td>\n' +
                '        <td>Name</td>\n' +
                '        <td>Email</td>\n' +
                '        <td>Phone</td>\n' +
                '        <td>Join Date</td>\n' +
                '        <td>Role</td>\n' +
                '        <td>Become Provider</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getOneUser(data[i]);
            }
            document.getElementById('userList').innerHTML = content;
        }
    });
}
function getOneUser(user){
    return `<tr><td >${user.id}</td><td >${user.userName}</td><td >${user.email}</td><td >${user.phone}</td><td >${user.joinDate}</td><td >${user.role.name}</td>` +
        `<td><button onclick='showFormAddProvider(${user.id})'">Become Provider</button></td>` +
        `</tr>`;
}
function getUser(user) {
    return `<tr><td >${user.id}</td><td >${user.userName}</td><td >${user.email}</td>` +
        `<td><button onclick='deleteUser(${user.id})'">Delete</button></td>` +
        `<td><button onclick='showFormAddProvider(${user.id})'">Become Provider</button></td>` +
        `</tr>`;
}
function deleteUser(id){
    $.ajax({
        type: "DELETE",
        //tên API
        url: "http://localhost:8080/user/" +id,
        //xử lý khi thành công
        success: function (data) {
            alert("done");
            successHandler();
        }
    });
}

function showFormAddUser(){
    let form = "<table>" +
        "<tr>\n" +
        "            <td>userName:</td>\n" +
        "            <td><input type=\"text\" id=\"userName\" placeholder=\"Username\"></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td>Password:</td>\n" +
        "            <td><input type=\"password\" id=\"password\" placeholder=\"Password\"></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td>Email:</td>\n" +
        "            <td><input type=\"email\" id=\"email\" placeholder=\"Email\"></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td>Phone:</td>\n" +
        "            <td><input type=\"text\" id=\"phone\" placeholder=\"Phone\"></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td>Vip:</td>\n" +
        "            <td><input type=\"text\" id=\"vip\" placeholder=\"Vip\"></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td>JoinDate:</td>\n" +
        "            <td><input type=\"date\" id=\"date\" placeholder=\"Join Date\"></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td>Role:</td>\n" +
        "            <td><select id=\"role\">\n" +
        "            <option value=\"1\">PO</option>\n" +
        "            <option value=\"2\">ADMIN</option>\n" +
        "            <option value=\"3\">USER</option>\n" +
        "            <option value=\"4\">PROVIDER</option>\n" +
        "            </select></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td></td>\n" +
        "            <td><input type=\"submit\" value=\"Add\" onclick=\"addNewUser()\"></td>\n" +
        "        </tr>" +
        "           </table>";
    document.getElementById("userList").innerHTML = form;
}
function addNewUser(){
    let userName = $('#userName').val();
    let password = $('#password').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let joinDate = $('#date').val();
    let vip = $('#vip').val();
    let role = $('#role').val();
    let newUser = {
        userName: userName,
        password: password,
        email: email,
        phone: phone,
        joinDate: joinDate,
        roleId : role,
        vip: vip
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newUser),
        //tên API
        url: "http://localhost:8080/user",
        //xử lý khi thành công
        success: function (){
            alert("done");
            successHandler()
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}