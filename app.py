#Flask Application app.py

from flask import Flask, render_template, redirect, jsonify
import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import os
import psycopg2
from flask_cors import CORS
import scipy.stats as sts
from scipy.stats import linregress
import statistics
from sklearn.linear_model import LinearRegression, Ridge
# CORS(app)
engine = create_engine("postgresql://postgres:postgres@localhost/Inflation")
Base = automap_base()
Base.prepare(engine, reflect=True)
Banks_week_month = Base.classes.banks_week_month
Consumer_monthly = Base.classes.consumer_monthly
Consumers_quarterly = Base.classes.consumers_quarterly
Cpi_monthly = Base.classes.cpi_monthly
Dates = Base.classes.dates
Federal_reserve_weekly = Base.classes.federal_reserve_weekly
Foreign_trade_month_quarter = Base.classes.foreign_trade_month_quarter
Gdp_quarterly = Base.classes.gdp_quarterly
Government_quarterly = Base.classes.government_quarterly
Investment_month_quarter = Base.classes.investment_month_quarter
M1m2 = Base.classes.m1m2
Misc_annual = Base.classes.misc_annual
Misc_daily = Base.classes.misc_daily
Ppi_monthly = Base.classes.ppi_monthly
Stocks_gold_daily = Base.classes.stocks_gold_daily
Velocity = Base.classes.velocity

column_table_index = {'m1': 'm1m2', 'm2': 'm1m2', 'non_m1_components_m2': 'm1m2', 'm1v': 'velocity', 'm2v': 'velocity', 'gdp': 'gdp_quarterly', 'nom_gdpcap': 'gdp_quarterly',  'real_gdp': 'gdp_quarterly', 'real_gdpcap': 'gdp_quarterly', 'gdp_deflator': 'gdp_quarterly', 'gnp': 'gdp_quarterly', 'federal_debt': 'government_quarterly', 'debt_pct_gdp': 'government_quarterly', 'government_expenditures': 'government_quarterly', 'federal_surplus_deficit': 'government_quarterly', 'deficit_surplus': 'misc_annual', 'fr_held_debt': 'government_quarterly', 'federal_debt_held_by_public': 'government_quarterly', 'corporate_income_tax_receipts': 'government_quarterly', 'government_transfer_payments': 'government_quarterly', 'fed_funds_rate': 'banks_week_month', 'fed_assets': 'federal_reserve_weekly', 'total_fed_assets': 'federal_reserve_weekly', 'fed_res_held_treasuries': 'federal_reserve_weekly', 'fed_mbs': 'federal_reserve_weekly', 'fed_liabilities_non_reserve_deposits': 'federal_reserve_weekly', 'financial_stress': 'federal_reserve_weekly', 'reserve_balances': 'banks_week_month', 'commercial_bank_cash_assets': 'banks_week_month', 'commercial_bank_assets': 'banks_week_month', 'commercial_bank_credit': 'banks_week_month', 'commercial_bank_deposits': 'banks_week_month', 'commercial_industrial_loans': 'banks_week_month', 'consumer_loans_com_banks': 'banks_week_month', '_30yr_fixed_rate_mortgage': 'banks_week_month', 'gold_price': 'stocks_gold_daily', 'silver_price': 'stocks_gold_daily', 'djia_close': 'stocks_gold_daily', 'nasdaq_close': 'stocks_gold_daily', 'sp500_close': 'stocks_gold_daily', 'stock_market_cap': 'misc_annual', 'price_per_barrel': 'misc_daily', 'ppi_all_commodities': 'ppi_monthly', 'ppi_manufacturing': 'ppi_monthly', 'ppi_building_materials': 'ppi_monthly', 'ppi_metals': 'ppi_monthly', 'copper_price': 'ppi_monthly', 'ppi_iron_steel': 'ppi_monthly', 'global_iron_price': 'ppi_monthly', 'ppi_steel_wire': 'ppi_monthly', 'global_aluminum_price': 'ppi_monthly', 'ppi_wood_lumber': 'ppi_monthly', 'ppi_lumber': 'ppi_monthly', 'ppi_wood_pulp': 'ppi_monthly', 'ppi_cement_concrete': 'ppi_monthly', 'ppi_plastics_resins': 'ppi_monthly', 'global_rubber_price': 'ppi_monthly', 'ppi_semiconductors_electronics': 'ppi_monthly', 'global_corn_price': 'ppi_monthly', 'global_wheat_price': 'ppi_monthly', 'ppi_freight': 'ppi_monthly', 'population': 'consumer_monthly', 'economic_uncertainty': 'misc_daily', 'consumer_sentiment': 'consumer_monthly', 'inf_expectation': 'cpi_monthly', 'inf_expectation_fiveyr': 'misc_daily', 'ten_year_breakeven_inflation': 'misc_daily','inflation_consumer_price': 'misc_annual', 'unemployment': 'consumer_monthly', 'job_openings_nonfarm': 'consumer_monthly', 'labor_participation_rate': 'consumer_monthly', 'real_output_hour': 'consumers_quarterly', 'real_median_house_income': 'misc_annual', 'average_hourly_wage': 'consumer_monthly', 'real_disposable_personal_income': 'consumer_monthly', 'wealth_total_top1pct': 'consumers_quarterly', 'wealth_share_top1pct': 'consumers_quarterly', 'bottom_50pct_net_worth': 'consumers_quarterly', 'corporate_profits_after_tax': 'consumers_quarterly', 'debt_as_pct_corporate_equities': 'consumers_quarterly', 'personal_savings': 'consumer_monthly', 'gross_private_saving': 'consumers_quarterly', 'house_debt_gdp_ratio': 'consumers_quarterly', 'household_debt_service_pmtpctgdp': 'consumers_quarterly', 'consumer_loan_delinquency_rate': 'consumers_quarterly', 'creditcard_delinquency_rate': 'consumers_quarterly', 'homeownership_rate': 'consumers_quarterly', 'median_house_sale_price': 'consumers_quarterly', 'real_residential_property_price': 'consumers_quarterly', 'mortgage_delinquency': 'consumers_quarterly', 'rental_vacancy_rate': 'consumers_quarterly', 'pce_index': 'consumer_monthly', 'pce': 'consumer_monthly', 'real_pce': 'consumer_monthly', 'pce_durable_goods': 'consumer_monthly', 'real_pce_durable_goods': 'consumer_monthly', 'pce_nondurable_goods': 'consumer_monthly', 'pce_services': 'consumers_quarterly', 'cpi': 'cpi_monthly', 'cpi_core': 'cpi_monthly', 'cpi_urban': 'cpi_monthly', 'cpi_housing_cities': 'consumer_monthly', 'cpi_primary_rent': 'cpi_monthly', 'cpi_vehicles': 'consumer_monthly', 'cpi_urban_transportation': 'consumer_monthly', 'cpi_medical': 'cpi_monthly', 'cpi_food_bev': 'cpi_monthly', 'cpi_eggs': 'consumer_monthly', 'cpi_apparel_cities': 'consumer_monthly', 'ecommerce_pct_of_totalsales': 'consumers_quarterly', 'net_exports': 'foreign_trade_month_quarter', 'net_exports_pctofgdp': 'foreign_trade_month_quarter', 'net_trade': 'foreign_trade_month_quarter', 'imports_goods_services': 'foreign_trade_month_quarter', 'real_imports': 'foreign_trade_month_quarter', 'all_commodities_import_price_index': 'foreign_trade_month_quarter', 'imports_from_china': 'foreign_trade_month_quarter', 'cpi_india': 'foreign_trade_month_quarter', 'gross_domestic_private_investment': 'investment_month_quarter','real_gross_domestic_private_investment': 'investment_month_quarter', 'construction_spending': 'investment_month_quarter', 'housing_starts': 'investment_month_quarter'}

