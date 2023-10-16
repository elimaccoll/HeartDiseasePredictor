import { boxPlotInfo } from "./chart-util.js";
import {
  ageN,
  ageY,
  chestPainTypeInfo,
  cholesterolN,
  cholesterolY,
  exerciseAnginaInfo,
  fastingBSInfo,
  maxHRN,
  maxHRY,
  oldpeakN,
  oldpeakY,
  sexInfo,
  stSlopeInfo,
} from "./chart-data.js";

export const boxplotNY = (
  chartId,
  chartTitle,
  chartLabel,
  dataN,
  dataY,
  userValue
) => {
  return Highcharts.chart(chartId, {
    chart: {
      type: "boxplot",
    },

    title: {
      text: chartTitle,
    },

    legend: {
      enabled: false,
    },

    xAxis: {
      categories: ["N", "Y"],
      title: {
        text: "Heart Disease",
      },
    },

    yAxis: {
      title: {
        text: chartLabel,
      },
      plotLines: [
        {
          value: userValue,
          zIndex: 100,
          color: "red",
          width: 1,
          label: {
            text: `User ${chartLabel}`,
            align: "center",
            style: {
              color: "gray",
            },
          },
        },
      ],
    },
    series: [
      {
        name: chartLabel,
        data: [dataN, dataY],
        tooltip: {
          headerFormat: "<em>Heart Disease: {point.key}</em><br/>",
        },
      },
    ],
  });
};

export const stackedBarChartMF = (
  chartId,
  chartTitle,
  dataObj,
  userCategory
) => {
  Highcharts.chart(chartId, {
    chart: {
      type: "bar",
    },

    title: {
      text: chartTitle,
      align: "center",
    },

    xAxis: {
      categories: ["N", "Y"],
      title: { text: "Heart Disease" },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      floating: true,
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Count",
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },

    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          this.x +
          "</b><br/>" +
          this.series.name +
          ": " +
          this.y +
          "<br/>" +
          "Total: " +
          this.point.stackTotal
        );
      },
    },

    series: [
      {
        name: "F",
        data: [
          { y: dataObj.N.F, color: userCategory === "NF" ? "red" : "" },
          { y: dataObj.Y.F, color: userCategory === "YF" ? "red" : "" },
        ],
      },
      {
        name: "M",
        data: [
          { y: dataObj.N.M, color: userCategory === "NM" ? "red" : "" },
          { y: dataObj.Y.M, color: userCategory === "YM" ? "red" : "" },
        ],
      },
    ],
  });
};

export const stackedBarChartYN = (
  chartId,
  chartTitle,
  dataObj,
  userCategory
) => {
  Highcharts.chart(chartId, {
    chart: {
      type: "bar",
    },

    title: {
      text: chartTitle,
      align: "center",
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      floating: true,
    },

    xAxis: {
      categories: ["N", "Y"],
      title: { text: "Heart Disease" },
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Count",
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },

    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          this.x +
          "</b><br/>" +
          this.series.name +
          ": " +
          this.y +
          "<br/>" +
          "Total: " +
          this.point.stackTotal
        );
      },
    },

    series: [
      {
        name: "N",
        data: [
          { y: dataObj.N.N, color: userCategory === "NN" ? "red" : "" },
          { y: dataObj.Y.N, color: userCategory === "YN" ? "red" : "" },
        ],
      },
      {
        name: "Y",
        data: [
          { y: dataObj.N.Y, color: userCategory === "NY" ? "red" : "" },
          { y: dataObj.Y.Y, color: userCategory === "YY" ? "red" : "" },
        ],
      },
    ],
  });
};

