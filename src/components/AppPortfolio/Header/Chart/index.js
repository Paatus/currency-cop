import React, { PropTypes } from 'react'
import './index.css'
import { Line } from 'react-chartjs-2'
import { formatNumber } from '../../../../helpers'

const labelFormatterFunc = (toolTip, data) => {
    const currency = data.datasets[0].currency
    return `${formatNumber(toolTip.yLabel)} ${currency}`
}

const chartOptions = {
  tooltips: {
    callbacks: {
        label: labelFormatterFunc
    }
  },
  legend: { display: false, },
  maintainAspectRatio: false,
  layout: { padding: { left: 5, right: 5, }},
  scales: {
    yAxes: [{
      display: false,
    }],
    xAxes: [{
      display: false,
    }]
  }
}

const generateDataSet = (data, currency) => ({
  labels: data.map(() => ''),
  datasets: [
    {
      fill: true,
      lineTension: 0.3,
      borderWidth: 2,
      pointRadius: 3,
      borderColor: 'rgba(104, 99, 206, 1)',
      backgroundColor: 'rgba(104, 99, 206, 0.3)',
      pointBackgroundColor: 'rgba(104, 99, 206, 1)',
      pointHitRadius: 10,
      data: data.map(d => d.total),
      currency,
    },
  ],
})

const HeaderChart = ({ data, currency }) => (
    <div id="portfolio_chart">
        <Line
            data={generateDataSet(data, currency)}
            options={chartOptions}
        />
    </div>
)

HeaderChart.propTypes = {
    currency: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            total: PropTypes.number
        }),
    ),
}

export default HeaderChart
