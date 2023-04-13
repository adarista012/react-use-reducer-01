import { useState, useReducer, useRef } from 'react'
import './App.css'

const types = {
  addProduct:'addProduct',
  deleteProduct:'deleteProduct',
  addUnit:'addUnit',
  susUnit:'susUnit'
}
const initialValue = [
  // { nameProduct:'', quantity:0}
]
const reducer = (state, action) => {
  let currentList = state
  let currentProduct = action.payload 
  switch (action.type){
    case types.addProduct:
      return [...currentList, currentProduct]
    case types.deleteProduct:
      return (currentList.filter( e => e.nameProduct !== currentProduct ))
    case types.addUnit:
      return currentList.map( (e) => 
        (e.nameProduct === currentProduct)
        ? { ...e, quantity: ++e.quantity }
        : e 
      )
    case types.susUnit:
      return currentList.map( (e) => 
        (e.nameProduct === currentProduct && e.quantity > 1)
        ? { ...e, quantity: --e.quantity }
        : e 
      )
    default:
      return currentList
  }
}

function App() {
  const [product, setProduct] = useState('')
  const [list, dispatch] = useReducer(reducer, initialValue)
  const inputNameproduct = useRef(null)
  return (
    <>
      <div className='form'>
        <span htmlFor='product' >Product:</span>
        <input id='product' ref={inputNameproduct} value={ product } onChange={ (e) => { setProduct(
          e.target.value
        ) }}
        />
        <button 
        onClick={ () =>{
          dispatch({ 
            type:types.addProduct, 
            payload:{ nameProduct:product, quantity:1}
          })
          inputNameproduct.current.focus()
          setProduct('')
        }}
        >
          Add
        </button>
      </div>
      <div>
        { list.map( (e) => 
        <div key={e.nameProduct} className='product'>
          { e.nameProduct } ({ e.quantity } unidades)
          <div>
            <button
              onClick={ () => dispatch({
                type: types.susUnit,
                payload: e.nameProduct
              })}
            >-</button>
            <button
              onClick={ () =>   
                dispatch({
                  type: types.addUnit,
                  payload: e.nameProduct
                })}
            >+</button>
            <button
              onClick={ () => dispatch({
                type: types.deleteProduct,
                payload: e.nameProduct
              })}
            >x</button>
          </div>  
          
        </div>) 
        }
      </div>
    </>
  )
}

export default App
