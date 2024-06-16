import { Client } from '@notionhq/client'
import { createId } from '@paralleldrive/cuid2'

export const updateGroupId = async (notion: Client, pageId: string) => {
  try {
    return await notion.pages.update({
      page_id: pageId,
      properties: {
        Group: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: createId(),
              },
            },
          ],
        },
      },
    })
  } catch (error) {
    console.log(error)
    throw new Error('Unable to update Group ID in Index')
  }
}
