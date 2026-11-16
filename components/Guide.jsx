import {FAQ} from './Faq';
/* Long-form guide shown at the end of a page's <main>; see lib/guides.mjs. */
export function GuideSection({guide,className=''}){
 if(!guide)return null;
 return <section className={'page-guide '+className} id="guide" aria-label="Travel guide">
  <div className="page-guide-body prose prose-html" dangerouslySetInnerHTML={{__html:guide.html}}/>
  {guide.faqs.length>0&&<FAQ items={guide.faqs} id="guide-faq" title="Frequently asked questions" links={false}/>}
 </section>;
}
