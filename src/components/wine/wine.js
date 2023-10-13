import React, { useState, useEffect } from "react";
import { helpers } from "../../utils";
import Table from "../commonComponents/Table";
import styles from "./wine.module.css";
import axios from "axios";

const WineStats = () => {
  const [data, setData] = useState([]);
  const [gammaData, setGammaData] = useState([]);

  // Define the grouping function
  function grouping(result, current) {
    debugger;
    const categary = current.Alcohol;
    if (!(categary in result)) {
      result[categary] = [];
    }
    result[categary].push({
      ...current,
      gamma: helpers.calculateGamma(current),
    });
    return result;
  }

  const results = {};
  const gammaResult = {};

  async function fetchData() {
    debugger;
    try {
      const response = await axios.get("/data.json"); // Assuming the file is in the public folder

      console.log(response);
      // setData(response.data.data);
      let roleObj = {};
      const data = response.data.data.reduce(grouping, {});
      // setData(data);

      console.log(data);
      for (const key in data) {
        results[key] = {
          mean: helpers.calculateMean(data[key], "Flavanoids"),
          median: helpers.calculateMedian(data[key], "Flavanoids"),
          mode: helpers.calculateMode(data[key], "Flavanoids"),
        };
        gammaResult[key] = {
          mean: helpers.calculateMean(data[key], "gamma"),
          median: helpers.calculateMedian(data[key], "gamma"),
          mode: helpers.calculateMode(data[key], "gamma"),
        };
      }

      console.log(results);
      console.log(gammaResult);

      console.log(Object.keys(results));
      console.log(Object.values(results));
      setData(results);
      setGammaData(gammaResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table
        header={Object.keys(data)}
        data={Object.entries(data)}
        dataName="Flavanoids"
      />
      <Table
        header={Object.keys(gammaData)}
        data={Object.entries(gammaData)}
        dataName="Gamma"
      />
    </div>
  );
};

export default WineStats;
