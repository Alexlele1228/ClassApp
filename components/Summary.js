import React from 'react';
import{View,Text} from 'react-native';

export const Summary=(props)=>{
    return(
        <View >
                <Text style={props.style}>{props.owner}</Text>
                <Text style={props.style}>{props.amount}</Text>
        </View>
    )
}