main_series_index = {1: 'm1',
 2: 'm2',
 3: 'non_m1_components_m2',
 4: 'm1v',
 5: 'm2v',
 6: 'gdp',
 7: 'nom_gdpcap',
 8: 'real_gdp',
 9: 'real_gdpcap',
 10: 'gdp_deflator',
 11: 'gnp',
 12: 'federal_debt',
 13: 'debt_pct_gdp',
 14: 'government_expenditures',
 15: 'federal_surplus_deficit',
 16: 'deficit_surplus',
 17: 'fr_held_debt',
 18: 'federal_debt_held_by_public',
 19: 'corporate_income_tax_receipts',
 20: 'government_transfer_payments',
 21: 'fed_funds_rate',
 22: 'fed_assets',
 23: 'total_fed_assets',
 24: 'fed_res_held_treasuries',
 25: 'fed_mbs',
 26: 'fed_liabilities_non_reserve_deposits',
 27: 'financial_stress',
 28: 'reserve_balances',
 29: 'commercial_bank_cash_assets',
 30: 'commercial_bank_assets',
 31: 'commercial_bank_credit',
 32: 'commercial_bank_deposits',
 33: 'commercial_industrial_loans',
 34: 'consumer_loans_com_banks',
 35: '_30yr_fixed_rate_mortgage',
 36: 'gold_price',
 37: 'housing_starts',
 38: 'djia_close',
 39: 'nasdaq_close',
 40: 'sp500_close',
 41: 'stock_market_cap',
 42: 'price_per_barrel',
 43: 'ppi_all_commodities',
 44: 'ppi_manufacturing',
 45: 'ppi_building_materials',
 46: 'ppi_metals',
 47: 'copper_price',
 48: 'ppi_iron_steel',
 49: 'global_iron_price',
 50: 'ppi_steel_wire',
 51: 'global_aluminum_price',
 52: 'ppi_wood_lumber',
 53: 'ppi_lumber',
 54: 'ppi_wood_pulp',
 55: 'ppi_cement_concrete',
 56: 'ppi_plastics_resins',
 57: 'global_rubber_price',
 58: 'ppi_semiconductors_electronics',
 59: 'global_corn_price',
 60: 'global_wheat_price',
 61: 'ppi_freight',
 62: 'pop',
 63: 'economic_uncertainty',
 64: 'consumer_sentiment',
 65: 'inf_expectation',
 66: 'inf_expectation_5yr',
 67: '_10_year_breakeven_inflation',
 68: 'inflation_consumer_price',
 69: 'unemployment',
 70: 'job_openings_nonfarm',
 71: 'labor_participation_rate',
 72: 'real_output_hour',
 73: 'real_median_house_income',
 74: 'average_hourly_wage',
 75: 'real_disposable_personal_income',
 76: 'wealth_total_top1pct',
 77: 'wealth_share_top1pct',
 78: 'bottom_50pct_net_worth',
 79: 'corporate_profits_after_tax',
 80: 'debt_as_pct_corporate_equities',
 81: 'personal_savings',
 82: 'personal_savings',
 83: 'gross_private_saving',
 84: 'house_debt_gdp_ratio',
 85: 'household_debt_service_pmtpctgdp',
 86: 'consumer_loan_delinquency_rate',
 87: 'creditcard_delinquency_rate',
 88: 'homeownership_rate',
 89: 'median_house_sale_price',
 90: 'real_residential_property_price',
 91: 'mortgage_delinquency',
 92: 'rental_vacancy_rate',
 93: 'pce_index',
 94: 'pce',
 95: 'real_pce',
 96: 'pce_durable_goods',
 97: 'real_pce_durable_goods',
 98: 'pce_nondurable_goods',
 99: 'pce_services',
 100: 'cpi',
 101: 'cpi_core',
 102: 'cpi_urban',
 103: 'cpi_housing_cities',
 104: 'cpi_primary_rent',
 105: 'cpi_vehicles',
 106: 'cpi_urban_transportation',
 107: 'cpi_medical',
 108: 'cpi_food_bev',
 109: 'cpi_eggs',
 110: 'cpi_apparel_cities',
 111: 'ecommerce_pct_of_totalsales',
 112: 'net_exports',
 113: 'net_exports_pctofgdp',
 114: 'net_trade',
 115: 'imports_goods_services',
 116: 'real_imports',
 117: 'all_commodities_import_price_index',
 118: 'imports_from_china',
 119: 'cpi_india',
 120: 'gross_domestic_private_investment',
 121: 'real_gross_domestic_private_investment',
 122: 'construction_spending'}

