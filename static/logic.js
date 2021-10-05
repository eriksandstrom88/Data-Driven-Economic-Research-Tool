// logic.js for Project 2:Inflation Research Tool for Economists

var column_types = ['Change','Pct_Change','Main'];
var bands_events = ['None','Presidents','Recessions','Events'];
var dropdown1 = d3.select('#selDataset1');
var dropdown2 = d3.select('#selDataset2');
var dropdown3 = d3.select('#selDataset3');
var dropdown4 = d3.select('#selDataset4');
var dropdown5 = d3.select('#selDataset5');
var dropdown6 = d3.select('#selDataset6');
var dropdown7 = d3.select('#selDataset7');
var dropdown8 = d3.select('#selDataset8');
var dropdown9 = d3.select('#selDataset9');
var dropdown10 = d3.select('#selDataset10');
var dropdown11 = d3.select('#selDataset11');
var dropdown12 = d3.select('#selBandsEvents');
var date_input1 = d3.select('#scatter-start');
var date_input2 = d3.select('#scatter-end');
date_input1.on("change",plotScatter);
date_input2.on("change",plotScatter);
dropdown1.on("change",renderApexLine);
dropdown2.on("change",renderApexLine);
dropdown3.on("change",renderApexLine);
dropdown4.on("change",renderApexLine);
dropdown5.on("change",renderApexLine);
dropdown6.on("change",plotScatter);
dropdown7.on("change",plotScatter);
dropdown8.on("change",plotScatter);
dropdown9.on("change",plotScatter);
dropdown10.on("change",plotScatter);
dropdown11.on("change",plotScatter);
dropdown12.on("change",chooseChartOptions);
var sum_table1=d3.select("#sumstats-table-1");
var sum_table2=d3.select("#sumstats-table-2");
var selection_table=d3.select("#selection-table-body");
var cpi_val_1 = d3.select("#cpi-m2-val");
var cpi_val_2 = d3.select("#cpi-gdp-val");
var cpi_val_3 = d3.select("#cpi-ge-val");
var cpi_val_4 = d3.select("#cpi-comln-val");
var cpi_val_5 = d3.select("#cpi-conln-val");
var cpi_val_6 = d3.select("#cpi-roh-val");
var cpi_val_7 = d3.select("#cpi-rdi-val");
var cpi_val_8 = d3.select("#cpi-cprof-val");
var cpi_val_9 = d3.select("#cpi-imp-val");
var cpi_val_0 = d3.select("#cpi-inv-val");
var cpi_pct_1 = d3.select("#cpi-m2-pct");
var cpi_pct_2 = d3.select("#cpi-gdp-pct");
var cpi_pct_3 = d3.select("#cpi-ge-pct");
var cpi_pct_4 = d3.select("#cpi-comln-pct");
var cpi_pct_5 = d3.select("#cpi-conln-pct");
var cpi_pct_6 = d3.select("#cpi-roh-pct");
var cpi_pct_7 = d3.select("#cpi-rdi-pct");
var cpi_pct_8 = d3.select("#cpi-cprof-pct");
var cpi_pct_9 = d3.select("#cpi-imp-pct");
var cpi_pct_0 = d3.select("#cpi-inv-pct");
var pce_val_1 = d3.select("#pce-m2-val");
var pce_val_2 = d3.select("#pce-gdp-val");
var pce_val_3 = d3.select("#pce-ge-val");
var pce_val_4 = d3.select("#pce-gtp-val");
var pce_val_5 = d3.select("#pce-comln-val");
var pce_val_6 = d3.select("#pce-conln-val");
var pce_val_7 = d3.select("#pce-roh-val");
var pce_val_8 = d3.select("#pce-incom-val");
var pce_val_9 = d3.select("#pce-house-val");
var pce_val_0 = d3.select("#pce-inv-val");
var pce_pct_1 = d3.select("#pce-m2-pct");
var pce_pct_2 = d3.select("#pce-gdp-pct");
var pce_pct_3 = d3.select("#pce-ge-pct");
var pce_pct_4 = d3.select("#pce-gtp-pct");
var pce_pct_5 = d3.select("#pce-comln-pct");
var pce_pct_6 = d3.select("#pce-conln-pct");
var pce_pct_7 = d3.select("#pce-roh-pct");
var pce_pct_8 = d3.select("#pce-incom-pct");
var pce_pct_9 = d3.select("#pce-house-pct");
var pce_pct_0 = d3.select("#pce-inv-pct");
var deflator_val_1 = d3.select("#deflator-m2-val");
var deflator_val_2 = d3.select("#deflator-rgdp-val");
var deflator_val_3 = d3.select("#deflator-ge-val");
var deflator_val_4 = d3.select("#deflator-comln-val");
var deflator_val_5 = d3.select("#deflator-roh-val");
var deflator_val_6 = d3.select("#deflator-incom-val");
var deflator_val_7 = d3.select("#deflator-sav-val");
var deflator_val_8 = d3.select("#deflator-house-val");
var deflator_val_9 = d3.select("#deflator-rimp-val");
var deflator_val_0 = d3.select("#deflator-inv-val");
var deflator_pct_1 = d3.select("#deflator-m2-pct");
var deflator_pct_2 = d3.select("#deflator-rgdp-pct");
var deflator_pct_3 = d3.select("#deflator-ge-pct");
var deflator_pct_4 = d3.select("#deflator-comln-pct");
var deflator_pct_5 = d3.select("#deflator-roh-pct");
var deflator_pct_6 = d3.select("#deflator-incom-pct");
var deflator_pct_7 = d3.select("#deflator-sav-pct");
var deflator_pct_8 = d3.select("#deflator-house-pct");
var deflator_pct_9 = d3.select("#deflator-rimp-pct");
var deflator_pct_0 = d3.select("#deflator-inv-pct");
var cpi_button = d3.select("#cpi-btn");
var pce_button = d3.select("#pce-btn");
var deflator_button = d3.select("#deflator-btn");
cpi_button.on("click",calcCPI);
pce_button.on("click",calcPCE);
deflator_button.on("click",calcDeflator);

