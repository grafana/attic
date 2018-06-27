export default class FakeSchemaData {
  static getLogAnalyticsFakeSchema() {
    return {
      Tables: [
        {
          TableName: 'Table_0',
          Columns: [
            {
              ColumnName: 'TableName',
              DataType: 'String',
            },
            {
              ColumnName: 'ColumnName',
              DataType: 'String',
            },
            {
              ColumnName: 'ColumnType',
              DataType: 'String',
            },
          ],
          Rows: [
            ['AzureNetworkAnalytics_CL', 'SourceSystem', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'ManagementGroupName', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'TimeGenerated', 'System.DateTime'],
            ['AzureNetworkAnalytics_CL', 'Computer', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'FASchemaVersion_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'FlowType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'SrcIP_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'DestIP_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VMIP_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'L4Protocol_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'L7Protocol_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'FlowDirection_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'NSGList_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'NSGRules_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'HopNSGList_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'HopNSGRules_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Region1_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Region2_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'NIC_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'NIC1_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'NIC2_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VM_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VM1_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VM2_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Subnet_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'ConnectionName_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'S2SConnection_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'S2SConnectionType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Country_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'AzureRegion_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Subscription1_g', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Subscription2_g', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'FlowStartTime_t', 'System.DateTime'],
            ['AzureNetworkAnalytics_CL', 'FlowEndTime_t', 'System.DateTime'],
            ['AzureNetworkAnalytics_CL', 'DestPort_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'AllowedInFlows_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'DeniedInFlows_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'AllowedOutFlows_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'DeniedOutFlows_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'DeniedInFlowsAtHops_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'DeniedOutFlowsAtHops_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'FlowCount_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'NextHopIP_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'IsVirtualAppliance_b', 'System.Boolean'],
            ['AzureNetworkAnalytics_CL', 'AddressPrefix_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'NextHopType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'RouteTable_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Subnet1_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Subnet2_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'SubnetRegion1_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'SubnetRegion2_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VirtualAppliances_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'AllowForwardedTraffic_b', 'System.Boolean'],
            ['AzureNetworkAnalytics_CL', 'AllowGatewayTransit_b', 'System.Boolean'],
            ['AzureNetworkAnalytics_CL', 'AllowVirtualNetworkAccess_b', 'System.Boolean'],
            ['AzureNetworkAnalytics_CL', 'UseRemoteGateways_b', 'System.Boolean'],
            ['AzureNetworkAnalytics_CL', 'NSG_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'PrivateIPAddresses_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'PublicIPAddresses_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Subnetwork_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VirtualMachine_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'MACAddress_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'AddressPrefixes_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'ConnectingVirtualNetwork_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'RemoteVirtualNetworkGateway_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'IsFlowEnabled_b', 'System.Boolean'],
            ['AzureNetworkAnalytics_CL', 'GatewayType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'SKU_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VIPAddress_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VirtualSubnetwork_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'BGPEnabled_b', 'System.Boolean'],
            ['AzureNetworkAnalytics_CL', 'ConnectionStatus_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'ConnectionType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'GatewayConnectionType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'LocalNetworkGateway_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VirtualNetwork1_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VirtualNetwork2_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VirtualNetworkGateway1_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VirtualNetworkGateway2_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VirtualNetworkRegion1_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'VirtualNetworkRegion2_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'EgressBytesTransferred_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'IngressBytesTransferred_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'RoutingWeight_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'FrontendSubnet_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'LoadBalancerType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Access_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Description_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'DestinationAddressPrefix_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'DestinationPortRange_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Direction_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Protocol_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'RuleType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'SourceAddressPrefix_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'SourcePortRange_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Priority_d', 'System.Double'],
            ['AzureNetworkAnalytics_CL', 'IPAddress', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'SubnetPrefixes_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'SchemaVersion_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Name_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Region_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'AppGatewayType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'BackendSubnets_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'FrontendIPs_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'GatewaySubnet_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'ComponentType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'DiscoveryRegion_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'ResourceType', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Status_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'SubType_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'TopologyVersion_s', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'Subscription_g', 'System.String'],
            ['AzureNetworkAnalytics_CL', 'TimeProcessed_t', 'System.DateTime'],
            ['AzureNetworkAnalytics_CL', 'Type', 'System.String'],
          ],
          KqlPrimaryTimestampColumnName: 'TimeGenerated',
        },
        {
          TableName: 'Table_1',
          Columns: [
            {
              ColumnName: 'TableType',
              DataType: 'String',
            },
            {
              ColumnName: 'TableName',
              DataType: 'String',
            },
            {
              ColumnName: 'PrimaryTimestampColumnName',
              DataType: 'String',
            },
            {
              ColumnName: 'Solutions',
              DataType: 'String',
            },
          ],
          Rows: [['oms', 'AzureNetworkAnalytics_CL', 'TimeGenerated', 'LogManagement']],
        },
      ],
    };
  }

  static getlogAnalyticsFakeMetadata() {
    return {
      solutions: {
        LogManagement: {
          displayName: 'LogManagement',
          types: ['Event'],
        },
        Security: {
          displayName: 'LogManagement2',
          types: ['Perf'],
        },
      },
      types: {
        Event: {
          displayName: 'Event',
          analytics: {
            tableName: 'Event',
          },
          properties: [
            'SourceSystem',
            'TimeGenerated',
            'Source',
            'EventLog',
            'Computer',
            'EventLevel',
            'EventLevelName',
            'ParameterXml',
            'EventData',
            'EventID',
            'RenderedDescription',
            'AzureDeploymentID',
            'Role',
            'EventCategory',
            'UserName',
            'Message',
            'ManagementGroupName',
            'Type',
          ],
        },
        Perf: {
          displayName: 'Perf',
          analytics: {
            tableName: 'Perf',
          },
          properties: [
            'Computer',
            'ObjectName',
            'CounterName',
            'InstanceName',
            'CounterValue',
            'TimeGenerated',
            'SourceSystem',
            'CounterPath',
            'Min',
            'Max',
            'SampleCount',
            'BucketStartTime',
            'BucketEndTime',
            'StandardDeviation',
            'Type',
          ],
        },
      },
      queries: {
        'f7896734-07e2-4817-bea4-4b20e8438cf9': {
          displayName: 'Func1',
          category: 'test',
          analytics: {
            functionName: 'Func1',
            functionBody: 'AzureActivity\n| where ActivityStatus == "" \n',
          },
        },
      },
      properties: {
        SourceSystem: {
          analytics: {
            columnType: 'string',
            columnName: 'SourceSystem',
          },
          displayName: 'SourceSystem',
        },
        TimeGenerated: {
          analytics: {
            columnType: 'datetime',
            columnName: 'TimeGenerated',
          },
          displayName: 'TimeGenerated',
        },
        Source: {
          analytics: {
            columnType: 'string',
            columnName: 'Source',
          },
          displayName: 'Source',
        },
        EventLog: {
          analytics: {
            columnType: 'string',
            columnName: 'EventLog',
          },
          displayName: 'EventLog',
        },
        Computer: {
          analytics: {
            columnType: 'string',
            columnName: 'Computer',
          },
          displayName: 'Computer',
        },
        EventLevel: {
          analytics: {
            columnType: 'int',
            columnName: 'EventLevel',
          },
          displayName: 'EventLevel',
        },
        EventLevelName: {
          analytics: {
            columnType: 'string',
            columnName: 'EventLevelName',
          },
          displayName: 'EventLevelName',
        },
        ParameterXml: {
          analytics: {
            columnType: 'string',
            columnName: 'ParameterXml',
          },
          displayName: 'ParameterXml',
        },
        EventData: {
          analytics: {
            columnType: 'string',
            columnName: 'EventData',
          },
          displayName: 'EventData',
        },
        EventID: {
          analytics: {
            columnType: 'int',
            columnName: 'EventID',
          },
          displayName: 'EventID',
        },
        RenderedDescription: {
          analytics: {
            columnType: 'string',
            columnName: 'RenderedDescription',
          },
          displayName: 'RenderedDescription',
        },
        AzureDeploymentID: {
          analytics: {
            columnType: 'string',
            columnName: 'AzureDeploymentID',
          },
          displayName: 'AzureDeploymentID',
        },
        Role: {
          analytics: {
            columnType: 'string',
            columnName: 'Role',
          },
          displayName: 'Role',
        },
        EventCategory: {
          analytics: {
            columnType: 'int',
            columnName: 'EventCategory',
          },
          displayName: 'EventCategory',
        },
        UserName: {
          analytics: {
            columnType: 'string',
            columnName: 'UserName',
          },
          displayName: 'UserName',
        },
        Message: {
          analytics: {
            columnType: 'string',
            columnName: 'Message',
          },
          displayName: 'Message',
        },
        ManagementGroupName: {
          analytics: {
            columnType: 'string',
            columnName: 'ManagementGroupName',
          },
          displayName: 'ManagementGroupName',
        },
        Type: {
          analytics: {
            columnType: 'string',
            columnName: 'Type',
          },
          displayName: 'Type',
        },
        ObjectName: {
          analytics: {
            columnType: 'string',
            columnName: 'ObjectName',
          },
          displayName: 'ObjectName',
        },
        CounterName: {
          analytics: {
            columnType: 'string',
            columnName: 'CounterName',
          },
          displayName: 'CounterName',
        },
        InstanceName: {
          analytics: {
            columnType: 'string',
            columnName: 'InstanceName',
          },
          displayName: 'InstanceName',
        },
        CounterValue: {
          analytics: {
            columnType: 'real',
            columnName: 'CounterValue',
          },
          displayName: 'CounterValue',
        },
        CounterPath: {
          analytics: {
            columnType: 'string',
            columnName: 'CounterPath',
          },
          displayName: 'CounterPath',
        },
        Min: {
          analytics: {
            columnType: 'real',
            columnName: 'Min',
          },
          displayName: 'Min',
        },
        Max: {
          analytics: {
            columnType: 'real',
            columnName: 'Max',
          },
          displayName: 'Max',
        },
        SampleCount: {
          analytics: {
            columnType: 'int',
            columnName: 'SampleCount',
          },
          displayName: 'SampleCount',
        },
        BucketStartTime: {
          analytics: {
            columnType: 'datetime',
            columnName: 'BucketStartTime',
          },
          displayName: 'BucketStartTime',
        },
        BucketEndTime: {
          analytics: {
            columnType: 'datetime',
            columnName: 'BucketEndTime',
          },
          displayName: 'BucketEndTime',
        },
        StandardDeviation: {
          analytics: {
            columnType: 'real',
            columnName: 'StandardDeviation',
          },
          displayName: 'StandardDeviation',
        },
      },
    };
  }
}