table_classes = {'stocks_gold_daily':Stocks_gold_daily,
                'consumer_monthly':Consumer_monthly,
                'ppi_monthly':Ppi_monthly,
                'consumers_quarterly':Consumers_quarterly,
                'misc_annual':Misc_annual,
                'misc_daily':Misc_daily,
                'gdp_quarterly':Gdp_quarterly,
                'dates':Dates,
                'm1m2':M1m2,
                'velocity':Velocity,
                'banks_week_month':Banks_week_month,
                'government_quarterly':Government_quarterly,
                'federal_reserve_weekly':Federal_reserve_weekly,
                'investment_month_quarter':Investment_month_quarter,
                'cpi_monthly':Cpi_monthly,
                'foreign_trade_month_quarter':Foreign_trade_month_quarter}

session=Session(engine)
cpi_dict = {}
cpi_query = session.execute("select date, cpi, cpi_change, cpi_pct_change from cpi_monthly where cpi is not null and date >= '1-1-1972' and date <='1-1-2020'")
session.close()
cpi_dict = {}
for each_row in cpi_query:
    cpi_dict[each_row[0]] = [each_row[1], each_row[2], each_row[3]]
cpi_df=pd.DataFrame.from_dict(cpi_dict, orient='index', columns=['cpi','cpi_change','cpi_pct_change'])
pce_query = session.execute("select date, pce, pce_change, pce_pct_change from consumer_monthly where pce is not null and date >= '1-1-1972' and date <='1-1-2020'")
session.close()
pce_dict = {}
for each_row in pce_query:
    pce_dict[each_row[0]] = [each_row[1], each_row[2], each_row[3]]
pce_df=pd.DataFrame.from_dict(pce_dict, orient='index', columns=['pce','pce_change','pce_pct_change'])
gdp_deflator_query = session.execute("select date, gdp_deflator, gdp_deflator_change, gdp_deflator_pct_change from gdp_quarterly where gdp_deflator is not null and date >= '1-1-1972' and date <='1-1-2020'")
session.close()
gdp_deflator_dict = {}
for each_row in gdp_deflator_query:
    gdp_deflator_dict[each_row[0]] = [each_row[1], each_row[2], each_row[3]]
gdp_deflator_df=pd.DataFrame.from_dict(gdp_deflator_dict, orient='index', columns=['gdp_deflator','gdp_deflator_change','gdp_deflator_pct_change'])
all_queries_dict = {}
for i in range(1,123):
    try:
        column = main_series_index[i]
        table = column_table_index[column]
        query = session.execute(f'select date, {column} from {table} where {column} is not null')
        session.close()
        query_dict = {}
        for each_row in query:
            query_dict[each_row[0]] = [each_row[1]]
        all_queries_dict[column] = query_dict
    except:
        print(f'couldnt query {column}')
cpi_model = LinearRegression()
pce_model = LinearRegression()
deflator_model = LinearRegression()
best_cpi_predictors_index = [2,7,14,33,34,72,75,79,115,121]
cpi_model_df = cpi_df
for each_cpi_predictor in best_cpi_predictors_index:
    column_name = main_series_index[each_cpi_predictor]
    cpi_predictor_df = pd.DataFrame.from_dict(all_queries_dict[column_name], orient='index', columns=[column_name])
    cpi_model_df = cpi_model_df.merge(cpi_predictor_df, left_index=True, right_index=True)
C = cpi_model_df[['m2', 'nom_gdpcap','government_expenditures','commercial_industrial_loans','consumer_loans_com_banks','real_output_hour','real_disposable_personal_income','corporate_profits_after_tax','imports_goods_services','real_gross_domestic_private_investment']]
c = cpi_model_df[['cpi']]
cpi_model_regress = cpi_model.fit(C,c)
cpi_r2_score = cpi_model_regress.score(C,c)
# Set up PCE model
best_pce_predictors_index = [2,7,14,20,33,34,72,75,89,121]
pce_model_df = pce_df
for each_pce_predictor in best_pce_predictors_index:
    column_name = main_series_index[each_pce_predictor] 
    pce_predictor_df = pd.DataFrame.from_dict(all_queries_dict[column_name], orient='index', columns=[column_name])
    pce_model_df = pce_model_df.merge(pce_predictor_df, left_index=True, right_index=True)
