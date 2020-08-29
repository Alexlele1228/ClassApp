import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';




export const Record = (props) => {



    var paths = [

        require('C:/Users/SW/Desktop/ClassApp/assets/A.png'),

        require('C:/Users/SW/Desktop/ClassApp/assets/B.png'),

        require('C:/Users/SW/Desktop/ClassApp/assets/C.png'),

        require('C:/Users/SW/Desktop/ClassApp/assets/D.png'),

        require('C:/Users/SW/Desktop/ClassApp/assets/E.png'),

        require('C:/Users/SW/Desktop/ClassApp/assets/F.png'),

        require('C:/Users/SW/Desktop/ClassApp/assets/G.png'),

        require('C:/Users/SW/Desktop/ClassApp/assets/H.png'),

        require('C:/Users/SW/Desktop/ClassApp/assets/I.png')


    ]


    if (props.who == '蕾') {
        return (
            <View>

                <View style={{ alignItems: 'center', display: 'flex', flexDirection: "row", paddingHorizontal: 10, justifyContent: 'space-between' }}>

                    <Image style={styles.img} source={paths[props.Path - 1]} />

                    <View style={{ marginLeft: 10, flex: 3, display: 'flex', flexDirection: "column", alignItems: 'left', justifyContent: 'center', paddingVertical: 5 }}>
                        <Text style={styles.Text}>{props.category}</Text>
                     
                        <Text style={styles.TextTitle}>{props.who}支出😭</Text>
                        <Text style={styles.TextTitle}>{props.date.substring(5,18)}</Text>
                    </View>
                    <Text style={styles.TextPrice}> ￥{props.amount}</Text>


                </View>



            </View>

        )
    } else if (props.who == '雪') {
        return (
            <View>

                <View>
                    <View style={{ alignItems: 'center', display: 'flex', flexDirection: "row", paddingHorizontal: 10, justifyContent: 'space-between' }}>

                        <Image style={styles.img} source={paths[props.Path - 1]} />

                        <View style={{ marginLeft: 10, flex: 3, display: 'flex', flexDirection: "column", alignItems: 'left', justifyContent: 'center', paddingVertical: 5 }}>
                            <Text style={styles.Text}>{props.category}</Text>
                            <Text style={styles.TextTitleB}>{props.who}支出😍</Text>
                            <Text style={styles.TextTitleB}>{props.date.substring(5,18)}</Text>
                        </View>
                        <Text style={styles.TextPrice}> ￥{props.amount}</Text>


                    </View>

                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create(

    {
        Text: {
            fontSize: 22,
            color: 'black',
            fontWeight: '800',
            flex: 1
        },
      
        img: {
            height: 70,
            width: 70,
            margin: 5,

        },
        TextPrice: {
            color: '#ff9900',
            fontSize: 30,
            marginRight: 5
        },
        TextTitle: {
            // color: '#cc33cc',
            color:'#ff99cc',
            fontSize: 15,
        },
        TextTitleB: {
            color: '#09C7F7',
            fontSize: 15,
        }
    }
)