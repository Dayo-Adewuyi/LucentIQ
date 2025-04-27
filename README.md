# LucentIQ


A decentralized predictive intelligence platform powered by the Flare Network. LucentIQ leverages Flare Time Series Oracle v2 (FTSO v2) and Flare Data Connector (FDC) to create a next-generation risk intelligence system that enables accurate, cross-chain, and cross-domain predictions with unparalleled reliability.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage Examples](#usage-examples)
  - [Creating Predictions](#creating-predictions)
  - [Programmable Risk Protocols](#programmable-risk-protocols)
  - [Data Analysis & Insights](#data-analysis--insights)
- [API Reference](#api-reference)
- [Supported Data Sources](#supported-data-sources)
- [Prediction Models](#prediction-models)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

## Overview

LucentIQ is an infrastructure service that transforms how businesses, governments, and individuals navigate uncertainty. By combining Flare's FTSO v2 consensus mechanisms with the cross-chain data validation of FDC, we've created a prediction ecosystem that's not just more accurate—it's fundamentally different.

The platform enables:

- **Cross-Reality Data Fusion**: Synthesizing information across blockchains, traditional markets, and real-world events
- **Temporal Resolution Engine**: Predictions with time-based confidence intervals that dynamically evolve
- **Incentivized Truth Discovery**: An economic system that rewards accurate predictions and penalizes noise
- **Programmable Risk Protocols**: Automated decision systems that execute based on predicted outcomes

## Key Features

- **Multi-Source Data Integration**: Combine data from blockchains, financial markets, social media, IoT sensors, and more
- **Confidence-Weighted Predictions**: Every prediction includes detailed confidence intervals and supporting factors
- **Automated Risk Management**: Create programmable protocols that trigger actions based on prediction conditions
- **Reputation-Based Incentives**: Contributors are rewarded for accurate predictions through a decentralized reputation system
- **Cross-Chain Verification**: Leverages Flare's unique ability to access and verify data across multiple blockchains
- **Temporal Intelligence**: Predictions evolve over time with dynamically updating confidence intervals
- **Industry-Specific Solutions**: Specialized modules for finance, supply chain, insurance, and more

## Architecture

LucentIQ is built on a multi-layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│   (Industry Solutions, Risk Protocols, Visualization)       │
├─────────────────────────────────────────────────────────────┤
│                    API Layer                                │
│        (REST API, GraphQL, Webhooks, SDKs)                  │
├─────────────────────────────────────────────────────────────┤
│                Core Intelligence Layer                      │
│  (Temporal Engine, Confidence Engine, Truth Discovery)      │
├─────────────────────────────────────────────────────────────┤
│                   Data Fusion Layer                         │
│    (Multi-Source Data Collection, Cross-Reality Fusion)     │
├─────────────────────────────────────────────────────────────┤
│                   Flare Network Layer                       │
│            (FTSO v2, FDC, State Connector)                  │
└─────────────────────────────────────────────────────────────┘
```

For a more detailed architecture overview, see the [architecture documentation](docs/architecture/overview.md).

## Getting Started

### Prerequisites

- Node.js v16 or higher
- TypeScript 4.5+
- Access to Flare Network (mainnet or testnet)
- API credentials for data sources you wish to integrate

### Installation

#### Using npm

```bash
npm install LucentIQ
```

#### From source

```bash
git clone https://github.com/flare-network/LucentIQ.git
cd LucentIQ
npm install
npm run build
```

### Configuration

Create a `.env` file in your project root with the following parameters:

```
# Flare Network Configuration
FLARE_NETWORK_ENDPOINT=https://your-flare-endpoint.com
FLARE_API_KEY=your-flare-api-key

# Data Source APIs (examples)
FINANCIAL_DATA_API_KEY=your-financial-api-key
BLOCKCHAIN_DATA_API_KEY=your-blockchain-api-key
SOCIAL_SENTIMENT_API_KEY=your-social-api-key

# Other Settings
LOG_LEVEL=info
```

Create a configuration file for your LucentIQ instance:

```typescript
import { LucentIQConfig, DataSourceType } from 'LucentIQ';

export const config: LucentIQConfig = {
  flareNetworkEndpoint: process.env.FLARE_NETWORK_ENDPOINT,
  apiKey: process.env.FLARE_API_KEY,
  dataSourceConfigurations: [
    {
      id: 'financial-markets',
      type: DataSourceType.FINANCIAL_MARKET,
      endpoint: 'https://financial-api.example.com',
      apiKey: process.env.FINANCIAL_DATA_API_KEY,
      refreshInterval: 60000,
    },
    // Add more data sources as needed
  ],
  governanceSettings: {
    incentiveParameters: {
      baseRewardAmount: 100,
      earlyPredictionBonus: 0.5,
      difficultyMultiplier: 2.0,
      baseSlashingAmount: 50,
      maxPredictionTimespan: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
  },
  logLevel: process.env.LOG_LEVEL || 'info'
};
```

## Usage Examples

### Creating Predictions

```typescript
import { LucentIQ, PredictionType } from 'LucentIQ';
import { config } from './config';

async function createBTCPricePrediction() {
  const LucentIQ = new LucentIQ(config);
  await LucentIQ.initialize();
  
  const timeframe = {
    startTime: Date.now(),
    endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    intervalType: 'DAY',
    intervalCount: 1
  };
  
  const btcPrediction = await LucentIQ.createPrediction(
    PredictionType.ASSET_PRICE,
    {
      asset: 'BTC',
      metric: 'PRICE_USD',
      includeFactors: ['market_sentiment', 'technical_indicators', 'on_chain_metrics']
    },
    timeframe
  );
  
  console.log(`BTC Price Prediction: $${btcPrediction.value.toLocaleString()}`);
  console.log(`Confidence: ${(btcPrediction.confidence.overall * 100).toFixed(2)}%`);
  console.log(`95% Confidence Interval: $${btcPrediction.confidenceIntervals.interval95.lower.toLocaleString()} to $${btcPrediction.confidenceIntervals.interval95.upper.toLocaleString()}`);
  
  return btcPrediction;
}
```

### Programmable Risk Protocols

```typescript
async function createRiskProtocol(predictionId) {
  const LucentIQ = new LucentIQ(config);
  await LucentIQ.initialize();
  
  const riskProtocol = await LucentIQ.createRiskProtocol(
    predictionId,
    {
      triggerConditions: [
        {
          type: 'PRICE_THRESHOLD',
          threshold: 35000,
          action: 'EXECUTE_BUY_ORDER'
        },
        {
          type: 'CONFIDENCE_CHANGE',
          threshold: 0.15,
          action: 'NOTIFY_USER'
        }
      ],
      actionDetails: {
        EXECUTE_BUY_ORDER: {
          amount: 1000,
          market: 'SPOT',
          asset: 'BTC'
        },
        NOTIFY_USER: {
          channels: ['EMAIL', 'PUSH'],
          message: 'Confidence in BTC prediction has decreased significantly'
        }
      }
    }
  );
  
  console.log(`Risk protocol created: ${riskProtocol.id}`);
  console.log(`Triggers: ${riskProtocol.triggers.length}`);
  
  return riskProtocol;
}
```

### Data Analysis & Insights

```typescript
async function analyzeMarketPrediction(predictionId) {
  const LucentIQ = new LucentIQ(config);
  await LucentIQ.initialize();
  
  const insights = await LucentIQ.getPredictionInsights(predictionId);
  
  console.log('Prediction Insights:');
  console.log('- Sensitivity Factors:');
  insights.sensitivityFactors.forEach(factor => {
    console.log(`  - ${factor.factor}: ${factor.sensitivity.toFixed(2)}`);
  });
  
  console.log('- Alternative Scenarios:');
  insights.alternativeScenarios.forEach(scenario => {
    console.log(`  - ${scenario.description}: ${(scenario.probability * 100).toFixed(2)}% probability`);
  });
  
  return insights;
}
```

For more examples, see the [examples directory](examples/).

## API Reference

LucentIQ offers multiple ways to interact with the platform:

### REST API

The REST API provides comprehensive access to all LucentIQ functionality. Key endpoints include:

- `/predictions` - Create and manage predictions
- `/protocols` - Manage programmable risk protocols
- `/insights` - Access detailed prediction insights
- `/data-sources` - Configure and monitor data sources

For complete API documentation, see the [API Reference](docs/api-reference/rest-api.md).

### GraphQL API

For more flexible querying capabilities, the GraphQL API allows clients to request exactly the data they need:

```graphql
query {
  prediction(id: "pred-123456") {
    id
    type
    value
    confidence {
      overall
    }
    confidenceIntervals {
      interval95 {
        lower
        upper
      }
    }
    supportingFactors {
      description
      weight
    }
  }
}
```

For GraphQL schema documentation, see the [GraphQL API Reference](docs/api-reference/graphql-api.md).

### Webhooks

Set up webhooks to receive real-time notifications about prediction events:

- Prediction confidence changes
- Risk protocol triggers
- New data source inputs
- Timeframe approach notifications

For webhook integration details, see the [Webhooks Documentation](docs/api-reference/webhooks.md).

## Supported Data Sources

LucentIQ can integrate with multiple types of data sources:

| Type | Description | Examples |
|------|-------------|----------|
| Blockchain | On-chain data from various blockchains | Transaction volumes, smart contract activity |
| Financial Markets | Traditional and crypto market data | Asset prices, trading volumes, futures data |
| Social Media | Sentiment and activity metrics | Twitter mentions, Reddit activity, news sentiment |
| IoT Sensors | Internet of Things device data | Supply chain sensors, weather stations |
| Geographic | Location-based data | GPS tracking, traffic patterns |
| Economic Indicators | Macroeconomic data | Interest rates, employment figures, GDP |

For details on configuring data sources, see the [Data Sources Documentation](docs/technical-specs/data-sources.md).

## Prediction Models

LucentIQ employs various prediction models depending on the type of prediction:

- **Time Series Models** - For asset price predictions and trend forecasting
- **Bayesian Models** - For event probability predictions
- **Machine Learning Models** - For complex pattern recognition
- **Ensemble Methods** - For combining multiple models to improve accuracy

For details on prediction models, see the [Prediction Models Documentation](docs/technical-specs/prediction-models.md).

## Contributing

We welcome contributions to LucentIQ! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## Roadmap

- **Q2 2025**: Initial Alpha release with core prediction functionality
- **Q3 2025**: Beta release with programmable risk protocols and industry-specific modules
- **Q4 2025**: Production release with full API support and SDKs
- **Q1 2026**: Enhanced machine learning models and expanded data sources
- **Q2 2026**: Mobile SDK and developer portal

For the complete roadmap, see [ROADMAP.md](ROADMAP.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Project Website**: [LucentIQ.io](https://LucentIQ.io)
- **Documentation**: [docs.LucentIQ.io](https://docs.LucentIQ.io)
- **Twitter**: [@LucentIQ](https://twitter.com/LucentIQ)
- **Discord**: [LucentIQ Community](https://discord.gg/LucentIQ)
- **Email**: [info@LucentIQ.io](mailto:info@LucentIQ.io)

For technical support, please open an issue on GitHub or contact [support@LucentIQ.io](mailto:support@LucentIQ.io).