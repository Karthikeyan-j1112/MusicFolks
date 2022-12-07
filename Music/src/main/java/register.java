

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class register
 */
@WebServlet("/register")

public class register extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public register() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    
    
    
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/spotify" , "postgres" , "8524941551@Jk" );
            
            System.out.println("database connected successfully" );
            String full_name = req.getParameter("full_name");
            String email_id_or_phone_no = req.getParameter("email_id_or_phone_no");
            String password = req.getParameter("password");
            String birth = req.getParameter("dob");

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date birth1 = sdf.parse(birth);
            java.sql.Date dob= new java.sql.Date(birth1.getTime());
            
            String ques = req.getParameter("ques");
            String ans = req.getParameter("answer");
            
            
            PreparedStatement ps = con.prepareStatement("Insert into users( full_name , email_id_or_phone_no,  password, dob ) values( ? ,?, crypt( ? ,gen_salt('bf')) , ? );");
            
            ps.setString(1,full_name);
            ps.setString(2,email_id_or_phone_no);
            ps.setString(3,password);
            ps.setDate(4, (java.sql.Date) dob);
            
            ps.executeUpdate();            
            
            PreparedStatement ps1 = con.prepareStatement("insert into pass_reset(email_id,dob,security_ques,security_ans) values( ? , ? , ? , ? );");
            ps1.setString(1, email_id_or_phone_no);
            ps1.setDate(2,(java.sql.Date) dob);
            ps1.setString(3, ques);
            ps1.setString(4, ans);
            ps1.executeUpdate();            
            
            con.close();
            System.out.println("Inserted successfully" );
            res.getWriter().write("Account Created Successfully");
            
		}catch( Exception e)
		{
			System.out.println(e.getMessage());
			res.getWriter().write("Account not Created, Check Credentials");
		}
      
	}

}
