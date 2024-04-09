import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'CustomHoldMusicPlugin';

export default class CustomHoldMusicPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */

  async init(flex, manager) {
    flex.Actions.addListener('beforeHoldParticipant', (payload) => {
      payload.holdMusicUrl = "https://pages.cs.wisc.edu/~gtracy/twilio/NeverGonnaGiveYouUp.mp3";
    });

    flex.Actions.addListener('beforeHoldCall', (payload) => {
      payload.holdMusicUrl = "https://pages.cs.wisc.edu/~gtracy/twilio/NeverGonnaGiveYouUp.mp3";
    });

    flex.Actions.addListener('beforeTransferTask', (payload) => {
      flex.Actions.invokeAction('HoldCall', payload);
    });
  }


  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