function init() {    
    d3.json("../static/column_index.json").then((data)=> {
        var index_dict=data;
        //populate dropdowns using json
        Object.entries(index_dict).forEach(([key,value]) => {
            var str1 = key + ': ' + value[1]
            dropdown1.append('option').text(str1).property('value',key)
            dropdown2.append('option').text(str1).property('value',key)
            dropdown3.append('option').text(str1).property('value',key)
            dropdown4.append('option').text(str1).property('value',key)
            dropdown5.append('option').text(str1).property('value',key)
            dropdown6.append('option').text(str1).property('value',key)
            dropdown7.append('option').text(str1).property('value',key)
            });
        var temp1 = "1";
        var selDataset1 = document.getElementById('selDataset1');
        for(var i, j=0; i=selDataset1.options[j]; j++) {if(i.value==temp1){selDataset1.selectedIndex=j;}};
        var temp2 = "4";
        var selDataset2 = document.getElementById('selDataset2');
        for(var i, j=0; i=selDataset2.options[j]; j++) {if(i.value==temp2){selDataset2.selectedIndex=j;}};
        var temp3 = "2";
        var selDataset3 = document.getElementById('selDataset3');
        for(var i, j=0; i=selDataset3.options[j]; j++) {if(i.value==temp3){selDataset3.selectedIndex=j;}};
        var temp4 = "5";
        var selDataset4 = document.getElementById('selDataset4');
        for(var i, j=0; i=selDataset4.options[j]; j++) {if(i.value==temp4){selDataset4.selectedIndex=j;}};
        var temp5 = "12";
        var selDataset5 = document.getElementById('selDataset5');
        for(var i, j=0; i=selDataset5.options[j]; j++) {if(i.value==temp5){selDataset5.selectedIndex=j;}};
        var temp6 = "96";
        var selDataset6 = document.getElementById('selDataset6');
        for(var i, j=0; i=selDataset6.options[j]; j++) {if(i.value==temp6){selDataset6.selectedIndex=j;}};
        var temp7 = "98";
        var selDataset7 = document.getElementById('selDataset7');
        for(var i, j=0; i=selDataset7.options[j]; j++) {if(i.value==temp7){selDataset7.selectedIndex=j;}};
        var temp8 = "Change";
        var selDataset8 = document.getElementById('selDataset8');
        for(var i, j=0; i=selDataset8.options[j]; j++) {if(i.value==temp8){selDataset8.selectedIndex=j;}else {selDataset8.selectedIndex=temp8}};
        var temp9 = "Change";
        var selDataset9 = document.getElementById('selDataset1');
        for(var i, j=0; i=selDataset9.options[j]; j++) {if(i.value==temp9){selDataset9.selectedIndex=j;}else {selDataset9.selectedIndex=temp9}};
        column_types.forEach((column_type) => {
            dropdown8.append('option').text(column_type).property('value',column_type)
            dropdown9.append('option').text(column_type).property('value',column_type)});
        bands_events.forEach((band_type) => {
            dropdown12.append('option').text(band_type).property('value',band_type)});
        var index_table_body=d3.select("#index-table");
        //populate index table using csv
        d3.csv("../static/index.csv").then(each_series => {
        Object.entries(each_series).forEach(([key, value]) => {
            var index_row=index_table_body.append('tr');
            Object.entries(value).forEach(([keys,values]) => {
            index_row.append('td').text(values)})});
        chart.render();
        scatter.render();
        populateModelTables();
        renderApexLine();
        plotScatter();
        Plotly.newPlot("gauge", gauge_trace, gauge_layout);
            })})};

init();


// DECLARE OPTIONS FOR LINE CHART
var options = {
    series: [
    ],
    chart: {
    type: 'area',
    stacked: false,
    height: 700,
    width: 1050,
    zoom: {
    type: 'x',
    enabled: true,
    autoScaleYaxis: true
    },
    toolbar: {
    autoSelected: 'zoom'
    },
    events: {
        zoomed: function(chartContext, {xaxis, yaxis}) {
            var zoomed_x_min=new Date(xaxis['min']);
            var zoomed_x_max=new Date(xaxis['max']);
            var min_month = zoomed_x_min.getMonth();
            var min_day = zoomed_x_min.getDate();
            var min_year = zoomed_x_min.getFullYear();
            var zoomed_x_min_date = (min_month+1) + "-" + min_day + "-" + min_year;
            var max_month = zoomed_x_max.getMonth();
            var max_day = zoomed_x_max.getDate();
            var max_year = zoomed_x_max.getFullYear();
            var zoomed_x_max_date = (max_month+1) + "-" + max_day + "-" + max_year;
            var zoomed_x_max_date_quotes = "'" + zoomed_x_max_date + "'";
            var zoomed_x_min_date_quotes = "'" + zoomed_x_min_date + "'";
            sum_table1.text("");
            sum_table2.text("");
            zoomSumChartUpdate(zoomed_x_min_date_quotes, zoomed_x_max_date_quotes);
        },
        beforeResetZoom: function(chartContext, opts) {
            renderApexLine()
        },
        scrolled: function(chartContext, {xaxis, yaxis}) {
            // sum_table1.text("");
            // sum_table2.text("");
            // setTimeout(() => {sum_table1.text(""); sum_table2.text("");}, 2000);
            var zoomed_x_min=new Date(xaxis['min']);
            var zoomed_x_max=new Date(xaxis['max']);
            var min_month = zoomed_x_min.getMonth();
            var min_day = zoomed_x_min.getDate();
            var min_year = zoomed_x_min.getFullYear();
            var zoomed_x_min_date = (min_month+1) + "-" + min_day + "-" + min_year;
            var max_month = zoomed_x_max.getMonth();
            var max_day = zoomed_x_max.getDate();
            var max_year = zoomed_x_max.getFullYear();
            var zoomed_x_max_date = (max_month+1) + "-" + max_day + "-" + max_year;
            var zoomed_x_max_date_quotes = "'" + zoomed_x_max_date + "'";
            var zoomed_x_min_date_quotes = "'" + zoomed_x_min_date + "'";
            // setTimeout(() => {},2000);
            // sum_table1.text("");
            // sum_table2.text("");
            setTimeout(() => {zoomSumChartUpdate(zoomed_x_min_date_quotes, zoomed_x_max_date_quotes);}, 2000);
        },
        beforResetZoom: function(chartContext,opts) {
            renderApexLine()
        },
    },
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
    },
    title: {
        text: '',
        align: 'left'
    },
    fill: {
        type: 'gradient',
        gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [0, 90, 100]
        },
    },
    yaxis: [{
        labels: {
        formatter: function (val) {
            return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            },
        },
    },
    {
        title: {
            text: ' '
        },
        },
        {
        opposite: true,
        title: {
            text:' '
        },
        }],
    // }],
    xaxis: {
        type: 'datetime',
    },
    grid: {
        show: true,
        position:'back',
        row: {
            colors: ['darkgray', 'lightgray'], 
            opacity: 0.9,
            },
        },
    tooltip: {
        shared: true,
        fillSeriesColor: true,
        theme: 'dark',
        x: {
            format: 'MMM d, yyyy'
        }

    },
    // responsive: [
    //     {
    //       breakpoint: 1000,
    //       options:{}
    //     }]
    };


// //CREATE AN INSTANCE OF THE LINE CHART
var chart = new ApexCharts(document.querySelector("#area-datetime"), options);

