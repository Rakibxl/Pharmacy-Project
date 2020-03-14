$(document).ready(function () {
    shortMonths= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $('.main-sidebar').hover(function () {
        if ($('body').hasClass('sidebar-mini')
            && $("body").hasClass('sidebar-collapse')
            && $(window).width() > screenWidth) {
            fnExpand();
        }
    }, function () {
        if ($('body').hasClass('sidebar-mini')
            && $('body').hasClass('sidebar-expanded-on-hover')
            && $(window).width() > screenWidth) {
            fnCollapse();
        }
    });
});

function fnExpand() {
    $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
}
function fnCollapse() {
    if ($('body').hasClass('sidebar-expanded-on-hover')) {
        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
    }
}

function fnActionOnSalesTable(action, itemID, type) {
    var totalAmount = 0;
    var quentity = $("#productList tr#" + itemID + " td.quentity").html();
    var unitPrice = $("#productList tr#" + itemID + " td.unit-cost").html();
    var storItem = $("#productList tr#" + itemID + " td.store-amount").html();
    if (action == "add") {
        if (Number(quentity) + 1 > Number(storItem)) {
            alert("You have already taken maximum items.");
            return false;
        }
        $("#productList tr#" + itemID + " td.quentity").html(Number(quentity) + 1);
        $("#productList tr#" + itemID + " td.total-cost").html(PHMasterLibClass.fnNumberWithCommas(Number((Number(quentity) + 1) * Number(unitPrice)).toFixed(2)))
    } else if (action == "sub") {
        if (Number(quentity) -1 <1) {
            alert("You cannot take less than one items.");
            return false;
        }
        $("#productList tr#" + itemID + " td.quentity").html(Number(quentity) - 1);
        $("#productList tr#" + itemID + " td.total-cost").html(PHMasterLibClass.fnNumberWithCommas(Number((Number(quentity) - 1) * Number(unitPrice)).toFixed(2)))
    } else if (action == "remove") {
        $("#productList tr#" + itemID ).remove();
    }

    $("#productList tbody tr td.total-cost").each(function () {
        totalAmount = totalAmount + Number(PHMasterLibClass.fnRemoveCommas($(this).html()))
    });
    
    $("#totalAmount").html(PHMasterLibClass.fnNumberWithCommas(Number(totalAmount).toFixed(2)));
}
function fnSaveSalesInfo() {
    var invoiceTable = '<table class="table table-striped"><tr><td> Product</td> <td> Quantity</td> <td> U. Price</td> <td> T. Price</td></tr>';
    var grandTotalCost = 0;
    var invoiceNo = "34522677W";
    if ($("#productList tbody tr").length > 0) {
        $("#productList tbody tr").each(function () {
            var productCode = $(this).find("td span.code").html();
            var productName = $(this).find("td.name").html();
            var quantity = Number($(this).find("td.quentity").html());
            var unitCost = $(this).find("td.unit-cost").html();
            var totalCost = $(this).find("td.total-cost").html();
            var restOfAmount = Number($(this).find("td.store-amount").html());
            grandTotalCost = grandTotalCost + Number(totalCost);
            // return false;

            var data = { ProductCode: productCode, Quantity: quantity, UnitPrice: unitCost, TotalCost: totalCost, RestOfAmount: restOfAmount };
            var url = "../Purchase/InsertSalesItem";
            var returnResult = PHMasterLibClass.fnAjaxCall(url, data);//ajax call and take return data

            invoiceTable = invoiceTable + '<tr> <td>' + productName + ' </td> <td>' + quantity + ' </td> <td>' + unitCost + ' </td> <td>' + totalCost + ' </td></tr>';
            //totalAmount = totalAmount + Number(PHMasterLibClass.fnRemoveCommas($(this).html()))
        });
        //alert("Your information successfully interted...");
        invoiceTable = invoiceTable + '<tr><td colspan="3"><b>Gross Total<b></td> <td> ' + grandTotalCost + ' TK</td> </tr>';
    }
    invoiceTabl = invoiceTable + '</table>';
    
    //alert(returnResult);
    var date = new Date();
    var fullDate = date.getDate() + " " + shortMonths[date.getMonth()] + ", " + date.getYear();

    var template = '<div class="row" id="invoiceContent">\
        <div class="well col-xs-12">\
            <div class="row">\
                <div class="col-xs-6 col-sm-6 col-md-6">\
                    <address>\
                        <strong>PH Management</strong>\
                        <br>Address\
                        <br>\
                        <abbr title="Phone">P:</abbr> (213) 484-6829\
                    </address>\
                </div>\
                <div class="col-xs-6 col-sm-6 col-md-6 text-right">\
                    <p>\
                        <em>Date:' + fullDate + ' </em>\
                    </p>\
                    <p>\
                        <em>Receipt #: '+invoiceNo+'</em>\
                    </p>\
                </div>\
            </div>\
            <div class="row">\
                <div class="text-center">\
                    <h1>Receipt</h1>\
                </div>' + invoiceTabl + '\
            </div>\
        </div>\
    </div>';

    var modalTitle = "Invoice Details";
    var modalBody = template;
    $("#customModalBody").html(modalBody);
    $("#customModalLabel").html(modalTitle);
    $("#modalDialog").css("width", "50%")
    $("#saveInfo").show();
    $("#saveInfo").text("Print");
    $("#saveInfo").bind("click", function () {        
        var printContents = '<table style="border:0"><tr><td align="center"><h2>Invoice Details<h2></td></tr>';
        printContents =printContents+ '<tr><td>'+document.getElementById('invoiceContent').innerHTML+'</td></tr></table>';
        document.body.innerHTML = printContents;
        window.print();
        return false;

    });
    $('#customModal').modal("show")
}

var PHMasterLibClass = {
    fnAjaxCall: function (url, data) {
        var returnResult;
        $.ajax({
            type: "POST",
            async: false,
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                returnResult = response;
            },
            failure: function (response) {
                alert("failure:" + response.d);
            },
            error: function (response) {
                alert("error:" + response.d);
            }
        });
        return returnResult;
    },
    fnNumberWithCommas : function (x) {
        if ($.isNumeric(x) == true) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return x;
        }
    },
    fnRemoveCommas: function (Number) {
        //return currentValue.replace(/\,/g, '');
        var ReturnNumber = "";
        var ActualNumber = Number;
        if ($.isNumeric(ActualNumber) == true) {
            return ActualNumber;
        }
        else {
            var SplitNumberAry = ActualNumber.split(",");
            for (i = 0; i < SplitNumberAry.length; i++) {
                ReturnNumber = ReturnNumber.concat(SplitNumberAry[i]);
            }
            return ReturnNumber;
        }
    },
     checkIsNull:function (itemValue, isNullValue) {
            var isNullReturn = "";
            if (itemValue == 'NaN' || itemValue == 'undefined' || itemValue == null || itemValue == "") {
                isNullReturn = isNullValue;
            }
            else {
                isNullReturn = itemValue;
            }
            return isNullReturn;
        }
};



