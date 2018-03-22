import React, { Component } from 'react';
import TestExecution from './components/TestExecution';
import ExecutionByModules from './components/ExecutionByModules';
import * as VstsAPI from './VstsAPI'
import FailedTestTable from './components/FailedTestTable';


class Dashboard extends Component {

  state = {
    totalTestcases: 0,
    passedTestcases: 0,
    failedTestcases: 0,
    testPlanName: "Test Plan",
    runId: 3158,
    testResults: [],
    tagsResult: [],
    failedTestsList: []
  }

  buildExecutionByModulesData(){
    let failedList = []

    this.state.testResults.forEach( (result, index) => {

        if (result.outcome !== "Passed") {            
            failedList.push(result)
        }
          
            //testcase passed/failed
        VstsAPI
            .getWorkItem(result.testCase.id)        
            .then(test => {
            // tags
                test.tags.forEach( (tag, index) => {
                    let tempTags = this.state.tagsResult;

                    let mod = {}
                    let modIndex = tempTags.findIndex( t => t.name === tag);

                    if (modIndex < 0) {
                        mod = { name: tag,
                                passed: 0,
                                failed: 0}    
                    }else{
                        mod = tempTags[modIndex];
                    }
                   
                    if (result.outcome === "Passed") {
                        mod.passed++
                    } else {
                        mod.failed++
                    }

                    tempTags = tempTags.filter( t => t.name !== tag);
                    tempTags.push(mod);

                    this.setState({
                        tagsResult: tempTags
                    })                        
                })
            })
    })

    this.setState({
        failedTestsList: failedList
    })
  }

//   handleUpdateFailedList=(result) => {

//   }

  componentDidMount() {

    VstsAPI
        .getTestRun(this.state.runId)
        .then(value => {
            this.setState({ 
                totalTestcases: value.totalTests,
                passedTestcases: value.passedTests,
                failedTestcases: value.totalTests - value.passedTests,
                testPlanName: value.plan.name
            })
        })

    VstsAPI
        .getTestResults(this.state.runId)
        .then(value => {
            this.setState({
                testResults: value
            })            
        })
        .then( data => {
            this.buildExecutionByModulesData()            
        })  
  }


  render() {
    return (

<div className="wrapper">
  <div className="main-panel">
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">                    
                <span className="navbar-brand" href="#">Report Manager</span>
            </div>      
        </div>          
    </nav>

    <div className="content">
        <div className="container-fluid">
            <div className="row">

                    <div className="col-lg-3 col-sm-6"> </div>
                
                
                <div className="col-lg-3 col-sm-6">
                    <div className="card">
                        <div className="content">                                
                            <div className="row">
                                <div className="col-xs-5">
                                    <div className="icon-big icon-warning text-center">
                                        <i className="ti-server"></i>
                                    </div>
                                </div>
                                <div className="col-xs-7">
                                    <div className="numbers">
                                        <p>Total Executed</p>
                                        {this.state.totalTestcases}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                    <div className="card">
                        <div className="content">
                            <div className="row">
                                <div className="col-xs-5">
                                    <div className="icon-big icon-success text-center">
                                        <i className="ti-wallet"></i>
                                    </div>
                                </div>
                                <div className="col-xs-7">
                                    <div className="numbers">
                                        <p>Passed</p>
                                        {this.state.passedTestcases}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                    <div className="card">
                        <div className="content">
                            <div className="row">
                                <div className="col-xs-5">
                                    <div className="icon-big icon-danger text-center">
                                        <i className="ti-pulse"></i>
                                    </div>
                                </div>
                                <div className="col-xs-7">
                                    <div className="numbers">
                                        <p>Failed</p>
                                        {this.state.failedTestcases}
                                    </div>
                                </div>
                            </div>                                
                        </div>
                    </div>
                </div>



            </div>

            <div className="row">
                <TestExecution passed={this.state.passedTestcases} failed={this.state.failedTestcases} title={this.state.testPlanName} />
            </div>
            
            <div className="row">
                <ExecutionByModules tagsResult={this.state.tagsResult} />
            </div>

            <div className="row">
                <FailedTestTable runId={this.state.runId} failedTestList={this.state.failedTestsList} />
            </div>

        </div>
    </div>


    <footer className="footer">
        <div className="container-fluid">
            <div className="copyright pull-right">
                2018, powered by NFEP Automation Team
            </div>
        </div>
    </footer>

  </div>
</div>

    );
  }
}

export default Dashboard;