//POPULATE THE CPI MODEL TABLE AND FORECAST CPI
function populateModelTables() {
    var cpi_value_row = d3.select("#cpi-value-row");
    var cpi_pct_change_row = d3.select("#cpi-pct-row");
    var current_cpi = d3.select("#current-cpi");
    var pce_value_row = d3.select("#pce-value-row");
    var pce_pct_change_row = d3.select("#pce-pct-row");
    var current_pce = d3.select("#current-pce");
    var deflator_value_row = d3.select("#deflator-value-row");
    var deflator_pct_change_row = d3.select("#deflator-pct-row");
    var current_deflator = d3.select("#current-deflator");
    d3.json(`http://127.0.0.1:5000/model_init`).then((model_table_values_dict)=>{
        var cpi_model_table_values=model_table_values_dict['cpi_table_values'];
        var cpi_model_table_pct_changes=model_table_values_dict['cpi_table_pct_changes'];
        var pce_model_table_values=model_table_values_dict['pce_table_values'];
        var pce_model_table_pct_changes=model_table_values_dict['pce_table_pct_changes'];
        var deflator_model_table_values=model_table_values_dict['deflator_table_values'];
        var deflator_model_table_pct_changes=model_table_values_dict['deflator_table_pct_changes'];
        var latest_cpi=model_table_values_dict['indices'][0];
        var latest_cpi_pct_change=model_table_values_dict['indices'][1];
        var latest_pce=model_table_values_dict['indices'][2];
        var latest_pce_pct_change=model_table_values_dict['indices'][3];
        var latest_deflator=model_table_values_dict['indices'][4];
        var latest_deflator_pct_change=model_table_values_dict['indices'][5];
        cpi_model_table_values.forEach((value)=>{
            cpi_value_row.append('td').text(value);
        });
        cpi_model_table_pct_changes.forEach((value)=>{
            cpi_pct_change_row.append('td').text(value);
        });
        pce_model_table_values.forEach((value)=>{
            pce_value_row.append('td').text(value);
        });
        pce_model_table_pct_changes.forEach((value)=>{
            pce_pct_change_row.append('td').text(value);
        });
        deflator_model_table_values.forEach((value)=>{
            deflator_value_row.append('td').text(value);
        });
        deflator_model_table_pct_changes.forEach((value)=>{
            deflator_pct_change_row.append('td').text(value);
        });
        current_cpi.text(`Current CPI is: ${latest_cpi}, a ${latest_cpi_pct_change}% change`);
        current_pce.text(`Current PCE is: ${latest_pce}, a ${latest_pce_pct_change}% change`);
        current_deflator.text(`Current GDP Deflator is: ${latest_deflator}, a ${latest_deflator_pct_change}% change`);
    });
};

//CALCULATE CPI
function calcCPI() {
    var user_cpi_m2=cpi_val_1.property('value');
    var user_cpi_gdp=cpi_val_2.property('value');
    var user_cpi_ge=cpi_val_3.property('value');
    var user_cpi_comln=cpi_val_4.property('value');
    var user_cpi_conln=cpi_val_5.property('value');
    var user_cpi_roh=cpi_val_6.property('value');
    var user_cpi_rdi=cpi_val_7.property('value');
    var user_cpi_cprof=cpi_val_8.property('value');
    var user_cpi_imp=cpi_val_9.property('value');
    var user_cpi_inv=cpi_val_0.property('value');
    var forecasted_cpi=d3.select("#forecasted-cpi");
    // var user_cpi_m2_pct=cpi_pct_1.property('value');
    // var user_cpi_gdp_pct=cpi_pct_2.property('value');
    // var user_cpi_ge_pct=cpi_pct_3.property('value');
    // var user_cpi_comln_pct=cpi_pct_4.property('value');
    // var user_cpi_conln_pct=cpi_pct_5.property('value');
    // var user_cpi_roh_pct=cpi_pct_6.property('value');
    // var user_cpi_rdi_pct=cpi_pct_7.property('value');
    // var user_cpi_cprof_pct=cpi_pct_8.property('value');
    // var user_cpi_imp_pct=cpi_pct_9.property('value');
    // var user_cpi_inv_pct=cpi_pct_0.property('value');
    d3.json(`http://127.0.0.1:5000/model_init`).then((model_table_values_dict)=>{
        var cpi_model_table_values=model_table_values_dict['cpi_table_values'];
        var cpi_model_table_pct_changes=model_table_values_dict['cpi_table_pct_changes'];
        var latest_m2=model_table_values_dict['cpi_table_values'][0];
        var latest_gdp=model_table_values_dict['cpi_table_values'][1];
        var latest_ge=model_table_values_dict['cpi_table_values'][2];
        var latest_comln=model_table_values_dict['cpi_table_values'][3];
        var latest_conln=model_table_values_dict['cpi_table_values'][4];
        var latest_roh=model_table_values_dict['cpi_table_values'][5];
        var latest_rdi=model_table_values_dict['cpi_table_values'][6];
        var latest_cprof=model_table_values_dict['cpi_table_values'][7];
        var latest_imp=model_table_values_dict['cpi_table_values'][8];
        var latest_inv=model_table_values_dict['cpi_table_values'][9];
        // console.log(user_cpi_m2_pct);
        if (user_cpi_m2 > 0) {
            var m2 = user_cpi_m2;}
            // console.log(m2);}
            else {
                m2 = latest_m2;};
        if (user_cpi_gdp > 0) {
            var gdp = user_cpi_gdp;}
            // console.log(m2);}
            else {
                gdp = latest_gdp;};
        if (user_cpi_ge > 0) {
            var ge = user_cpi_ge;}
            // console.log(m2);}
            else {
                ge = latest_ge;};
        if (user_cpi_comln > 0) {
            var comln = user_cpi_comln;}
            // console.log(m2);}
            else {
                comln = latest_comln;};
        if (user_cpi_conln > 0) {
            var conln = user_cpi_conln;}
            // console.log(m2);}
            else {
                conln = latest_conln;};
        if (user_cpi_roh > 0) {
            var roh = user_cpi_roh;}
            // console.log(m2);}
            else {
                roh = latest_roh;};
        if (user_cpi_rdi > 0) {
            var rdi = user_cpi_rdi;}
            // console.log(m2);}
            else {
                rdi = latest_rdi;};
        if (user_cpi_cprof > 0) {
            var cprof = user_cpi_cprof;}
            // console.log(m2);}
            else {
                cprof = latest_cprof;};
        if (user_cpi_imp > 0) {
            var imp = user_cpi_imp;}
            // console.log(m2);}
            else {
                imp = latest_imp;};
        if (user_cpi_inv > 0) {
            var inv = user_cpi_inv;}
            // console.log(m2);}
            else {
                inv = latest_inv;};
        d3.json(`http://127.0.0.1:5000/cpi_predict/${m2}/${gdp}/${ge}/${comln}/${conln}/${roh}/${rdi}/${cprof}/${imp}/${inv}`).then((cpi_r2_score_dict)=>{
            var predicted_cpi = cpi_r2_score_dict['predicted_cpi'];
            // console.log(cpi_test_score);
            forecasted_cpi.text(`Based on your inputs, CPI is forecasted to be: ${predicted_cpi}`);
            });
    });
};

