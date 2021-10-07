# Data-Driven-Economic-Research-Tool
HIGH LEVEL OVERVIEW
- Tool for macroeconomic research
- Most data extracted from St. Louis Federal Reserve's FRED API, with the rest extracted from the Wall Street Journal
- Data cleaned, organized and calculations run in Jupyter Notebook
- Loaded into a PostgreSQL database (in hindsight I would use MongoDB; Postgres made sense when I started the project and I stuck with it; I may migrate at a later date)
- Application features a line chart and corresponding summary statistics tables to examine long term trends
- Application features a scatter plot to more closely examine the relationship between two data series
- Application features 3 multiple regression models to forecast different inflation indices (currently very flawed; see bottom of this ReadMe)
- Scroll to bottom to read planned additional features and models.

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

![image](https://user-images.githubusercontent.com/75816400/136380813-e9c1b79f-69ea-4f3e-b643-d306052d18d1.png)

Lastly, below the scatter plot are three regression models for forecasting three of the mainstream measures of inflation: Consumer Price Index, Personal Consumption Expenditures, and GDP Deflator.  The user can in put values for as many as 10 variables to see how they affect the forecast.

![image](https://user-images.githubusercontent.com/75816400/136381875-b4daeccf-373b-4e9c-9048-df213c35af7a.png)

The data is stored in a PostgreSQL database.  I use a Flask application in combination with JavaScript, HTML and CSS to build all of the functionality.

I am the sole author of the entire application, though I did receive some help and guidance from the teaching staff of my Data Analytics bootcamp as I was first getting started, Kevin Lee, Adrienne Tecza, and Leah Stuckey.

I still have big plans for adding features, functionality, more complex models and more friendly user interface in the coming months.

FEATURES TO BE ADDED
- DRASTICALLY improve the existing models (currently tons of omitted variable bias, colinearity, etc.)
- Add additional models (neural network, SVM, association rule mining, models based on different scaling techniques)
- The ability to conduct math operations among data series
- Add a "build your own" multivariate regression model
- Build sector-specific models (natural resources, services, labor, etc.)
- Once sector-specific models are complete, build an ensemble model
