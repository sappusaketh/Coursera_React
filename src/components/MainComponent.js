import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Menu from './MenuComponent';
import { DISHES } from "../shared/dishes";
import {PROMOTIONS} from "../shared/promotions";
import {LEADERS} from "../shared/leaders";
import {COMMENTS} from "../shared/comments";
// import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      comments:COMMENTS,
      promotions:PROMOTIONS,
      leaders:LEADERS
    }
   
  }
  
  //eventHandling
  onDishSelect(dishId){
    this.setState({selectedDish:dishId})
  }

  //Rendering
  render() {
    const HomePage=()=>{
      return(<Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
        leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
        promotion={this.state.promotions.filter((promo)=>promo.featured)[0]} />)
    }
    return (
      <div >
        <Header />
         <Switch>
           <Route path="/home" component={HomePage}/>
           <Route path="/menu" exact component={()=><Menu dishes={this.state.dishes} /> }/>
           <Route path="/contactus" exact component={Contact}/> 
           <Redirect to="/Home"/>    
         </Switch>
        
        <Footer />
      </div>
    );
  }
}

export default Main;
