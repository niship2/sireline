//import type { IncomingMessage, ServerResponse } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import { BigQuery} from '@google-cloud/bigquery'

export interface Compdata {
    maingroup: string,
    A_appcount: number
    B_appcount: number
    A_sum_TS_deviation_normalized: number,
    B_sum_TS_deviation_normalized: number,
    A_sum_ATTENTION:number,
    B_sum_ATTENTION:number,
    A_total_val: number,
    B_total_val: number
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
    const applicant1 = req.query.applicant1;
    const applicant2 = req.query.applicant2;

    const query = "WITH Atable AS (\
        SELECT maingroup,-1 * COUNT(*) as A_appcount,-1 * SUM(TS_deviation_normalized) as A_sum_TS_deviation_normalized,-1 * SUM(ATTENTION) as A_sum_ATTENTION,-1 * SUM(TS_deviation_normalized+ATTENTION) as A_sum_total_val \
        FROM `techsize.TS_view.basetable4` \
        WHERE REGEXP_CONTAINS(H_APPLICANT,@applicant1) \
        GROUP BY  H_APPLICANT,maingroup \
        ), \
        Btable AS ( \
        SELECT maingroup,COUNT(*) as B_appcount,SUM(TS_deviation_normalized) as B_sum_TS_deviation_normalized,SUM(ATTENTION) as B_sum_ATTENTION,SUM(TS_deviation_normalized+ATTENTION) as B_sum_total_val \
        FROM `techsize.TS_view.basetable4` \
        WHERE REGEXP_CONTAINS(H_APPLICANT,@applicant2) \
        GROUP BY  H_APPLICANT,maingroup \
        ) \
        SELECT * FROM Atable \
        LEFT JOIN Btable \
        ON Atable.maingroup = Btable.maingroup \
        ORDER BY A_appcount ASC \
        LIMIT 20";
        

    //with options
    const options = {
      query: query,
      useLegacySql: false,
      params: {applicant1: applicant1,applicant2: applicant2}

   }

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
    const result: Compdata[] = rows
    return res.status(200).json({"compdata":result })

  }   