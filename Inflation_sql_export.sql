-- USE THESE USE THESE USE THESE USE THESE USE THESE USE THESE USE THESE USE THESE USE THESE USE THESE

DROP TABLE m1m2;
CREATE TABLE m1m2 (
    Date DATE   NOT NULL,
    M1 FLOAT,
    M1_Change FLOAT,
    M1_Pct_Change FLOAT,
    M2 FLOAT,
    M2_Change FLOAT,
    M2_Pct_Change FLOAT,
    Non_M1_Components_M2 FLOAT,
    Non_M1_Components_M2_Change FLOAT,
    Non_M1_Components_M2_Pct_Change FLOAT,
    CONSTRAINT pk_m1m2_df PRIMARY KEY (
        Date
     )
);

DROP TABLE velocity;
CREATE TABLE velocity (
    Date DATE   NOT NULL,
    M1V FLOAT,
    M1V_Change FLOAT,
    M1V_Pct_Change FLOAT,
    M2V FLOAT,
    M2V_Change FLOAT,
    M2V_Pct_Change FLOAT,
    CONSTRAINT pk_velocity PRIMARY KEY (
        Date
     )
);

DROP TABLE consumer_monthly;
CREATE TABLE consumer_monthly (
    Date DATE   NOT NULL,
    Pop FLOAT,
    Pop_Change FLOAT,
    Pop_Pct_Change FLOAT,
    PCE_Index FLOAT,
    PCE_Index_Change FLOAT,
    PCE_Index_Pct_Change FLOAT,
    Unemployment FLOAT,
    Unemployment_Change FLOAT,
    Unemployment_Pct_Change FLOAT,
    Personal_Savings_Rate FLOAT,
    Personal_Savings_Rate_Change FLOAT,
    Personal_Savings_Rate_Pct_Change FLOAT,
    Average_Hourly_Wage FLOAT,
    Average_Hourly_Wage_Change FLOAT,
    Average_Hourly_Wage_Pct_Change FLOAT,
    Personal_Savings FLOAT,
    Personal_Savings_Change FLOAT,
    Personal_Savings_Pct_Change FLOAT,
    Consumer_Sentiment FLOAT,
    Consumer_Seintiment_Change FLOAT,
    Consumer_Sentiment_Pct_Change FLOAT,
    CPI_Vehicles FLOAT,
    CPI_Vehicles_Change FLOAT,
    CPI_Vehicles_Pct_Change FLOAT,
    CPI_Eggs FLOAT,
    CPI_Eggs_Change FLOAT,
    CPI_Eggs_Pct_Change FLOAT,
    CPI_Apparel_Cities FLOAT,
    CPI_Apparel_Cities_Change FLOAT,
    CPI_Apparel_Cities_Pct_Change FLOAT,
    CPI_Housing_Cities FLOAT,
    CPI_Housing_Cities_Change FLOAT,
    CPI_Housing_Cities_Pct_Change FLOAT,
    Real_PCE_Durable_Goods FLOAT,
    Real_PCE_Durable_Goods_Change FLOAT,
    Real_PCE_Durable_Goods_Pct_Change FLOAT,
    CPI_Urban_Transportation FLOAT,
    CPI_Urban_Transportation_Change FLOAT,
    CPI_Urban_Transportation_Pct_Change FLOAT,
    PCE FLOAT,
    PCE_Change FLOAT,
    PCE_Pct_Change FLOAT,
    Labor_Participation_Rate FLOAT,
    Labor_Participation_Rate_Change FLOAT,
    Labor_Participation_Rate_Pct_Change FLOAT,
    Real_PCE FLOAT,
    Real_PCE_Change FLOAT,
    Real_PCE_Pct_Change FLOAT,
    PCE_Durable_Goods FLOAT,
    PCE_Durable_Goods_Change FLOAT,
    PCE_Durable_Goods_Pct_Change FLOAT,
    Job_Openings_nonfarm FLOAT,
    Job_Openings_nonfarm_Change FLOAT,
    Job_Openings_nonfarm_Pct_Change FLOAT,
    PCE_NonDurable_Goods FLOAT,
    PCE_NonDurable_Goods_Change FLOAT,
    PCE_NonDurable_Goods_Pct_Change FLOAT,
    Real_Disposable_Personal_Income FLOAT,
    Real_Disposable_Personal_Income_Change FLOAT,
    Real_Disposable_Personal_Income_Pct_Change FLOAT,
    CONSTRAINT pk_consumer_monthly PRIMARY KEY (
        Date
     )
);

