'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroConstants,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...", 
      viroAssets: [{
        id: "123",
        type: "OBJ",
        model: "https://s3.amazonaws.com/torontojs.arworkshop/SciFi_Fighter.obj",
        resources: [
          {
            type: "roughnessTexture",
            uri:
              "https://s3.amazonaws.com/torontojs.arworkshop/SF_Fighter-Albedo.jpg"
          },
          {
            type: "metalnessTexture",
            uri:
              "https://s3.amazonaws.com/torontojs.arworkshop/SF_Fighter-Albedo.jpg"
          },
          {
            type: "diffuseTexture",
            uri:
              "https://s3.amazonaws.com/torontojs.arworkshop/SF_Fighter-Albedo.jpg"
          }
        ]
      }
    ]
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <Viro3DObject
          source={{
            uri: 'https://s3.amazonaws.com/torontojs.arworkshop/SciFi_Fighter.obj'
          }}
          materials={["spaceship"]}
          // ref={ar3dModelRef}
          onLoadEnd={data => {
            alert("Model Loaded");
          }}
          onError={event => {
            alert("Error: ", event);
          }}
          onPress={() => alert("you touched!")}
          onDrag={() => {}}
          // onPinch={onPinch}
          scale={[0.5, 0.5, 0.5]}
          // onRotate={onRotate}
          position={[0, 0, -10]}
          // rotation={rotation}
          type={this.state.viroAssets[0].type}
          castsShadow={true}
        />
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
  spaceship: {
    shininess: 5.0,
    diffuseColor: "#ffffff",
    diffuseTexture: require('../assets/SF_Fighter-Albedo.jpg')
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.2)"
  }
});

module.exports = HelloWorldSceneAR;
