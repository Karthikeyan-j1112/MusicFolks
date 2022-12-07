

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

import org.json.simple.JSONObject;

/**
 * Servlet implementation class reset
 */
@WebServlet("/reset")
public class reset extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public reset() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String email_id = req.getParameter("email_id");
		String birth = req.getParameter("dob");

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String ans =req.getParameter("answer");
		String pass =req.getParameter("password");
		JSONObject obj = new JSONObject();
		try {
				       
			Date birth1 = sdf.parse(birth);
            java.sql.Date dob= new java.sql.Date(birth1.getTime());
			Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/spotify" , "postgres" , "8524941551@Jk" );
            
			PreparedStatement ps = con.prepareStatement("select * from pass_reset where email_id  like ? AND dob = ? AND security_ans = ?;");
			ps.setString(1,email_id);
			ps.setDate(2, (java.sql.Date) dob);
			ps.setString(3,ans);
			ResultSet rs =  ps.executeQuery();
			  
			if(rs.next())
			{				
				PreparedStatement ps1 = con.prepareStatement("UPDATE users SET password =crypt( ? ,gen_salt('bf'))  WHERE  email_id_or_phone_no = ?;");
				ps1.setString(1,pass);
				ps1.setString(2,email_id);
				
				ps1.executeUpdate(); 
				System.out.println("Reset Successfull");
				obj.put("result", "pass");
				obj.put("message", "null");
				
				res.getWriter().print(obj);					
			}
			else{
				PreparedStatement ps2 = con.prepareStatement("select * from pass_reset where email_id  like ? AND dob = ? ;");
				ps2.setString(1,email_id);
				ps2.setDate(2,(java.sql.Date)dob);
				ResultSet rs2 =  ps2.executeQuery();
				if(rs2.next())
				{
					PreparedStatement ps3 = con.prepareStatement("select * from pass_reset where email_id  like ? AND security_ans = ? ;");
					ps3.setString(1,email_id);
					ps3.setString(2,ans);
					ResultSet rs3 =  ps3.executeQuery();
					if(!rs3.next())
					{
						obj.put("result", "fail");
						obj.put("message", "ans");
						
						res.getWriter().print(obj);							
					}
				}
				else 
				{
					obj.put("result", "fail");
					obj.put("message", "dob");
					
					res.getWriter().print(obj);						
				}
				
			}
			con.close();
		}
		catch( Exception e)
		{
			System.out.println(e.getMessage());
		}

	}

}
