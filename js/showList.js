
function showMenList(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/provider/rentListForGender/nam",
        success: function (data){
            showAllProvider(data)
        }
    })
}
function showAllProvider(lists){
    let res = "";
    for (let i = 0; i < lists.length; i++) {
        let provider = lists[i];
        // idProvider = provider.id;
        res +=  `<li className="item">
            <div className="col-item">
                <div className="product-image"><a href="#" title="Sample Product"> <img
                    className="small-image" src="data:image/jpeg;base64,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" alt="HTC Rhyme Sense"> </a></div>
                <div className="product-shop">
                    <h2 className="product-name"><a title=" Sample Product" href="#"> ${provider.name} </a></h2>
                    <div className="price-box">
                        </p>
                    </div>
                    </div>
                    <div>
                    <table>
                    <tr>
                    <td>Gender:</td>
                    <td>${provider.gender}</td>
                    </tr>
                    <tr>
                    <td>Nationality:${provider.nationality}</td>
                    <td></td>
                    </tr>
                    <tr>
                    <td>City:</td>
                    <td>${provider.city}</td>
                    </tr>
                    <tr>
                    <td>View: </td>
                    <td>${provider.view}</td>
                    </tr>
                    <tr>
                    <td>facbook : </td>
                    <td>${provider.facebook}</td>
                    </tr>
                    </table>               
                        </div>
                    <div className="desc std">
                 </div>
                    <div className="actions">
                        <button className="button btn-cart ajx-cart" title="Add to Cart" type="button"><span>Match</span>
                        </button>
                        <a href="providerdetail.html"><button className="button btn-cart ajx-cart" title="Add to Cart" type="button" onclick="addId(${provider.id})"><span>Detail</span>
                        </button></a>
                </div>
            </div>
        </li>`;

    }
    document.getElementById("products-list").innerHTML = res  ;

}
// ghi id provider vao localstorage
function addId(id){
    localStorage.setItem("providerId",id);
}
function showWoMenList(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/provider/rentListForGender/nu",
        success: function (data){
            showAllProvider(data)
        }
    })
}
function showFullList(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/provider/lists",
        success: function (data){
            showAllProvider(data)
        }
    })

}
function showprovider(providerId){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/provider/" + providerId,
        success: function (data){
            showProviderId(data)
        }
    })
}