P = pce_model_df[['m2', 'nom_gdpcap','government_expenditures','government_transfer_payments','commercial_industrial_loans','consumer_loans_com_banks','real_output_hour','real_disposable_personal_income','median_house_sale_price','real_gross_domestic_private_investment']]
p = pce_model_df[['pce']] #1
pce_model_regress = pce_model.fit(P,p) #1
pce_coefs = pce_model_regress.coef_
pce_r2_score = pce_model_regress.score(P,p)
# Set up Deflator Model
best_deflator_predictors_index = [2,8,14,33,72,75,83,89,116,121]
deflator_model_df = gdp_deflator_df
for each_deflator_predictor in best_deflator_predictors_index:
    column_name = main_series_index[each_deflator_predictor]
    deflator_predictor_df = pd.DataFrame.from_dict(all_queries_dict[column_name], orient='index', columns=[column_name])
    deflator_model_df = deflator_model_df.merge(deflator_predictor_df, left_index=True, right_index=True)
D = deflator_model_df[['m2', 'real_gdp','government_expenditures','commercial_industrial_loans','real_output_hour','real_disposable_personal_income','gross_private_saving','median_house_sale_price','real_imports','real_gross_domestic_private_investment']]
d = deflator_model_df[['gdp_deflator']] #1
deflator_model_regress = deflator_model.fit(D,d) #1
deflator_coefs = deflator_model_regress.coef_
deflator_r2_score = deflator_model_regress.score(D,d)
latest_pce = pce_model_df['pce'][-1]
latest_pce_pct_change = round(((latest_pce-pce_model_df['pce'][-2])/pce_model_df['pce'][-2])*100,3)
latest_cpi = cpi_model_df['cpi'][-1]
latest_cpi_pct_change = round(((latest_cpi-cpi_model_df['cpi'][-2])/cpi_model_df['cpi'][-2])*100,3)
latest_deflator = deflator_model_df['gdp_deflator'][-1]
latest_deflator_pct_change = round(((latest_deflator-deflator_model_df['gdp_deflator'][-2])/deflator_model_df['gdp_deflator'][-2])*100,3)
latest_m2 = cpi_model_df['m2'][-1]
latest_m2_pct_change = round(((latest_m2-cpi_model_df['m2'][-2])/cpi_model_df['m2'][-2])*100,3)
latest_nom_gdpcap = cpi_model_df['nom_gdpcap'][-1]
latest_nom_gdpcap_pct_change = round(((latest_nom_gdpcap-cpi_model_df['nom_gdpcap'][-2])/cpi_model_df['nom_gdpcap'][-2])*100,3)
latest_government_expenditures = cpi_model_df['government_expenditures'][-1]
latest_government_expenditures_pct_change = round(((latest_government_expenditures-cpi_model_df['government_expenditures'][-2])/cpi_model_df['government_expenditures'][-2])*100,3)
latest_commercial_industrial_loans = cpi_model_df['commercial_industrial_loans'][-1]
latest_commercial_industrial_loans_pct_change = round(((latest_commercial_industrial_loans-cpi_model_df['commercial_industrial_loans'][-2])/cpi_model_df['commercial_industrial_loans'][-2])*100,3)
latest_consumer_loans_com_banks = cpi_model_df['consumer_loans_com_banks'][-1]
latest_consumer_loans_com_banks_pct_change = round(((latest_consumer_loans_com_banks-cpi_model_df['consumer_loans_com_banks'][-2])/cpi_model_df['consumer_loans_com_banks'][-2])*100,3)
latest_real_output_hour = cpi_model_df['real_output_hour'][-1]
latest_real_output_hour_pct_change = round(((latest_real_output_hour-cpi_model_df['real_output_hour'][-2])/cpi_model_df['real_output_hour'][-2])*100,3)
latest_real_disposable_personal_income = cpi_model_df['real_disposable_personal_income'][-1]
latest_real_disposable_personal_income_pct_change = round(((latest_real_disposable_personal_income-cpi_model_df['real_disposable_personal_income'][-2])/cpi_model_df['real_disposable_personal_income'][-2])*100,3)
latest_corporate_profits_after_tax = cpi_model_df['corporate_profits_after_tax'][-1]
latest_corporate_profits_after_tax_pct_change = round(((latest_corporate_profits_after_tax-cpi_model_df['corporate_profits_after_tax'][-2])/cpi_model_df['corporate_profits_after_tax'][-2])*100,3)
latest_imports_goods_services = cpi_model_df['imports_goods_services'][-1]
latest_imports_goods_services_pct_change = round(((latest_imports_goods_services-cpi_model_df['imports_goods_services'][-2])/cpi_model_df['imports_goods_services'][-2])*100,3)
latest_real_gross_domestic_private_investment = cpi_model_df['real_gross_domestic_private_investment'][-1]
latest_real_gross_domestic_private_investment_pct_change = round(((latest_real_gross_domestic_private_investment-cpi_model_df['real_gross_domestic_private_investment'][-2])/cpi_model_df['real_gross_domestic_private_investment'][-2])*100,3)
latest_government_transfer_payments = pce_model_df['government_transfer_payments'][-1]
latest_government_transfer_payments_pct_change = round(((latest_government_transfer_payments-pce_model_df['government_transfer_payments'][-2])/pce_model_df['government_transfer_payments'][-2])*100,3)
latest_median_house_sale_price = pce_model_df['median_house_sale_price'][-1]
latest_median_house_sale_price_pct_change = round(((latest_median_house_sale_price-pce_model_df['median_house_sale_price'][-2])/pce_model_df['median_house_sale_price'][-2])*100,3)
latest_real_gdp = deflator_model_df['real_gdp'][-1]
latest_real_gdp_pct_change = round(((latest_real_gdp-deflator_model_df['real_gdp'][-2])/deflator_model_df['real_gdp'][-2])*100,3)
latest_gross_private_saving = deflator_model_df['gross_private_saving'][-1]
latest_gross_private_saving_pct_change = round(((latest_gross_private_saving-deflator_model_df['gross_private_saving'][-2])/deflator_model_df['gross_private_saving'][-2])*100,3)
latest_real_imports = deflator_model_df['real_imports'][-1]
latest_real_imports_pct_change = round(((latest_real_imports-deflator_model_df['real_imports'][-2])/deflator_model_df['real_imports'][-2])*100,3)
model_table_values = {'cpi_table_values':[latest_m2,latest_nom_gdpcap,latest_government_expenditures,latest_commercial_industrial_loans,latest_consumer_loans_com_banks,latest_real_output_hour,latest_real_disposable_personal_income,latest_corporate_profits_after_tax,latest_imports_goods_services,latest_real_gross_domestic_private_investment],
                    'cpi_table_pct_changes':[latest_m2_pct_change,latest_nom_gdpcap_pct_change,latest_government_expenditures_pct_change,latest_commercial_industrial_loans_pct_change,latest_consumer_loans_com_banks_pct_change,latest_real_output_hour_pct_change,latest_real_disposable_personal_income_pct_change,latest_corporate_profits_after_tax_pct_change,latest_imports_goods_services_pct_change,latest_real_gross_domestic_private_investment_pct_change],
                    'pce_table_values':[latest_m2,latest_nom_gdpcap,latest_government_expenditures,latest_government_transfer_payments,latest_commercial_industrial_loans,latest_consumer_loans_com_banks,latest_real_output_hour,latest_real_disposable_personal_income,latest_median_house_sale_price,latest_real_gross_domestic_private_investment],
                    'pce_table_pct_changes':[latest_m2_pct_change,latest_nom_gdpcap_pct_change,latest_government_expenditures_pct_change,latest_government_transfer_payments_pct_change,latest_commercial_industrial_loans_pct_change,latest_consumer_loans_com_banks_pct_change,latest_real_output_hour_pct_change,latest_real_disposable_personal_income_pct_change,latest_median_house_sale_price_pct_change,latest_real_gross_domestic_private_investment_pct_change],
                    'deflator_table_values': [latest_m2,latest_real_gdp,latest_government_expenditures,latest_commercial_industrial_loans,latest_real_output_hour,latest_real_disposable_personal_income,latest_gross_private_saving,latest_median_house_sale_price,latest_real_imports,latest_real_gross_domestic_private_investment],
                    'deflator_table_pct_changes':[latest_m2_pct_change,latest_real_gdp_pct_change,latest_government_expenditures_pct_change,latest_commercial_industrial_loans_pct_change,latest_real_output_hour_pct_change,latest_real_disposable_personal_income_pct_change,latest_gross_private_saving_pct_change,latest_median_house_sale_price_pct_change,latest_real_imports_pct_change,latest_real_gross_domestic_private_investment_pct_change],
                    'indices': [latest_cpi, latest_cpi_pct_change, latest_pce, latest_pce_pct_change, latest_deflator, latest_deflator_pct_change]
                    }

