import { Client } from '@notionhq/client'
import dayjs from 'dayjs'

export const createAction = async (
  notion: Client,
  title: string,
  date: Date,
) => {
  try {
    return await notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: process.env.ACTIONS_DATABASE_ID as string,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
        Date: {
          type: 'date',
          date: {
            start: dayjs(date).format('YYYY-MM-DD'),
          },
        },
        Group: {
          type: 'rich_text',
          rich_text: [
            {
              text: {
                content: 'Random ID',
              },
            },
          ],
        },
      },
    })
  } catch (error) {
    console.log(error)
    throw new Error('Error creating action')
  }
}