DROP TABLE ppi_monthly;
CREATE TABLE ppi_monthly (
    Date DATE   NOT NULL,
    PPI_Manufacturing FLOAT,
    PPI_Manufacturing_Change FLOAT,
    PPI_Manufacturing_Pct_Change FLOAT,
    PPI_All_Commodities FLOAT,
    PPI_All_Commodities_Change FLOAT,
    PPI_All_Commodities_Pct_Change FLOAT,
    PPI_Wood_Pulp FLOAT,
    PPI_Wood_Pulp_Change FLOAT,
    PPI_Wood_Pulp_Pct_Change FLOAT,
    PPI_Metals FLOAT,
    PPI_Metals_Change FLOAT,
    PPI_Metals_Pct_Change FLOAT,
	Copper_Price FLOAT,
	Copper_Price_Change FLOAT,
	Copper_Price_Pct_Change FLOAT,
    PPI_Plastics_Resins FLOAT,
    PPI_Plastics_Resins_Change FLOAT,
    PPI_Plastics_Resins_Pct_Change FLOAT,
    PPI_Iron_Steel FLOAT,
    PPI_Iron_Steel_Change FLOAT,
    PPI_Iron_Steel_Pct_Change FLOAT,
    Global_Wheat_Price FLOAT,
    Global_Wheat_Price_Change FLOAT,
    Global_Wheat_Price_Pct_Change FLOAT,
    PPI_Steel_Wire FLOAT,
    PPI_Steel_Wire_Change FLOAT,
    PPI_Steel_Wire_Pct_Change FLOAT,
    PPI_Freight FLOAT,
    PPI_Freight_Change FLOAT,
    PPI_Freight_Pct_Change FLOAT,
    Global_Aluminum_Price FLOAT,
    Global_Aluminum_Price_Change FLOAT,
    Global_Aluminum_Price_Pct_Change FLOAT,
    PPI_Building_Materials FLOAT,
    PPI_Building_Materials_Change FLOAT,
    PPI_Building_Materials_Pct_Change FLOAT,
    PPI_Wood_Lumber FLOAT,
    PPI_Wood_Lumber_Change FLOAT,
    PPI_Wood_Lumber_Pct_Change FLOAT,
    Global_Corn_Price FLOAT,
    Global_Corn_Price_Change FLOAT,
    Global_Corn_Price_Pct_Change FLOAT,
    Global_Iron_Price FLOAT,
    Global_Iron_Price_Change FLOAT,
    Global_Iron_Price_Pct_Change FLOAT,
    Global_Rubber_Price FLOAT,
    Global_Rubber_Price_Change FLOAT,
    Global_Rubber_Price_Pct_Change FLOAT,
    PPI_Lumber FLOAT,
    PPI_Lumber_Change FLOAT,
    PPI_Lumber_Pct_Change FLOAT,
    PPI_Cement_Concrete FLOAT,
    PPI_Cement_Concrete_Change FLOAT,
    PPI_Cement_Concrete_Pct_Change FLOAT,
    PPI_Semiconductors_Electronics FLOAT,
    PPI_Semiconductors_Electronics_Change FLOAT,
    PPI_Semiconductors_Electronics_Pct_Change FLOAT,
    CONSTRAINT pk_ppi_monthly PRIMARY KEY (
        Date
     )
);

