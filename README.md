# Data-Driven-Economic-Research-Tool
This project is the culmination of three projects for the University of Denver's Data Analytics Bootcamp, and I intend to continue to add to it and use it in my own research for the forseeable future.  For a running list of features and improvements I would like to add, please scroll to the very bottom of this ReadMe.

TECHNOLOGIES USED
- Python (Flask, SK-Learn, Pandas, Matplotlib, Numpy, SQLAlchemy)
- Javascript (D3.js)
- HTML5 (Bootstrap)
- CSS
- PostgreSQL

I wanted to create a tool for economists like me to be able to analyze data acquired from the St. Louis Federal Reserve's Federal Reserve Economic Data (FRED) API.

The tool includes a line chart for visualizing time series economic data, and corresponding summary statistics tables.  The user can choose up to 5 data series to visualize on the chart using dropdowns.  The numbers in the dropdowns correspond to the index table at the bottom of the page.  The summary statistics tables are responsive to changing data selections, as well as to the user zooming in on a certain time interval for a closer look.

![image](https://user-images.githubusercontent.com/75816400/127788383-b7606aba-7fd5-4538-9b3f-3d8193f37398.png)

The table to the right of the dropdowns displays the full name of the data series, as well as the units, time interval, start date, and end date.

The scatter plot below allows the user to take a closer look at a direct comparison of two data series.  Using similar dropdowns, the user can select which series to examine.  Additionally, the user may select "change" or "percent change," which are calculted based on the main series.

![image](https://user-images.githubusercontent.com/75816400/127788402-70eff50c-3112-41e0-b25b-dc4621d10ab0.png)

Finally, below the scatter plot are three regression models for forecasting three of the mainstream measures of inflation: Consumer Price Index, Personal Consumption Expenditures, and GDP Deflator.  The user can in put values for as many as 10 variables to see how they affect the forecast.

![image](https://user-images.githubusercontent.com/75816400/127788434-d60ead08-0257-4f0c-ade6-382f5bede6ca.png)

The data is stored in a PostgreSQL database.  I use a Flask application in combination with JavaScript, HTML and CSS to build all of the functionality.

I am the sole author of the entire application, though I did receive some help and guidance from the teaching staff of the bootcamp, Kevin Lee, Adrienne Tecza, and Leah Stuckey.

I still have big plans for adding features, functionality, more complex models and more friendly user interface in the coming months.

IMPORTANT NOTE:  NONE OF MY DATA SOURCES ARE CITED IN THE APPLICATION, WHICH IS THE PRIMARY REASON THE APPLICATION IS NOT PUBLISHED ONLINE.  ALL DATA WAS PULLED FROM THE ST. LOUIS FEDERAL RESERVE'S FRED WEBSITE WITH THE EXCEPTION OF STOCK DATA TAKEN FROM THE WALL STREET JOURNAL.  PROPER CITATION WILL BE INCLUDED IN THE NEXT VERSION OF THIS APPLICATION.

FEATURES TO BE ADDED
- Line chart background options: inflation heatmap, presidential administrations, recessions, major world events
- R^2 score for how well one variable accounts for the variance of another in the scatter chart
- Improve usability across data series that use different time intervals, have different start/end dates
- Better user interface for data series selection dropdowns
- References for data sources (see all caps above)
- The ability to conduct math operations among data series
- The ability to implement a "lag" in data series to look at delayed relationships, correlations and causality
- Add a "build your own" multivariate regression model
- DRASTICALLY improve the existing models.  They are all currently very basic multiple regressions, with no scaling, no consideration of omitted variable biases, no instrumental variables, no lag functionality, and other glaring weaknesses.
- Build sector-specific models (natural resources, services, labor, etc.)
- Once sector-specific models are complete, build an ensemble model
- Build a complex neural network model.
