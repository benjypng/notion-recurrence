# Overview

Notion currently does not support recurring tasks very well. `notion-recurrence` takes the approach of creating recurring tasks (or actions) in your `tasks database`, based on an `index database`. The `index database` will be created by you, and `notion-recurrence` will create the tasks based on this index database. For example, you will first indicate a start date (01-01-2024), end date (31-01-2024) and frequency (weekly). When you run the script, it will create your task with a date of 01-01-2024, and every week after that until 31-01-2024, i.e. 5 occurences.

# Instructions

## 1. Setting up your Notion databases

### Index database

Ensure that the following properties, with the corresponding property type is created. The Notion database needs to be created in a page of its own with no other content. All fields and values are case-sensitive.

| Property | Property Type |
|----------|---------------|
|Name|Leave as default|
|Frequency|Select with the following fields: "Daily", Weekly", "Monthly"|
|Range|Date range with end date selected|
|Group|Text field to be left empty|

### Tasks database

Ensure that the following properties, with the corresponding property type is created. You may add other properties as the script does not need them.

| Property | Property Type |
|----------|---------------|
|Name|Leave as default|
|Date|Date with no end-date|

## 2. Create your index

Using the example "Pay bills", create a page in your`Index database` with the following properties:

- Name: Pay bills
- Frequency: Monthly
- Range: 01-01-2024 to 31-12-2024 (assuming task will start on the 1st of the month)

## 3. Setup integration

Log into [Notion - My Integrations](https://www.notion.so/my-integrations) and create your integration. You can name it `Notion Recurrence`. Take note of the `API Secret` as you will need it in the next step.

Go to your `Index database` and `Tasks database` and connect your integration by clicking on the three dots at the top right hand of your database and under `Connections`, choose `Connect To` and the integration that you connected. *You must do this step for both the Index and Tasks databases*.

## 4. Run the script

Prepare the following IDs:
- Index database ID
- Tasks database ID

Run the following script:
```
npx notion-recurrence --api=<NOTION API SECRET> --index_db_id=<INDEX DB ID> --actions_db_id=<TASKS DB ID>
```