//CALCULATE PCE
function calcPCE() {
    var user_pce_m2=pce_val_1.property('value');
    var user_pce_gdp=pce_val_2.property('value');
    var user_pce_ge=pce_val_3.property('value');
    var user_pce_gtp=pce_val_4.property('value');
    var user_pce_comln=pce_val_5.property('value');
    var user_pce_conln=pce_val_6.property('value');
    var user_pce_roh=pce_val_7.property('value');
    var user_pce_incom=pce_val_8.property('value');
    var user_pce_house=pce_val_9.property('value');
    var user_pce_inv=pce_val_0.property('value');
    var forecasted_pce=d3.select("#forecasted-pce");
    // var user_pce_m2_pct=pce_pct_1.property('value');
    // var user_pce_gdp_pct=pce_pct_2.property('value');
    // var user_pce_ge_pct=pce_pct_3.property('value');
    // var user_pce_gdp_pct=pce_pct_4.property('value');
    // var user_pce_comln_pct=pce_pct_5.property('value');
    // var user_pce_conln_pct=pce_pct_6.property('value');
    // var user_pce_roh_pct=pce_pct_7.property('value');
    // var user_pce_incom_pct=pce_pct_8.property('value');
    // var user_pce_house_pct=pce_pct_9.property('value');
    // var user_pce_inv_pct=pce_pct_0.property('value');
    d3.json(`http://127.0.0.1:5000/model_init`).then((model_table_values_dict)=>{
        var pce_model_table_values=model_table_values_dict['pce_table_values'];
        var pce_model_table_pct_changes=model_table_values_dict['pce_table_pct_changes'];
        var latest_m2=model_table_values_dict['pce_table_values'][0];
        var latest_gdp=model_table_values_dict['pce_table_values'][1];
        var latest_ge=model_table_values_dict['pce_table_values'][2];
        var latest_gtp=model_table_values_dict['pce_table_values'][3];
        var latest_comln=model_table_values_dict['pce_table_values'][4];
        var latest_conln=model_table_values_dict['pce_table_values'][5];
        var latest_roh=model_table_values_dict['pce_table_values'][6];
        var latest_incom=model_table_values_dict['pce_table_values'][7];
        var latest_house=model_table_values_dict['pce_table_values'][8];
        var latest_inv=model_table_values_dict['pce_table_values'][9];
        // console.log(user_pce_m2_pct);
        if (user_pce_m2 > 0) {
            var m2 = user_pce_m2;}
            // console.log(m2);}
            else {
                m2 = latest_m2;};
        if (user_pce_gdp > 0) {
            var gdp = user_pce_gdp;}
            // console.log(m2);}
            else {
                gdp = latest_gdp;};
        if (user_pce_ge > 0) {
            var ge = user_pce_ge;}
            // console.log(m2);}
            else {
                ge = latest_ge;};
        if (user_pce_gtp > 0) {
            var comln = user_pce_gtp;}
            // console.log(m2);}
            else {
                gtp = latest_gtp;};
        if (user_pce_comln > 0) {
            var comln = user_pce_comln;}
            // console.log(m2);}
            else {
                comln = latest_comln;};
        if (user_pce_conln > 0) {
            var conln = user_pce_conln;}
            // console.log(m2);}
            else {
                conln = latest_conln;};
        if (user_pce_roh > 0) {
            var roh = user_pce_roh;}
            // console.log(m2);}
            else {
                roh = latest_roh;};
        if (user_pce_incom > 0) {
            var incom = user_pce_incom;}
            // console.log(m2);}
            else {
                incom = latest_incom;};
        if (user_pce_house > 0) {
            var house = user_pce_house;}
            // console.log(m2);}
            else {
                house = latest_house;};
        if (user_pce_inv > 0) {
            var inv = user_pce_inv;}
            // console.log(m2);}
            else {
                inv = latest_inv;};
        d3.json(`http://127.0.0.1:5000/pce_predict/${m2}/${gdp}/${ge}/${gtp}/${comln}/${conln}/${roh}/${incom}/${house}/${inv}`).then((pce_r2_score_dict)=>{
            // console.log(pce_r2_score_dict);
            var predicted_pce = pce_r2_score_dict['predicted_pce'];
            // console.log(pce_test_score);
            forecasted_pce.text(`Based on your inputs, PCE is forecasted to be: ${predicted_pce}`);
            });
    });
};

//CALCULATE GDP Deflator
function calcDeflator() {
    var user_deflator_m2=deflator_val_1.property('value');
    var user_deflator_rgdp=deflator_val_2.property('value');
    var user_deflator_ge=deflator_val_3.property('value');
    var user_deflator_comln=deflator_val_4.property('value');
    var user_deflator_roh=deflator_val_5.property('value');
    var user_deflator_incom=deflator_val_6.property('value');
    var user_deflator_sav=deflator_val_7.property('value');
    var user_deflator_house=deflator_val_8.property('value');
    var user_deflator_rimp=deflator_val_9.property('value');
    var user_deflator_inv=deflator_val_0.property('value');
    var forecasted_deflator=d3.select("#forecasted-deflator");
    // var user_deflator_m2_pct=deflator_pct_1.property('value');
    // var user_deflator_rgdp_pct=deflator_pct_2.property('value');
    // var user_deflator_ge_pct=deflator_pct_3.property('value');
    // var user_deflator_comln_pct=deflator_pct_4.property('value');
    // var user_deflator_roh_pct=deflator_pct_5.property('value');
    // var user_deflator_incom_pct=deflator_pct_6.property('value');
    // var user_deflator_sav_pct=deflator_pct_7.property('value');
    // var user_deflator_house_pct=deflator_pct_8.property('value');
    // var user_deflator_rimp_pct=deflator_pct_9.property('value');
    // var user_deflator_inv_pct=deflator_pct_0.property('value');
    d3.json(`http://127.0.0.1:5000/model_init`).then((model_table_values_dict)=>{
        var deflator_model_table_values=model_table_values_dict['deflator_table_values'];
        var deflator_model_table_pct_changes=model_table_values_dict['deflator_table_pct_changes'];
        var latest_m2=model_table_values_dict['deflator_table_values'][0];
        var latest_rgdp=model_table_values_dict['deflator_table_values'][1];
        var latest_ge=model_table_values_dict['deflator_table_values'][2];
        var latest_comln=model_table_values_dict['deflator_table_values'][3];
        var latest_roh=model_table_values_dict['deflator_table_values'][4];
        var latest_incom=model_table_values_dict['deflator_table_values'][5];
        var latest_sav=model_table_values_dict['deflator_table_values'][6];
        var latest_house=model_table_values_dict['deflator_table_values'][7];
        var latest_rimp=model_table_values_dict['deflator_table_values'][8];
        var latest_inv=model_table_values_dict['deflator_table_values'][9];
        // console.log(user_deflator_m2_pct);
        if (user_deflator_m2 > 0) {
            var m2 = user_deflator_m2;}
            // console.log(m2);}
            else {
                m2 = latest_m2;};
        if (user_deflator_rgdp > 0) {
            var rgdp = user_deflator_rgdp;}
            // console.log(m2);}
            else {
                rgdp = latest_rgdp;};
        if (user_deflator_ge > 0) {
            var ge = user_deflator_ge;}
            // console.log(m2);}
            else {
                ge = latest_ge;};
        if (user_deflator_sav > 0) {
            var sav = user_deflator_sav;}
            // console.log(m2);}
            else {
                sav = latest_sav;};
        if (user_deflator_comln > 0) {
            var comln = user_deflator_comln;}
            // console.log(m2);}
            else {
                comln = latest_comln;};
        if (user_deflator_rimp > 0) {
            var rimp = user_deflator_rimp;}
            // console.log(m2);}
            else {
                rimp = latest_rimp;};
        if (user_deflator_roh > 0) {
            var roh = user_deflator_roh;}
            // console.log(m2);}
            else {
                roh = latest_roh;};
        if (user_deflator_incom > 0) {
            var incom = user_deflator_incom;}
            // console.log(m2);}
            else {
                incom = latest_incom;};
        if (user_deflator_house > 0) {
            var house = user_deflator_house;}
            // console.log(m2);}
            else {
                house = latest_house;};
        if (user_deflator_inv > 0) {
            var inv = user_deflator_inv;}
            // console.log(m2);}
            else {
                inv = latest_inv;};
        d3.json(`http://127.0.0.1:5000/deflator_predict/${m2}/${rgdp}/${ge}/${comln}/${roh}/${incom}/${sav}/${house}/${rimp}/${inv}`).then((deflator_r2_score_dict)=>{
            console.log(deflator_r2_score_dict);
            var predicted_deflator = deflator_r2_score_dict['predicted_deflator'];
            // console.log(deflator_test_score);
            forecasted_deflator.text(`Based on your inputs, GDP Deflator is forecasted to be: ${predicted_deflator}`);
            });
    });
};

