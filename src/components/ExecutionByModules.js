import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class ExecutionByModules extends Component {

    chartValues = (tagsResult) => {

        let modulesResult = tagsResult.map( t => [t.name, t.passed, t.failed])
        modulesResult.unshift(['Module', 'Passed', 'Failed'])

       let info = {
            options: {
                series: {
                    0: {targetAxisIndex: 0},
                    1: {targetAxisIndex: 0}
                  },
                  vAxes: {
                    // Adds titles to each axis.
                    0: {title: 'Test Cases'},
                    1: {title: 'Cases'}
                  },
                  colors: ['#40ACB4', '#E73131']        
              },
              data: modulesResult
        }
        return info
    }

    render(){
        let chart = this.chartValues(this.props.tagsResult)
        return (

            <div className="col-md-12">
                    <div className="card">
                        <div className="header">
                            <h4 className="title">Result by Modules</h4>
                            <p className="category">Test Plan 03-12-2018</p>
                        </div>
                        <div className="content">

                            <div id={this.props.title} className="ct-chart">
                            
                            <Chart
                                chartType="ColumnChart"
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

export default ExecutionByModules

