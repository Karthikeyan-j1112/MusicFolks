

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 * Servlet implementation class getSongs
 */
public class getSongs extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getSongs() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
				
		JSONArray arr = new JSONArray();
		
		try {			
			Class.forName("org.postgresql.Driver");
	        Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/spotify" , "postgres" , "8524941551@Jk" );		        		        
			
			PreparedStatement ps = con.prepareStatement("select * from songs order by date_created desc");						
			
			ResultSet rs =  ps.executeQuery();																				
			while(rs.next())
			{																		
				JSONObject obj1 = new JSONObject();
				obj1.put("name",rs.getString("song_name"));
				obj1.put("artist", rs.getString("artist") );	
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
				
				obj1.put("song_image", a );											
				arr.add(obj1);
			}	
			res.getWriter().print(arr);
		} catch (Exception e) {
			System.out.println(e.getMessage());
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
