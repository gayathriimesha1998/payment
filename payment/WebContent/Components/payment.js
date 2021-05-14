/**
 * 
 */

$(document).ready(function()
{ 
	if ($("#alertSuccess").text().trim() == "") 
 	{ 
 	   $("#alertSuccess").hide(); 
 	} 
 	$("#alertError").hide(); 
});

 //**************************** SAVE************************************
$(document).on("click", "#btnSave", function(event) 
{ 
	// Clear alerts---------------------
 	$("#alertSuccess").text(""); 
 	$("#alertSuccess").hide(); 
 	$("#alertError").text(""); 
 	$("#alertError").hide(); 
 	
	//******************* Form validation*************************
	var status = validatePaymentForm(); 
	if (status != true) 
 	{ 
 		$("#alertError").text(status); 
 		$("#alertError").show(); 
 		return; 
	} 
	
	//********************* If valid******************
 		var type = ($("#hidPaymentIDSave").val() == "") ? "POST" : "PUT"; 
 		 $('input[name="paymentType"]:checked').val(), 

 		$.ajax( 
 	{ 
 		url : "PaymentsAPI", 
	 	type : type, 
 		data : $("#formPayment").serialize(), 
 		dataType : "text", 
 		complete : function(response, status) 
 	{ 
 	onPaymentSaveComplete(response.responseText, status); 
 	} 
 	});
});

//***************************** UPDATE***************************************
$(document).on("click", ".btnUpdate", function(event) 
{ 
 	$("#hidPaymentIDSave").val($(this).data("Payment_Id")); 
 	$("#payment_date").val($(this).closest("tr").find('td:eq(0)').text()); 
    $("#amount").val($(this).closest("tr").find('td:eq(1)').text()); 
    $("#postal_address").val($(this).closest("tr").find('td:eq(2)').text()); 
    $("#postal_code").val($(this).closest("tr").find('td:eq(3)').text());
    $("#payment_type").val($(this).closest("tr").find('td:eq(4)').text());  

});

//****************************** DELETE*****************************************
$(document).on("click", ".btnRemove", function(event)
{ 
 $.ajax( 
 { 
 url : "PaymentsAPI", 
 type : "DELETE", 
 data : "Paymant_Id=" + $(this).data("Payment_Id"),
 dataType : "text", 
 complete : function(response, status) 
 { 
 onPaymentDeleteComplete(response.responseText, status); 
 } 
 }); 
});


// ************************CLIENT-MODEL************************

function validatePaymentForm()
{


 //Validations
 
//-----payment date-----------
 
 if ($("#payment_date").val().trim() == "") 
 { 
 return "Insert payment date."; 
 } 

 
 
//------------------ Enter PRICE-------------------------------
if ($("#amount").val().trim() == "") 
 { 
 return "Insert amount."; 
 } 
// is numerical value
var tmpPrice = $("#amount").val().trim(); 
if (!$.isNumeric(tmpPrice)) 
 { 
 return "Insert a numerical value for Item Price."; 
 } 
// convert to decimal price
 $("#amount").val(parseFloat(tmpPrice).toFixed(2)); 
 
 
 
 
 // ------------------------Postal Address----------------
if ($("#postal_address").val().trim() == "") 
 { 
 return "Insert Postal Address."; 
 } 
 
 
 //-------------- Postal Code ------------------------
if ($("#postal_code").val().trim() == "") 
 { 
 return "Insert Postal Code."; 
 } 
 
 
 
//--------------------- Payment type------------------------

if ($("#payment_type").val().trim() == "") 
 { 
 return "Insert Payment Type."; 
 } 
 
 return true;
}



function onPaymentSaveComplete(response, status)
{

if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully saved.");
 $("#alertSuccess").show();
 $("#divPaymentsGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while saving.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while saving..");
 $("#alertError").show();
 } 
$("#hidPaymentIDSave").val("");
 $("#formPayment")[0].reset(); 
	
}


