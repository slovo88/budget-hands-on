# budget-hands-on
Project to move my current budget and net worth tracking into a 
modern looking app with charts. Also to practice some backend 
coding, since it has been a long time since I've touched it.

## Tech stack
- **Hosting:** Heroku
- **Backend:** Node with an express server
- **Database:** MySQL
- **Frontend:** React with Redux
- **Libraries:** CRA for app initialization, billboard.js for charting library

## Todo list

### MVP

- Frontend:
    - CRA created app with two routes:
        - Budget Breakdown:
            - Yearly and Monthly views
            - Tables and charts (bar and donut) available for monthly or annual expenses
            - Income vs expenses will also have its own table and chart (horizontal bar)
            - Transaction table
                - Able to add single transaction in expandable drawer
                - Transaction table item description will open a modal when clicked
                    - Shows more details, an optional note, and has options for edit or delete
        - Bulk add transactions:
            - Since all transactions are entered manually, this is intended to make adding many 
            transactions easier for the user (me) when making a mass update
            - A single service call will be made once all desired transactions have been added
- Backend/Database:
    - JawsDB with some initial seed data
        - Schema will be configured for potential future users, but initial data will be specifically for me
    - GET services for monthly/yearly breakdown data
        - Formatted for billboard
    - GET, POST, PUT, and DELETE services for transactions

### Tech debt

- Oh I'm sure there will be plenty

### Future versions may include:

- Net worth tracking
- Alerts/notifications
- Dashboard/landing page
- Customizable widgets on landing page
- Authentication
    - Set up in a way for someone other than myself to use

## Updates

TBD