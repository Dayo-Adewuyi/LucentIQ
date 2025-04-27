/**
 * Main connector for Flare Network services
 * Manages connections to FTSO v2, FDC, and State Connector
 */

import { FTSOConnection } from './ftso-connection';
import { FDCConnection } from './fdc-connection';
import { StateConnectorInterface } from './state-connector';
import { FlareConnectionConfig, ConnectionStatus } from './types';
import { Logger } from '../utils/logger';

export class FlareNetworkConnector {
  private config: FlareConnectionConfig;
  private ftsoConnection: FTSOConnection | null = null;
  private fdcConnection: FDCConnection | null = null;
  private stateConnector: StateConnectorInterface | null = null;
  private logger: Logger;
  
  /**
   * Create a new FlareNetworkConnector
   * @param config Configuration for connecting to Flare Network
   */
  constructor(config: FlareConnectionConfig) {
    this.config = config;
    this.logger = new Logger({
      serviceName: 'FlareNetworkConnector',
      logLevel: config.logLevel || 'info'
    });
    
    this.logger.info('FlareNetworkConnector initialized with endpoint', {
      endpoint: this.config.endpoint
    });
  }
  
  /**
   * Initialize connections to all Flare Network services
   */
  async initialize(): Promise<void> {
    this.logger.info('Initializing connections to Flare Network services');
    
    try {
      // Connect to FTSO v2
      this.ftsoConnection = await this.connectToFTSO();
      
      // Connect to FDC
      this.fdcConnection = await this.connectToFDC();
      
      // Connect to State Connector
      this.stateConnector = await this.connectToStateConnector();
      
      this.logger.info('All Flare Network connections established successfully');
    } catch (error:any) {
      this.logger.error('Failed to initialize Flare Network connections', { error });
      throw new Error(`Failed to initialize Flare Network connections: ${error.message}`);
    }
  }
  
  /**
   * Connect to the FTSO v2 service
   */
  private async connectToFTSO(): Promise<FTSOConnection> {
    this.logger.info('Connecting to FTSO v2');
    
    try {
      const ftsoConnection = new FTSOConnection({
        endpoint: this.config.endpoint,
        apiKey: this.config.apiKey,
        ftsoSpecificConfig: this.config.ftsoConfig
      });
      
      await ftsoConnection.connect();
      this.logger.info('FTSO v2 connection established');
      
      return ftsoConnection;
    } catch (error:any) {
      this.logger.error('Failed to connect to FTSO v2', { error });
      throw new Error(`Failed to connect to FTSO v2: ${error.message}`);
    }
  }
  
  /**
   * Connect to the FDC service
   */
  private async connectToFDC(): Promise<FDCConnection> {
    this.logger.info('Connecting to Flare Data Connector (FDC)');
    
    try {
      const fdcConnection = new FDCConnection({
        endpoint: this.config.endpoint,
        apiKey: this.config.apiKey,
        fdcSpecificConfig: this.config.fdcConfig
      });
      
      await fdcConnection.connect();
      this.logger.info('FDC connection established');
      
      return fdcConnection;
    } catch (error:any) {
      this.logger.error('Failed to connect to FDC', { error });
      throw new Error(`Failed to connect to FDC: ${error.message}`);
    }
  }
  
  /**
   * Connect to the State Connector
   */
  private async connectToStateConnector(): Promise<StateConnectorInterface> {
    this.logger.info('Connecting to State Connector');
    
    try {
      const stateConnector = new StateConnectorInterface({
        endpoint: this.config.endpoint,
        apiKey: this.config.apiKey,
        stateConnectorConfig: this.config.stateConnectorConfig
      });
      
      await stateConnector.connect();
      this.logger.info('State Connector connection established');
      
      return stateConnector;
    } catch (error:any) {
      this.logger.error('Failed to connect to State Connector', { error });
      throw new Error(`Failed to connect to State Connector: ${error.message}`);
    }
  }
  
  /**
   * Get the FTSO connection
   * @throws Error if not initialized
   */
  getFTSOConnection(): FTSOConnection {
    if (!this.ftsoConnection) {
      throw new Error('FTSO connection not initialized. Call initialize() first.');
    }
    return this.ftsoConnection;
  }
  
  /**
   * Get the FDC connection
   * @throws Error if not initialized
   */
  getFDCConnection(): FDCConnection {
    if (!this.fdcConnection) {
      throw new Error('FDC connection not initialized. Call initialize() first.');
    }
    return this.fdcConnection;
  }
  
  /**
   * Get the State Connector interface
   * @throws Error if not initialized
   */
  getStateConnector(): StateConnectorInterface {
    if (!this.stateConnector) {
      throw new Error('State Connector not initialized. Call initialize() first.');
    }
    return this.stateConnector;
  }
  
  /**
   * Check the status of all connections
   */
  async getConnectionStatus(): Promise<{
    ftso: ConnectionStatus;
    fdc: ConnectionStatus;
    stateConnector: ConnectionStatus;
  }> {
    return {
      ftso: this.ftsoConnection ? await this.ftsoConnection.getStatus() : { connected: false },
      fdc: this.fdcConnection ? await this.fdcConnection.getStatus() : { connected: false },
      stateConnector: this.stateConnector ? await this.stateConnector.getStatus() : { connected: false }
    };
  }
  
  /**
   * Close all connections
   */
  async disconnect(): Promise<void> {
    this.logger.info('Disconnecting from Flare Network services');
    
    try {
      if (this.ftsoConnection) {
        await this.ftsoConnection.disconnect();
      }
      
      if (this.fdcConnection) {
        await this.fdcConnection.disconnect();
      }
      
      if (this.stateConnector) {
        await this.stateConnector.disconnect();
      }
      
      this.ftsoConnection = null;
      this.fdcConnection = null;
      this.stateConnector = null;
      
      this.logger.info('Successfully disconnected from all Flare Network services');
    } catch (error:any) {
      this.logger.error('Error during disconnect from Flare Network services', { error });
      throw new Error(`Error during disconnect: ${error.message}`);
    }
  }
  
  /**
   * Update connection configuration
   */
  async updateConfig(newConfig: Partial<FlareConnectionConfig>): Promise<void> {
    this.logger.info('Updating Flare Network connection configuration');
    
    this.config = {
      ...this.config,
      ...newConfig,
      ftsoConfig: {
        ...this.config.ftsoConfig,
        ...newConfig.ftsoConfig
      },
      fdcConfig: {
        ...this.config.fdcConfig,
        ...newConfig.fdcConfig
      },
      stateConnectorConfig: {
        ...this.config.stateConnectorConfig,
        ...newConfig.stateConnectorConfig
      }
    };
    
    await this.disconnect();
    await this.initialize();
    
    this.logger.info('Flare Network connections updated with new configuration');
  }
}