export const chestPainTypeChart = (dataObj, userCategory) => {
  Highcharts.chart("chestpain-chart", {
    chart: {
      type: "column",
    },

    title: {
      text: "Chest Pain Type wrt Heart Disease",
      align: "center",
    },

    xAxis: {
      categories: ["N", "Y"],
      title: { text: "Heart Disease" },
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Count",
      },
    },

    tooltip: {
      formatter: function () {
        return "<b>" + this.x + "</b><br/>" + this.series.name + ": " + this.y;
      },
    },

    plotOptions: {
      column: {
        stacking: "normal",
      },
    },

    series: [
      {
        name: "ATA",
        data: [
          { y: dataObj.N.ATA, color: userCategory === "NATA" ? "red" : "" },
          { y: dataObj.Y.ATA, color: userCategory === "YATA" ? "red" : "" },
        ],
        stack: "ATA",
      },
      {
        name: "NAP",
        data: [
          { y: dataObj.N.NAP, color: userCategory === "NNAP" ? "red" : "" },
          { y: dataObj.Y.NAP, color: userCategory === "YNAP" ? "red" : "" },
        ],
        stack: "NAP",
      },
      {
        name: "ASY",
        data: [
          { y: dataObj.N.ASY, color: userCategory === "NASY" ? "red" : "" },
          { y: dataObj.Y.ASY, color: userCategory === "YASY" ? "red" : "" },
        ],
        stack: "ASY",
      },
      {
        name: "TA",
        data: [
          { y: dataObj.N.TA, color: userCategory === "NTA" ? "red" : "" },
          { y: dataObj.Y.TA, color: userCategory === "YTA" ? "red" : "" },
        ],
        stack: "TA",
      },
    ],
  });
};

export const stSlopeChart = (dataObj, userCategory) => {
  Highcharts.chart("stslope-chart", {
    chart: {
      type: "column",
    },

    title: {
      text: "ST Slope wrt Heart Disease",
      align: "center",
    },

    xAxis: {
      categories: ["N", "Y"],
      title: { text: "Heart Disease" },
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Count",
      },
    },

    tooltip: {
      formatter: function () {
        return "<b>" + this.x + "</b><br/>" + this.series.name + ": " + this.y;
      },
    },

    plotOptions: {
      column: {
        stacking: "normal",
      },
    },

    series: [
      {
        name: "Up",
        data: [
          { y: dataObj.N.Up, color: userCategory === "NUp" ? "red" : "" },
          { y: dataObj.Y.Up, color: userCategory === "YUp" ? "red" : "" },
        ],
        stack: "Up",
      },
      {
        name: "Flat",
        data: [
          { y: dataObj.N.Flat, color: userCategory === "NFlat" ? "red" : "" },
          { y: dataObj.Y.Flat, color: userCategory === "YFlat" ? "red" : "" },
        ],
        stack: "Flat",
      },
      {
        name: "Down",
        data: [
          { y: dataObj.N.Down, color: userCategory === "NDown" ? "red" : "" },
          { y: dataObj.Y.Down, color: userCategory === "YDown" ? "red" : "" },
        ],
        stack: "Down",
      },
    ],
  });
};

export const createInitialCharts = () => {
  stackedBarChartMF("sex-chart", "Sex wrt Heart Disease", sexInfo);
  boxplotNY(
    "age-chart",
    "Age wrt Heart Disease",
    "Age",
    boxPlotInfo(ageN),
    boxPlotInfo(ageY)
  );
  stackedBarChartYN(
    "fastingbs-chart",
    "Fasting BS wrt Heart Disease",
    fastingBSInfo
  );
  chestPainTypeChart(chestPainTypeInfo);
  boxplotNY(
    "oldpeak-chart",
    "Oldpeak wrt Heart Disease",
    "Oldpeak",
    boxPlotInfo(oldpeakN),
    boxPlotInfo(oldpeakY)
  );
  stackedBarChartYN(
    "exerciseangina-chart",
    "Exercise Angina wrt Heart Disease",
    exerciseAnginaInfo
  );
  stSlopeChart(stSlopeInfo);
  boxplotNY(
    "cholesterol-chart",
    "Cholesterol wrt Heart Disease",
    "Cholesterol",
    boxPlotInfo(cholesterolN),
    boxPlotInfo(cholesterolY)
  );
  boxplotNY(
    "maxhr-chart",
    "Max HR wrt Heart Disease",
    "Max HR",
    boxPlotInfo(maxHRN),
    boxPlotInfo(maxHRY)
  );
};
createInitialCharts();
// TODO: on user data submit, recreate graphs with the data point included
