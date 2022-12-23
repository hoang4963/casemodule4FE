function addNewService() {
    //lay du lieu
    let name = $('#name').val();

    let newService = {
        name: producer,
        model: model,
        price: price
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        //tên API
        url: "http://localhost:8080/serProvider",
        //xử lý khi thành công
        success: showAllService()

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}
function getAllService(){

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serProvider/lists",
        success: function (data){
            showAllService(data)
        }
    })
    event.preventDefault();
}
function showAllService(lists) {
    let res = "<tr>\n" +
        "    <td>STT</td>\n" +
        "    <td>Name</td>\n" +
        "</tr>\n";
    for (let i = 0; i < lists.length; i++) {
        let serProvider = lists[i];
        res += "<tr>\n" +
            "    <td>" + (i + 1) + "</td>\n" +
            "    <td>" + serProvider.name + "</td>\n" +
            `<td><a class="deleteProvider" onclick='deleteServiceById($(this))' href="${serProvider.id}">Delete</a></td>\n` +
            `</tr>`;
    }
    document.getElementById("display").innerHTML = `<table class="table">` + res + `</table>`;
}

function deleteServiceById(a){
    let providerId = a.attr("href");
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/serProvider/${providerId}`,
        success: function (data) {
            a.parent().parent().remove();
            location.reload();
            getAllService();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();

}