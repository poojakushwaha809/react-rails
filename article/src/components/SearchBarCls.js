import React, { Component } from 'react'

export class SearchBarCls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
        };
        // this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        // this.handleSearchBar = this.handleSearchBar.bind(this);

      }

    handleSearchBar(e){
        this.setState({searchValue: e.target.value.toLowerCase()})
        this.props.getSearchValue(e.target.value)

    }
    
    handleSearchSubmit(){
        // e.preventDefault()
        this.props.getSearchValue(this.state.searchValue)
    }
  render() {
    const {searchValue}= this.state

    return (
        <form className="d-flex">
        <input className="form-control me-2" type="search" value={searchValue} placeholder="Search" onChange={this.handleSearchBar.bind(this)} aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit" onClick={this.handleSearchSubmit.bind(this)} >Search</button>
        </form>
    )
  }
}

export default SearchBarCls