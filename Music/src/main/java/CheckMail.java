



import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

/**
 * Servlet implementation class CheckMail
 */
@WebServlet("/CheckMail")
public class CheckMail extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public CheckMail() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    
    public static boolean isValid(String s)
	{
		Pattern p = Pattern.compile("^\\d{10}$");

		Matcher m = p.matcher(s);

		return (m.matches());
	}
    
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String email_id = req.getParameter("email_id");
		String login = req.getParameter("login");

		JSONObject obj = new JSONObject();
		try {
			Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/spotify" , "postgres" , "8524941551@Jk" );

            System.out.println("database connected successfully" );
            
			PreparedStatement ps = con.prepareStatement("select email_id_or_phone_no from users where email_id_or_phone_no  like ?");
			ps.setString(1,email_id);
			ResultSet rs =  ps.executeQuery();
			
			if(rs.next())
			{
				if(login.contentEquals("reset"))
				{
					PreparedStatement ps1 = con.prepareStatement("select * from pass_reset where email_id like ?");
					ps1.setString(1,email_id);
					ResultSet rs1 =  ps1.executeQuery();
					if(rs1.next())
					{						
						String ques = rs1.getString("security_ques");
						obj.put("exist", "yes");
						obj.put("ques", ques);						
						res.getWriter().print(obj);
					}					
				}	
				else if(login.contentEquals("acc"))
				{
					res.getWriter().write("<i class=\"fa-solid fa-circle-exclamation\"></i> This email id or phone number Already registered");
				}
				else if (isValid(email_id)&&!(login.contentEquals("true")))
					res.getWriter().write("<i class=\"fa-solid fa-circle-exclamation\"></i> This Phone Number already exist");
					
				else if(!(login.contentEquals("true")))
					res.getWriter().write("<i class=\"fa-solid fa-circle-exclamation\"></i> This email id already exist");
				
			}
			else{
				if(login.contentEquals("true"))
				{
					res.getWriter().write("<i class=\"fa-solid fa-circle-exclamation\"></i> This email id or phone number not registered");
				}
				else if(login.contentEquals("reset"))
				{
					obj.put("exist", "no");
					obj.put("ques", "null");						
					res.getWriter().print(obj);					
				}
				else 
				{
					res.getWriter().write("");
				}
			}
			
		}
		catch( Exception e)
		{
			System.out.println(e.getMessage());
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	

}
