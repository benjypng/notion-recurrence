import {
  DatePropertyItemObjectResponse,
  PartialPageObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { ParsedArgs } from 'minimist'

export interface NotionProps extends PartialPageObjectResponse {
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

export interface ArgsProps extends ParsedArgs {
  api: string
  index_db_id: string
  actions_db_id: string
}
