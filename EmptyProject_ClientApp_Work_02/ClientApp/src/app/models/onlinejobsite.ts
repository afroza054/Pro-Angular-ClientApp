import { MatTableDataSource } from '@angular/material/table';
import { JobAdvertisement } from './jobadvertisement';
import { Url } from 'url';



export class Onlinejobsite {
  constructor(
    public OnlineJobSiteId?: number,
    public OnlineJobSiteName?: string,
    public StartedJourney?: Date | string,
    public Web?: string | Url,
    public Response?: boolean,
   
    public JobAdvertisements?: JobAdvertisement[] | MatTableDataSource<JobAdvertisement>
  ) { }
}
export interface TradeDataSource {
  OnlineJobSiteId?: number,
  OnlineJobSiteName?: string,
  StartedJourney?: Date | string,
  Web?: string,
  Response?: boolean,
  JobAdvertisements?: MatTableDataSource<JobAdvertisement>;
}
