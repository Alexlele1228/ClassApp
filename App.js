
import React, { Component, forwardRef } from 'react';
import { StyleSheet, ScrollView, Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Header } from './components/Header';
import { SummariesRow } from './components/SummariesRow';
import { Record } from './components/Record';
import Dialog, { DialogContent, SlideAnimation, DialogButton, DialogTitle, DialogFooter, } from 'react-native-popup-dialog';
import * as firebase from 'firebase';
import RNPickerSelect from 'react-native-picker-select';
import TabNavigator from 'react-native-tab-navigator'
import Swipeout from 'react-native-swipeout';


const firebaseConfig = {
  apiKey: "AIzaSyDiDviPh-6FCAvDlNhVyrcaSAofDkF_cek",
  authDomain: "leleswbill.firebaseapp.com",
  databaseURL: "https://leleswbill.firebaseio.com",
  projectId: "leleswbill",
  storageBucket: "leleswbill.appspot.com",
  messagingSenderId: "299700886799",
  appId: "1:299700886799:web:34f49ec66b3648a33cb27a",
  measurementId: "G-GS9PMV224P"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const mRef = firebase.database().ref();


export default class App extends Component {

  generateFormatedDateAsKey = () => {
    let currentTime = new Date()
    let year = currentTime.getFullYear()
    let month = currentTime.getMonth() + 1

    if (month < 10)
      month = '0' + month

    return year + '年' + month + '月'
  }

  state = {
    currentCategory: '??',
    currentAmount: 0,
    who: '',
    refresh:1,
    showDialog: false,
    paidForLe: 0,
    paidForSw: 0,
    pictureSeleted: 0,
    picureOneColor: '',
    picureTwoColor: '',
    picureThreeColor: '',
    picureFourColor: '',
    picureFiveColor: '',
    picureSixColor: '',
    picureSevenColor: '',
    picureEightColor: '',
    picureNineColor: '',
    periodSelected: this.generateFormatedDateAsKey().toString(),
    selectedItem: -1,
    selectedWho: '',
    selectedAmount: 0,
    selectedId: ''
  }

  recordBtn = [{ text: 'Delete', backgroundColor: 'red', onPress: () => this.deleteRecord(this.state.selectedItem) }]

  listData = []

  pickerItem=[]

  periodExsits = []

  writeData = (_amount, _category, _who, _path, _id) => {

    mRef.child("AllBill").child(this.state.periodSelected).child(_id).set({
      id: _id,
      amount: _amount,
      category: _category,
      who: _who,
      Path: _path
    })

    if (_who == '蕾')
      mRef.child('PayForSw').child(this.state.periodSelected).set({ 这个月蕾蕾为哥哥出了: this.state.paidForSw })
    else {

      mRef.child('PayForLe').child(this.state.periodSelected).set({ 这个月哥哥为蕾蕾出了: this.state.paidForLe })

    }

  }

  componentDidMount() {

    mRef.child('AllBill').on('value', (snapshot) => {
      this.periodExsits.length = 0
      this.pickerItem.length=0
      if (snapshot.val() != null) {
        let list = Object.keys(snapshot.val())
        list.forEach(element => {
          this.periodExsits.push(element)
        });
        this.periodExsits.forEach(element => {
             this.pickerItem.push({label:element, value:element})
        });
      }

    });

    mRef.child('PayForLe').child(this.state.periodSelected).on('value', (snapshot) => {
      if (snapshot.val() == null)
        this.setState({ paidForLe: 0 })
      else
        this.setState({ paidForLe: snapshot.val().这个月哥哥为蕾蕾出了 })

    });

    mRef.child('PayForSw').child(this.state.periodSelected).on('value', (snapshot) => {
      if (snapshot.val() == null)
        this.setState({ paidForSw: 0 })
      else
        this.setState({ paidForSw: snapshot.val().这个月蕾蕾为哥哥出了 })
    });

    mRef.child('AllBill').child(this.state.periodSelected).on('value', (snapshot) => {
      this.listData.length = 0
      if (snapshot.val() != null) {
        let list=Object.values(snapshot.val())
        list.forEach(element => {
          this.listData.push(element)
        });
      }
     
    });


  }


refresh=()=>{
  mRef.child('AllBill').child(this.state.periodSelected).on('value', (snapshot) => {
    this.listData.length = 0
    if (snapshot.val() != null) {
      let list=Object.values(snapshot.val())
      list.forEach(element => {
        this.listData.push(element)
      });
    }
  });

  mRef.child('PayForLe').child(this.state.periodSelected).on('value', (snapshot) => {
    if (snapshot.val() == null)
      this.setState({ paidForLe: 0 })
    else
      this.setState({ paidForLe: snapshot.val().这个月哥哥为蕾蕾出了 })

  });

  mRef.child('PayForSw').child(this.state.periodSelected).on('value', (snapshot) => {
    if (snapshot.val() == null)
      this.setState({ paidForSw: 0 })
    else
      this.setState({ paidForSw: snapshot.val().这个月蕾蕾为哥哥出了 })
  });

 
  
}



changePeriod=(value)=>{
  this.listData.length = 0
  if(value!=null)
  this.setState({periodSelected:value}, ()=>{this.refresh()})

}



  render() {

    return (
      <View style={styles.root}>
        <Header style={styles.Top} text=' ' />
        <Header style={styles.Header} text='🐽Lele的小账本🐽 ' />
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between', backgroundColor:'#ffffcc', borderBottomWidth:1}}>
        <View style={{  borderRightWidth:0.3, borderColor:'black',  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 5, textAlign: 'center', flex:1}}>
          <RNPickerSelect
            style={pickerStyle}
            items={this.pickerItem}
        
            placeholder={{label:'🌈 选择月份...🔎',value:null,   }}
            onValueChange={(value) =>{this.changePeriod(value)}}
          />
          <Text style={{ paddingTop: 5, fontSize: 20, fontWeight: '600' }}>我们用了:💰{this.state.paidForSw+this.state.paidForLe} </Text>
        </View>
        <SummariesRow LeAmount={this.state.paidForSw} SwAmount={this.state.paidForLe}  />
        </View>
        <FlatList
       onRefresh={()=>this.refresh()}
        refreshing={false}
          style={{ marginBottom: 50, paddingBottom: 10, paddingTop:20}}
          data={this.listData}
          keyExtractor={record => record.id}
          renderItem={this.recordItem}

        />

        <Dialog
          width={0.85}
          visible={this.state.showDialog}
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
          dialogTitle={<DialogTitle title="心痛了吗？" textStyle={{ fontSize: 20 }} />}
          footer={
            <DialogFooter>
              <DialogButton text="呜呜！我不记了！" key={1} textStyle={{ color: 'red' }} onPress={() => this.setState({ showDialog: false })} />
              <DialogButton text="快乐记录" key={2} onPress={() => this.submitRecord()} />
            </DialogFooter>} >

          <DialogContent>
            <RNPickerSelect
              style={pickerStyleB}
              placeholder={pickerPlaceholder}
              onValueChange={(value) => this.setState({ who: value })}
              items={[
                { label: 'Lele', value: '蕾' },
                { label: 'SW', value: '雪' },
              ]}
            />
            <TextInput style={styles.input} placeholder='干了啥' onChangeText={text => this.setState({ currentCategory: text })} />
            <Text />
            <TextInput style={styles.input} placeholder='多少钱' onChangeText={text => this.setState({ currentAmount: parseFloat(text) })} keyboardType='number-pad' />
            <ScrollView style={styles.scroll} horizontal={true}>
              <TouchableOpacity style={{
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.state.picureOneColor
              }}
                onPress={() => this.choosePic({ number: 1 })} >
                <Image source={require('C:/Users/SW/Desktop/ClassApp/assets/A.png')} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.state.picureTwoColor
              }}
                onPress={() => this.choosePic({ number: 2 })}>
                <Image source={require('C:/Users/SW/Desktop/ClassApp/assets/B.png')} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.state.picureThreeColor
              }}
                onPress={() => this.choosePic({ number: 3 })}>
                <Image source={require('C:/Users/SW/Desktop/ClassApp/assets/C.png')} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.state.picureFourColor
              }}
                onPress={() => this.choosePic({ number: 4 })}>
                <Image source={require('C:/Users/SW/Desktop/ClassApp/assets/D.png')} style={styles.image} />
              </TouchableOpacity>

              <TouchableOpacity style={{
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.state.picureFiveColor
              }}
                onPress={() => this.choosePic({ number: 5 })}>
                <Image source={require('C:/Users/SW/Desktop/ClassApp/assets/E.png')} style={styles.image} />
              </TouchableOpacity>

              <TouchableOpacity style={{
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.state.picureSixColor
              }}
                onPress={() => this.choosePic({ number: 6 })}>
                <Image source={require('C:/Users/SW/Desktop/ClassApp/assets/F.png')} style={styles.image} />
              </TouchableOpacity>

              <TouchableOpacity style={{
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.state.picureSevenColor
              }}
                onPress={() => this.choosePic({ number: 7 })}>
                <Image source={require('C:/Users/SW/Desktop/ClassApp/assets/G.png')} style={styles.image} />
              </TouchableOpacity>

              <TouchableOpacity style={{
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.state.picureEightColor
              }}
                onPress={() => this.choosePic({ number: 8 })}>
                <Image source={require('C:/Users/SW/Desktop/ClassApp/assets/H.png')} style={styles.image} />
              </TouchableOpacity>

              <TouchableOpacity style={{
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.state.picureNineColor
              }}
                onPress={() => this.choosePic({ number: 9 })}>
                <Image source={require('C:/Users/SW/Desktop/ClassApp/assets/I.png')} style={styles.image} />
              </TouchableOpacity>

            </ScrollView>
          </DialogContent>

        </Dialog>



        <TabNavigator
        tabBarStyle={{ backgroundColor: '#FFE4C4',}}
        >
          <TabNavigator.Item
            onPress={() => this.setState({ showDialog: true })}
            renderIcon={() => <Image style={{ width: 50, height: 50 }} source={require('C:/Users/SW/Desktop/ClassApp/assets/add.png')} />}
          >

          </TabNavigator.Item>
        </TabNavigator>
      </View>


    )
  }

  recordItem = ({ item, index }) => (
    <View>
      <Swipeout sensitivity={1} right={this.recordBtn} backgroundColor='white' autoClose={true} buttonWidth={100} onOpen={() => this.setState({ selectedItem: index, selectedWho: item.who, selectedAmount: item.amount, selectedId: item.id })} onClose={() => this.setState({ selectedItem: -1, selectedWho: '', selectedAmount: 0, selectedId: '' })}>
        <Record category={item.category} who={item.who} amount={item.amount} Path={item.Path} date={item.id}  />
      </Swipeout>
      <View><Text style={styles.Divider} numberOfLines={1} ellipsizeMode='clip'>*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************</Text></View>
    </View>
  )

 
  
  




  deleteRecord = (selectedItem) => {
    mRef.child('AllBill').child(this.state.periodSelected).child(this.state.selectedId).remove()
    if (this.state.selectedWho == '蕾')
      mRef.child('PayForSw').child(this.state.periodSelected).set({ 这个月蕾蕾为哥哥出了: this.state.paidForSw - this.state.selectedAmount })
    else
      mRef.child('PayForLe').child(this.state.periodSelected).set({ 这个月哥哥为蕾蕾出了: this.state.paidForLe - this.state.selectedAmount })
  }

  choosePic = ({ number }) => {
    if (number == 1) {
      this.setState({ picureOneColor: '#00FFFF' })
      this.setState({ picureTwoColor: 'white' })
      this.setState({ picureThreeColor: 'white' })
      this.setState({ picureFourColor: 'white' })
      this.setState({ picureFiveColor: 'white' })
      this.setState({ picureSixColor: 'white' })
      this.setState({ picureSevenColor: 'white' })
      this.setState({ picureEightColor: 'white' })
      this.setState({ picureNineColor: 'white' })
    }
    else if (number == 2) {
      this.setState({ picureOneColor: 'white' })
      this.setState({ picureTwoColor: '#00FFFF' })
      this.setState({ picureThreeColor: 'white' })
      this.setState({ picureFourColor: 'white' })
      this.setState({ picureFiveColor: 'white' })
      this.setState({ picureSixColor: 'white' })
      this.setState({ picureSevenColor: 'white' })
      this.setState({ picureEightColor: 'white' })
      this.setState({ picureNineColor: 'white' })
    }
    else if (number == 3) {
      this.setState({ picureOneColor: 'white' })
      this.setState({ picureTwoColor: 'white' })
      this.setState({ picureThreeColor: '#00FFFF' })
      this.setState({ picureFourColor: 'white' })
      this.setState({ picureFiveColor: 'white' })
      this.setState({ picureSixColor: 'white' })
      this.setState({ picureSevenColor: 'white' })
      this.setState({ picureEightColor: 'white' })
      this.setState({ picureNineColor: 'white' })
    }
    else if (number == 4) {
      this.setState({ picureOneColor: 'white' })
      this.setState({ picureTwoColor: 'white' })
      this.setState({ picureThreeColor: 'white' })
      this.setState({ picureFourColor: '#00FFFF' })
      this.setState({ picureFiveColor: 'white' })
      this.setState({ picureSixColor: 'white' })
      this.setState({ picureSevenColor: 'white' })
      this.setState({ picureEightColor: 'white' })
      this.setState({ picureNineColor: 'white' })
    }
    else if (number == 5) {
      this.setState({ picureOneColor: 'white' })
      this.setState({ picureTwoColor: 'white' })
      this.setState({ picureThreeColor: 'white' })
      this.setState({ picureFourColor: 'white' })
      this.setState({ picureFiveColor: '#00FFFF' })
      this.setState({ picureSixColor: 'white' })
      this.setState({ picureSevenColor: 'white' })
      this.setState({ picureEightColor: 'white' })
      this.setState({ picureNineColor: 'white' })
    }
    else if (number == 6) {
      this.setState({ picureOneColor: 'white' })
      this.setState({ picureTwoColor: 'white' })
      this.setState({ picureThreeColor: 'white' })
      this.setState({ picureFourColor: 'white' })
      this.setState({ picureFiveColor: 'white' })
      this.setState({ picureSixColor: '#00FFFF' })
      this.setState({ picureSevenColor: 'white' })
      this.setState({ picureEightColor: 'white' })
      this.setState({ picureNineColor: 'white' })
    }
    else if (number == 7) {
      this.setState({ picureOneColor: 'white' })
      this.setState({ picureTwoColor: 'white' })
      this.setState({ picureThreeColor: 'white' })
      this.setState({ picureFourColor: 'white' })
      this.setState({ picureFiveColor: 'white' })
      this.setState({ picureSixColor: 'white' })
      this.setState({ picureSevenColor: '#00FFFF' })
      this.setState({ picureEightColor: 'white' })
      this.setState({ picureNineColor: 'white' })
    }
    else if (number == 8) {
      this.setState({ picureOneColor: 'white' })
      this.setState({ picureTwoColor: 'white' })
      this.setState({ picureThreeColor: 'white' })
      this.setState({ picureFourColor: 'white' })
      this.setState({ picureFiveColor: 'white' })
      this.setState({ picureSixColor: 'white' })
      this.setState({ picureSevenColor: 'white' })
      this.setState({ picureEightColor: '#00FFFF' })
      this.setState({ picureNineColor: 'white' })
    }
    else if (number == 9) {
      this.setState({ picureOneColor: 'white' })
      this.setState({ picureTwoColor: 'white' })
      this.setState({ picureThreeColor: 'white' })
      this.setState({ picureFourColor: 'white' })
      this.setState({ picureFiveColor: 'white' })
      this.setState({ picureSixColor: 'white' })
      this.setState({ picureSevenColor: 'white' })
      this.setState({ picureEightColor: 'white' })
      this.setState({ picureNineColor: '#00FFFF' })
    }

    this.setState({ pictureSeleted: number })


  }

  generateFormatedDate = () => {
    let currentTime = new Date()
    let year = currentTime.getFullYear()
    let month = currentTime.getMonth() + 1
    let date = currentTime.getDate()
    let hour = currentTime.getHours()
    let min = currentTime.getMinutes()
    let sec = currentTime.getSeconds()
    if (min < 10)
      min = '0' + min
      if(hour<10)
      hour='0'+hour
    if (sec < 10)
      sec = '0' + sec
    if (month < 10)
      month = '0' + month
    if (date < 10)
      date = '0' + date


    return year + '-' + month + '-' + date + '---' + hour + ':' + min + ':' + sec

  }






  submitRecord = () => {
    if(this.state.who=='蕾'||this.state.who=='雪'){
    let recordID = this.generateFormatedDate()
    let record = {
      id: recordID,
      category: this.state.currentCategory,
      amount: this.state.currentAmount,
      who: this.state.who,
      Path: this.state.pictureSeleted

    }

    if (record.who == "蕾") {
      let updatedAmount = this.state.paidForSw + record.amount

      this.setState({ paidForSw: updatedAmount }, () => { this.writeData(record.amount, record.category, record.who, record.Path, record.id) })
    }
    else {

      let updatedAmount = this.state.paidForLe + record.amount

      this.setState({ paidForLe: updatedAmount }, () => { this.writeData(record.amount, record.category, record.who, record.Path, record.id) })

    }

    this.setState({ showDialog: false, currentAmount: 0, currentCategory: '??' })
  }




  }
}





