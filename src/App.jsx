import {useEffect} from 'react'
import {useHttp} from './components/hooks/customHook'
import Table from './components/Table'
import Filter from './components/Filter/Filter'
import classes from './App.module.css'

const App = () => {
  const {sendRequest,data,currentPage,setCurrentPage,handleFilterChange,filter} = useHttp()
  useEffect(()=>{
    sendRequest()
  },[sendRequest])
  
  return (
    <div className={classes.main}>
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      <Table data={data} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}

export default App
