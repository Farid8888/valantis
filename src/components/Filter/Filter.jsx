import React from 'react'
import classes from './Filter.module.css'


const Filter = ({handleFilterChange,filter}) => {
    const [selectedValue,setValue] = React.useState('price')
    const changeHandler =(event)=>{
        const {name,value} = event.target
    let newVal =value.charAt(0).toUpperCase() + value.slice(1)
    if(selectedValue === 'price') newVal = parseFloat(value)
        handleFilterChange(name,newVal)
    }
  return (
    <div className={classes.filter}>
      <input name={selectedValue} onChange={changeHandler}/>
      <span>Filter by: </span>
      <select defaultValue='price' onChange={(e)=>setValue(e.target.value)}>
        <option value='price'>Price</option>
        <option value='brand'>Brand</option>
        <option value='product'>Product</option>
      </select>
    </div>
  )
}

export default Filter
