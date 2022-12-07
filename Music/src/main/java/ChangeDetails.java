

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

/**
 * Servlet implementation class ChangeDetails
 */
@WebServlet("/ChangeDetails")
public class ChangeDetails extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChangeDetails() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		JSONObject obj = new JSONObject();
		
		try {
			Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/spotify" , "postgres" , "8524941551@Jk" );
            
            System.out.println("database connected successfully" );
            String full_name = req.getParameter("full_name");
            String email_id_or_phone_no = req.getParameter("email_id_or_phone_no");            
            String birth = req.getParameter("dob");

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            
            Date birth1 = sdf.parse(birth);
            java.sql.Date dob= new java.sql.Date(birth1.getTime());
            
            HttpSession session = req.getSession();
            PreparedStatement ps2 = con.prepareStatement("select email_id_or_phone_no from users where email_id_or_phone_no  like ?");
			ps2.setString(1,email_id_or_phone_no);
			ResultSet rs1 =  ps2.executeQuery();
			
			String email_og = (String)session.getAttribute("email_id");
			
			if((rs1.next())&& !(email_id_or_phone_no.contentEquals(email_og)))
			{				
				obj.put("change", "fail");
				obj.put("reason", "mail");
	            res.getWriter().print(obj);
			}
            else 
            {			
	            
	            
	            PreparedStatement ps = con.prepareStatement("UPDATE users SET full_name = ? , email_id_or_phone_no = ?,  dob = ? WHERE email_id_or_phone_no = ? ;");
	            
	            ps.setString(1,full_name);
	            ps.setString(2,email_id_or_phone_no);
	            ps.setDate(3,(java.sql.Date) dob);
	            ps.setString(4,email_og);
	            
	            ps.executeUpdate();            	
	            
	            PreparedStatement ps1 = con.prepareStatement("UPDATE  pass_reset SET  email_id = ?,  dob= ? WHERE email_id = ? ;");
	            ps1.setString(1, email_id_or_phone_no);
	            ps1.setDate(2, (java.sql.Date) dob);
	            ps1.setString(3, email_og);
	            
	            ps1.executeUpdate();            
	            
	            con.close();
	            System.out.println("changed successfully" );

	            session.setAttribute("email_id",email_id_or_phone_no);
	            session.setAttribute("Name",full_name);
	            
	            obj.put("change", "success");
	            res.getWriter().print(obj);
	            
			}
            
		}catch( Exception e)
		{
			System.out.println(e.getMessage());
			obj.put("change", "fail");
			obj.put("reason", "null");
            res.getWriter().print(obj);
		}
      
		
	}

}
