import { Component, Input, OnInit,OnChanges , ViewChild, SimpleChanges } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { SeriesMap } from 'src/app/interfaces/series-map';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart-plug',
  templateUrl: './chart-plug.component.html',
  styleUrls: ['./chart-plug.component.css']
})
export class ChartPlugComponent implements OnInit,OnChanges  {

  @ViewChild("chart")
  chart!: ChartComponent;
  chartOptions: Partial<ChartOptions> | any;
  @Input("data") data: SeriesMap[] = [];
  @Input("options") options!: any;

  constructor() {
    this.setupData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("asss");
    this.setupData();
  }

  setupData(){
    this.chartOptions = {
      series: [
        {
          name: (this.options!=null && this.options.title!=undefined) 
          ? this.options.title.text
          : "My-series",
          data: this.data.map((data: SeriesMap)=>data.y),
        }
      ],
      chart: (this.options!=null && this.options.chart!=undefined) 
      ? this.options.chart
      : {
        height: this.data.length * 20,
        type: "bar"
      },
      title:  (this.options!=null && this.options.title!=undefined) 
      ? this.options.title
      : {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: this.data.map((data: SeriesMap)=>data.x)
      },
      yaxis: {
        show:false
        // categories: this.data.map((data: SeriesMap)=>data.x)
      },
      plotOptions: (this.options!=null && this.options.plotOptions!=undefined) 
        ? this.options.plotOptions
        : {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          },
        }
      },
      legend: {show: false},
      dataLabels:  (this.options!=null && this.options.dataLabels!=undefined) 
      ? this.options.dataLabels
      : {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#666']
        },
        formatter: function (val: any, opt: any) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        },
        offsetX: 0,
        dropShadow: {
          enabled: false
        }
      },
    };
  }

  ngOnInit(): void {
  }

}
