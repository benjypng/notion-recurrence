import { AppDataSource as db } from 'src/data-source'
import { Frequency, RRule } from 'rrule'
import dayjs from 'dayjs'
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
import { createAction } from './libs/create-action'
import { NotionProps } from './types'
import { updateGroupId } from './libs/update-group'

dotenv.config({ path: './.env.development' })

const notion = new Client({
  auth: process.env.NOTION_API,
})

const fxMap = {
  Daily: Frequency.DAILY,
  Weekly: Frequency.WEEKLY,
  Monthly: Frequency.MONTHLY,
}

const main = async (): Promise<void> => {
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

    for (const result of results) {
      const {
        properties: {
          Name: { title },
          Frequency: { select },
          Range: { date },
        },
      } = result as unknown as NotionProps

      if (!select || !date) return

      const rule = new RRule({
        freq: fxMap[select.name],
        dtstart: dayjs(date.start).toDate(),
        until: dayjs(date.end).toDate(),
      })

      const allDates: Date[] = rule.all()

      for (const date of allDates) {
        // Write to Actions
        const response = await createAction(notion, title[0].plain_text, date)

        // Update Index with Group ID
        updateGroupId(notion, result.id)

        //TODO: Write to DB here
      }
    }
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