//POPULATE THE LINE CHART & SUMMARY STATS, AND HANDLE CHANGES
function renderApexLine() {
    sum_table1.text("");
    sum_table2.text("");
    selection_table.text("");
    var chosen_series1=dropdown1.property('value');
    var chosen_series2=dropdown2.property('value');
    var chosen_series3=dropdown3.property('value');
    var chosen_series4=dropdown4.property('value');
    var chosen_series5=dropdown5.property('value');
    var xyz = 0
    d3.json("../static/column_index.json").then((indexed_columns)=> {
        var index_dict2=indexed_columns;
        var chosen_column1=index_dict2[chosen_series1][0];
        var chosen_column2=index_dict2[chosen_series2][0];
        var chosen_column3=index_dict2[chosen_series3][0];
        var chosen_column4=index_dict2[chosen_series4][0];
        var chosen_column5=index_dict2[chosen_series5][0];
        d3.json("../static/column_table.json").then((columns)=> {
            var table_dict=columns;
            var chosen_table1=table_dict[chosen_column1];
            var chosen_table2=table_dict[chosen_column2];
            var chosen_table3=table_dict[chosen_column3];
            var chosen_table4=table_dict[chosen_column4];
            var chosen_table5=table_dict[chosen_column5];
            d3.json(`http://127.0.0.1:5000/api/${chosen_table1}/${chosen_column1}`).then((return_dict)=>{
                var no_xy1 = return_dict['no_xy'];
                var stats1a = return_dict['stats'];
                var stats1b = return_dict['stats2'];
                d3.json(`http://127.0.0.1:5000/api/${chosen_table2}/${chosen_column2}`).then((return_dict)=>{
                    var no_xy2 = return_dict['no_xy'];
                    var stats2a = return_dict['stats'];
                    var stats2b = return_dict['stats2'];
                    d3.json(`http://127.0.0.1:5000/api/${chosen_table3}/${chosen_column3}`).then((return_dict)=>{
                        var no_xy3 = return_dict['no_xy'];
                        var stats3a = return_dict['stats'];
                        var stats3b = return_dict['stats2'];
                        d3.json(`http://127.0.0.1:5000/api/${chosen_table4}/${chosen_column4}`).then((return_dict)=>{
                            var no_xy4 = return_dict['no_xy'];
                            var stats4a = return_dict['stats'];
                            var stats4b = return_dict['stats2'];
                            d3.json(`http://127.0.0.1:5000/api/${chosen_table5}/${chosen_column5}`).then((return_dict)=>{
                                var no_xy5 = return_dict['no_xy'];
                                var stats5a = return_dict['stats'];
                                var stats5b = return_dict['stats2'];
                                chart.updateSeries([{
                                    name: `${chosen_column1}`,
                                    data: no_xy1,
                                },{
                                    name: `${chosen_column2}`,
                                    data: no_xy2,
                                },{
                                    name: `${chosen_column3}`,
                                    data: no_xy3,
                                },{
                                    name: `${chosen_column4}`,
                                    data: no_xy4,
                                },{
                                    name: `${chosen_column5}`,
                                    data: no_xy5,
                                }]);
                                // POPULATE SUMMARY TABLES HERE #############################################################
                                var sum1_row=sum_table1.append('tr')
                                var sum2_row=sum_table1.append('tr')
                                var sum3_row=sum_table1.append('tr')
                                var sum4_row=sum_table1.append('tr')
                                var sum5_row=sum_table1.append('tr')
                                var sum6_row=sum_table2.append('tr')
                                var sum7_row=sum_table2.append('tr')
                                var sum8_row=sum_table2.append('tr')
                                var sum9_row=sum_table2.append('tr')
                                var sum0_row=sum_table2.append('tr')
                                stats1a.forEach((value) => {
                                    sum1_row.append('td').text(value)});
                                stats2a.forEach((value) => {
                                    sum2_row.append('td').text(value)});
                                stats3a.forEach((value) => {
                                    sum3_row.append('td').text(value)});
                                stats4a.forEach((value) => {
                                    sum4_row.append('td').text(value)});
                                stats5a.forEach((value) => {
                                    sum5_row.append('td').text(value)});
                                stats1b.forEach((value) => {
                                    sum6_row.append('td').text(value)});
                                stats2b.forEach((value) => {
                                    sum7_row.append('td').text(value)});
                                stats3b.forEach((value) => {
                                    sum8_row.append('td').text(value)});
                                stats4b.forEach((value) => {
                                    sum9_row.append('td').text(value)});
                                stats5b.forEach((value) => {
                                    sum0_row.append('td').text(value)});
                                d3.csv("../static/index.csv").then((each_series) => {
                                Object.entries(each_series).forEach(([key, value]) => {
                                    if (key==chosen_series1-1) {
                                        var selection1_row=selection_table.append('tr');
                                        Object.entries(value).forEach(([keys,values]) => {
                                        selection1_row.append('td').text(values)})};
                                    if (key==chosen_series2-1) {
                                        var selection2_row=selection_table.append('tr');
                                        Object.entries(value).forEach(([keys,values]) => {
                                        selection2_row.append('td').text(values)})};
                                    if (key==chosen_series3-1) {
                                        var selection3_row=selection_table.append('tr');
                                        Object.entries(value).forEach(([keys,values]) => {
                                        selection3_row.append('td').text(values)})};
                                    if (key==chosen_series4-1) {
                                        var selection4_row=selection_table.append('tr');
                                        Object.entries(value).forEach(([keys,values]) => {
                                        selection4_row.append('td').text(values)})};
                                    if (key==chosen_series5-1) {
                                        var selection5_row=selection_table.append('tr');
                                        Object.entries(value).forEach(([keys,values]) => {
                                        selection5_row.append('td').text(values)})};
                                })});
                            });
                        });
                    });
                });
            });
        });
    });
};


