## Node JS education

Node JS application for generation CSV files and saving data from CSV to MySQL and MongoDB databases.

##### Run:
`npm start`

##### API

- method POST: `/generateData` - generate CSV file with the specified number of rows;
	`Data - { "rows": 10 }`

- method POST: `/fileImport` - save data from CSV to MySQL and MongoDB databases;
	`Data - file`