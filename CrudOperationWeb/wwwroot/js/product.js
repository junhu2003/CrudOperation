// Load Data in Table when document is ready
$(document).ready(function () {
    loadData();
});

var baseUrl = "https://localhost:7298";

// Load Data function
function loadData() {
    $.ajax({
        url: baseUrl + "/api/products",
        type: "GET",        
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.price + '</td>';
                html += '<td>' + item.category + '</td>';
                html += '<td>' + item.unit + '</td>';
                html += '<td><a href="#" onclick="return getbyID(\'' + item.id + '\')">Edit</a> | <a href="#" onclick="Delele(\'' + item.id + '\')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Add Data Function
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var productObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Price: $('#Price').val(),
        Category: $('#Category').val(),        
        Unit: $('#Unit').val(),
    };
    $.ajax({
        url: baseUrl + "/api/products",
        data: JSON.stringify(productObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Function for getting the Data Based upon Product ID
function getbyID(ProductID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Price').css('border-color', 'lightgrey');
    $('#Category').css('border-color', 'lightgrey');
    $('#Unit').css('border-color', 'lightgrey');
    
    $.ajax({
        url: baseUrl + "/api/Products/" + ProductID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(ProductID);
            $('#Name').val(result.name);
            $('#Price').val(result.price);
            $('#Category').val(result.category);
            $('#Unit').val(result.unit);
            
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

// Function for updating product's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var productId = $('#Id').val();
    var productObj = {
        Id: productId,
        Name: $('#Name').val(),
        Price: $('#Price').val(),
        Category: $('#Category').val(),
        Unit: $('#Unit').val(),
    };
    $.ajax({
        url: baseUrl + "/api/products/" + productId,
        data: JSON.stringify(productObj),
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Name').val("");
            $('#Price').val("");
            $('#Category').val("");
            $('#Unit').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Function for deleting product's record
function Delele(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: baseUrl + "/api/products/" + Id,
            type: "DELETE",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

// Function for clearing the textboxes
function clearTextBox() {
    $('#Id').val("");
    $('#Name').val("");
    $('#Price').val("");
    $('#Category').val("");
    $('#Unit').val("");
    
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#myModal').modal('show');

    $('#Name').css('border-color', 'lightgrey');
    $('#Price').css('border-color', 'lightgrey');    
    $('#Category').css('border-color', 'lightgrey');
    $('#Unit').css('border-color', 'lightgrey');
}

// Function for validation
function validate() {

    var isValid = true;
    var name = $('#Name').val();
    var price = $('#Price').val();

    if ( name == '') {
        isValid = false;
    } else if (price < 0 || price > 999.99) {
        isValid = false;
    }

    return isValid;
}