//DECLARE OPTIONS FOR GAUGE
var corr_coef=.75;
var gauge_trace = [{
        domain: {x:[0,1],y:[0,1]},
        value: corr_coef,
        type:"indicator",
        textposition: "inside",
        mode: "gauge+number",
        //delta:{reference:10},
        gauge:{
            axis:{range:[0,1]},
            steps: [{range:[0,.25], color:"Azure"},
                    {range:[.25,.5], color:"LightSkyBlue"},
                    {range:[.5,.75], color:"DodgerBlue"},
                    {range:[.75,1], color:"MidnightBlue"}
                    ],
            bar:{color:"SlateGray"}
        }
    }];
var gauge_layout = {width: 600, height: 300, margin:{t:0,b:0},paper_bgcolor:"darkgray"};


//DECLARE OPTIONS FOR SCATTER PLOT
var scatter_options = {
     series: [
    ],
    chart: {
    height: 600,
    width: 1000,
    type: 'scatter',
    zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
    },
    animations: {
        enabled: true,
        speed: 200,
        animateGradually: {
            enabled: false,
            delay: 0
        },
        dynamicAnimation: {
            enabled: true,
            speed: 200,
        },
    },
    background: 'darkgray',
    grid: {
        row: {
            colors: ['darkgray', 'lightgray'], 
            opacity: 0.9
        },
        },
    toolbar: {
        offsetY: -30,
        },
    events: {
        zoomed: function(chartContext, {xaxis, yaxis}) {
            var zoomed_x_min=new Date(xaxis['min']);
            var zoomed_x_max=new Date(xaxis['max']);
            var min_month = zoomed_x_min.getMonth();
            var min_day = zoomed_x_min.getDate();
            var min_year = zoomed_x_min.getFullYear();
            var zoomed_x_min_date = (min_month+1) + "-" + min_day + "-" + min_year;
            var max_month = zoomed_x_max.getMonth();
            var max_day = zoomed_x_max.getDate();
            var max_year = zoomed_x_max.getFullYear();
            var zoomed_x_max_date = (max_month+1) + "-" + max_day + "-" + max_year;
            var zoomed_x_max_date_quotes = "'" + zoomed_x_max_date + "'";
            var zoomed_x_min_date_quotes = "'" + zoomed_x_min_date + "'";
        },
        beforeResetZoom: function(chartContext, opts) {
            plotScatter()
        }
    },
    },    
    tooltip: {
        shared: true,
        intersect:false,
        fillSeriesColor: true,
        theme: 'dark'
        // x: {
        //     format: 'MMM d, yyyy'
        // }
    },
    xaxis: {
        // type: 'xy',
        tickAmount: 10
    },
    yaxis: [{
        labels: {
        formatter: function (val) {
            return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            },
        },
    },

    ],
    };

//CREATE AN INSTANCE OF SCATTER PLOT
var scatter = new ApexCharts(document.querySelector("#scatter"), scatter_options);

//POPULATE THE SCATTER PLOT AND CALCULATE CORRELATION
function plotScatter() {
    var chosen_series6=dropdown6.property('value');
    var chosen_series7=dropdown7.property('value');
    var chosen_series8=dropdown8.property('value');
    var chosen_series9=dropdown9.property('value');
    var input_start_date=date_input1.property('value');
    var input_end_date=date_input2.property('value');
    if (input_start_date=="") {
        var start_date = 'default';}
        else {
            var start_date = input_start_date};
    if (input_end_date=="") {
        var end_date = 'default';}
        else {
            var end_date = input_end_date};
    d3.json("../static/column_index.json").then((indexed_columns)=> {
        var index_dict3=indexed_columns;
        var chosen_main6=index_dict3[chosen_series6][0];
        var chosen_main7=index_dict3[chosen_series7][0];
        if (chosen_series8=='Main') {
            var chosen_column6=index_dict3[chosen_series6][0];}
            else if (chosen_series8=='Change') {
                var chosen_column6=index_dict3[chosen_series6][0].concat('_change');}
                else {
                    var chosen_column6=index_dict3[chosen_series6][0].concat('_Pct_Change');};
        if (chosen_series9=='Main') {
            var chosen_column7=chosen_main7;}
            else if (chosen_series9=='Change') {
                var  chosen_column7=chosen_main7.concat('_change');}
                else {
                    var  chosen_column7=chosen_main7.concat('_Pct_Change');};
        
        d3.json("../static/column_table.json").then((columns)=> {
            var table_dict=columns;
            var chosen_table6=table_dict[chosen_main6];
            var chosen_table7=table_dict[chosen_main7];
            d3.json(`http://127.0.0.1:5000/scatter_api/${chosen_table6}/${chosen_column6}/${chosen_table7}/${chosen_column7}/${start_date}/${end_date}`).then((return_dict)=>{
                // console.log(return_dict);
                var no_xy = return_dict['scatter_values']
                var corr_coef = return_dict['corr_coef']
                // console.log(return_dict);
                // console.log(no_xy);
                // console.log(corr_coef)
                // d3.json(`http://127.0.0.1:5000/scatter_api/${chosen_table7}/${chosen_column7}`).then((return_dict)=>{
                //     var no_xy2 = return_dict['no_xy'];
                    // console.log(no_xy);
                    // console.log(no_xy2);
                    // d3.json(`http://127.0.0.1:5000/correlation/${chosen_table6}/${chosen_column6}/${chosen_table7}/${chosen_column7}`).then((corr_coef_dict) => {
                    //     var corr_coef = corr_coef_dict['corr_coef'];
                        // console.log(corr_coef_dict);
                        // console.log(corr_coef);
                        Plotly.restyle('gauge', 'value',[corr_coef]);
                        scatter.updateSeries([{
                            name: `x:${chosen_column6}  y:${chosen_column7}`,
                            data: no_xy
                        }
                        ]);
                    // });
                // });
            });
        });
    });
};

