import { Client } from '@notionhq/client'
import { createId } from '@paralleldrive/cuid2'
import dayjs from 'dayjs'
import dotenv from 'dotenv'
import { Frequency, RRule } from 'rrule'

import { AppDataSource as db } from './data-source'
import { Action } from './entity/EntityAction'
import { createAction } from './libs/create-action'
import { updateGroupId } from './libs/update-group'
import { NotionProps } from './types'

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
  await db.initialize()

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

    if (results.length === 0) throw new Error('All indexes have been created')

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

      const cuid = createId()
      for (const date of allDates) {
        // Write to Actions
        const response = await createAction(
          notion,
          title[0].plain_text,
          date,
          cuid,
        )

        // Update Index with Group ID
        updateGroupId(notion, result.id, cuid)

        const action = db.manager.create(Action, {
          notion_id: response.id,
          created_date: new Date(),
          group_id: cuid,
        })
        await db.manager.save(action)
        console.log(await db.manager.find(Action))
      }
    }
  } catch (e) {
    console.error(e)
  }
}

main()
