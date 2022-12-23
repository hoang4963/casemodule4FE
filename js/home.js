function showMenList(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/provider/rent6Provider",
        success: function (data){
            showAllProvider(data)
        }
    })
}
function showAllProvider(lists){
    let res = "";
    for (let i = 0; i < lists.length; i++) {
        let provider = lists[i];
        res +=  `<div class="item">
            <div class="col-item">
                <div class="item-inner">
                    <div class="item-img">
                        <div class="new-label new-top-left">Best</div>
                        <div class="item-img-info"> <a href="product_detail.html"  title="Sample Product" class="product-image"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN8JwOTZREE2Lb2diOcx4rAuHykEFPLt-_CQ&usqp=CAU" alt="Sample Product"> </a>
                            <div class="item-box-hover">
                                <div class="box-inner">
                                    <div class="product-detail-bnt"><a href="quick_view.html" class="button detail-bnt"> <span> Quick View</span></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-info">
                        <div class="info-inner">
                            <div class="item-title"> <a href="product_detail.html" title="Sample Product"> Trung </a> </div>
                            <div class="item-content">
                                <div class="rating">
                                    <div class="ratings">
                                        <div class="rating-box">
                                            <div class="rating" style="width:80%"></div>
                                        </div>
                                        <p class="rating-links"> <a href="#">1 Review(s)</a> <span class="separator">|</span> <a href="#">Add Review</a> </p>
                                    </div>
                                </div>
                                <div class="item-price">
                                    <div class="price-box"> <span class="regular-price" id="product-price-1"> <span class="price">$25.00</span> </span> </div>
                                </div>
                            </div>
                        </div>
                        <div class="actions"><span class="add-to-links"> <a href="wishlist.html" class="link-wishlist" title="Add to Wishlist"><span>View</span></a>
                            <button  title="Add to Cart" class="button btn-cart"><span>Match</span></button>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    }
    document.getElementById("provider-list").innerHTML = res  ;

}