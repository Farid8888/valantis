import React,{useState,useReducer} from 'react'
import classes from './Table.module.css'
import { FaArrowLeftLong,FaArrowRightLong } from "react-icons/fa6";
import TableItem from './TableItem';
import Spinner from '../LoadingSpinner/Spinner';

const index = ({data,currentPage,setCurrentPage}) => {
    const initialState = {
        first:{firstBool:true,firstPage:1},
        second:{secondBool:false,secondPage:2},
        third:{thirdBool:false,thirdPage:3},
        last:{lastBool:false,lastPage:10}
    }
const reducer = (state =initialState,action)=>{
    if(action.type === 'FIRST') return {first:{...state.first,firstBool:true},second:{...state.second,secondBool:false},third:{...state.third,thirdBool:false},last:{...state.last,lastBool:false}}
    if(action.type === 'SECOND') return {first:{...state.first,firstBool:false},second:{...state.second,secondBool:true},third:{...state.third,thirdBool:false},last:{...state.last,lastBool:false}}
    if(action.type === 'THIRD') return {first:{...state.first,firstBool:false},second:{...state.second,secondBool:false},third:{...state.third,thirdBool:true},last:{...state.last,lastBool:false}}
    if(action.type === 'LAST') return {first:{...state.first,firstBool:false},second:{...state.second,secondBool:false},third:{...state.third,thirdBool:false},last:{...state.last,lastBool:true}}
    if(action.type === 'NEXT') return {first:{...state.first,firstPage:state.first.firstPage + 1},second:{...state.second,secondPage:state.second.secondPage + 1},third:{...state.third,thirdPage:state.third.thirdPage + 1},last:{...state.last,lastPage:state.last.lastPage + 1}}
    if(action.type === 'PREV') return {first:{...state.first,firstPage:state.first.firstPage - 1},second:{...state.second,secondPage:state.second.secondPage - 1},third:{...state.third,thirdPage:state.third.thirdPage - 1},last:{...state.last,lastPage:state.last.lastPage - 1}}
    if(action.type === 'DEF') return initialState
    return state
}
    const [state,dispatch] = useReducer(reducer,initialState)
    let headersContent
    let content
  if(data.length > 0){
    const headers = Object.keys(data[0])
    content = data.map(item=>{
      return <TableItem key={item.id} id={item.id} brand={item.brand} price={item.price} product={item.product} />
    })
    headersContent =headers.map(head=>{
        return <h2 key={head}>{head}</h2>
    })
  }else{
    content = <div style={{textAlign:'end',marginTop:'5rem'}}><Spinner/></div>
  }
  const rightHandler =()=>{
    setCurrentPage(prevSt=>prevSt + 1)
    dispatch({type:'NEXT'})
  }
  const leftHandler=()=>{
    dispatch({type:`${state.first.firstPage == 1  ? 'DEF' : 'PREV'}`})
    setCurrentPage(prevSt=>{
        if(prevSt == 1){
            return prevSt
        }else{
            return prevSt - 1
        }
      
    })
  }
  const pageHandler =(page,identifier)=>{
setCurrentPage(page)
dispatch({type:identifier})
  }
 
  return (
    <div>
        <div className={classes.headers}>
            {headersContent}
        </div>
     {content}
    <div className={classes.pag}>
    <div className={classes.pagination}>
        <p onClick={leftHandler} className={`${classes.row} ${currentPage == 1 && classes.disabled }`} ><FaArrowLeftLong/></p>
        <p className={state.first.firstBool ? classes.active: classes.p} onClick={()=>pageHandler(state.first.firstPage,'FIRST')}>{state.first.firstPage}</p>
        <p className={state.second.secondBool ? classes.active : classes.p} onClick={()=>pageHandler(state.second.secondPage,'SECOND')}>{state.second.secondPage}</p>
        <p className={state.third.thirdBool ? classes.active : classes.p} onClick={()=>pageHandler(state.third.thirdPage,'THIRD')}>{state.third.thirdPage}</p>
        <p>...</p>
        <p className={state.last.lastBool ? classes.active : classes.p} onClick={()=>pageHandler(state.last.lastPage,'LAST')}>{state.last.lastPage}</p>
        <p onClick={rightHandler} className={classes.row}><FaArrowRightLong/></p>
    </div>
    </div>
    </div>
  )
}

export default index

