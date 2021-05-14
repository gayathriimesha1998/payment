package model;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.HashMap; 
import java.util.Map; 
import java.util.Scanner;

@WebServlet("/PaymentsAPI")
public class PaymentsAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	Payment paymentObj = new Payment(); 
    public PaymentsAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}
		
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String output = paymentObj.insertPayment(request.getParameter("Payment_Id"), 
				 request.getParameter("payment_date"), 
				 request.getParameter("amount"),
				 request.getParameter("postal_address"),
				 request.getParameter("postal_code"),
				 request.getParameter("payment_type")); 
				 response.getWriter().write(output); 
				
				 
	}
	
	// Convert request parameters to a Map
	private static Map<String, String> getParasMap(HttpServletRequest request) 
	{ 
	 Map<String, String> map = new HashMap<String, String>(); 
	try
	 { 
	 Scanner scanner = new Scanner(request.getInputStream(), "UTF-8"); 
	 String queryString = scanner.hasNext() ? 
	 scanner.useDelimiter("\\A").next() : ""; 
	 scanner.close(); 
	 String[] params = queryString.split("&"); 
	 for (String param : params) 
	 {
		 String[] p = param.split("=");
		 map.put(p[0], p[1]); 
		 } 
		 } 
		catch (Exception e) 
		 { 
		 } 
		return map; 
	}
	 
	

	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		 Map<String, String> paras = getParasMap(request); 
		 String output = paymentObj.updatePayment(paras.get("hidPaymentIDSave").toString(), 
		 paras.get("payment_date").toString(), 
		 paras.get("amount").toString(), 
		 paras.get("postal_address").toString(), 
		 paras.get("postal_code").toString(),
		 paras.get("payment_type").toString()); 
		 response.getWriter().write(output); 
	}

	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		 Map<String, String> paras = getParasMap(request); 
		 String output = paymentObj.deletePayment(paras.get("Payment_Id").toString()); 
		 response.getWriter().write(output); 
	}

}