app = Flask(__name__)
CORS(app)
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/<table_name>/<column_name>")
def inflation_query(table_name, column_name):
    session=Session(engine)
    new_query = session.execute(f'select date, {column_name} from {table_name} where {column_name} is not null')
    session.close()
    y_values = []
    stats = []
    stats2 = []
    no_xy_list = []
    change_calc= []
    pct_change_calc = []
    return_dict = {}
    for each_result in new_query:
        row=[each_col for each_col in each_result]
        no_xy_list.append(row)
        y_values.append(row[1])
    for value in range(len(y_values)):
        change = y_values[value]-y_values[value-1]
        pct_change = change/y_values[value-1]
        change_calc.append(change)
        pct_change_calc.append(pct_change)
    minimum = round(min(y_values),4)
    maximum = round(max(y_values),4)
    start_value = round(y_values[0],4)
    end_value = round(y_values[-1],4)
    total_change = round(end_value-start_value,4)
    percent_change = round((total_change/start_value)*100,4)
    pct_change_calc = pct_change_calc[1:]
    change_calc = change_calc[1:]
    change_variance = round(statistics.variance(change_calc),4)
    pct_change_variance = round(statistics.variance(pct_change_calc),4)
    avg_change = round(statistics.mean(change_calc),4)
    avg_pct_change = round(statistics.mean(pct_change_calc),4)
    change_std = round(statistics.stdev(change_calc),4)
    pct_change_std = round(statistics.stdev(pct_change_calc),4)
    stats = [column_name, round(start_value,4), round(end_value,4), round(total_change,4), round(percent_change,4), round(minimum,4), round(maximum,4)]
    stats2 = [column_name, round(avg_change,4), round(change_variance,4), round(change_std,4), round(avg_pct_change,4), round(pct_change_variance,4), round(pct_change_std,4)]
    return_dict['stats'] = stats
    return_dict['stats2'] = stats2
    return_dict['no_xy'] = no_xy_list
    new_data = jsonify(return_dict)
    return new_data

