import React from 'react';
import {View, Button, Text,StyleSheet, Image} from 'react-native'

export const Footer=(props)=>{
    return(
          <View style={styles.main}>
           <Image source={require('C:/Users/SW/Desktop/ClassApp/assets/add.png')} style={styles.add}/>
         </View>
    )
}

const styles=StyleSheet.create({
    add:{
         width:200,
         height:200,
         margin:'auto'
       
    },
    main:{
        height:200,
       
    }

})