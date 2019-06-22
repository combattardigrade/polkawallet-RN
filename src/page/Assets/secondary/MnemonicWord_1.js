import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, SafeAreaView, Modal } from 'react-native'
import { observer, inject } from 'mobx-react'
import { ScreenWidth, ScreenHeight } from '../../../util/Common'
import Header from '../../../components/Header'
import RNKeyboardAvoidView from '../../../components/RNKeyboardAvoidView'
import i18n from '../../../locales/i18n'

@inject('rootStore')
@observer
class MnemonicWord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TipTag: false
    }
  }

  // 显示禁止截屏提示
  // Display forbidden screen shot prompt
  showTip() {
    this.setState({
      TipTag: true
    })
  }

  // 下一步
  // The next step
  nextStep() {
    this.setState(
      {
        TipTag: false
      },
      () => {
        this.props.navigation.navigate('MnemonicWord_2', {
          key: this.props.navigation.state.params.key,
          address: this.props.navigation.state.params.address
        })
      }
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="#FFF" // 状态栏背景颜色 | Status bar background color
          barStyle="dark-content" // 状态栏样式（黑字）| Status bar style (black)
        />
        {/* 标题栏 | Title bar */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderBottomWidth: 0.5,
            borderBottomColor: '#ECE2E5'
          }}
        >
          <Header theme="dark" navigation={this.props.navigation} />
        </View>
        <RNKeyboardAvoidView>
          <View style={{ width: ScreenWidth - 40, marginLeft: 20 }}>
            <Text
              style={{
                color: '#3E2D32',
                fontSize: 18,
                fontWeight: '600',
                marginTop: 40,
                marginBottom: 20
              }}
            >
              {i18n.t('Assets.MWTitle')}
            </Text>
            <Text style={{ color: '#666666', fontSize: 15 }}>{i18n.t('Assets.MWTip1')}</Text>
            <Text
              style={{
                color: '#3E2D32',
                fontSize: 18,
                fontWeight: '600',
                marginTop: 67,
                marginBottom: 14
              }}
            >
              {i18n.t('Assets.MWTip2')}
            </Text>
            <Text style={{ color: '#666666', fontSize: 15, marginBottom: 12 }}>{i18n.t('Assets.MWTip3')}</Text>
            <Text style={{ color: '#666666', fontSize: 15 }}>{i18n.t('Assets.MWTip4')}</Text>
            <Text
              style={{
                color: '#3E2D32',
                fontSize: 18,
                fontWeight: '600',
                marginTop: 37,
                marginBottom: 14
              }}
            >
              {i18n.t('Assets.MWTip5')}
            </Text>
            <Text style={{ color: '#666666', fontSize: 15, marginBottom: 20 }}>{i18n.t('Assets.MWTip6')}</Text>
            <Text style={{ color: '#666666', fontSize: 15 }}>{i18n.t('Assets.MWTip7')}</Text>
          </View>
        </RNKeyboardAvoidView>
        <Modal animationType="fade" transparent={true} visible={this.state.TipTag}>
          <View
            style={{
              width: ScreenWidth,
              height: ScreenHeight - (StatusBar.currentHeight || 0),
              backgroundColor: 'rgba(0,0,0,0.5)'
            }}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
              <View
                style={{
                  borderRadius: 16,
                  width: ScreenWidth - 40,
                  marginLeft: 20,
                  backgroundColor: '#FFF',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Image
                  style={{ marginTop: 40, marginBottom: 20 }}
                  source={require('../../../assets/images/public/dontscreen.png')}
                />
                <Text
                  style={{
                    color: '#3E2D32',
                    fontSize: 16,
                    marginBottom: 40,
                    fontWeight: 'bold'
                  }}
                >
                  {i18n.t('Assets.MWTip9')}
                </Text>
                <Text
                  style={{
                    color: '#3E2D32',
                    fontSize: 14,
                    marginBottom: 36,
                    paddingHorizontal: 20
                  }}
                >
                  {i18n.t('Assets.MWTip10')}
                </Text>
                <View
                  style={{
                    width: ScreenWidth - 40,
                    borderTopWidth: 0.5,
                    borderTopColor: '#ECE2E5',
                    flexDirection: 'row',
                    height: 49
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        TipTag: false
                      })
                    }}
                    style={{
                      flex: 1,
                      borderRightWidth: 0.5,
                      borderRightColor: '#ECE2E5',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{i18n.t('Assets.MWTip11')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={this.nextStep.bind(this)}
                  >
                    <Text style={{ color: '#F14B79', fontSize: 16 }}>{i18n.t('Assets.MWTip12')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
          }}
          onPress={this.showTip.bind(this)}
        >
          <Image source={require('../../../assets/images/Assets/Nextstep.png')} />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
export default MnemonicWord