@app.route("/sumtablezoom/<table_name>/<column_name>/<start_date>/<end_date>")
def sumtablezoom_query(table_name, column_name, start_date, end_date):
    session=Session(engine)
    new_query = session.execute(f'select date, {column_name} from {table_name} where {column_name} is not null and date >= {start_date} and date <= {end_date}')
    session.close()
    print(start_date, end_date)
    y_values = []
    stats = []
    stats2 = []
    change_calc= []
    pct_change_calc = []
    return_dict = {}
    for each_result in new_query:
        row=[each_col for each_col in each_result]
        y_values.append(row[1])
    for value in range(len(y_values)):
        change = y_values[value]-y_values[value-1]
        pct_change = change/y_values[value-1]
        change_calc.append(change)
        pct_change_calc.append(pct_change)
    minimum = round(min(y_values),4)
    maximum = round(max(y_values),4)
    start_value = round(y_values[0],4)
    end_value = round(y_values[-1],4)
    total_change = round(end_value-start_value,4)
    percent_change = round((total_change/start_value)*100,4)
    pct_change_calc = pct_change_calc[1:]
    change_calc = change_calc[1:]
    change_variance = round(statistics.variance(change_calc),4)
    pct_change_variance = round(statistics.variance(pct_change_calc),4)
    avg_change = round(statistics.mean(change_calc),4)
    avg_pct_change = round(statistics.mean(pct_change_calc),4)
    change_std = round(statistics.stdev(change_calc),4)
    pct_change_std = round(statistics.stdev(pct_change_calc),4)
    stats = [column_name, round(start_value,4), round(end_value,4), round(total_change,4), round(percent_change,4), round(minimum,4), round(maximum,4)]
    stats2 = [column_name, round(avg_change,4), round(change_variance,4), round(change_std,4), round(avg_pct_change,4), round(pct_change_variance,4), round(pct_change_std,4)]
    return_dict['stats'] = stats
    return_dict['stats2'] = stats2
    new_data = jsonify(return_dict)
    return new_data

