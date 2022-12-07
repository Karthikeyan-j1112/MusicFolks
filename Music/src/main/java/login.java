

import java.io.IOException;
import java.io.PrintWriter;
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

/**
 * Servlet implementation class login
 */
@WebServlet("/login")
public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		PrintWriter out = res.getWriter();
		String email_id = req.getParameter("mail");
		String password = req.getParameter("password");
		JSONObject obj = new JSONObject();
		try {
			Class.forName("org.postgresql.Driver");
	        Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/spotify" , "postgres" , "8524941551@Jk" );
	        
	        System.out.println("database connected successfully1" );
			
			PreparedStatement ps = con.prepareStatement("select * from users where email_id_or_phone_no = ? AND password = crypt( ? , password);");
			ps.setString(1,email_id);
			ps.setString(2,password);
			
			ResultSet rs =  ps.executeQuery();			
			
			HttpSession session = req.getSession();			
						
			
			if(rs.next())
			{
				obj.put("miss_match", "false");	
				obj.put("message", "null");
				res.getWriter().print(obj);				

				session.setAttribute("Name",rs.getString("full_name"));					
				session.setAttribute("email_id",rs.getString("email_id_or_phone_no"));					
				
			}
			else
			{
				PreparedStatement ps1 = con.prepareStatement("select * from users where email_id_or_phone_no = ? ;");
				ps1.setString(1,email_id);
				
				ResultSet rs1 =  ps1.executeQuery();
				
				if(rs1.next())
				{
					obj.put("miss_match", "true");	
					obj.put("message", "password");
					res.getWriter().print(obj);		
				}
				else 
				{
					obj.put("miss_match", "true");
					obj.put("message", "email");
					res.getWriter().print(obj);
				}
												
			}
			
		}
		catch(Exception e)
		{
			out.println(e.getMessage());
		}
				
	}

}
