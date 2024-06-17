import { Client } from '@notionhq/client'

export const queryActions = async (notion: Client) => {
  try {
    const { results } = await notion.databases.query({
      database_id: process.env.INDEX_DATABASE_ID as string,
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