DROP TABLE gdp_quarterly;
CREATE TABLE gdp_quarterly (
    Date DATE   NOT NULL,
    GDP FLOAT,
    GDP_Change FLOAT,
    GDP_Pct_Change FLOAT ,
    Nom_GDPCap FLOAT,
    Nom_GDPCap_Change FLOAT,
    Nom_GDPCap_Pct_Change FLOAT,
    Real_GDP FLOAT,
    Real_GDP_Change FLOAT,
    Real_GDP_Pct_Change FLOAT,
    Real_GDPCapita FLOAT,
    Real_GDPCap_Change FLOAT,
    Real_GDPCap_Pct_Change FLOAT,
    GDP_Deflator FLOAT,
    GDP_Deflator_Change FLOAT,
    GDP_Deflator_Pct_Change FLOAT,
    GNP FLOAT,
    GNP_Change FLOAT,
    GNP_Pct_Change FLOAT,
    CONSTRAINT pk_gdp_quarterly PRIMARY KEY (
        Date
     )
);

DROP TABLE consumers_quarterly;
CREATE TABLE consumers_quarterly (
    Date DATE   NOT NULL,
    Ecommerce_Pct_of_Totalsales FLOAT,
    Ecommerce_Pct_of_Totalsales_Change FLOAT,
    Ecommerce_Pct_of_Totalsales_Pct_Change FLOAT,
    Median_House_Sale_Price FLOAT,
    Median_House_Sale_Price_Change FLOAT,
    Median_House_Sale_Price_Pct_Change FLOAT,
    House_Debt_GDP_Ratio FLOAT,
    House_Debt_GDP_Ratio_Change FLOAT,
    House_Debt_GDP_Ratio_Pct_Change FLOAT,
    Real_Output_Hour FLOAT,
    Real_Output_Hour_Change FLOAT,
    Real_Output_Hour_Pct_Change FLOAT,
    Corporate_Profits_After_Tax FLOAT,
    Corporate_Profits_After_Tax_Change FLOAT,
    Corporate_Profits_After_Tax_Pct_Change FLOAT,
    PCE_Services FLOAT,
    PCE_Services_Change FLOAT,
    PCE_Services_Pct_Change FLOAT,
    Rental_Vacancy_Rate FLOAT,
    Rental_Vacancy_Rate_Change FLOAT,
    Rental_Vacancy_Rate_Pct_Change FLOAT,
    Mortgage_Delinquency FLOAT,
    Mortgage_Delinquency_Change FLOAT,
    Mortgage_Delinquency_Pct_Change FLOAT,
    Household_Debt_Service_PmtPctGDP FLOAT,
    Household_Debt_Service_PmtPctGDP_Change FLOAT,
    Household_Debt_Service_PmtPctGDP_Pct_Change FLOAT,
    Homeownership_Rate FLOAT,
    Homeownership_Rate_Change FLOAT,
    Homeownership_Rate_Pct_Change FLOAT,
    CreditCard_Delinquency_Rate FLOAT,
    CreditCard_Delinquency_Rate_Change FLOAT,
    CreditCard_Delinquency_Rate_Pct_Change FLOAT,
    Wealth_Share_Top1pct FLOAT,
    Wealth_Share_Top1pct_Change FLOAT,
    Wealth_Share_Top1pct_Pct_Change FLOAT,
    Gross_Private_Saving FLOAT,
    Gross_Private_Saving_Change FLOAT,
    Gross_Private_Saving_Pct_Change FLOAT,
    Real_Residential_Property_Price FLOAT,
    Real_Residential_Property_Price_Change FLOAT,
    Real_Residential_Property_Price_Pct_Change FLOAT,
    Bottom_50pct_Net_Worth FLOAT,
    Bottom_50pct_Net_Worth_Change FLOAT,
    Bottom_50pct_Net_Worth_Pct_Change FLOAT,
    Debt_as_Pct_Corporate_Equities FLOAT,
    Debt_as_Pct_Corporate_Equities_Change FLOAT,
    Debt_as_Pct_Corporate_Equities_Pct_Change FLOAT,
    Wealth_Total_Top1pct FLOAT,
    Wealth_Total_Top1pct_Change FLOAT,
    Wealth_Total_Top1pct_Pct_Change FLOAT,
    Consumer_Loan_Delinquency_Rate FLOAT,
    Consumer_Loan_Delinquency_Rate_Change FLOAT,
    Consumer_Loan_Delinquency_Rate_Pct_Change FLOAT,
    CONSTRAINT pk_consumers_quarterly PRIMARY KEY (
        Date
     )
);

