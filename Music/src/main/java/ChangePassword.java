

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


@WebServlet("/ChangePassword")
public class ChangePassword extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public ChangePassword() {
        super();
        
    }

		
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException 
	{
		
		HttpSession session = req.getSession();
        
        String email_id = (String)session.getAttribute("email_id");						
		String old_pass =req.getParameter("OldPass");
		String new_pass =req.getParameter("NewPass");
		JSONObject obj = new JSONObject();
		try {
			Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/spotify" , "postgres" , "8524941551@Jk" );
            
            PreparedStatement ps = con.prepareStatement("select * from users where email_id_or_phone_no = ? AND password = crypt( ? , password);");
			ps.setString(1,email_id);
			ps.setString(2,old_pass);
			
			ResultSet rs =  ps.executeQuery();
			  
			if(rs.next())
			{				
				PreparedStatement ps1 = con.prepareStatement("UPDATE users SET password =crypt( ? ,gen_salt('bf'))  WHERE  email_id_or_phone_no = ?;");
				ps1.setString(1,new_pass);
				ps1.setString(2,email_id);
				
				ps1.executeUpdate(); 
				System.out.println("Password Changed Successfull");
				obj.put("result", "pass");
				obj.put("message", "null");
				
				res.getWriter().print(obj);					
			}
			else{
				obj.put("result", "fail");
				obj.put("message", "Your old password is wrong, try again");
				
				res.getWriter().print(obj);		
			}
			con.close();
		}
		catch( Exception e)
		{
			System.out.println(e.getMessage());
		}

		
	}

}
