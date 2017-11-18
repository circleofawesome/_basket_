import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var items=[["", "", "", ""]];
var totalCost=0;
var itemId=0;

class Form extends React.Component {
  constructor (props) {
    super(props)
    //this.state = { itemName: "itemName", itemNumber: "itemNumber" }
    this.state = { items:items }
    this.handleClick = this.handleClick.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
  handleClick(){
    itemId+=1;
    var id=itemId;
    var itemName=document.getElementById("item-name").value;
    var itemNumber=document.getElementById("item-number").value;
    var itemCost=parseInt(document.getElementById("item-cost").value);
    var inTheBasket=false;
    totalCost+=(itemCost*parseInt(itemNumber));
    var removeButton=<button className="remove-button" onClick={() => { this.handleRemove(id) }}>Remove</button>;
    items.push([itemName,itemNumber,itemCost, inTheBasket, removeButton]);
    this.setState({items:items});
    console.log(totalCost);//test
    document.getElementById("item-name").value = "";
    document.getElementById("item-number").value = "";
    document.getElementById("item-cost").value = "";
  }
  handleRemove(id){
    //console.log(id);
    items[id][3]=true;
    totalCost-=(items[id][2]*parseInt(items[id][1]));
    console.log(totalCost);//test
    this.setState({items:items});
  }
  render () {
    return (<div className="forms">  
      <input type="text" id="item-name" placeholder="Item Name"/>
      <br/>
      <input type="text" id="item-number" placeholder="How many?"/>
      <br/>
      <input type="text" id="item-cost" placeholder="Cost per"/>  
      <br/>
      <button onClick={this.handleClick} className="add-button">Add item</button>
      <br/>
      <List items={this.state.items}/>
    </div>)
  }
}

class List extends React.Component {
  render () {
   return (<div className="list">
       <h1>Shopping List</h1>
       <ul>
        {this.props.items.map(function(value,index){
          if(value[3]===true){return null};
          //return <li key={index}>{value[0]} : {value[1]} ${value[2]} {value[4]}</li>
          return (<div key={index}>
                    <li key={index}>{value[1]} {value[0]} {value[4]}</li>
                  </div>);
        })}
        </ul>
       <h1 className="totalCost">Total Bill: ${totalCost}</h1>
    </div>)
  }
}

class App extends Component {
  render() {
    return <Form/>;
  }
}

export default App;