const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  Top: {
    paddingTop: 40,
    backgroundColor: '#FFE4C4',

  },
  Header: {
    padding: 20,
    backgroundColor: '#FFE4C4',
    textAlign: 'center',
    fontSize: 30,
    fontWeight:'bold'


  },
  input: {
    paddingHorizontal: 10,
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10
  },
  image: {
    width: 150,
    height: 150,


  },
  scroll: {
    margin: 5,
    padding: 10
  },

  Divider: {
    fontWeight: '500',
    paddingHorizontal: 30,
    maxWidth:'100%'

  },


})

const pickerStyle = StyleSheet.create({
  inputIOS: {

   textAlign:'center',
   fontSize:20,
   fontWeight:'800'

  },
  inputAndroid: {
    textAlign:'center',
    fontSize:20,
    fontWeight:'800'
  }
})

const pickerPlaceholder = {
  label: '谁出钱啦??', value: null, color: 'black'
}

const pickerStyleB = StyleSheet.create({
  inputIOS: {

   borderWidth:2,
   paddingHorizontal: 10,
   width: '100%',
   height: 40,
   borderColor:'pink',
   borderRadius:10,
   marginVertical:10,

  },
  inputAndroid: {
    textAlign:'center',
    fontSize:20,
    fontWeight:'800'
  }
})