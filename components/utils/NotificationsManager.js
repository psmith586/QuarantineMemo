import React, { Component } from 'react'
import PushNotification from 'react-native-push-notifications'

export default class NotificationsManager extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      pushData: []
    }
  }  

  componentDidMount(){
    let self = this;

    PushNotification.configure({
      onNotification: function(notification) {
        console.log('Notification:', notification);
      },
      senderID: '100280590667',
      popInitialNotification: true,
      requestPermission: true
    });
  }


  _addDataToList(data){
    let array = this.state.pushData;
    array.push(data);
    this.setState({
      pushData: array
    })
    console.log(this.state)
  }

  _renderItem = ({ item }) => (
    <View key={item.title}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );
  
  render(){
    return(
      <View>
        {(this.state.pushData.length != 0) && 
          <FlatList
            data={this.state.pushData}
            renderItem={(item) => this._renderItem(item)}
            keyExtractor={(item) => item.title}
            extraData = {this.state}
          />
        }
        {(this.state.pushData.length == 0) &&
          <View style={styles.noData}>
            <Text style={styles.noDataText}>You don't have any push notification yet. Send some push to show it in the list</Text>
          </View>}
      </View>
    );
  }
}