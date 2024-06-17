import {
  DatePropertyItemObjectResponse,
  PartialPageObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

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
