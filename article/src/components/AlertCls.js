import React, { Component } from 'react'

export class AlertCls extends Component {
  render() {
    return (
        <>    
        {this.props.alert &&
        <div className={`alert alert-${this.props.alert.type} alert-dismissible fade show `} role="alert">
        <strong>{this.props.alert.type} :</strong> {this.props.alert.message}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
        </>    )
  }
}

export default AlertCls