import { Client } from '@notionhq/client'
import { ArgsProps } from 'src/types'

export const queryActions = async (args: ArgsProps, notion: Client) => {
  try {
    const { results } = await notion.databases.query({
      database_id: args.index_db_id,
      filter: {
        property: 'Group',
        rich_text: {
          is_empty: true,
        },
      },
    })
    return results
  } catch (error) {
    throw new Error('Unable to get results')
  }
}
