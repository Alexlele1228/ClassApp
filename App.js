import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput,Button } from 'react-native';
import {TextBox} from './components/TextBox';
import {ClickCounter} from './components/ClickCounter';
import {Start} from './components/Start';

export default class App extends Component{


  constructor(){
    super()
    this.state={
      secret: 0,
      guess:0,
      feedback:'',
      correct:false
    }
 }

 setSecret(){
  let  random=Math.round(Math.random()*100)
   this.setState({secret:random})
 }
 
 componentDidMount(){
   this.setSecret()
 }
 updateGuess=(userInput)=>{
   this.setState({guess:userInput})
 }
 checkGuess=()=>{
   const userGuess=parseInt(this.state.guess)
     if(this.state.guess==this.state.secret){
       this.setState({feedback:"Right!"})
       this.setState({correct:true})
     }else if(this.state.guess>this.state.secret){
       this.setState({feedback:"should be less"})
     }else if(this.state.guess<this.state.secret){
      this.setState({feedback:"should be greater"})
     }

   
 }
restartGame=()=>{
  this.setSecret()
  this.setState({correct:false})
  
}


  render(){
    return(
        <View style={styles.container}>
   
          <TextBox color="black" size={24} text="Guess number!"/>
          <TextInput style={styles.input} onChangeText={this.updateGuess}  />
          <Button title="check whether correct or not!" onPress={this.checkGuess}/>
          <Text>{this.state.feedback}</Text>
          <Start correct={this.state.correct} handler={this.restartGame}/>
        </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    minWidth:200,
    padding:10,
    textAlign:'center',
    backgroundColor:'grey'
  }

});
