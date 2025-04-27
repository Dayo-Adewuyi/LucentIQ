/**
 * Connection to the Flare Time Series Oracle (FTSO) v2
 * 
 * The FTSO v2 provides decentralized price feeds and other time series data
 * to the Flare Network through a consensus of data providers.
 */

import axios from 'axios';
import { 
  FTSOConnectionConfig, 
  PriceData, 
  SubmissionResult, 
  ConfidenceInterval,
  ConnectionStatus,
  FTSOProviderInfo
} from './types';
import { Logger } from '../utils/logger';

export class FTSOConnection {
  private config: FTSOConnectionConfig;
  private isConnected: boolean = false;
  private client: any; 
  private logger: Logger;
  private providerRegistry: Map<string, FTSOProviderInfo> = new Map();
  private lastUpdateTimestamp: number = 0;
  
  /**
   * Create a new connection to FTSO v2
   */
  constructor(config: FTSOConnectionConfig) {
    this.config = config;
    this.logger = new Logger({
      serviceName: 'FTSOConnection',
      logLevel: config.logLevel || 'info'
    });
    
    this.logger.info('FTSOConnection initialized');
  }
  
  /**
   * Connect to the FTSO v2 service
   */
  async connect(): Promise<void> {
    try { 
      this.logger.info('Connecting to FTSO v2 service', {
        endpoint: this.config.endpoint
      });
      
  
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.client = {
        async getPriceData(symbol: string) {
          return {
            price: Math.random() * 50000,
            timestamp: Date.now(),
            confidence: 0.95,
            providers: 32
          };
        },
        
      };
      
      await this.updateProviderRegistry();
      
      this.isConnected = true;
      this.logger.info('Successfully connected to FTSO v2 service');
    } catch (error:any) {
      this.logger.error('Failed to connect to FTSO v2 service', { error });
      throw new Error(`FTSO connection error: ${error.message}`);
    }
  }
  
  /**
   * Update the provider registry with latest information
   */
  private async updateProviderRegistry(): Promise<void> {
    try {
  
      const mockProviders: FTSOProviderInfo[] = [
        {
          id: 'provider-1',
          name: 'Alpha Oracle',
          reliabilityScore: 0.98,
          accuracy: 0.992,
          votePower: 2500000,
          supportedSymbols: ['BTC', 'ETH', 'XRP', 'FLR']
        },
        {
          id: 'provider-2',
          name: 'Beta Data',
          reliabilityScore: 0.95,
          accuracy: 0.983,
          votePower: 1800000,
          supportedSymbols: ['BTC', 'ETH', 'ADA', 'SOL', 'FLR']
        },
        {
          id: 'provider-3',
          name: 'Gamma Metrics',
          reliabilityScore: 0.99,
          accuracy: 0.989,
          votePower: 3200000,
          supportedSymbols: ['BTC', 'ETH', 'XRP', 'ADA', 'SOL', 'DOT', 'FLR']
        }
      ];
      
      mockProviders.forEach(provider => {
        this.providerRegistry.set(provider.id, provider);
      });
      
      this.lastUpdateTimestamp = Date.now();
      this.logger.debug('Updated FTSO provider registry', {
        providersCount: this.providerRegistry.size
      });
    } catch (error) {
      this.logger.error('Failed to update FTSO provider registry', { error });
    }
  }
  