function zoomSumChartUpdate(start_date, end_date) {
    sum_table1.text("")
    sum_table2.text("")
    // setTimeout(() => {sum_table1.text(""); sum_table2.text("");}, 500);
    var chosen_series1=dropdown1.property('value');
    var chosen_series2=dropdown2.property('value');
    var chosen_series3=dropdown3.property('value');
    var chosen_series4=dropdown4.property('value');
    var chosen_series5=dropdown5.property('value');
    d3.json("../static/column_index.json").then((indexed_columns)=> {
        var index_dict2=indexed_columns;
        var chosen_column1=index_dict2[chosen_series1][0];
        var chosen_column2=index_dict2[chosen_series2][0];
        var chosen_column3=index_dict2[chosen_series3][0];
        var chosen_column4=index_dict2[chosen_series4][0];
        var chosen_column5=index_dict2[chosen_series5][0];
        d3.json("../static/column_table.json").then((columns)=> {
            var table_dict=columns;
            var chosen_table1=table_dict[chosen_column1];
            var chosen_table2=table_dict[chosen_column2];
            var chosen_table3=table_dict[chosen_column3];
            var chosen_table4=table_dict[chosen_column4];
            var chosen_table5=table_dict[chosen_column5];
            d3.json(`http://127.0.0.1:5000/sumtablezoom/${chosen_table1}/${chosen_column1}/${start_date}/${end_date}`).then((return_dict)=>{
                var stats1a = return_dict['stats'];
                var stats1b = return_dict['stats2'];
                d3.json(`http://127.0.0.1:5000/sumtablezoom/${chosen_table2}/${chosen_column2}/${start_date}/${end_date}`).then((return_dict)=>{
                    var stats2a = return_dict['stats'];
                    var stats2b = return_dict['stats2'];
                    d3.json(`http://127.0.0.1:5000/sumtablezoom/${chosen_table3}/${chosen_column3}/${start_date}/${end_date}`).then((return_dict)=>{
                        var stats3a = return_dict['stats'];
                        var stats3b = return_dict['stats2'];
                        d3.json(`http://127.0.0.1:5000/sumtablezoom/${chosen_table4}/${chosen_column4}/${start_date}/${end_date}`).then((return_dict)=>{
                            var stats4a = return_dict['stats'];
                            var stats4b = return_dict['stats2'];
                            d3.json(`http://127.0.0.1:5000/sumtablezoom/${chosen_table5}/${chosen_column5}/${start_date}/${end_date}`).then((return_dict)=>{
                                var stats5a = return_dict['stats'];
                                var stats5b = return_dict['stats2'];
                                // POPULATE SUMMARY TABLES HERE #############################################################
                                var sum1_row=sum_table1.append('tr')
                                var sum2_row=sum_table1.append('tr')
                                var sum3_row=sum_table1.append('tr')
                                var sum4_row=sum_table1.append('tr')
                                var sum5_row=sum_table1.append('tr')
                                var sum6_row=sum_table2.append('tr')
                                var sum7_row=sum_table2.append('tr')
                                var sum8_row=sum_table2.append('tr')
                                var sum9_row=sum_table2.append('tr')
                                var sum0_row=sum_table2.append('tr')
                                stats1a.forEach((value) => {
                                    sum1_row.append('td').text(value)});
                                stats2a.forEach((value) => {
                                    sum2_row.append('td').text(value)});
                                stats3a.forEach((value) => {
                                    sum3_row.append('td').text(value)});
                                stats4a.forEach((value) => {
                                    sum4_row.append('td').text(value)});
                                stats5a.forEach((value) => {
                                    sum5_row.append('td').text(value)});
                                stats1b.forEach((value) => {
                                    sum6_row.append('td').text(value)});
                                stats2b.forEach((value) => {
                                    sum7_row.append('td').text(value)});
                                stats3b.forEach((value) => {
                                    sum8_row.append('td').text(value)});
                                stats4b.forEach((value) => {
                                    sum9_row.append('td').text(value)});
                                stats5b.forEach((value) => {
                                    sum0_row.append('td').text(value)});
                            });
                        });
                    });
                });
            });
        });
    });
};