DROP TABLE cpi_monthly;
CREATE TABLE cpi_monthly (
    Date DATE   NOT NULL,
    CPI FLOAT,
    CPI_Change FLOAT,
    CPI_Pct_Change FLOAT,
    Inf_Expectation FLOAT,
    Inf_Expectation_Change FLOAT,
    Inf_Expectation_Pct_Change FLOAT,
    CPI_Core FLOAT,
    CPI_Core_Change FLOAT,
    CPI_Core_Pct_Change FLOAT,
    CPI_Medical FLOAT,
    CPI_Medical_Change FLOAT,
    CPI_Medical_Pct_Change FLOAT,
    CPI_Urban FLOAT,
    CPI_Urban_Change FLOAT,
    CPI_Urban_Pct_Change FLOAT,
    CPI_Primary_Rent FLOAT,
    CPI_Primary_Rent_Change FLOAT,
    CPI_Primary_Rent_Pct_Change FLOAT,
    CPI_Food_Bev FLOAT,
    CPI_Food_Bev_Change FLOAT,
    CPI_Food_Bev_Pct_Change FLOAT,
    CONSTRAINT pk_cpi_monthly PRIMARY KEY (
        Date
     )
);

DROP TABLE banks_week_month;
CREATE TABLE banks_week_month (
    Date DATE   NOT NULL,
    Commercial_Industrial_Loans FLOAT,
    Commercial_Industrial_Loans_Change FLOAT,
    Commercial_Industrial_Loans_Pct_Change FLOAT,
    Fed_Funds_Rate FLOAT,
    Fed_Funds_Rate_Change FLOAT,
    Fed_Funds_Rate_Pct_Change FLOAT,
    Commercial_Bank_Deposits FLOAT,
    Commercial_Bank_Deposits_Change FLOAT,
    Commercial_Bank_Deposits_Pct_Change FLOAT,
    Commercial_Bank_Assets FLOAT,
    Commercial_Bank_Assets_Change FLOAT,
    Commercial_Bank_Assets_Pct_Change FLOAT,
    Reserve_Balances FLOAT,
    Reserve_Balances_Change FLOAT,
    Reserve_Balances_Pct_Change FLOAT,
    Commercial_Bank_Credit FLOAT,
    Commercial_Bank_Credit_Change FLOAT,
    Commercial_Bank_Credit_Pct_Change FLOAT,
    _30yr_Fixed_Rate_Mortgage FLOAT,
    _30yr_Fixed_Rate_Mortgage_Change FLOAT,
    _30yr_Fixed_Rate_Mortgage_Pct_Change FLOAT,
    Consumer_Loans_Com_Banks FLOAT,
    Consumer_Loans_Com_Banks_Change FLOAT,
    Consumer_Loans_Com_Banks_Pct_Change FLOAT,
    Commercial_Bank_Cash_Assets FLOAT,
    Commercial_Bank_Cash_Assets_Change FLOAT,
    Commercial_Bank_Cash_Assets_Pct_Change FLOAT,
    CONSTRAINT pk_banks_week_month PRIMARY KEY (
        Date
     )
);

