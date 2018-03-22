import React, { Component } from 'react';
import UpdateTestResultForm from './UpdateTestResultForm';
import * as VstsAPI from '../VstsAPI'

  const delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
    })();


class FailedTestTable extends Component {

    state = {
        showModal: false,
        failedTestList: [],
        testResultToUpdate: {},        
    };
    

    handleUpdateTestResult = (patchTestResult) => {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';

        VstsAPI.updateTestResult(this.props.runId , patchTestResult)
        .then(data => {
            if (data.count){

                // Close the Update Form when test result was updated
                this.closeUpdateForm();                

                VstsAPI.getTestResult(this.props.runId , patchTestResult.id)
                .then(testResult => {
                    this.setState({
                        alertType: "success",
                        alertMessage: `Test Result [ ${testResult.id} ] was updated.` ,
                        showAlert: true
                    })   
    
                    this.handleUpdateFailedList(testResult)
                })                

            } else {
                this.setState({
                    alertType: "warning",
                    alertMessage: data.message,
                    showAlert: true
                })                          
            }

         })  

    }

    handleUpdateFailedList = (testResult) => {
        let failedList = this.state.failedTestList.filter( tr => tr.id !== testResult.id)
        failedList.push(testResult)
        this.setState({
            failedTestList: failedList
        })
    }
    
    openUpdateForm = (testResult, event) => {
        event.preventDefault();        
        this.setState({
            showModal: true,
            testResultToUpdate: testResult
        });
    }
   
    closeUpdateForm = () => {
        this.setState({showModal: false});
    }

    handleCloseAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    componentWillReceiveProps() {
        this.setState({
            failedTestList: this.props.failedTestList
        })
    }



    render(){
        // console.log("tags in By Module", this.props.tagsResult)
        // let chart = this.chartValues(this.props.tagsResult)
        // console.log("FailedTestTable props", this.state)
        return (
            <div className="col-md-12">                                
                                
                {this.state.showAlert &&
                    <div className={`alert alert-${this.state.alertType}`}>
                        <button type="button" aria-hidden="true" className="close" onClick={this.handleCloseAlert}>×</button>
                        <span><b> {this.state.alertType}: </b> {this.state.alertMessage}</span>
                    </div>                    
                }

                <div className="card">
                    <div className="header">
                        <h4 className="title">Failed Test Cases</h4>
                        <p className="category">Details of the failed Test Cases</p>
                    </div>
                    <div className="content table-responsive table-full-width">
                        <table className="table table-striped">
                            <thead>
                                <tr>                                
                                    <th>Test Case</th>
                                    <th>Test Title</th>
                                    <th>Bug Related</th>
                                    <th>Actions</th>
                                    <th>Assigned</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                
                                {this.state.failedTestList.map((result) => (
                                    <tr key={result.id}>
                                        <td>{result.comment}</td>
                                        <td>{result.testCaseTitle}</td>
                                        <td>{result.errorMessage}</td>
                                        <td> <button className="btn btn-fill" onClick={(e) => this.openUpdateForm(result, e)}>  Edit  </button>   </td>
                                        <td> {result.owner.displayName} </td>
                                    </tr>                                    
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>

            { this.state.showModal &&
                <UpdateTestResultForm 
                    runId={this.props.runId} 
                    testResultToUpdate={this.state.testResultToUpdate} 
                    closeUpdateForm={this.closeUpdateForm} 
                    handleUpdateTestResult={this.handleUpdateTestResult} />    
            }
                
            </div>

            
        )
    }
}

export default FailedTestTable

