

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

/**
 * Servlet implementation class CheckLogin
 */
@WebServlet("/CheckLogin")
public class CheckLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public CheckLogin() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HttpSession session = req.getSession();
		JSONObject obj = new JSONObject();
		String a= "";
		if(session.getAttribute("Name")!=null)
		{
			a = (String)session.getAttribute("Name");
		}
		
		System.out.println(a);
		if(a==""||a=="null"||a==null)
		{
			obj.put("login", "false");
			obj.put("name", a);			
			res.getWriter().print(obj);						
		}
		else {
			obj.put("login", "true");
			obj.put("name", a);			
			res.getWriter().print(obj);			
		}
				
	}

}
