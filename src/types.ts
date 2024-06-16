import {
  DatePropertyItemObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type NotionProps = {
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
