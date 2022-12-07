

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

/**
 * Servlet implementation class getSongLink
 */
public class getSongLink extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getSongLink() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

		JSONObject obj = new JSONObject();
		try {
			String a1 = req.getParameter("song"); 
			Class.forName("org.postgresql.Driver");
	        Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/spotify" , "postgres" , "8524941551@Jk" );		        		        
			
			PreparedStatement ps = con.prepareStatement("select * from songs where song_name = ?");						
			ps.setString(1, a1);
			ResultSet rs =  ps.executeQuery();
			if(rs.next())
			{				
				obj.put("link", rs.getString("song_link"));				
				obj.put("artist", rs.getString("artist"));	
				String a= rs.getString("song_image");
				if(a==""||a==null)
				{
					PreparedStatement ps1 = con.prepareStatement("select * from artist where artist = ?");
					ps1.setString(1, rs.getString("artist"));
						
					ResultSet rs1 =  ps1.executeQuery();
					
					if(rs1.next())
					{
						a=rs1.getString("image");
						if(a==""||a==null)
						{
							a="1kRE5UIajZkYp2A2JWMfSCTq7bdd3yV2b";
						}
					}
				}
				a="http://drive.google.com/uc?export=view&id="+a;
				obj.put("image", a );	
			}
			res.getWriter().print(obj);			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
