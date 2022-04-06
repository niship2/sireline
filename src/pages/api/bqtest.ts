//import type { IncomingMessage, ServerResponse } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import { BigQuery} from '@google-cloud/bigquery'

export interface Rankdata {
    H_APPLICANT: string,
    REG_YEAR: string,
    appcount: number,
    total_val: number,
    total_val_lastyear: number,
    total_val_ratio: number
  }
  
//export default async(req: IncomingMessage, res: ServerResponse) => {
export default async(req: NextApiRequest, res: NextApiResponse ) => {
    const bigquery = new BigQuery({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      credentials:{
        client_email: process.env.FSA_CLIENT_EMAIL,
        private_key: process.env.FSA_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }
    });
  
    //console.log(req.body)
    console.log(req.query)
    const year = req.query.year;
    const count = Number(req.query.count);
    const query = "select * \
    from techsize.TS_view.ranking2 \
    WHERE REG_YEAR = @year \
    AND appcount >= @count \
    ORDER BY appcount DESC \
    LIMIT 100";

    //with options
    const options = {
      query: query,
      useLegacySql: false,
      params: {year: year, count: count}
   }

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
    const result: Rankdata[] = rows
    return res.status(200).json({"rankdata":result })

  }