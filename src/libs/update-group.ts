import { Client } from '@notionhq/client'

export const updateGroupId = async (
  notion: Client,
  pageId: string,
  cuid: string,
) => {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Group: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: cuid,
              },
            },
          ],
        },
      },
    })
    console.log('Completed updating Group ID')
  } catch (error) {
    console.log(error)
    throw new Error('Unable to update Group ID in Index')
  }
}
