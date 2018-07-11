# Get Long Links

NPM Packages: express, papaparser, request, write-file

This app can take an uploaded csv file and convert all short links in the "Link Column."

Process:
1. User uploads csv file. Strict naming conventions for column names.
2. Links are reviewed for errors, and app parses data if there is a space or comma
3. NPM Request returns a long link
4. CSV file is written called "newLinks.csv"
5. When file is ready, "Download" button appears. Otherwise "Error Occured Appears"
