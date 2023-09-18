import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import "./Modal.css";
const MultiCheckbox = (props) => {
 
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  useEffect(() => {
    setOptions(props.publishers)
   const publisherName=props.selectePublishers.map((publisher)=>{return{key: publisher.name,id: publisher.id}})
   setSelectedValue(publisherName) 
  }, []);

  const onSelect = (option) => {
    console.log(option, selectedValue, 'lllllllllllllllllllllllllllllll')
    props.sendSelectedPublisher(option)
  };

  
  const onRemove = (option) => {
    console.log(option, selectedValue, 'lllllllllllllllllllllllllllllll111111111')
    props.sendSelectedPublisher(option)
  };


  const getOptions=()=>{
   const optionsData = options.map(option=>{return {
      key: option.name,
      id: option.id
    }})

    return optionsData
  }
  return (
    <Multiselect

      options={getOptions()} // Options to display in the dropdown
            // hideSelectedList
      selectedValues={selectedValue} // Preselected value to persist in dropdown
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="key" // Property name to display in the dropdown options
      showCheckbox


    />
  );
};

export default MultiCheckbox;