DROP TABLE government_quarterly;
CREATE TABLE government_quarterly (
    Date DATE   NOT NULL,
    Federal_Debt FLOAT,
    Federal_Debt_Change FLOAT,
    Federal_Debt_Pct_Change FLOAT,
    Debt_Pct_GDP FLOAT,
    Debt_Pct_GDP_Change FLOAT,
    Debt_Pct_GDP_Pct_Change FLOAT,
    Government_Expenditures FLOAT,
    Government_Expenditures_Change FLOAT,
    Government_Expenditures_Pct_Change FLOAT,
    Federal_Debt_Held_by_Public FLOAT,
    Federal_Debt_Held_by_Public_Change FLOAT,
    Federal_Debt_Held_by_Public_Pct_Change FLOAT,
    FR_Held_Debt FLOAT,
    FR_held_debt_chg FLOAT,
    FR_held_debt_pct_chg FLOAT,
    Government_Transfer_Payments FLOAT,
    Government_Transfer_Payments_Change FLOAT,
    Government_Transfer_Payments_Pct_Change FLOAT,
    Federal_Surplus_Deficit FLOAT,
    Federal_Surplus_Deficit_Change FLOAT,
    Federal_Surplus_Deficit_Pct_Change FLOAT,
    Corporate_Income_Tax_Receipts FLOAT,
    Corporate_Income_Tax_Receipts_Change FLOAT,
    Corporate_Income_Tax_Receipts_Pct_Change FLOAT,
    CONSTRAINT pk_government_quarterly PRIMARY KEY (
        Date
     )
);

DROP TABLE federal_reserve_weekly;
CREATE TABLE federal_reserve_weekly (
    Date DATE   NOT NULL,
    Financial_Stress FLOAT,
    Financial_Stress_Change FLOAT,
    Financial_Stress_Pct_Change FLOAT,
    Fed_Assets FLOAT,
    Fed_Assets_Change FLOAT,
    Fed_Assets_Pct_Change FLOAT,
    Fed_Res_Held_Treasuries FLOAT,
    Fed_Res_Held_Treasuries_Change FLOAT,
    Fed_Res_Held_Treasuries_Pct_Change FLOAT,
    Fed_Liabilities_non_reserve_deposits FLOAT,
    Fed_Liabilities_non_reserve_deposits_Change FLOAT,
    Fed_Liabilities_non_reserve_deposits_Pct_Change FLOAT,
    Fed_MBS FLOAT,
    Fed_MBS_Change FLOAT,
    Fed_MBS_Pct_Change FLOAT,
    Total_Fed_Assets FLOAT,
    Total_Fed_Assets_Change FLOAT,
    Total_Fed_Assets_Pct_Change FLOAT,
    CONSTRAINT pk_federal_reserve_weekly PRIMARY KEY (
        Date
     )
);

DROP TABLE foreign_trade_month_quarter;
CREATE TABLE foreign_trade_month_quarter (
    Date DATE   NOT NULL,
    Net_Trade FLOAT,
    Net_Trade_Change FLOAT,
    Net_Trade_Pct_Change FLOAT,
    Net_Exports FLOAT,
    Net_Exports_Change FLOAT,
    Net_Exports_Pct_Change FLOAT,
	Net_Exports_PctofGDP FLOAT,
	Net_Exports_PctofGDP_Change FLOAT,
    Net_Exports_PctofGDP_Pct_Change FLOAT,
    Real_Imports FLOAT,
    Real_Imports_Change FLOAT,
    Real_Imports_Pct_Change FLOAT,
    Imports_Goods_Services FLOAT,
    Imports_Goods_Services_Change FLOAT,
    Imports_Goods_Services_Pct_Change FLOAT,
    CPI_India FLOAT,
    CPI_India_Change FLOAT,
    CPI_India_Pct_Change FLOAT,
    Imports_from_China FLOAT,
    Imports_from_China_Change FLOAT,
    Imports_from_China_Pct_Change FLOAT,
    All_Commodities_Import_Price_Index FLOAT,
    All_Commodities_Import_Price_Index_Change FLOAT,
    All_Commodities_Import_Price_Index_Pct_Change FLOAT,
    CONSTRAINT pk_foreign_trade_month_quarter PRIMARY KEY (
        Date
     )
);

