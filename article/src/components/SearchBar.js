import React,{useState} from 'react'

const SearchBar = (props) => {
   const [searchValue, setSearchValue] = useState("");

    const handleSearchBar=(e)=>{
        setSearchValue(e.target.value.toLowerCase())
        props.getSearchValue(e.target.value)
    }
    
    const handleSearchSubmit=()=>{
        // e.preventDefault()
        // props.getSearchValue(searchValue)
    }

    
  return (
    <form className="d-flex">
    <input className="form-control me-2" type="search" value={searchValue} placeholder="Search" onChange={handleSearchBar} aria-label="Search"/>
    <button className="btn btn-outline-success" type="submit" onClick={handleSearchSubmit} >Search</button>
    </form>
  )
}

export default SearchBar