import { Frequency, RRule } from 'rrule'
import {
  DatePropertyItemObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import dayjs from 'dayjs'
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config({ path: './.env.development' })

const notion = new Client({
  auth: process.env.NOTION_API,
})

const fxMap = {
  Daily: Frequency.DAILY,
  Weekly: Frequency.WEEKLY,
  Monthly: Frequency.MONTHLY,
}

type NotionProps = {
  properties: {
    Name: {
      title: TextRichTextItemResponse[]
    }
    Frequency: {
      select: {
        name: 'Daily' | 'Weekly' | 'Monthly'
      }
    }
    Range: DatePropertyItemObjectResponse
  }
}

//;(async () => {
//  await db.initialize()
//  console.log('DB initialised')
//})()

const main = async (): Promise<void> => {
  try {
    const { results } = await notion.databases.query({
      database_id: process.env.DATABASE_ID as string,
      filter: {
        property: 'Recurring',
        checkbox: {
          equals: true,
        },
      },
    })

    const {
      properties: {
        Name: { title },
        Frequency: { select },
        Range: { date },
      },
    } = results[0] as unknown as NotionProps

    if (!select || !date) return

    const rule = new RRule({
      freq: fxMap[select.name],
      dtstart: dayjs(date.start).toDate(),
      until: dayjs(date.end).toDate(),
    })

    const allDates: Date[] = rule.all()

    const response = await notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: process.env.DATABASE_ID as string,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: title[0].plain_text,
              },
            },
          ],
        },
        Date: {
          type: 'date',
          date: {
            start: dayjs(allDates[0]).format('YYYY-MM-DD'),
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
    console.log(response)
  } catch (e) {
    console.error(e)
    throw new Error('Error calling Notion API')
  }

  // Pass the notion database id
  // Search through the database for any acion that does not have a "" property
  // Get properties from item
  // Pass properties to rrule to create array of dates
  // Create group id
  // Create items in Notion with group id
  // Store created actions in sqlite db
  // Create a cli to delete items by passing a delete flag
}

main()