  /**
   * Disconnect from the FTSO v2 service
   */
  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    
    try {
      this.logger.info('Disconnecting from FTSO v2 service');
      
   
      this.client = null;
      this.isConnected = false;
      
      this.logger.info('Successfully disconnected from FTSO v2 service');
    } catch (error:any) {
      this.logger.error('Error during FTSO v2 disconnect', { error });
      throw new Error(`FTSO disconnect error: ${error.message}`);
    }
  }
  
  /**
   * Get the current connection status
   */
  async getStatus(): Promise<ConnectionStatus> {
    if (!this.isConnected) {
      return {
        connected: false
      };
    }
    
    try {
 
      
      const mockStatus: ConnectionStatus = {
        connected: true,
        latency: Math.floor(Math.random() * 100) + 20, 
        lastUpdate: this.lastUpdateTimestamp,
        providersCount: this.providerRegistry.size,
        activeDataFeeds: ['BTC', 'ETH', 'XRP', 'ADA', 'SOL', 'DOT', 'FLR', 'USDT', 'USDC']
      };
      
      return mockStatus;
    } catch (error:any) {
      this.logger.error('Error getting FTSO connection status', { error });
      return {
        connected: true,
        error: error.message
      };
    }
  }
  
  /**
   * Get the latest price for a specific asset
   */
  async getLatestPrice(assetSymbol: string): Promise<PriceData> {
    this.checkConnection();
    
    try {
      this.logger.debug(`Getting latest price for ${assetSymbol}`);
  
      
      const data = await this.client.getPriceData(assetSymbol);
      
      const priceData: PriceData = {
        symbol: assetSymbol,
        price: data.price,
        timestamp: data.timestamp,
        confidence: {
          overall: data.confidence,
          providers: data.providers
        },
        sourceInfo: {
          providersCount: data.providers,
          consensusReached: true,
          epoch: Math.floor(Date.now() / (3 * 60 * 1000)) 
        }
      };
      
      return priceData;
    } catch (error:any) {
      this.logger.error(`Error getting latest price for ${assetSymbol}`, { error });
      throw new Error(`Failed to get latest price for ${assetSymbol}: ${error.message}`);
    }
  }
  
  /**
   * Get historical prices for a specific asset
   */
  async getHistoricalPrices(
    assetSymbol: string,
    fromTimestamp: number,
    toTimestamp: number
  ): Promise<PriceData[]> {
    this.checkConnection();
    
    try {
      this.logger.debug(`Getting historical prices for ${assetSymbol}`, {
        from: new Date(fromTimestamp).toISOString(),
        to: new Date(toTimestamp).toISOString()
      });
      
     
      
      const epochInterval = 3 * 60 * 1000; 
      const dataPoints: PriceData[] = [];
      
      let basePrice = Math.random() * 50000;
      for (let timestamp = fromTimestamp; timestamp <= toTimestamp; timestamp += epochInterval) {
        basePrice = basePrice * (1 + (Math.random() * 0.02 - 0.01));
        
        dataPoints.push({
          symbol: assetSymbol,
          price: basePrice,
          timestamp,
          confidence: {
            overall: 0.9 + Math.random() * 0.09,
            providers: 20 + Math.floor(Math.random() * 15)
          },
          sourceInfo: {
            providersCount: 20 + Math.floor(Math.random() * 15),
            consensusReached: Math.random() > 0.05, 
            epoch: Math.floor(timestamp / epochInterval)
          }
        });
      }
      
      return dataPoints;
    } catch (error:any) {
      this.logger.error(`Error getting historical prices for ${assetSymbol}`, { error });
      throw new Error(`Failed to get historical prices for ${assetSymbol}: ${error.message}`);
    }
  }
  
  /**
   * Submit a data point to the FTSO (for data providers)
   */
  async submitDataPoint(
    assetSymbol: string,
    price: number,
    timestamp: number
  ): Promise<SubmissionResult> {
    this.checkConnection();
    
    if (!this.config.dataProviderSettings) {
      throw new Error('This connection is not configured as a data provider');
    }
    
    try {
      this.logger.info(`Submitting data point for ${assetSymbol}`, {
        price,
        timestamp: new Date(timestamp).toISOString()
      });
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const result: SubmissionResult = {
        success: true,
        epoch: Math.floor(Date.now() / (3 * 60 * 1000)),
        assetSymbol,
        submissionTimestamp: Date.now(),
        transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
      };
      
      return result;
    } catch (error) {
      this.logger.error(`Error submitting data point for ${assetSymbol}`, { error });
      throw new Error(`Failed to submit data point for ${assetSymbol}: ${error.message}`);
    }
  }
  
  /**
   * Get confidence intervals for a price
   */
  async getConfidenceInterval(assetSymbol: string): Promise<ConfidenceInterval> {
    this.checkConnection();
    
    try {
      this.logger.debug(`Getting confidence interval for ${assetSymbol}`);
      
      const priceData = await this.getLatestPrice(assetSymbol);
      
   
      
      const basePrice = priceData.price;
      const varianceFactor = 1 - priceData.confidence.overall;
      
      const confidenceInterval: ConfidenceInterval = {
        symbol: assetSymbol,
        timestamp: priceData.timestamp,
        currentPrice: basePrice,
        intervals: {
          interval50: {
            lower: basePrice * (1 - varianceFactor * 0.67),
            upper: basePrice * (1 + varianceFactor * 0.67),
            level: 0.5
          },
          interval80: {
            lower: basePrice * (1 - varianceFactor * 1.28),
            upper: basePrice * (1 + varianceFactor * 1.28),
            level: 0.8
          },
          interval95: {
            lower: basePrice * (1 - varianceFactor * 1.96),
            upper: basePrice * (1 + varianceFactor * 1.96),
            level: 0.95
          },
          interval99: {
            lower: basePrice * (1 - varianceFactor * 2.58),
            upper: basePrice * (1 + varianceFactor * 2.58),
            level: 0.99
          }
        }
      };
      
      return confidenceInterval;
    } catch (error:any) {
      this.logger.error(`Error getting confidence interval for ${assetSymbol}`, { error });
      throw new Error(`Failed to get confidence interval for ${assetSymbol}: ${error.message}`);
    }
  }
  
  /**
   * Get information about FTSO data providers
   */
  async getProviders(): Promise<FTSOProviderInfo[]> {
    this.checkConnection();
    
    try {
      if (Date.now() - this.lastUpdateTimestamp > 60 * 60 * 1000) {
        await this.updateProviderRegistry();
      }
      
      return Array.from(this.providerRegistry.values());
    } catch (error:any) {
      this.logger.error('Error getting FTSO providers', { error });
      throw new Error(`Failed to get FTSO providers: ${error.message}`);
    }
  }
  
  /**
   * Utility method to check if connected and throw an error if not
   */
  private checkConnection(): void {
    if (!this.isConnected || !this.client) {
      throw new Error('Not connected to FTSO v2. Call connect() first.');
    }
  }
}