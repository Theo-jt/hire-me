Dear Famly,

Thank you for the assignment.

Setup:
- npx create-react-app my-app --template typescript
- added MUI and axios

General considerations:
- The app is a simple checkin / checkout page with a sidepanel to give it more of a dashboard appearance
- Famly color used in backgrounds
- MUI with basic features was used to give it more visual character and enhanced basic functionality with feedback in form of alarms, modals with more detailed view of children (mock data being limited diminishes the value of this)

Limitations: 
- The code should be more structure with more reusable components and functions; particularly ChildCheckin.tsx would benefit from this. However given the time limit of the assignment, the structure is as it is.
- Infinite scroller was chosen initially but changed to a pagination albeit it has limited funtionality as amount of pages is not known and is expected infinite in this example. The choice could depend on size of the kindergarten, for a limited amount, use infinite, for larger pagination solution with a search functionality.
- Redundant infinite-scroller references is package.json, depricated MUI grid reference.

Proposition: 
- Unix timestamp for checkin / checkout
