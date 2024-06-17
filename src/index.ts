#!/usr/bin/env ts-node

import { Client } from '@notionhq/client'
import { createId } from '@paralleldrive/cuid2'
import dayjs from 'dayjs'
import minimist from 'minimist'
import { Frequency, RRule } from 'rrule'

import { AppDataSource as db } from './data-source'
import { Action } from './entity/EntityAction'
import { createAction } from './libs/create-action'
import { queryActions } from './libs/query-actions'
import { updateGroupId } from './libs/update-group'
import { ArgsProps, NotionProps } from './types'

const args = minimist(process.argv.slice(2)) as ArgsProps

const notion = new Client({
  auth: args.api,
})

const fxMap = {
  Daily: Frequency.DAILY,
  Weekly: Frequency.WEEKLY,
  Monthly: Frequency.MONTHLY,
}

const main = async (): Promise<void> => {
  await db.initialize()

  const results = await queryActions(args, notion)
  if (results.length === 0) return

  for (const result of results) {
    const {
      properties: {
        Name: { title },
        Frequency: { select },
        Range: { date },
      },
    } = result as NotionProps

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
        args,
        notion,
        title[0].plain_text,
        date,
        cuid,
      )

      // Update Index with Group ID
      await updateGroupId(notion, result.id, cuid)

      // TODO: Use URL instead of ID when saving to DB
      const action = db.manager.create(Action, {
        notion_id: response.id,
        created_date: new Date(),
        group_id: cuid,
      })
      await db.manager.save(action)
      console.log(await db.manager.find(Action))
    }
  }
}

main()
