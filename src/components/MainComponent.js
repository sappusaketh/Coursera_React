import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Menu from './MenuComponent';
import { DISHES } from "../shared/dishes";
// import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      selectedDish:null
    }
   
  }
  
  //eventHandling
  onDishSelect(dishId){
    this.setState({selectedDish:dishId})
  }

  //Rendering
  render() {
    const HomePage=()=>{
      return(<Home />)
    }
    return (
      <div >
        <Header />
         <Switch>
           <Route path="/home" component={HomePage}/>
           <Route path="/menu" exact component={()=><Menu dishes={this.state.dishes} /> }/> 
           <Redirect to="/Home"/>    
         </Switch>
        
        <Footer />
      </div>
    );
  }
}

export default Main;
