import React from 'react'

class UpdateTestResultForm extends React.Component {

    state = {
        showAlert: false,
        alertType: "success",
        showModal: false,
        resultId: 0,
        state: "Pending",
        outcome: "None",
        errorMessage: "",
        owner: "",
        testResult: {},
    }

    componentDidMount(){

        this.setState({
            testResult: this.props.testResultToUpdate,
            state: this.props.testResultToUpdate.state,
            outcome: this.props.testResultToUpdate.outcome,
            errorMessage: this.props.testResultToUpdate.errorMessage,
            owner: this.props.testResultToUpdate.owner.displayName,
        })

    }    

    handleFormSubmit = (event) => {
        event.preventDefault();
        let patchTestResult = {
            id: this.state.testResult.id,
            outcome: this.state.outcome,
            state: this.state.state,
            errorMessage: this.state.errorMessage,
            
            owner: { displayName: this.state.owner }
        } 

        this.props.handleUpdateTestResult(patchTestResult);

      } 


    handleChange = (event, field) => {   
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value 
        })
    }

    handleCloseModal = () => {
        this.props.closeUpdateForm();
    }

    render(){
        return (
            <div className="overlay">
                <div className="popup">
                    <div className="col-lg-8 col-md-7">

                        <div className="card">
                            <div className="header">
                                <h4 className="title">Test Result</h4>
                            </div>
                            <div className="content">
                                <form onSubmit={this.handleFormSubmit}> 
                                    
                                    
                                    <div className="row">
                                        
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>State</label>
                                                <select name="state"  className="form-control border-input" placeholder="State" value={this.state.state} onChange={this.handleChange} >
                                                    <option>Pending</option>
                                                    <option>Queued</option>
                                                    <option>InProgress</option>
                                                    <option>Paused</option>
                                                    <option>Completed</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Outcome</label>
                                                <select name="outcome" className="form-control border-input" placeholder="Outcome"  value={this.state.outcome} onChange={this.handleChange} >
                                                    <option>None</option>
                                                    <option>Passed</option>
                                                    <option>Failed</option>
                                                    <option>Blocked</option>
                                                    <option>NotExecuted</option>
                                                    <option>InProgress</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Owner</label>
                                                <select name="owner" className="form-control border-input" placeholder="Owner"  value={this.state.owner} onChange={this.handleChange} >
                                                    <option>Gonzalo Alba</option>
                                                    <option>Edmundo Figueroa</option>                                                    
                                                    <option>Lucero Penarrieta</option>                                                    
                                                    <option>Veronica Prado</option>                                                    
                                                    <option>Miguel Lisperguer</option>                                                    
                                                    <option>Gabriel Rendon</option>                                                    
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Error Message</label>
                                                <textarea rows="5" className="form-control border-input" placeholder="Notes about the reason the test failed." name="errorMessage" value={this.state.errorMessage} onChange={this.handleChange} >
                                                
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
        
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-info btn-fill btn-wd">Update</button>
                                        <button  className="btn btn-info btn-wd" onClick={this.handleCloseModal}>Close</button>
                                        
                                    </div>
        
                                    <div className="clearfix"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateTestResultForm

