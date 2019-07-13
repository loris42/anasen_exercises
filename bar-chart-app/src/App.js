import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { salesData, salesDataToChartdData } from './dataSource';
import { drawChart, updateBars } from './d3/barChart';
import { reducer } from './reducer';

function App() {
  const [state, dispatch] = React.useReducer(reducer, { data: salesDataToChartdData(salesData) });

  function onColumnClick(datum) {
    try {
      dispatch({
        type: "TOGGLE_COLUMN_SELECTION",
        payload: {
          x: datum.x,
        },
      })
    } catch (error) {
      console.warn(error);
    }
  }
  
  function onColumnUpdate(datum, newY) {
    try {
      dispatch({
        type: "UPDATE_COLUMN_VALUE",
        payload: {
          x: datum.x,
          newY,
        },
      })
    } catch (error) {
      console.warn(error);
    }
  }

  return (
      <React.Fragment>
        <BarChart
          id="left"
          data={state.data}
          yAxisTitle="sum(Profit)"
          onColumnClick={onColumnClick}
          onColumnUpdate={onColumnUpdate}
        />
        <BarChart
          id="right"
          data={state.data}
          yAxisTitle="sum(Profit)"
          onColumnClick={onColumnClick}
          onColumnUpdate={onColumnUpdate}
        />
     </React.Fragment>
  )
}

function BarChart({ id, data, yAxisTitle, onColumnClick, onColumnUpdate }) {
  const [chartRefs, setChartRefs] = React.useState({});
  React.useEffect(() => setChartRefs(drawChart(id, data, yAxisTitle, onColumnClick, onColumnUpdate)), []);
  React.useEffect(() => updateBars(id, data, chartRefs), [id, data, chartRefs]);

  return (
      <svg id={id} className="chart"></svg>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

export default App;