DROP TABLE investment_month_quarter;
CREATE TABLE investment_month_quarter (
    Date DATE   NOT NULL,
    Construction_Spending FLOAT,
    Construction_Spending_Change FLOAT,
    Construction_Spending_Pct_Change FLOAT,
    Housing_Starts FLOAT,
    Housing_Starts_Change FLOAT,
    Housing_Starts_Pct_Change FLOAT,
    Real_Gross_Domestic_Private_Investment FLOAT,
    Real_Gross_Domestic_Private_Investment_Change FLOAT,
    Real_Gross_Domestic_Private_Investment_Pct_Change FLOAT,
    Gross_Domestic_Private_Investment FLOAT,
    Gross_Domestic_Private_Investment_Change FLOAT,
    Gross_Domestic_Private_Investment_Pct_Change FLOAT,
    CONSTRAINT pk_investment_month_quarter PRIMARY KEY (
        Date
     )
);

DROP TABLE misc_annual;
CREATE TABLE misc_annual (
    Date DATE   NOT NULL,
    Deficit_Surplus FLOAT,
    Deficit_Surplus_Change FLOAT,
    Deficit_Surplus_Pct_Change FLOAT,
    Stock_Market_Cap FLOAT,
    Stock_Market_Cap_Change FLOAT,
    Stock_Market_Cap_Pct_Change FLOAT,
    Real_Median_House_Income FLOAT,
    Real_Median_House_Income_Change FLOAT,
    Real_Median_House_Income_Pct_Change FLOAT,
    Inflation_Consumer_Price FLOAT,
    Inflation_Consumer_Price_Change FLOAT,
    Inflation_Consumer_Price_Pct_Change FLOAT,
    CONSTRAINT pk_annual_misc PRIMARY KEY (
        Date
     )
);
DROP TABLE misc_daily;
CREATE TABLE misc_daily (
    Date DATE NOT NULL,
    Inf_Expectation_5yr FLOAT,
    Inf_Expectation_5yr_Change FLOAT,
    Inf_Expectation_5yr_Pct_Change FLOAT,
    Price_per_Barrel FLOAT,
    Price_per_Barrel_Change FLOAT,
    Price_per_Barrel_Pct_Change FLOAT,
    Economic_Uncertainty FLOAT,
    Economic_Uncertainty_Change FLOAT,
    Economic_Uncertainty_Pct_Change FLOAT,
    _10_Year_Breakeven_Inflation FLOAT,
    _10_Year_Breakeven_Inflation_Change FLOAT,
    _10_Year_Breakeven_Inflation_Pct_Change FLOAT,
    CONSTRAINT pk_daily_misc PRIMARY KEY (
        Date
    )
);

DROP TABLE stocks_gold_daily;
CREATE TABLE stocks_gold_daily (
	Date DATE NOT NULL,
	DJIA_Close FLOAT,
    DJIA_Close_Change FLOAT,
    DJIA_Close_Pct_Change FLOAT,
    NASDAQ_Close FLOAT,
    NASDAQ_Close_Change FLOAT,
    NASDAQ_Close_Pct_Change FLOAT,
    SP500_Close FLOAT,
    SP500_Close_Change FLOAT,
    SP500_Close_Pct_Change FLOAT,
    Gold_Price FLOAT,
    Gold_Price_Change FLOAT,
    Gold_Price_Pct_Change FLOAT,
	CONSTRAINT pk_stocks_gold_daily PRIMARY KEY (
        Date
    )
);
