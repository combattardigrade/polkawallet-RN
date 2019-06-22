import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, SafeAreaView, Platform } from 'react-native'
import { QRscanner } from 'react-native-qr-scanner'
import { observer, inject } from 'mobx-react'
import { NavigationActions, StackActions } from 'react-navigation'
import { ScreenHeight, ScannerType } from '../../../util/Common'
import Header from '../../../components/Header'
import i18n from '../../../locales/i18n'

@inject('rootStore')
@observer
class Scanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flashMode: false,
      zoom: 0.2
    }
    this.back = this.back.bind(this)
  }

  // 点击返回
  // Click back
  back() {
    this.props.navigation.navigate('Tabbed_Navigation')
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#000' }]}>
        <StatusBar
          hidden={false}
          backgroundColor="#000" // 状态栏背景颜色 | Status bar background color
          barStyle={Platform.OS == 'android' ? 'light-content' : 'dark-content'} // 状态栏样式（黑字）| Status bar style (black)
        />
        <Header navigation={this.props.navigation} />
        <QRscanner
          cornerColor="#F14B79"
          scanBarColor="#F14B79"
          hintText={i18n.t('Assets.QRCodeTip')}
          rectHeight={264}
          rectWidth={264}
          hintTextPosition={100}
          hintTextStyle={{
            color: '#F14B79',
            fontSize: 14,
            backgroundColor: 'transparent',
            width: 264,
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center'
          }}
          onRead={this.onRead}
          renderBottomView={this.bottomView}
          flashMode={this.state.flashMode}
          zoom={this.state.zoom}
          finderY={50}
        />
      </SafeAreaView>
    )
  }

  // 页面底部
  // Bottom of the page
  bottomView = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#0000004D' }}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center' }}
          onPress={() => this.setState({ flashMode: !this.state.flashMode })}
        >
          <Text style={{ color: '#fff' }}>{i18n.t('Assets.Flashlight')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // 扫描到信息
  // The info from Scan Qr
  onRead = res => {
    let QRdata = ScannerType(res.data)
    if (this.props.rootStore.stateStore.tocamera == 0) {
      // Assets界面进来的
      // From Assets page
      this.props.rootStore.stateStore.iscamera = 1
      this.props.rootStore.stateStore.t_address = QRdata.data
      let resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Transfer' })]
      })
      this.props.navigation.dispatch(resetAction)
    }
    if (this.props.rootStore.stateStore.tocamera == 1) {
      // transfer界面进来的
      // From transfer page
      this.props.rootStore.stateStore.iscamera = 1
      this.props.rootStore.stateStore.t_address = QRdata.data
      this.props.navigation.navigate('Transfer')
    }
    if (this.props.rootStore.stateStore.tocamera == 2) {
      // 通讯录界面进来的
      // From Add_address page
      this.props.rootStore.stateStore.iscamera = 1
      this.props.rootStore.stateStore.QRaddress = QRdata.data
      this.props.navigation.navigate('Add_address')
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  title: {
    padding: ScreenHeight / 50,
    height: ScreenHeight / 9,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  image_title: {
    height: ScreenHeight / 33.35,
    width: ScreenHeight / 33.35,
    resizeMode: 'contain'
  }
})
export default Scanner