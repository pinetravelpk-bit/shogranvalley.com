# Loading the full data on the server

The public repository's `data/seed.json` has **no booking enquiries**. They were removed because the repo is public and they contain customers' names, phone numbers and emails.

A private full copy (with all 406 imported enquiries) is kept outside the repo, on the owner's computer:

`D:\Inventive Clicks\shogranvalley.com-work\private\seed-full-with-bookings.json`

## First launch on the production server
1. Upload that file to the server over SFTP/SSH (never commit it).
2. Before the first `npm start`, replace `data/seed.json` with it:
   `cp seed-full-with-bookings.json data/seed.json`
3. Run `npm run setup-admin`, `npm run build`, `npm start`.
4. The SQLite database in `DATA_DIR` is created from that file on first start, so the enquiries appear in Admin → Booking enquiries.
5. Delete the uploaded copy and run `git checkout data/seed.json` afterwards. The database now holds the data.

If the database already exists, the seed file is not read again.
