import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  SafeAreaView
} from 'react-native'
import { observer, inject } from 'mobx-react'
import { ScreenWidth, ScreenHeight, checkPwd } from '../../../../util/Common'
import RNKeyboardAvoidView from '../../../../components/RNKeyboardAvoidView'
import i18n from '../../../../locales/i18n'

@inject('rootStore')
@observer
class ChangeName extends Component {
  constructor(props) {
    super(props)
    this.json
    this.state = {
      New_name: '',
      Current_password: ''
    }
    this.back = this.back.bind(this)
    this.Change_Name = this.Change_Name.bind(this)
    this.Change = this.Change.bind(this)
    this.Current_password = this.Current_password.bind(this)
  }

  back() {
    this.props.navigation.navigate('Manage_Account')
  }

  Current_password(Current_password) {
    this.setState({
      Current_password: Current_password
    })
  }

  Change_Name(New_name) {
    this.setState({
      New_name: New_name
    })
  }

  Change() {
    if (!this.state.Current_password) {
      Alert.alert('', i18n.t('Profile.entPwd'))
    } else if (!this.state.New_name) {
      Alert.alert('', i18n.t('Profile.entName'))
    } else {
      const _this = this
      checkPwd({
        address: _this.props.rootStore.stateStore.Accounts[_this.props.rootStore.stateStore.Account].address,
        password: _this.state.Current_password,
        success: (loadPair, SInfo) => {
          loadPair.setMeta({ name: _this.state.New_name })
          _this.json = loadPair.toJson(_this.state.Current_password)
          _this.json.meta = loadPair.getMeta()
          SInfo.setItem(
            _this.props.rootStore.stateStore.Accounts[_this.props.rootStore.stateStore.Account].address,
            JSON.stringify(_this.json),
            {
              sharedPreferencesName: 'Polkawallet',
              keychainService: 'PolkawalletKey'
            }
          )
          _this.props.rootStore.stateStore.Accounts[_this.props.rootStore.stateStore.Account].account =
            _this.state.New_name
          Alert.alert(
            '',
            i18n.t('Profile.Modify'),
            [
              {
                text: 'OK',
                onPress: () => {
                  _this.props.navigation.navigate('Manage_Account')
                }
              }
            ],
            { cancelable: false }
          )
        }
      })
    }
  }

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          height: ScreenHeight,
          flex: 1
        }}
      >
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          {/* 标题栏 | Title bar */}
          <StatusBar
            hidden={false}
            backgroundColor="#FFF" // 状态栏背景颜色 | Status bar background color
            barStyle="dark-content" // 状态栏样式（黑字）| Status bar style (black)
          />
          <View style={{ height: 44 }}>
            <TouchableOpacity onPress={this.back} style={{ paddingTop: 12 }}>
              <Image
                // style={styles.image_title}
                source={require('../../../../assets/images/public/About_return.png')}
              />
            </TouchableOpacity>
          </View>
          <RNKeyboardAvoidView>
            <Text
              style={{
                fontSize: 24,
                marginTop: 37,
                marginBottom: 17,
                color: '#3E2D32'
              }}
            >
              {i18n.t('Profile.ChangeName')}
            </Text>
            <View style={[styles.view]}>
              {/* <Text style={[styles.text]}>Current password</Text> */}
              <TextInput
                style={[styles.textInputStyle]}
                placeholder={i18n.t('Profile.CurrentPassword')}
                secureTextEntry={true}
                autoCorrect={false}
                underlineColorAndroid="#ffffff00"
                onChangeText={this.Current_password}
              />
            </View>
            <View style={[styles.view, { marginTop: 11 }]}>
              {/* <Text style={[styles.text]}>New name</Text> */}
              <TextInput
                style={[styles.textInputStyle]}
                placeholder={i18n.t('Profile.NewName')}
                autoCorrect={false}
                underlineColorAndroid="#ffffff00"
                onChangeText={this.Change_Name}
              />
            </View>
          </RNKeyboardAvoidView>
          <TouchableOpacity style={styles.Change} onPress={this.Change}>
            <Image source={require('../../../../assets/images/public/Change_button.png')} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    padding: ScreenHeight / 50,
    height: ScreenHeight / 9,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#776f71'
  },
  text_title: {
    fontSize: ScreenHeight / 37,
    fontWeight: 'bold',
    color: '#e6e6e6'
  },
  image_title: {
    height: ScreenHeight / 33.35,
    width: ScreenHeight / 33.35,
    resizeMode: 'contain'
  },
  save_touch: {
    width: ScreenHeight / 33.35 + ScreenWidth * 0.06,
    justifyContent: 'center',
    alignItems: 'center'
  },
  save_text: {
    color: 'white',
    fontSize: ScreenWidth / 28
  },
  view: {
    width: ScreenWidth - 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 57
  },
  text: {
    fontSize: ScreenWidth / 25,
    width: ScreenWidth * 0.8,
    color: '#696969',
    fontWeight: '400'
  },
  textInputStyle: {
    width: ScreenWidth - 40,
    color: '#AAAAAA',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE2E5',
    fontSize: 16
  },
  inputview: {
    marginTop: ScreenHeight / 70,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputimage: {
    marginLeft: ScreenWidth * 0.02,
    height: ScreenWidth * 0.04,
    width: ScreenWidth * 0.04,
    resizeMode: 'contain'
  },
  Change: {
    alignSelf: 'center',
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default ChangeName