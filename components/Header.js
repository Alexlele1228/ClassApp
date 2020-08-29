import React from 'react';
import {View,Text} from 'react-native';



export const Header=(props)=>{
return(
   <View>
      <Text style={props.style}> {props.text}</Text>
   </View>
)

}



