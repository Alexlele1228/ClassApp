import {View,Text, Button} from 'react-native';
import React from 'react';


export const Start=(props)=>{
  if(props.correct==true){
      return(
          <View>
              <Button title="Restart" onPress={props.handler}/>
          </View>
      )
  }else{
      return null
  }
}