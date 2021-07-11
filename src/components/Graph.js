import { useEffect, useState, memo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";

const options = {
	title: {
		text: "",
	},
	chart: {
		type: "areaspline",
	},
	credits: {
		enabled: false,
	},
	legend: {
		enabled: false,
	  },
	plotOptions: {
		areaspline: {
			fillColor: {
				linearGradient: {
					x1: 0,
					y1: 0,
					x2: 0,
					y2: 1,
				},
				stops: [
					[0, "#232361"],
					[1, "rgba(255, 255, 255 , 0)"],
				],
			},
			marker: {
				radius: 2,
				fillColor: "#EF0AA1",
			},
			lineWidth: 2,
			lineColor: "#001D6D",
			states: {
				hover: {
					enabled: false,
				},
			},
			threshold: null,
		},
	},
};


const Graph = ({ data, bgColor }) => {
	const [highchartOptions, setHighchartOptions] = useState(options);
	useEffect(() => {
		const graphData = [];
		const xaxisLabel = [];
		data.slice(1).forEach((dataItem, index) => {
			graphData.push({
				y: dataItem[1]
			});
			xaxisLabel.push(dataItem[0])
		});
		setHighchartOptions((rest) => {
			return {
				...rest,
				series: [
					{
						data: graphData,
					},
				],
				xAxis: {
					categories: xaxisLabel,
					title: {
						text: data[0][0]
					}
				}
			};
		});
	}, [data]);

	useEffect(() => {
		setHighchartOptions(({ chart, ...rest }) => {
			const { backgroundColor, ...restChart } = chart;
			return {
				...rest,
				chart: {
					backgroundColor: bgColor,
					...restChart
				}
			};
		});
	}, [bgColor])

	return <HighchartsReact highcharts={Highcharts} options={highchartOptions} />;
};
Graph.propTypes = {
	data: PropTypes.array.isRequired,
};

export default memo(Graph);