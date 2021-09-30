// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      title: 'User',
      name: 'user',
      type: 'document',
      fields: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'stations',
          type: 'array',
          of: [{ type: 'station' }],
        },
        {
          name: 'journeys',
          type: 'array',
          of: [{ type: 'journey' }],
        },
      ],
    },
    {
      title: 'Station',
      name: 'station',
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'id', type: 'string' },
      ],
    },
    {
      title: 'Journey',
      name: 'journey',
      type: 'object',
      fields: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'toStation',
          type: 'string',
        },
        { name: 'icon', type: 'string' },
      ],
    },
  ]),
})
