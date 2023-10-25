import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { data } from "./data";

export const SensexChart = () => {
  const chartContainerRef = useRef(null);
  const ohlcLegendRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    chartInstance.current = createChart(chartContainerRef.current, {
      width: window.innerWidth - 200,
      height: window.innerHeight - 100,
    });

    const series = chartInstance.current.addCandlestickSeries();

    series.setData(data);

    chartInstance.current.subscribeCrosshairMove((param) => {
      if (param.time && param.seriesData) {
        const { open, high, low, close, time } = param.seriesData.get(series);
        const ohlcLegend = `OHLC: Open: ${open}, High: ${high}, Low: ${low}, Close: ${close}`;
        ohlcLegendRef.current.textContent = ohlcLegend;
      } else {
        ohlcLegendRef.current.textContent = "OHLC:";
      }
    });

    return () => {
      chartInstance.current.remove();
    };
  }, [data]);

  return (
    <div>
      <div ref={chartContainerRef}></div>
      <div
        ref={ohlcLegendRef}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "white",
          padding: "5px",
          border: "1px solid gray",
        }}
      >
        OHLC:
      </div>
    </div>
  );
};