function chooseChartOptions() {
    var band_or_event = dropdown12.property('value');
    // console.log(band_or_event);
    if (band_or_event == 'Presidents') {
        // var chart_options = options1;
        // console.log(chart_options);
        chart.updateOptions({
            annotations: {
                position: 'back',
                xaxis: [{
                    x: new Date('20 Jan 2021').getTime(),
                    x2: new Date('4 Oct 2021').getTime(),
                    fillColor: 'blue',
                    opacity: 0.1
                },
                {
                    x: new Date('20 Jan 2017').getTime(),
                    x2: new Date('20 Jan 2021').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                    {
                    x: new Date('20 Jan 2009').getTime(),
                    x2: new Date('20 Jan 2017').getTime(),
                    fillColor: 'blue',
                    opacity: 0.1
                },
                {
                    x: new Date('20 Jan 2001').getTime(),
                    x2: new Date('20 Jan 2009').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                    {
                    x: new Date('20 Jan 1993').getTime(),
                    x2: new Date('20 Jan 2001').getTime(),
                    fillColor: 'blue',
                    opacity: 0.1
                },
                {
                    x: new Date('20 Jan 1989').getTime(),
                    x2: new Date('20 Jan 1993').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                    {
                    x: new Date('20 Jan 1981').getTime(),
                    x2: new Date('20 Jan 1989').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                {
                    x: new Date('20 Jan 1977').getTime(),
                    x2: new Date('20 Jan 1981').getTime(),
                    fillColor: 'blue',
                    opacity: 0.1
                },
                    {
                    x: new Date('09 Aug 1974').getTime(),
                    x2: new Date('20 Jan 1977').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                {
                    x: new Date('20 Jan 1969').getTime(),
                    x2: new Date('09 Aug 1974').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                    {
                    x: new Date('20 Jan 1969').getTime(),
                    x2: new Date('22 Nov 1963').getTime(),
                    fillColor: 'blue',
                    opacity: 0.1
                },
                {
                    x: new Date('20 Jan 1961').getTime(),
                    x2: new Date('22 Nov 1963').getTime(),
                    fillColor: 'blue',
                    opacity: 0.1
                },
                    {
                    x: new Date('20 Jan 1953').getTime(),
                    x2: new Date('20 Jan 1961').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                {
                    x: new Date('12 Apr 1945').getTime(),
                    x2: new Date('20 Jan 1953').getTime(),
                    fillColor: 'blue',
                    opacity: 0.1
                },
                    {
                    x: new Date('04 Mar 1933').getTime(),
                    x2: new Date('12 Apr 1945').getTime(),
                    fillColor: 'blue',
                    opacity: 0.1
                },
                {
                    x: new Date('04 Mar 1929').getTime(),
                    x2: new Date('04 Jan 1933').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                    {
                    x: new Date('02 Aug 1923').getTime(),
                    x2: new Date('04 Mar 1929').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                {
                    x: new Date('04 Mar 1921').getTime(),
                    x2: new Date('02 Aug 1923').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                    {
                    x: new Date('04 Mar 1913').getTime(),
                    x2: new Date('04 Mar 1921').getTime(),
                    fillColor: 'blue',
                    opacity: 0.1
                },
                {
                    x: new Date('04 Mar 1909').getTime(),
                    x2: new Date('04 Mar 1913').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                },
                    {
                    x: new Date('14 Sep 1901').getTime(),
                    x2: new Date('04 Mar 1909').getTime(),
                    fillColor: 'red',
                    opacity: 0.1
                }]
            }
        });
    };
    if (band_or_event == 'None') {
        chart.updateOptions({
            annotations: {
                xaxis: [{
                    x: new Date('01 Jan 1801').getTime(),
                    x2: new Date ('02 Jan 1801').getTime(),
                    fillColor: 'lightgray',
                    opacity: 0.1
                }]
            }
        });
    };
    if (band_or_event == 'Recessions') {
        chart.updateOptions({
            annotations: {
                xaxis: [{
                    x: new Date('02 Feb 2020').getTime(),
                    x2: new Date('01 Apr 2020').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                {
                    x: new Date('01 Dec 2007').getTime(),
                    x2: new Date('01 Jun 2009').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                    {
                    x: new Date('01 Mar 2001').getTime(),
                    x2: new Date('01 Nov 2001').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                    },
                {
                    x: new Date('01 Jul 1990').getTime(),
                    x2: new Date('01 Mar 1991').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                    {
                    x: new Date('01 Jul 1981').getTime(),
                    x2: new Date('01 Nov 1982').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                {
                    x: new Date('01 Jan 1980').getTime(),
                    x2: new Date('01 Jul 1980').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                    {
                    x: new Date('01 Nov 1973').getTime(),
                    x2: new Date('01 Mar 1975').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                {
                    x: new Date('01 Dec 1969').getTime(),
                    x2: new Date('01 Nov 1970').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                    {
                    x: new Date('01 Apr 1960').getTime(),
                    x2: new Date('01 Feb 1961').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                {
                    x: new Date('01 Aug 1957').getTime(),
                    x2: new Date('01 Apr 1958').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                    {
                    x: new Date('01 Jul 1953').getTime(),
                    x2: new Date('01 May 1954').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                {
                    x: new Date('01 Feb 1945').getTime(),
                    x2: new Date('01 Oct 1945').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                    {
                    x: new Date('01 May 1937').getTime(),
                    x2: new Date('01 Jun 1938').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                },
                {
                    x: new Date('01 Aug 1929').getTime(),
                    x2: new Date('01 Mar 1933').getTime(),
                    fillColor: 'black',
                    opacity: 0.1
                }]
            }
        });
    };
    if (band_or_event =='Events') {
        chart.updateOptions({
            annotations: {
                position: 'front',
                xaxis: [{
                    x: new Date('01 Sep 1939').getTime(),
                    borderColor: 'black',
                    label: {
                        borderColor: 'black',
                        stye: {
                            color: 'black',
                            background: 'black'
                        },
                        text: 'WWII Begins'
                    }
                    },
                    {
                    x: new Date('07 Dec 1941').getTime(),
                    borderColor: 'black',
                    label: {
                        stye: {
                            color: 'black',
                        },
                        text: 'Pearl Harbor'
                    }
                    },
                    {
                    x: new Date('02 Sep 1945').getTime(),
                    borderColor: 'black',
                    label: {
                        stye: {
                            color: 'WWII Ends',
                        },
                        text: 'WWII Begins'
                    }
                    },
                    {
                    x: new Date('12 Mar 1947').getTime(),
                    borderColor: 'red',
                    label: {
                        stye: {
                            color: 'red',
                        },
                        text: 'Cold War Begins'
                    }
                    },
                    {
                    x: new Date('25 Dec 1991').getTime(),
                    borderColor: 'red',
                    label: {
                        stye: {
                            color: 'red',
                        },
                        text: 'Cold War Ends'
                    }
                    },
                    {
                    x: new Date('01 Mar 1961').getTime(),
                    borderColor: 'green',
                    label: {
                        stye: {
                            color: 'green',
                        },
                        text: 'US in Vietnam Begins'
                    }
                    },
                    {
                    x: new Date('07 May 1975').getTime(),
                    borderColor: 'green',
                    label: {
                        stye: {
                            color: 'green',
                        },
                        text: 'US in Vietnam Ends'
                    }
                    },
                    {
                    x: new Date('01 Mar 1964').getTime(),
                    borderColor: 'blue',
                    label: {
                        stye: {
                            color: 'blue',
                        },
                        text: 'Great Society'
                    }
                    },
                    {
                    x: new Date('02 Jul 1964').getTime(),
                    borderColor: 'purple',
                    label: {
                        stye: {
                            color: 'purple',
                        },
                        text: 'Civil Rights Act'
                    }
                    },
                    {
                    x: new Date('15 Aug 1971').getTime(),
                    borderColor: 'gold',
                    label: {
                        stye: {
                            color: 'gold',
                        },
                        text: 'End of Bretton Woods'
                    }
                    },
                    {
                    x: new Date('11 Sep 2001').getTime(),
                    borderColor: 'orange',
                    label: {
                        stye: {
                            color: 'orange',
                        },
                        text: '9/11 Attacks'
                    }
                    },
                    {
                    x: new Date('01 Mar 2020').getTime(),
                    borderColor: 'Black',
                    label: {
                        borderColor: 'black',
                        stye: {
                            color: 'white',
                            background: 'black'
                        },
                        text: 'COVID Begins'
                    }
                }]
            }
        });
    }
};


// function correlationUpdate(start_date, end_date) {
//         var chosen_series6=dropdown6.property('value');
//         var chosen_series7=dropdown7.property('value');
//         var chosen_series8=dropdown8.property('value');
//         var chosen_series9=dropdown9.property('value');
//         d3.json("../static/column_index.json").then((indexed_columns)=> {
//             var index_dict3=indexed_columns;
//             var chosen_main6=index_dict3[chosen_series6][0];
//             var chosen_main7=index_dict3[chosen_series7][0];
//             if (chosen_series8=='Main') {
//                 var chosen_column6=index_dict3[chosen_series6][0];}
//                 else if (chosen_series8=='Change') {
//                     var chosen_column6=index_dict3[chosen_series6][0].concat('_Change');}
//                     else {
//                         var chosen_column6=index_dict3[chosen_series6][0].concat('_Pct_Change');};
//             if (chosen_series9=='Main') {
//                 var chosen_column7=chosen_main7;}
//                 else if (chosen_series9=='Change') {
//                     var  chosen_column7=chosen_main7.concat('_Change');}
//                     else {
//                         var  chosen_column7=chosen_main7.concat('_Pct_Change');};
//             // console.log(chosen_column6);
//             // console.log(chosen_column7);
//             d3.json("../static/column_table.json").then((columns)=> {
//                 var table_dict=columns;
//                 var chosen_table6=table_dict[chosen_main6];
//                 var chosen_table7=table_dict[chosen_main7];
//                 // console.log(chosen_table6);
//                 // console.log(chosen_table7);
//                 d3.json(`http://127.0.0.1:5000/correlationupdate/${chosen_table6}/${chosen_column6}/${chosen_table7}/${chosen_column7}/${start_date}/${end_date}`).then((corr_coef_dict) => {
//                     var corr_coef = corr_coef_dict['corr_coef'];
//                     console.log(corr_coef_dict);
//                     console.log(corr_coef);
//                     Plotly.restyle('gauge', 'value',[corr_coef]);                    
//                     var corr_coef = corr_coef_dict['corr_coef'];
//                     console.log(corr_coef_dict);
//                     console.log(corr_coef);
//                     Plotly.restyle('gauge', 'value',[corr_coef]);
//                 });
//             });
//         });
//     };