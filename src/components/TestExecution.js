import React from 'react'
import { Chart } from 'react-google-charts';

class TestExecution extends React.Component {

    chartValues = (title, passed, failed) => {
       let info = {
            options: {
                is3D: true,
                colors: ['#40ACB4', '#E73131']
              },
              data: [
                ['Status', 'Test Cases'],
                ['Passed', passed],
                ['Failed', failed],
              ]
        }
        return info
    }

    render(){
        let chart = this.chartValues(this.props.title, this.props.passed, this.props.failed)
        return (

            <div className="col-md-4">
                    <div className="card">
                        <div className="header">
                            <h4 className="title">{this.props.title}</h4>
                            <p className="category">Test Plan 03-12-2018</p>
                        </div>
                        <div className="content">

                            <div id={this.props.title} className="ct-chart">
                            
                            <Chart
                                chartType="PieChart"
                                data={chart.data}
                                options={chart.options}
                                graph_id={chart.options.title}
                                width="100%"
                                height="100%"
                                legend_toggle
                            />
                            
                            </div>



                        </div>
                    </div>
                </div>
        )
    }
}

export default TestExecution

