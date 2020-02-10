'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroMaterials,
  Viro360Image,
  Viro360Video,
  ViroAmbientLight,
  Viro3DObject,
  ViroConstants,
  ViroPortal,
  ViroPortalScene
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
      <ViroAmbientLight color="#ffffff" intensity={200}/>
        <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}}>
          <ViroPortal position={[0, 0, -1]} scale={[.1, .1, .1]}>
            <Viro3DObject source={require('../portal_res/portal_ship/portal_ship.vrx')}
              resources={[require('../portal_res/portal_ship/portal_ship_diffuse.png'),
                          require('../portal_res/portal_ship/portal_ship_normal.png'),
                          require('../portal_res/portal_ship/portal_ship_specular.png')]}
              type="VRX"/>
          </ViroPortal>
          <Viro360Image source={require("../portal_res/360_island.jpg")} />
        </ViroPortalScene>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({
  box: {
    shininess: 5.0,
    diffuseColor: "#ffffff",
    lightingModel: "Blinn"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.2)"
  }
});

module.exports = HelloWorldSceneAR;