@app.route("/scatter_api/<table_name>/<column_name>/<type1>/<lag>/<table_name2>/<column_name2>/<type2>/<start_date>/<end_date>")
def scatter_inflation_query(table_name,column_name,type1,lag,table_name2,column_name2,type2,start_date,end_date):
    session=Session(engine)
    start_date = start_date.replace("-","/")
    end_date = end_date.replace("-","/")
    lagged = int(lag)
    if type1 == 'Main':
        series_1_type = ""
    elif type1 == 'Change':
        series_1_type = "_change"
    elif type1 == 'Pct_Change':
        series_1_type = "_pct_change"
    if type2 == 'Main':
        series_2_type = ""
    elif type2 == 'Change':
        series_2_type = "_change"
    elif type2 == 'Pct_Change':
        series_2_type = "_pct_change"
    if start_date == 'default':
        if end_date =='default':
            new_query = session.execute(f'select date, {column_name} from {table_name} where {column_name} is not null')
            session.close()
            new_query2 = session.execute(f'select date, {column_name2} from {table_name2} where {column_name2} is not null')
            session.close()
        else:
            end_date = f'"{end_date}"'
            end_date = end_date.replace('"',"'")
            new_query = session.execute(f'select date, {column_name} from {table_name} where {column_name} is not null and date <= {end_date}')
            session.close()
            new_query2 = session.execute(f'select date, {column_name2} from {table_name2} where {column_name2} is not null and date <= {end_date}')
            session.close()
    elif start_date != 'default':
        start_date = f'"{start_date}"'
        start_date = start_date.replace('"',"'")
        if end_date == 'default':
            new_query = session.execute(f'select date, {column_name} from {table_name} where {column_name} is not null and date >= {start_date}')
            session.close()
            new_query2 = session.execute(f'select date, {column_name2} from {table_name2} where {column_name2} is not null and date >= {start_date}')
            session.close()
        else:
            end_date = f'"{end_date}"'
            end_date = end_date.replace('"',"'")
            new_query = session.execute(f'select date, {column_name} from {table_name} where {column_name} is not null and date >= {start_date} and date <= {end_date}')
            session.close()
            new_query2 = session.execute(f'select date, {column_name2} from {table_name2} where {column_name2} is not null and date >= {start_date} and date <= {end_date}')
            session.close()
    return_dict = {}
    return_dict2 = {}
    i=1
    j=1
    for each_result in new_query:
        date = each_result[0]
        value = each_result[1]
        return_dict[i] = [date,value]
        i=i+1
    for each_result2 in new_query2:
        date2 = each_result2[0]
        value2 = each_result2[1]
        return_dict2[j] = [date2,value2]
        j=j+1
    query1_df = pd.DataFrame.from_dict(return_dict,orient='index').rename(columns={0:'Date',1:f'{column_name}'})
    query2_df = pd.DataFrame.from_dict(return_dict2,orient='index').rename(columns={0:'Date',1:f'{column_name2}'})
    merged_df = query1_df.merge(query2_df,how='inner',on='Date')
    loop_values = [column_name,column_name2]
    for each_series_from_df in loop_values:
        new_change_index = 1
        series_change_values = [0]
        series_pct_change_values = [0]
        for each_value in range(len(merged_df[column_name])-1):
            try:
                if (merged_df[each_series_from_df][new_change_index] > merged_df[each_series_from_df][each_value]):
                    if (merged_df[each_series_from_df][each_value] > 0):
                        change = merged_df[each_series_from_df][new_change_index]-merged_df[each_series_from_df][each_value]
                        pct_change = (change/merged_df[each_series_from_df][each_value])*100
                        series_change_values.append(change)
                        series_pct_change_values.append(pct_change)
                    elif (merged_df[each_series_from_df][each_value] < 0):
                        change = merged_df[each_series_from_df][new_change_index]-merged_df[each_series_from_df][each_value]
                        pct_change = abs(change/merged_df[each_series_from_df][each_value])*100
                        series_change_values.append(change)
                        series_pct_change_values.append(pct_change)
                    elif (merged_df[each_series_from_df][each_value] == 0):
                        change = merged_df[each_series_from_df][new_change_index]
                        pct_change = 100
                        series_change_values.append(change)
                        series_pct_change_values.append(pct_change)
                elif (merged_df[each_series_from_df][new_change_index] < merged_df[each_series_from_df][each_value]):
                    if (merged_df[each_series_from_df][each_value] > 0):
                        change = merged_df[each_series_from_df][new_change_index]-merged_df[each_series_from_df][each_value]
                        pct_change = (change/merged_df[each_series_from_df][each_value])*100
                        series_change_values.append(change)
                        series_pct_change_values.append(pct_change)
                    elif (merged_df[each_series_from_df][each_value] < 0):
                        change = merged_df[each_series_from_df][new_change_index]-merged_df[each_series_from_df][each_value]
                        pct_change = (abs(change)/merged_df[each_series_from_df][each_value])*100
                        series_change_values.append(change)
                        series_pct_change_values.append(pct_change)
                    elif (merged_df[each_series_from_df][each_value] == 0):
                        change = merged_df[each_series_from_df][new_change_index]
                        pct_change = -100
                        series_change_values.append(change)
                        series_pct_change_values.append(pct_change)
                elif (merged_df[each_series_from_df][new_change_index] == merged_df[each_series_from_df][each_value]):
                    change = 0
                    pct_change = 0
                    series_change_values.append(change)
                    series_pct_change_values.append(pct_change)
                elif (merged_df[each_series_from_df][new_change_index] < merged_df[each_series_from_df][each_value]):
                    if (merged_df[each_series_from_df][each_value] == 0):
                        change = merged_df[each_series_from_df][new_change_index]
                        pct_change = -100
                        series_change_values.append(change)
                        series_pct_change_values.append(pct_change)
                new_change_index = new_change_index + 1
            except:
                print('something went wrong')
        merged_df[f'{each_series_from_df}_change'] = series_change_values
        merged_df[f'{each_series_from_df}_pct_change'] = series_pct_change_values
    merged_df = merged_df.loc[:,['Date',f'{column_name}{series_1_type}',f'{column_name2}{series_2_type}']]
    lagged_series = merged_df[f'{column_name}{series_1_type}'].tolist()
    final_lag_value = len(lagged_series)-lagged
    lagged_series = lagged_series[1:final_lag_value]
    lagged_df = merged_df.iloc[lagged+1:,:].loc[:,['Date',f'{column_name2}{series_2_type}']]
    lagged_df[f'{column_name}{series_1_type}'] = lagged_series
    merged_df = lagged_df
    merged_df = merged_df.set_index('Date')
    merged_dict = merged_df.to_dict('split')
    return_dict3 = {}
    for each_date in range(len(merged_dict['index'])):
        return_dict3[str(merged_dict['index'][each_date])] = merged_dict['data'][each_date]
    scatter_data_list = []
    corr_list1 = []
    corr_list2 = []
    return_dict4 ={}
    for key, val in return_dict3.items():
        scatter_data_list.append(val)
        corr_list1.append(val[0])
        corr_list2.append(val[1])
    corr_coef = sts.pearsonr(corr_list1, corr_list2)
    return_dict4['corr_coef']=corr_coef[0]
    return_dict4['scatter_values']=scatter_data_list
    new_data = jsonify(return_dict4)
    return new_data

@app.route("/model_init")
def populate_model_tables():
    return model_table_values

@app.route("/cpi_predict/<m2>/<nom_gdpcap>/<government_expenditures>/<commercial_industrial_loans>/<consumer_loans_com_banks>/<real_output_hour>/<real_disposable_personal_income>/<corporate_profits_after_tax>/<imports_goods_services>/<real_gross_domestic_private_investment>")
def predict_cpi(m2,nom_gdpcap,government_expenditures,commercial_industrial_loans,consumer_loans_com_banks,real_output_hour,real_disposable_personal_income,corporate_profits_after_tax,imports_goods_services,real_gross_domestic_private_investment):
    C_test = [[float(m2),float(nom_gdpcap),float(government_expenditures),float(commercial_industrial_loans),float(consumer_loans_com_banks),float(real_output_hour),float(real_disposable_personal_income),float(corporate_profits_after_tax),float(imports_goods_services),float(real_gross_domestic_private_investment)]]
    cpi_return_dict = {}
    cpi_prediction = cpi_model_regress.predict(C_test)
    predicted_cpi = round(cpi_prediction[0][0],3)
    cpi_return_dict['predicted_cpi']=predicted_cpi
#     cpi_score = jsonify(cpi_r2_score_dict)
    # predicted_cpi = jsonify(predicted_cpi)
    return cpi_return_dict #cpi_prediction

