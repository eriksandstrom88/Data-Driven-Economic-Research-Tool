# Data-Driven-Economic-Research-Tool
HIGH LEVEL OVERVIEW
- Tool for macroeconomic research
- Most data extracted from St. Louis Federal Reserve's FRED API, with the rest extracted from the Wall Street Journal
- Data cleaned, organized and calculations run in Jupyter Notebook
- Loaded into a PostgreSQL database (in hindsight I would use MongoDB; Postgres made sense when I started the project and I stuck with it; I may migrate at a later date)
- Application features a line chart and corresponding summary statistics tables to examine long term trends
- Application features a scatter plot to more closely examine the relationship between two data series
- Application features 3 multiple regression models to forecast different inflation indices

TECHNOLOGIES USED
- Python (Flask, Scikit-Learn, Pandas, Matplotlib, Numpy, SQLAlchemy, statistics, datetime)
- Javascript (D3.js)
- HTML5 (Bootstrap)
- CSS
- PostgreSQL

I wanted to create a tool for economists like me to be able to analyze data acquired from the St. Louis Federal Reserve's Federal Reserve Economic Data (FRED) API.  The result is a sophisticated application capable of processing and visualizing data observed at different time intervals and during different periods, reporting key statistics and information along with the visuals.

The tool includes a line chart for visualizing time series economic data, and corresponding summary statistics tables.  The user can choose up to 5 data series to visualize on the chart using dropdowns.  The user may also add backgrounds to the chart to visualize major world events, presidential administrations, and economic recessions along with the time-series data.  The summary statistics tables are responsive to changing data selections, as well as to the user zooming in on a certain time interval for a closer look.

![image](https://user-images.githubusercontent.com/75816400/136378885-b8e0ed55-7bad-4911-b5ed-3365e386fc40.png)

The table to the right of the dropdowns displays the full name of the data series, as well as the units, time interval, start date, and the FRED series code.

![image](https://user-images.githubusercontent.com/75816400/136379273-0d2f04b6-40d3-49de-b59c-1045c71dbd0d.png)

The scatter plot below allows the user to take a closer look at a direct comparison of two data series.  Using similar dropdowns, the user can select which series to examine.  Additionally, the user may select "change" or "percent change," which are calculted based on the main series, and adjust depending on the observation interval.  The user may also "lag" one of the data series to examine if there is a stronger relationship between the two series of the observations in one series are "delayed" or "lagged" by one or more intervals (days, weeks, months, quarters, or years depending on the series).  Finally, the user may choose to filter to data after a certain start date, before a certain end date,or both by entering a date range.

![image](https://user-images.githubusercontent.com/75816400/136380343-8b8fc162-0a56-49c9-8929-ea2b9bdd6fc5.png)

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
