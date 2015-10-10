package coreservlets;

import java.io.*;

import javax.servlet.*;
import javax.servlet.http.*;

import java.util.*;

/** From <a href="http://courses.coreservlets.com/Course-Materials/">the
 *  coreservlets.com tutorials on servlets, JSP, Struts, JSF, Ajax, GWT, and Java</a>.
 */

@SuppressWarnings("serial")
public class ShowCities extends HttpServlet {
  public void doGet(HttpServletRequest request,
                    HttpServletResponse response)
      throws ServletException, IOException {
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Pragma", "no-cache");
    String cityType = request.getParameter("cityType");
    System.out.println("cityType = " + cityType);
    List<City> cities = findCities(cityType);
    request.setAttribute("cities", cities);
    String format = request.getParameter("format");
    String outputPage;
    if ("xml".equals(format)) {
      response.setContentType("text/xml");
      outputPage = "/WEB-INF/results/cities-xml.jsp";
    } else if ("json".equals(format)) {
      response.setContentType("text/javascript");
      outputPage = "/WEB-INF/results/cities-json.jsp";
    } else {
      response.setContentType("text/plain");
      outputPage = "/WEB-INF/results/cities-string.jsp";
    }
    RequestDispatcher dispatcher =
      request.getRequestDispatcher(outputPage);
    dispatcher.include(request, response);
  }

  public void doPost(HttpServletRequest request,
                     HttpServletResponse response)
      throws ServletException, IOException {
    doGet(request, response);
  }
  
  private Map<String,String[]> cityTypeMap;
  
  public void init() {
    cityTypeMap = new HashMap<String,String[]>();
    cityTypeMap.put("top-5-cities", 
                    CityUtils.TOP_5_CITIES);
    cityTypeMap.put("second-5-cities", 
                    CityUtils.SECOND_5_CITIES);
    cityTypeMap.put("cities-starting-with-s", 
                    CityUtils.CITIES_STARTING_WITH_S);
    cityTypeMap.put("superbowl-hosts", 
                    CityUtils.SUPERBOWL_HOSTS);
  }
  
  private List<City> findCities(String cityType) {
    String[] cityNames = cityTypeMap.get(cityType);
    if (cityNames == null) {
      cityNames = CityUtils.TOP_5_CITIES;
    }
    List<City> cities = new ArrayList<City>();
    for(String cityName: cityNames) {
      cities.add(CityUtils.getCity(cityName));
    }
    return(cities);
  }
}