@app.route("/pce_predict/<m2>/<nom_gdpcap>/<government_expenditures>/<government_transfer_payments>/<commercial_industrial_loans>/<consumer_loans_com_banks>/<real_output_hour>/<real_disposable_personal_income>/<median_house_sale_price>/<real_gross_domestic_private_investment>")
def predict_pce(m2,nom_gdpcap,government_expenditures,government_transfer_payments,commercial_industrial_loans,consumer_loans_com_banks,real_output_hour,real_disposable_personal_income, median_house_sale_price,real_gross_domestic_private_investment):
    P_test = [[float(m2),float(nom_gdpcap),float(government_expenditures),float(government_transfer_payments),float(commercial_industrial_loans),float(consumer_loans_com_banks),float(real_output_hour),float(real_disposable_personal_income),float(median_house_sale_price),float(real_gross_domestic_private_investment)]]
    pce_return_dict = {}
    pce_prediction = pce_model_regress.predict(P_test)
    predicted_pce = round(pce_prediction[0][0],3)
    pce_return_dict['predicted_pce']=predicted_pce
    return pce_return_dict

@app.route("/deflator_predict/<m2>/<real_gdp>/<government_expenditures>/<commercial_industrial_loans>/<real_output_hour>/<real_disposable_personal_income>/<gross_private_saving>/<median_house_sale_price>/<real_imports>/<real_gross_domestic_private_investment>")
def predict_deflator(m2,real_gdp,government_expenditures,commercial_industrial_loans,real_output_hour,real_disposable_personal_income,gross_private_saving,median_house_sale_price,real_imports,real_gross_domestic_private_investment):
    D_test = [[float(m2),float(real_gdp),float(government_expenditures),float(commercial_industrial_loans),float(real_output_hour),float(real_disposable_personal_income),float(gross_private_saving),float(median_house_sale_price),float(real_imports),float(real_gross_domestic_private_investment)]]
    deflator_return_dict = {}
    deflator_prediction = deflator_model_regress.predict(D_test)
    predicted_deflator = round(deflator_prediction[0][0],3)
    deflator_return_dict['predicted_deflator'] = predicted_deflator
    return deflator_return_dict    

if __name__ == "__main__":
    app.run(debug = True)

# @app.route("/correlation/<table6>/<column6>/<table7>/<column7>/<start_date>/<end_date>")
# def calc_corr_coef(table6,column6,table7,column7,start_date,end_date):
#     session=Session(engine)
#     new_query = session.execute(f'select date, {column6} from {table6} where {column6} is not null')# and date >= {start_date} and date <= {end_date}')
#     session.close()
#     new_query2 = session.execute(f'select date, {column7} from {table7} where {column7} is not null')
#     session.close()
#     return_dict = {}
#     return_dict2 = {}
#     i=1
#     j=1
#     for each_result in new_query:
#         date = each_result[0]
#         value = each_result[1]
#         return_dict[i] = [date,value]
#         i=i+1
#     for each_result2 in new_query2:
#         date2 = each_result2[0]
#         value2 = each_result2[1]
#         return_dict2[j] = [date2,value2]
#         j=j+1
#     query1_df = pd.DataFrame.from_dict(return_dict,orient='index').rename(columns={0:'Date',1:'Value'})
#     query2_df = pd.DataFrame.from_dict(return_dict2,orient='index').rename(columns={0:'Date',1:'Value'})
#     # if query1_df['Date'][0] >= query2_df['Date'][0]:
#     #     left_right = 'left'
#     # else:
#     #     left_right = 'right'
#     merged_df = query1_df.merge(query2_df,how='left',on='Date').set_index('Date')
#     merged_dict = merged_df.to_dict('split')
#     return_dict3 = {}
#     for each_date in range(len(merged_dict['index'])):
#         return_dict3[str(merged_dict['index'][each_date])] = merged_dict['data'][each_date]
#     corr_list1 = []
#     corr_list2 = []
#     corr_coef_dict ={}
#     for key, val in return_dict3.items():
#         corr_list1.append(val[0])
#         corr_list2.append(val[1])
#     corr_coef = sts.pearsonr(corr_list1, corr_list2)
#     corr_coef_dict['corr_coef']=corr_coef[0]
#     new_corr_coef = jsonify(corr_coef_dict)
#     return new_corr_coef

# @app.route("/correlationupdate/<table6>/<column6>/<table7>/<column7>/<start_date>/<end_date>")
# def update_corr_coef(table6,column6,table7,column7, start_date, end_date):
#     session=Session(engine)
#     corr_query = session.execute(f'select date, {column6} from {table6} where {column6} is not null and date >= {start_date} and date <= {end_date}')
#     corr_query2 = session.execute(f'select date, {column7} from {table7} where {column7} is not null and date >= {start_date} and date <= {end_date}')
#     session.close()
#     corr_query_dates=[]
#     corr_query2_dates=[]
#     corr_query_values=[]
#     corr_query2_values=[]
#     corr_coef_dict = {}
#     for each_result in corr_query:
#         row=[each_col for each_col in each_result]
#         corr_query_dates.append(row[0])
#         corr_query_values.append(row[1])
#     for each_result in corr_query2:
#         row=[each_col for each_col in each_result]
#         corr_query2_dates.append(row[0])
#         corr_query2_values.append(row[1])
#     corr_dict = {'Date':corr_query_dates,
#                 'value1':corr_query_values}
#     corr2_dict = {'Date':corr_query2_dates,
#                 'value2':corr_query2_values}
#     corr_df = pd.DataFrame(corr_dict)
#     corr2_df = pd.DataFrame(corr2_dict)
#     merged_df = corr_df.merge(corr2_df, how='outer', on='Date')
#     merged_df = merged_df.set_index('Date').sort_values('Date')
#     corr_coef = sts.pearsonr(merged_df['value1'], merged_df['value2'])
#     corr_coef_dict['corr_coef']=corr_coef[0]
#     updated_corr_coef = jsonify(corr_coef_dict)
#     return updated_corr_coef