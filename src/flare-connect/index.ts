/**
 * Flare Network Connectivity Module
 * 
 * This module provides connectivity to Flare Network components:
 * - FTSO v2 (Flare Time Series Oracle)
 * - FDC (Flare Data Connector)
 * - State Connector
 */

import { FlareNetworkConnector } from './network-connector';
import { FTSOConnection } from './ftso-connection';
import { FDCConnection } from './fdc-connection';
import { StateConnectorInterface } from './state-connector';

export {
  FlareNetworkConnector,
  FTSOConnection,
  FDCConnection,
  StateConnectorInterface
};

export * from './types';

export default FlareNetworkConnector;