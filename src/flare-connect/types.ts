/**
 * Type definitions for Flare Network connectivity components
 */


export interface ConnectionStatus {
    connected: boolean;
    latency?: number;
    lastUpdate?: number;
    error?: string;
    providersCount?: number;
    activeDataFeeds?: string[];
    supportedChainsCount?: number;
    activeRequests?: number;
  }
  
  export interface SubmissionResult {
    success: boolean;
    epoch: number;
    assetSymbol?: string;
    submissionTimestamp: number;
    transactionHash: string;
    error?: string;
  }
  
  
  export interface FlareConnectionConfig {
    endpoint: string;
    apiKey: string;
    ftsoConfig?: FTSOSpecificConfig;
    fdcConfig?: FDCSpecificConfig;
    stateConnectorConfig?: StateConnectorSpecificConfig;
    logLevel?: string;
  }
  
  export interface FTSOSpecificConfig {
    dataProviderMode?: boolean;
    providerIdentity?: string;
    privateKey?: string;
    votePower?: number;
    minSubmissionInterval?: number;
  }
  
  export interface FDCSpecificConfig {
    maxConcurrentRequests?: number;
    defaultTimeout?: number;
    verifierNodes?: string[];
  }
  
  export interface StateConnectorSpecificConfig {
    attestationThreshold?: number;
    maxQuerySize?: number;
    responseTimeout?: number;
  }
  
  
  export interface FTSOConnectionConfig {
    endpoint: string;
    apiKey: string;
    ftsoSpecificConfig?: FTSOSpecificConfig;
    dataProviderSettings?: FTSODataProviderSettings;
    logLevel?: string;
  }
  
  export interface FTSODataProviderSettings {
    providerIdentity: string;
    privateKey: string;
    votePower: number;
    supportedSymbols: string[];
    rewardAddress: string;
  }
  
  export interface PriceData {
    symbol: string;
    price: number;
    timestamp: number;
    confidence: {
      overall: number;
      providers: number;
    };
    sourceInfo: {
      providersCount: number;
      consensusReached: boolean;
      epoch: number;
    };
  }
  
  export interface ConfidenceInterval {
    symbol: string;
    timestamp: number;
    currentPrice: number;
    intervals: {
      interval50: {
        lower: number;
        upper: number;
        level: number;
      };
      interval80: {
        lower: number;
        upper: number;
        level: number;
      };
      interval95: {
        lower: number;
        upper: number;
        level: number;
      };
      interval99: {
        lower: number;
        upper: number;
        level: number;
      };
    };
  }
  
  export interface FTSOProviderInfo {
    id: string;
    name: string;
    reliabilityScore: number;
    accuracy: number;
    votePower: number;
    supportedSymbols: string[];
  }
  
  
  export interface FDCConnectionConfig {
    endpoint: string;
    apiKey: string;
    fdcSpecificConfig?: FDCSpecificConfig;
    logLevel?: string;
  }
  
  export interface ExternalData {
    blockchain: string;
    dataPath: string;
    data: any;
    timestamp: number;
    attestation: {
      signatures: number;
      threshold: number;
      valid: boolean;
    };
    requestId: string;
  }
  
  export interface VerificationResult {
    requestId: string;
    verified: boolean;
    confidence: number;
    timestamp: number;
    error?: string;
    details: {
      signaturesVerified: number;
      requiredThreshold: number;
      signatureVerificationMethod: string;
      sourceBlockchain: string;
      dataFinality: number;
      crossChainProtocol: string;
    };
  }
  
  export interface VerifiedData {
    blockchain: string;
    dataPath: string;
    data: any;
    timestamp: number;
    requestId: string;
    verificationResult: VerificationResult;
  }
  
  export interface SupportedBlockchain {
    name: string;
    chainId: string;
    supportedOperations: string[];
    averageFinality: number; 
  }
  

  
  export interface StateConnectorConfig {
    endpoint: string;
    apiKey: string;
    stateConnectorConfig?: StateConnectorSpecificConfig;
    logLevel?: string;
  }
  
  export interface StateProof {
    blockchain: string;
    address: string;
    requestId: string;
    state: any;
    proof: {
      blockHeight: number;
      blockHash: string;
      timestamp: number;
      proofType: string;
      signatures: string[];
    };
    timestamp: number;
    metadata: {
      requestTimestamp: number;
      attestationCount: number;
      requiredAttestations: number;
      finalized: boolean;
    };
  }
  
  export interface StateQueryRequest {
    blockchain: string;
    address: string;
    queryType: 'ACCOUNT_STATE' | 'TRANSACTION_VERIFICATION' | 'CONTRACT_CALL';
    queryData: any;
    responseFormat?: string;
    callbackUrl?: string;
  }
  
  export interface AttestationResponse {
    requestId: string;
    blockchain: string;
    address: string;
    queryData: any;
    responseData: any;
    attestation: {
      signatures: Array<{
        signer: string;
        signature: string;
      }>;
      timestamp: number;
      validUntil: number;
    };
    metadata: {
      responseTime: number;
      source: string;
      attestationSchema: string;
    };
  }