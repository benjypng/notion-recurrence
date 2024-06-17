import { Client } from '@notionhq/client'
import dayjs from 'dayjs'
import { ArgsProps } from 'src/types'

export const createAction = async (
  args: ArgsProps,
  notion: Client,
  title: string,
  date: Date,
  cuid: string,
) => {
  try {
    const response = await notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: args.actions_db_id,
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
                content: cuid,
              },
            },
          ],
        },
      },
    })
    console.log('Created actions')
    return response
  } catch (error) {
    console.log(error)
    throw new Error('Error creating action')
  }
}
