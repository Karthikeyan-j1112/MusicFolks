

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

;

/**
 * Servlet implementation class account
 */
@WebServlet("/account")
public class account extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public account() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HttpSession session = req.getSession();
		String a = (String)session.getAttribute("Name");
		String b = (String)session.getAttribute("email_id");
		String c="";
		System.out.println(a);	
		
		JSONObject obj = new JSONObject();
		
		if(b==""||b=="null"||b==null)
		{
			obj.put("login", "false");
			obj.put("name", a);
			obj.put("email_id", b);
			obj.put("DOB", "null");
			
			res.getWriter().print(obj);						
		}
		else 
		{		
		
			try 
			{
				Class.forName("org.postgresql.Driver");
		        Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/spotify" , "postgres" , "8524941551@Jk" );		        		        
				
				PreparedStatement ps = con.prepareStatement("select * from users where email_id_or_phone_no = ? ;");
				ps.setString(1,b);
				
				
				ResultSet rs =  ps.executeQuery();																				
				if(rs.next())
				{																		
					c = rs.getString("dob");										
				}				
				
			}
			catch(Exception e)
			{
				System.out.println(e.getMessage());
			}
			obj.put("login", "true");
			obj.put("name", a);
			obj.put("email_id", b);
			obj.put("DOB", c);
			System.out.print(c);
			res.getWriter().print(obj);	
			
			
		}
		
	}

}
