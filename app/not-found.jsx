import {readData} from '../lib/store.mjs';
import {Shell} from '../components/Site';
import {visibleDestinations} from '../lib/knowledge.mjs';
export const metadata={title:{absolute:'Page not found | Shogran Valley'}};
export default function NotFound(){const data=readData();return <Shell data={data}><main id="main-content" className="section container narrow not-found"><div className="eyebrow">ERROR 404</div><h1>This trail doesn’t lead anywhere</h1><p>The page may have moved. Try one of these instead:</p><p><a className="button" href="/">Back to home</a><a className="button secondary" href="/hotels/">Hotels</a><a className="button secondary" href="/tours/">Tours</a><a className="button secondary" href="/blog/">Travel guides</a></p><h2>Popular places</h2><ul className="check-list">{visibleDestinations.map(d=><li key={d.slug}><a href={'/destination/'+d.slug+'/'}>{d.name}</a></li>)}</ul></main></Shell>}
