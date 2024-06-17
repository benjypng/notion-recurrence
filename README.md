# Overview

Notion currently does not support recurring tasks very well. `notion-recurrence` takes the approach of creating recurring tasks (or actions) in your `tasks database`, based on an `index database`. The `index database` will be created by you, and `notion-recurrence` will create the tasks based on this index database. For example, you will first indicate a start date (01-01-2024), end date (31-01-2024) and frequency (weekly). When you run the script, it will create your task with a date of 01-01-2024, and every week after that until 31-01-2024, i.e. 5 occurences.

# Instructions

## Setting up your Notion databases

### Index database

Ensure that the following properties, with the corresponding property type is created. The Notion database needs to be created in a page of its own with no other content. All fields and values are case-sensitive.

| Property | Property Type |
|=======|============|
|Name|Leave as default|
|Frequency|Select with the following fields: "Daily", Weekly", "Monthly"|
|Range|Date range with end date selected|
|Group|Text field to be left empty|

### Tasks database

Ensure that the following properties, with the corresponding property type is created. You may add other properties as the script does not need them.

| Property | Property Type |
|=======|============|
|Name|Leave as default|
|Date|Date with no end-date|
