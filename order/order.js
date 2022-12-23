// let token = localStorage.getItem("token")
// if (token == null) {
//     window.location.href = "login.html"
// }
// // showAllOrder();
//
// function showAllOrder() {
//     $.ajax({
//         headers: {
//             'Accept': 'application/json', 'Content-Type': 'application/json'
//         }, beforeSend: function (xhr) {
//             xhr.setRequestHeader("Authorization", "Bearer " + token);
//         }, type: "get", url: "http://localhost:8080/orders" ,
//         success: function (data) {
//             showAllOrder(data)
//         }
//     })
// }
// function showAllOrder(lists) {
//     let res = "<tr>\n" +
//         "    <td>STT</td>\n" +
//         "    <td>Name User</td>\n" +
//         "    <td>Name Provider</td>\n" +
//         "    <td>Date</td>\n" +
//         "    <td>Time Rent</td>\n" +
//         "    <td>Status</td>\n" +
//         "</tr>\n";
//     for (let i= 0; i< lists.length; i++) {
//         let order = lists[i];
//         res += "<tr>\n" +
//             "    <td>" + (i +1) +   "</td>\n" +
//             "    <td>" + order.user.userName  + "</td>\n" +
//             "    <td>" + order.provider.name  + "</td>\n" +
//             "    <td>" + order.startTime.slice(0,10)  + "</td>\n" +
//             "    <td>" + order.timeRent  + "</td>\n" +
//             `    <td>" <a class="changeStatus" onclick='changeStatus($(this))' href ="${order.id}"> Status </a> </td>\n ` +
//
//             `<td><a class="deleteOrder" onclick='deleteOrderById($(this))' href="${order.id}">Delete</a></td></tr>`;
//     }
//     document.getElementById("displayOrder").innerHTML = "<table>" + res + "</table>"
//
// }
// function deleteOrderById(a) {
//     let orderId = a.attr("href");
//     $.ajax({
//         type: "DELETE",
//         url: `http://localhost:8080/orders/${id}`,
//         success: function (data) {
//             a.parent().parent().remove();
//         }
//     });
// //    Chặn sự kiện mặc định của thẻ
//     event.preventDefault();
//
// }
//
// function findAllOrderByRenter() {
//
// }
//
// function showByOrderUser() {
//
// }
// function showByOrderProvider() {
//
// }
//
//
//
// function changeStatus() {
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8080/orders`,
//         success: function (data) {
//             localStorage.setItem("role",data.roles[0].authority);
//             // if ele check theo role
//             if (data.roles[0].authority == "ROLE_PO"){
//                 showAllOrder()
//             }else if(data.roles[0].authority == "ROLE_ADMIN"){
//                 showAllOrder()
//             }else if(data.roles[0].authority == "ROLE_PROVIDER"){
//                 showByOrderProvider()
//             }else if(data.roles[0].authority == "ROLE_USER"){
//                 showByOrderUser()
//             }else {
//                 location.href = "login.html"
//             }
//         }
//
//     });
//     //chặn sự kiện mặc định của thẻ
//     event.preventDefault();
//
// }