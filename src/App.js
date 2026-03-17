import { useState, useRef } from "react";
import { LayoutDashboard, FolderOpen, Bell, BarChart2, Shield, FileText, ArrowRight, Upload, Clock, MessageSquare, TrendingUp, FileBarChart, LogOut, Plus, Settings2, SortAsc, SortDesc, X, Pin, AlertTriangle, CheckCircle2, Download, Trash2, Send, Sparkles, ChevronDown } from "lucide-react";

const T = {
  navy:"#0A1628", navyLight:"#0F2040", navyMid:"#162B55",
  blue:"#1D6EE8", blueLight:"#3B82F6", bluePale:"#EBF3FE",
  teal:"#0D9488", tealPale:"#F0FDFA",
  accent:"#E8A020", accentPale:"#FEF7E8",
  white:"#FFFFFF", offWhite:"#F7F9FC",
  gray50:"#F8FAFC", gray100:"#F1F5F9", gray200:"#E2E8F0",
  gray300:"#CBD5E1", gray400:"#94A3B8", gray500:"#64748B", gray700:"#334155", gray900:"#0F172A",
  success:"#059669", successPale:"#ECFDF5",
  warning:"#D97706", warningPale:"#FFFBEB",
  danger:"#DC2626", dangerPale:"#FEF2F2",
  purple:"#7C3AED", purplePale:"#F5F3FF",
};

const BRANDS=[
  {id:1,name:"NordLight",logo:"NL",industry:"Apparel",color:T.blue,desc:"Fashion & outdoor clothing"},
  {id:2,name:"PureOak",logo:"PO",industry:"Cosmetics",color:T.teal,desc:"Natural skincare & beauty"},
  {id:3,name:"VoltEdge",logo:"VE",industry:"Electronics",color:T.purple,desc:"Consumer electronics"},
];
const MODULES=["Marketplace","Social Media","Domain","Keyword Ad","Web Content"];
const MODULE_ICONS={"Marketplace":"🛒","Social Media":"📱","Domain":"🌐","Keyword Ad":"🔍","Web Content":"📄"};
const MODULE_COLORS={"Marketplace":T.blue,"Social Media":"#E11D48","Domain":T.purple,"Keyword Ad":T.teal,"Web Content":"#EA580C"};
const TAG_COLORS={"infringer":[T.dangerPale,T.danger],"product":[T.bluePale,T.blue],"content":[T.successPale,T.success]};
const ASSET_TYPES=["All","Trademark","Copyright","Patent","Logo","Product Images","Website","Other"];
const ASSET_ICONS={"Trademark":"™","Copyright":"©","Patent":"⚙","Logo":"◈","Product Images":"🖼","Website":"🌐","Other":"📎"};
const PERIODS=[{label:"7D",days:7},{label:"30D",days:30},{label:"90D",days:90},{label:"1Y",days:365},{label:"All",days:9999}];

const makeSS=(label,color,w=400,h=220)=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${color}"/><text x="${w/2}" y="${h/2}" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="system-ui" font-size="12">${label}</text></svg>`)}`;

const sColor=s=>({Active:T.blue,Resolved:T.success,"Legal Review":T.warning,Pending:T.gray400}[s]||T.gray400);
const sBg=s=>({Active:T.bluePale,Resolved:T.successPale,"Legal Review":T.warningPale,Pending:T.gray100}[s]||T.gray100);
const pColor=p=>({Critical:T.danger,High:T.warning,Medium:T.blue,Low:T.gray400}[p]||T.gray400);
const pBg=p=>({Critical:T.dangerPale,High:T.warningPale,Medium:T.bluePale,Low:T.gray100}[p]||T.gray100);
const nColor=t=>({success:T.success,warning:T.warning,danger:T.danger,info:T.blue}[t]||T.gray400);

const INIT_CASES=[
  {id:"BP-001",title:"Counterfeit Jackets — Amazon DE",brand:1,module:"Marketplace",status:"Active",priority:"High",isLead:true,relatedCases:[{id:"BP-001a",url:"amazon.de/dp/B0CFAKE001",tags:["infringer","product"]},{id:"BP-001b",url:"amazon.de/dp/B0CFAKE002",tags:["product"]}],bulkEnforcement:false,infringer:"FashionDrop GmbH",country:"Germany",platform:"Amazon",opened:"2024-01-15",updated:"2024-03-10",progress:65,description:"Multiple listings selling counterfeit NordLight jackets. Images stolen from official website.",screenshots:[makeSS("Amazon DE Listing",T.blue),makeSS("Seller Profile","#8e44ad")],previewShot:makeSS("Amazon DE",T.blue,200,110),mp:{price:"€29.99",stock:142,sold:834,offlineAction:false,images:[makeSS("Fake Jacket","#2c3e50",80,80),makeSS("Label","#7f8c8d",80,80)]},timeline:[{date:"2024-01-15",event:"Case opened",type:"open"},{date:"2024-02-05",event:"Takedown notice sent",type:"action"},{date:"2024-02-20",event:"2 listings removed",type:"success"},{date:"2024-03-10",event:"Follow-up sent",type:"action"}],comments:[{user:"Sarah K.",date:"2024-03-10",text:"Amazon responded — escalating to brand registry."}],documents:[],pinned:false},
  {id:"BP-002",title:"Logo Misuse — Instagram Influencer",brand:1,module:"Social Media",status:"Resolved",priority:"Medium",isLead:true,relatedCases:[{id:"BP-002a",url:"instagram.com/p/fake_post_001",tags:["content"]},{id:"BP-002b",url:"instagram.com/p/fake_post_002",tags:["content","infringer"]}],bulkEnforcement:false,infringer:"@style_fakes_eu",country:"France",platform:"Instagram",opened:"2024-02-01",updated:"2024-03-01",progress:100,description:"Influencer using NordLight logo without authorization.",screenshots:[makeSS("Instagram Post","#c0392b"),makeSS("Story","#8e44ad")],previewShot:makeSS("Instagram","#c0392b",200,110),sm:{profileName:"@style_fakes_eu",followers:"48.2K",created:"2021-06-15"},timeline:[{date:"2024-02-01",event:"Case opened",type:"open"},{date:"2024-02-10",event:"DMCA notice filed",type:"action"},{date:"2024-03-01",event:"Account suspended",type:"success"}],comments:[{user:"Sarah K.",date:"2024-03-01",text:"Resolved."}],documents:[],pinned:false},
  {id:"BP-003",title:"Domain Squatting — nordlight-sale.com",brand:1,module:"Domain",status:"Active",priority:"Critical",isLead:false,relatedCases:[],bulkEnforcement:false,infringer:"Unknown",country:"Netherlands",platform:"Web",opened:"2024-03-01",updated:"2024-03-12",progress:30,description:"Fraudulent website mimicking NordLight store.",screenshots:[makeSS("Phishing Homepage","#c0392b"),makeSS("WHOIS","#2c3e50")],previewShot:makeSS("Phishing Site","#c0392b",200,110),timeline:[{date:"2024-03-01",event:"Case opened",type:"open"},{date:"2024-03-05",event:"Registrar contacted",type:"action"},{date:"2024-03-12",event:"Awaiting response",type:"pending"}],comments:[],documents:[],pinned:false},
  {id:"BP-004",title:"Brand Keyword Bidding — Google Ads",brand:1,module:"Keyword Ad",status:"Active",priority:"High",isLead:true,relatedCases:[{id:"BP-004a",url:"google.com/search?q=nordlight+buy",tags:["content"]}],bulkEnforcement:false,infringer:"RivalStore GmbH",country:"Germany",platform:"Google Ads",opened:"2024-02-10",updated:"2024-03-13",progress:40,description:"Competitor bidding on NordLight brand terms.",screenshots:[makeSS("Google Ad","#185F68")],previewShot:makeSS("Google Ads","#185F68",200,110),timeline:[{date:"2024-02-10",event:"Case opened",type:"open"},{date:"2024-02-18",event:"Google complaint filed",type:"action"},{date:"2024-03-13",event:"Pending review",type:"pending"}],comments:[],documents:[],pinned:false},
  {id:"BP-005",title:"Copied Descriptions — fashionreviews.net",brand:1,module:"Web Content",status:"Active",priority:"Low",isLead:false,relatedCases:[],bulkEnforcement:false,infringer:"fashionreviews.net",country:"United Kingdom",platform:"Web",opened:"2024-03-05",updated:"2024-03-14",progress:20,description:"Website copying NordLight product descriptions.",screenshots:[makeSS("Copied Content","#6c3483")],previewShot:makeSS("Web Content","#6c3483",200,110),timeline:[{date:"2024-03-05",event:"Case opened",type:"open"},{date:"2024-03-14",event:"DMCA sent",type:"action"}],comments:[],documents:[],pinned:false},
  {id:"BP-006",title:"Fake Serums — eBay UK",brand:2,module:"Marketplace",status:"Active",priority:"High",isLead:true,relatedCases:[{id:"BP-006a",url:"ebay.co.uk/itm/fake-serum-001",tags:["product","infringer"]}],bulkEnforcement:true,infringer:"BeautySupplyPlus",country:"United Kingdom",platform:"eBay",opened:"2024-02-20",updated:"2024-03-11",progress:45,description:"Counterfeit PureOak serums with dangerous ingredients.",screenshots:[makeSS("eBay Listing","#c0392b")],previewShot:makeSS("eBay UK","#c0392b",200,110),mp:{price:"£12.99",stock:67,sold:1240,offlineAction:false,images:[makeSS("Fake Serum","#c0392b",80,80),makeSS("Packaging","#e67e22",80,80)]},timeline:[{date:"2024-02-20",event:"Case opened",type:"open"},{date:"2024-03-11",event:"Counterfeit confirmed",type:"success"}],comments:[],documents:[],pinned:false},
  {id:"BP-007",title:"Patent Infringement — Charger Design",brand:3,module:"Marketplace",status:"Legal Review",priority:"Critical",isLead:true,relatedCases:[{id:"BP-007a",url:"alibaba.com/product/techclone-v1",tags:["product","infringer"]},{id:"BP-007b",url:"techclone.cn/charger-specs",tags:["content","infringer"]}],bulkEnforcement:false,infringer:"TechClone Ltd",country:"China",platform:"Alibaba",opened:"2024-01-10",updated:"2024-03-09",progress:55,description:"Exact copy of VoltEdge fast-charger design.",screenshots:[makeSS("Alibaba Listing","#e67e22"),makeSS("Design Compare","#c0392b")],previewShot:makeSS("Alibaba","#e67e22",200,110),mp:{price:"$8.50",stock:5000,sold:12400,offlineAction:true,images:[makeSS("Clone Charger","#e67e22",80,80),makeSS("Packaging","#2c3e50",80,80)]},timeline:[{date:"2024-01-10",event:"Case opened",type:"open"},{date:"2024-02-15",event:"C&D sent",type:"action"},{date:"2024-03-09",event:"Under legal review",type:"pending"}],comments:[{user:"Legal",date:"2024-03-09",text:"C&D acknowledged."}],documents:[],pinned:false},
];
const INIT_ASSETS=[
  {id:"a1",brand:1,name:"NordLight Logo Pack",type:"Logo",size:"4.2MB",date:"2024-01-10"},{id:"a2",brand:1,name:"EU Trademark Certificate",type:"Trademark",size:"1.1MB",date:"2023-06-15"},
  {id:"a3",brand:1,name:"EU Design Patent 2019",type:"Patent",size:"2.3MB",date:"2023-06-15"},{id:"a4",brand:1,name:"Brand Guidelines 2024",type:"Other",size:"8.7MB",date:"2024-01-05"},
  {id:"a5",brand:1,name:"Product Photography Kit",type:"Product Images",size:"45MB",date:"2024-02-01"},{id:"a6",brand:1,name:"Official Website Screenshot",type:"Website",size:"0.8MB",date:"2024-03-01"},
  {id:"a7",brand:1,name:"Copyright Registration US",type:"Copyright",size:"0.5MB",date:"2023-11-20"},{id:"a8",brand:2,name:"PureOak Logo Pack",type:"Logo",size:"3.1MB",date:"2024-01-12"},
  {id:"a9",brand:2,name:"EU Trademark Certificate",type:"Trademark",size:"1.2MB",date:"2023-08-10"},{id:"a10",brand:3,name:"VoltEdge Patent Bundle",type:"Patent",size:"5.4MB",date:"2023-09-01"},
];
const INIT_NOTIFS=[
  {id:1,type:"success",text:"BP-002: Resolved — Instagram account suspended",time:"2h ago",caseId:"BP-002"},{id:2,type:"danger",text:"BP-003: New phishing reports from customers",time:"5h ago",caseId:"BP-003"},
  {id:3,type:"warning",text:"BP-003: Domain registrar response overdue",time:"1d ago",caseId:"BP-003"},{id:4,type:"info",text:"BP-007: New document uploaded by legal team",time:"1d ago",caseId:"BP-007"},
  {id:5,type:"warning",text:"BP-001: Amazon seller re-listed removed products",time:"4d ago",caseId:"BP-001"},
];
const REPORTS=[
  {id:"r1",name:"Monthly Report — Feb 2024",date:"2024-03-01",size:"2.1MB"},{id:"r2",name:"Weekly Summary — W11 2024",date:"2024-03-15",size:"0.8MB"},
  {id:"r3",name:"Annual Report — 2023",date:"2024-01-15",size:"5.6MB"},{id:"r4",name:"Monthly Report — Jan 2024",date:"2024-02-01",size:"1.9MB"},
];
const TOP_INF=[{name:"FashionDrop GmbH",cases:4,status:"Active"},{name:"TechClone Ltd",cases:3,status:"Legal Review"},{name:"BeautySupplyPlus",cases:2,status:"Active"},{name:"@style_fakes_eu",cases:1,status:"Resolved"},{name:"RivalStore GmbH",cases:1,status:"Active"}];
const TOP_CTRY=[{country:"Germany",flag:"🇩🇪",cases:8},{country:"China",flag:"🇨🇳",cases:6},{country:"United Kingdom",flag:"🇬🇧",cases:5},{country:"Netherlands",flag:"🇳🇱",cases:3},{country:"France",flag:"🇫🇷",cases:2}];
const ALL_FILTER_TYPES_DEF=(brandCases)=>[
  {key:"module",label:"Module",options:MODULES},
  {key:"status",label:"Status",options:["Active","Resolved","Legal Review"]},
  {key:"priority",label:"Priority",options:["Critical","High","Medium","Low"]},
  {key:"country",label:"Country",options:[...new Set(brandCases.map(c=>c.country).filter(Boolean))]},
  {key:"infringer",label:"Infringer",options:[...new Set(brandCases.map(c=>c.infringer).filter(Boolean))]},
  {key:"period",label:"Period",options:PERIODS.map(p=>p.label)},
];

function RealproLogo({size=32, showText=true}){
  const s=size;
  return(
    <div style={{display:"flex",alignItems:"center",gap:showText?10:0}}>
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill={T.blue}/>
        {/* Shield shape */}
        <path d="M20 7L9 12V21C9 27.6 13.8 33.7 20 35C26.2 33.7 31 27.6 31 21V12L20 7Z" fill="white" fillOpacity="0.15"/>
        <path d="M20 9L11 13.5V21C11 26.8 14.9 32.2 20 33.5C25.1 32.2 29 26.8 29 21V13.5L20 9Z" fill="white" fillOpacity="0.2"/>
        {/* R letterform inside shield */}
        <path d="M16 14H22C23.7 14 25 15.3 25 17C25 18.3 24.2 19.4 23 19.8L25.5 24H23L20.8 20H18V24H16V14ZM18 18H22C22.6 18 23 17.6 23 17C23 16.4 22.6 16 22 16H18V18Z" fill="white"/>
        {/* Gold accent dot */}
        <circle cx="30" cy="10" r="5" fill={T.accent}/>
        <path d="M28.5 10L29.5 11L31.5 9" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {showText&&(
        <div>
          <span style={{fontSize:s*0.44,fontWeight:800,color:T.white,letterSpacing:-0.8,lineHeight:1}}>Real</span><span style={{fontSize:s*0.44,fontWeight:800,color:T.accent,letterSpacing:-0.8,lineHeight:1}}>pro</span>
        </div>
      )}
    </div>
  );
}

function Badge({label,color,bg,size=10}){
  return <span style={{fontSize:size,padding:"3px 8px",borderRadius:4,background:bg,color,fontWeight:500,whiteSpace:"nowrap"}}>{label}</span>;
}

function Toggle({on,onToggle,label,color}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      {label&&<span style={{fontSize:12,color:T.gray500}}>{label}</span>}
      <div onClick={onToggle} style={{width:36,height:20,borderRadius:10,background:on?(color||T.success):T.gray200,position:"relative",cursor:"pointer",transition:"background 0.2s",flexShrink:0}}>
        <div style={{width:16,height:16,borderRadius:"50%",background:T.white,position:"absolute",top:2,left:on?18:2,transition:"left 0.2s"}}></div>
      </div>
      <span style={{fontSize:11,color:on?(color||T.success):T.gray400,fontWeight:500}}>{on?"ON":"OFF"}</span>
    </div>
  );
}

function DropZone({onDrop,label}){
  const [over,setOver]=useState(false);
  return(
    <div onDragOver={e=>{e.preventDefault();setOver(true);}} onDragLeave={()=>setOver(false)} onDrop={e=>{e.preventDefault();setOver(false);onDrop(e);}}
      style={{border:`2px dashed ${over?T.blue:T.gray200}`,borderRadius:10,padding:"16px",textAlign:"center",background:over?T.bluePale:T.gray50,transition:"all 0.15s",cursor:"default"}}>
      <div style={{fontSize:20,marginBottom:4}}>⬆</div>
      <p style={{margin:0,fontSize:12,color:over?T.blue:T.gray400,fontWeight:500}}>{label||"Drop files here"}</p>
    </div>
  );
}

function PeriodBar({period,setPeriod,small}){
  return(
    <div style={{display:"flex",gap:2,background:T.gray100,borderRadius:8,padding:3}}>
      {PERIODS.map(p=>(
        <button key={p.label} onClick={()=>setPeriod(p.label)} style={{padding:small?"2px 8px":"4px 12px",borderRadius:6,border:"none",background:period===p.label?T.white:T.gray100,color:period===p.label?T.navy:T.gray400,fontSize:small?10:11,fontWeight:period===p.label?600:400,cursor:"pointer",transition:"all 0.15s"}}>{p.label}</button>
      ))}
    </div>
  );
}

// ── Sidebar item ──────────────────────────────────────────────────────────────
function NavItem({icon,label,active,badge,onClick}){
  return(
    <div onClick={onClick} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",borderRadius:8,cursor:"pointer",marginBottom:2,background:active?"rgba(255,255,255,0.12)":"transparent",transition:"background 0.15s"}} onMouseEnter={e=>{if(!active)e.currentTarget.style.background="rgba(255,255,255,0.06)";}} onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent";}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{color:active?T.white:"rgba(255,255,255,0.5)",display:"flex"}}>{icon}</span>
        <span style={{fontSize:13,color:active?T.white:"rgba(255,255,255,0.65)",fontWeight:active?600:400}}>{label}</span>
      </div>
      {badge>0&&<span style={{background:T.danger,color:T.white,borderRadius:10,fontSize:9,padding:"2px 6px",fontWeight:600}}>{badge}</span>}
    </div>
  );
}

export default function App(){
  const [stage,setStage]=useState("login");
  const [activeBrand,setActiveBrand]=useState(null);
  const [code,setCode]=useState("");
  const [codeErr,setCodeErr]=useState(false);
  const [view,setView]=useState("dashboard");
  const [selectedCase,setSelectedCase]=useState(null);
  const [prevView,setPrevView]=useState(null);
  const [cases,setCases]=useState(INIT_CASES);
  const [assets,setAssets]=useState(INIT_ASSETS);
  const [notifs,setNotifs]=useState(INIT_NOTIFS);
  const [searchQ,setSearchQ]=useState("");
  const [sortBy,setSortBy]=useState("updated");
  const [sortDir,setSortDir]=useState("desc");
  const [activeFilters,setActiveFilters]=useState({});
  const [visibleFilters,setVisibleFilters]=useState(["module","status","priority","country","infringer","period"]);
  const [filterMenuOpen,setFilterMenuOpen]=useState(false);
  const [chatOpen,setChatOpen]=useState(false);
  const [chatMsgs,setChatMsgs]=useState([{role:"assistant",text:"Hello! I'm your brand protection assistant. Ask me about cases, infringers, or enforcement strategy."}]);
  const [chatInput,setChatInput]=useState("");
  const [chatLoading,setChatLoading]=useState(false);
  const [newCaseOpen,setNewCaseOpen]=useState(false);
  const [newAssetOpen,setNewAssetOpen]=useState(false);
  const [newComment,setNewComment]=useState("");
  const [ssPreview,setSsPreview]=useState(null);
  const [ncForm,setNcForm]=useState({title:"",module:"Marketplace",priority:"Medium",platform:"",country:"",infringer:"",description:""});
  const [naForm,setNaForm]=useState({name:"",type:"Trademark",size:""});
  const [assetTypeFilter,setAssetTypeFilter]=useState("All");
  const [notifTypeFilter,setNotifTypeFilter]=useState("all");
  const [dashPeriod,setDashPeriod]=useState("30D");
  const chatEndRef=useRef(null);
  const now=new Date();

  const login=()=>{if(code==="BP2024"){setStage("brand");setCodeErr(false);}else setCodeErr(true);};
  const logout=()=>{setStage("login");setActiveBrand(null);setCode("");setView("dashboard");setSelectedCase(null);setActiveFilters({});};

  const brandCases=cases.filter(c=>c.brand===activeBrand?.id);
  const brandAssets=assets.filter(a=>a.brand===activeBrand?.id);
  const ALL_FILTER_TYPES=ALL_FILTER_TYPES_DEF(brandCases);

  const inPeriod=(dateStr,days)=>(now-new Date(dateStr))/(86400000)<=days;
  const dashDays=PERIODS.find(p=>p.label===dashPeriod)?.days||30;
  const dashCases=brandCases.filter(c=>inPeriod(c.opened,dashDays));

  const filteredCases=brandCases.filter(c=>{
    if(searchQ&&!c.title.toLowerCase().includes(searchQ.toLowerCase())&&!c.infringer.toLowerCase().includes(searchQ.toLowerCase())&&!c.id.toLowerCase().includes(searchQ.toLowerCase()))return false;
    if(activeFilters.module&&c.module!==activeFilters.module)return false;
    if(activeFilters.status&&c.status!==activeFilters.status)return false;
    if(activeFilters.priority&&c.priority!==activeFilters.priority)return false;
    if(activeFilters.country&&c.country!==activeFilters.country)return false;
    if(activeFilters.infringer&&c.infringer!==activeFilters.infringer)return false;
    if(activeFilters.period){const d=PERIODS.find(p=>p.label===activeFilters.period)?.days||9999;if(!inPeriod(c.opened,d))return false;}
    return true;
  }).sort((a,b)=>{
    const dir=sortDir==="asc"?1:-1;
    if(sortBy==="updated")return dir*(new Date(a.updated)-new Date(b.updated));
    if(sortBy==="opened")return dir*(new Date(a.opened)-new Date(b.opened));
    if(sortBy==="priority"){const o={Critical:4,High:3,Medium:2,Low:1};return dir*(o[a.priority]-o[b.priority]);}
    if(sortBy==="progress")return dir*(a.progress-b.progress);
    if(sortBy==="title")return dir*a.title.localeCompare(b.title);
    if(sortBy==="status")return dir*a.status.localeCompare(b.status);
    return 0;
  });

  const pinned=filteredCases.filter(c=>c.pinned);
  const unpinned=filteredCases.filter(c=>!c.pinned);
  const displayCases=[...pinned,...unpinned];

  const openCase=(c,from)=>{setPrevView(from||view);setSelectedCase(c);setView("caseDetail");};
  const goFiltered=(filter)=>{setActiveFilters(filter);setView("cases");setSelectedCase(null);};
  const updateCase=(cid,fn)=>{setCases(cs=>cs.map(c=>c.id===cid?fn(c):c));setSelectedCase(sc=>sc&&sc.id===cid?fn(sc):sc);};

  const handleDropSS=(e,cid)=>{
    const files=[...e.dataTransfer.files].filter(f=>f.type.startsWith("image/"));
    Promise.all(files.map(f=>new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.readAsDataURL(f);}))).then(imgs=>updateCase(cid,c=>({...c,screenshots:[...c.screenshots,...imgs]})));
  };
  const handleDropDoc=(e,cid)=>updateCase(cid,c=>({...c,documents:[...c.documents,...[...e.dataTransfer.files].map(f=>f.name)]}));
  const handleDropAsset=(e)=>{e.preventDefault();setAssets(a=>[...a,...[...e.dataTransfer.files].map((f,i)=>({id:`a_${Date.now()}_${i}`,brand:activeBrand.id,name:f.name,type:"Other",size:`${(f.size/1048576).toFixed(1)}MB`,date:now.toISOString().slice(0,10)}))]);};

  const sendChat=async()=>{
    if(!chatInput.trim()||chatLoading)return;
    const msg=chatInput.trim();setChatInput("");
    setChatMsgs(m=>[...m,{role:"user",text:msg}]);setChatLoading(true);
    try{
      const ctx=`Brand protection assistant. Brand: ${activeBrand?.name}. Cases: ${brandCases.map(c=>`${c.id}: ${c.title} (${c.status}, ${c.priority}, ${c.module})`).join("; ")}. Be concise.`;
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,system:ctx,messages:[...chatMsgs.filter((_,i)=>i>0).map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.text})),{role:"user",content:msg}]})});
      const data=await res.json();
      setChatMsgs(m=>[...m,{role:"assistant",text:data.content?.[0]?.text||"Error."}]);
    }catch{setChatMsgs(m=>[...m,{role:"assistant",text:"Connection error."}]);}
    setChatLoading(false);
    setTimeout(()=>chatEndRef.current?.scrollIntoView({behavior:"smooth"}),100);
  };

  const submitCase=()=>{
    if(!ncForm.title)return;
    setCases(cs=>[...cs,{...ncForm,id:`BP-0${cs.length+10}`,brand:activeBrand.id,status:"Active",progress:0,isLead:false,relatedCases:[],bulkEnforcement:false,opened:now.toISOString().slice(0,10),updated:now.toISOString().slice(0,10),timeline:[{date:now.toISOString().slice(0,10),event:"Case opened",type:"open"}],comments:[],documents:[],screenshots:[],previewShot:makeSS(ncForm.module,T.blue,200,110),pinned:false}]);
    setNewCaseOpen(false);setNcForm({title:"",module:"Marketplace",priority:"Medium",platform:"",country:"",infringer:"",description:""});
  };
  const submitAsset=()=>{
    if(!naForm.name)return;
    setAssets(a=>[...a,{id:`a_${Date.now()}`,brand:activeBrand.id,...naForm,date:now.toISOString().slice(0,10)}]);
    setNewAssetOpen(false);setNaForm({name:"",type:"Trademark",size:""});
  };
  const addComment=(cid)=>{if(!newComment.trim())return;updateCase(cid,c=>({...c,comments:[...c.comments,{user:"Client",date:now.toISOString().slice(0,10),text:newComment}]}));setNewComment("");};

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  if(stage==="login")return(
    <div style={{minHeight:560,display:"flex",background:T.navy}}>
      {/* Left panel */}
      <div style={{width:"45%",background:`linear-gradient(160deg,${T.navyLight} 0%,${T.navy} 100%)`,display:"flex",flexDirection:"column",justifyContent:"center",padding:"60px 56px"}}>
        <div style={{marginBottom:48}}>
          <RealproLogo size={36} showText={true}/>
        </div>
        <p style={{fontSize:32,fontWeight:700,color:T.white,lineHeight:1.2,margin:"0 0 16px",letterSpacing:-1}}>Protect what you've built</p>
        <p style={{fontSize:14,color:"rgba(255,255,255,0.55)",lineHeight:1.7,margin:0}}>Monitor, detect and enforce your brand rights across every platform, market and channel — from a single client portal.</p>
        <div style={{marginTop:48,display:"flex",flexDirection:"column",gap:14}}>
          {[["🛡","IP Enforcement","Takedowns across marketplaces, domains & social"],["📊","Live Analytics","Real-time dashboards and case progress tracking"],["🤖","AI Assistant","Instant answers on your cases and strategy"]].map(([ic,t,d])=>(
            <div key={t} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <span style={{fontSize:18,marginTop:2}}>{ic}</span>
              <div><p style={{margin:"0 0 2px",fontSize:13,fontWeight:600,color:T.white}}>{t}</p><p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.45)"}}>{d}</p></div>
            </div>
          ))}
        </div>
      </div>
      {/* Right panel */}
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:T.offWhite}}>
        <div style={{width:360,padding:"48px 40px",background:T.white,borderRadius:16,border:`1px solid ${T.gray200}`}}>
          <RealproLogo size={32} showText={true}/>
          <p style={{fontSize:24,fontWeight:700,color:T.navy,margin:"0 0 6px",letterSpacing:-0.5}}>Sign in</p>
          <p style={{fontSize:13,color:T.gray400,margin:"0 0 32px"}}>Enter your client access code</p>
          <label style={{fontSize:12,fontWeight:600,color:T.gray700,display:"block",marginBottom:6}}>Access code</label>
          <input value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••••" style={{width:"100%",padding:"12px 14px",borderRadius:8,border:`1.5px solid ${codeErr?T.danger:T.gray200}`,fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:10,letterSpacing:4,fontFamily:"monospace",color:T.navy}}/>
          {codeErr&&<p style={{color:T.danger,fontSize:12,margin:"0 0 10px"}}>Invalid code · Try: BP2024</p>}
          <button onClick={login} style={{width:"100%",padding:"12px",borderRadius:8,background:T.navy,color:T.white,border:"none",fontSize:14,fontWeight:600,cursor:"pointer",letterSpacing:0.2}}>Continue →</button>
          <p style={{fontSize:11,color:T.gray300,marginTop:16,textAlign:"center"}}>Demo access code: BP2024</p>
        </div>
      </div>
    </div>
  );

  // ── BRAND SELECT ──────────────────────────────────────────────────────────
  if(stage==="brand")return(
    <div style={{minHeight:560,display:"flex",alignItems:"center",justifyContent:"center",background:T.offWhite}}>
      <div style={{width:620,padding:"0 20px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <RealproLogo size={30} showText={true}/>
          <p style={{fontSize:26,fontWeight:700,color:T.navy,margin:"0 0 8px",letterSpacing:-0.5}}>Select a brand profile</p>
          <p style={{fontSize:13,color:T.gray400,margin:0}}>Choose which brand to access</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {BRANDS.map(b=>{
            const bc=cases.filter(c=>c.brand===b.id);
            const active=bc.filter(c=>c.status==="Active").length;
            const critical=bc.filter(c=>c.priority==="Critical").length;
            return(
              <div key={b.id} onClick={()=>{setActiveBrand(b);setStage("portal");setView("dashboard");}} style={{background:T.white,borderRadius:14,padding:"28px 22px",border:`1.5px solid ${T.gray200}`,cursor:"pointer",transition:"all 0.2s",textAlign:"center"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=b.color;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px rgba(0,0,0,0.08)`;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.gray200;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <div style={{width:56,height:56,borderRadius:14,background:b.color,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:T.white,fontSize:18,fontWeight:700}}>{b.logo}</div>
                <p style={{margin:"0 0 4px",fontSize:15,fontWeight:700,color:T.navy}}>{b.name}</p>
                <p style={{margin:"0 0 18px",fontSize:11,color:T.gray400}}>{b.desc}</p>
                <div style={{display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap"}}>
                  <Badge label={`${bc.length} cases`} color={T.blue} bg={T.bluePale}/>
                  {active>0&&<Badge label={`${active} active`} color={T.warning} bg={T.warningPale}/>}
                  {critical>0&&<Badge label={`${critical} critical`} color={T.danger} bg={T.dangerPale}/>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── PORTAL ────────────────────────────────────────────────────────────────
  return(
    <div style={{display:"flex",minHeight:580,background:T.offWhite,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",fontSize:14,position:"relative"}}>

      {/* ── Sidebar ── */}
      <div style={{width:220,background:T.navy,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"20px 16px 16px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
          <RealproLogo size={28} showText={true}/>
        </div>
        {/* Brand switcher */}
        <div style={{padding:"12px 12px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
          <p style={{margin:"0 0 8px",fontSize:9,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:1,paddingLeft:4}}>Brand</p>
          {BRANDS.map(b=>(
            <div key={b.id} onClick={()=>{setActiveBrand(b);setActiveFilters({});setView("dashboard");setSelectedCase(null);}} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:7,cursor:"pointer",background:activeBrand?.id===b.id?"rgba(255,255,255,0.12)":"transparent",marginBottom:2,transition:"background 0.15s"}} onMouseEnter={e=>{if(activeBrand?.id!==b.id)e.currentTarget.style.background="rgba(255,255,255,0.06)";}} onMouseLeave={e=>{if(activeBrand?.id!==b.id)e.currentTarget.style.background="transparent";}}>
              <div style={{width:20,height:20,borderRadius:5,background:b.color,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontSize:7,fontWeight:700,flexShrink:0}}>{b.logo}</div>
              <span style={{fontSize:12,color:activeBrand?.id===b.id?T.white:"rgba(255,255,255,0.55)",fontWeight:activeBrand?.id===b.id?600:400}}>{b.name}</span>
            </div>
          ))}
        </div>
        {/* Nav */}
        <nav style={{padding:"10px 8px",flex:1}}>
          <p style={{margin:"0 0 6px",fontSize:9,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:1,paddingLeft:4}}>Menu</p>
          <NavItem icon={<LayoutDashboard size={16}/>} label="Dashboard" active={view==="dashboard"} onClick={()=>{setView("dashboard");setSelectedCase(null);setActiveFilters({});}}/>
          <NavItem icon={<FolderOpen size={16}/>} label="Cases" active={view==="cases"||view==="caseDetail"} onClick={()=>{setView("cases");setSelectedCase(null);setActiveFilters({});}}/>
          <NavItem icon={<Bell size={16}/>} label="Notifications" active={view==="notifications"} badge={notifs.filter(n=>n.type==="danger").length} onClick={()=>{setView("notifications");setSelectedCase(null);}}/>
          <NavItem icon={<BarChart2 size={16}/>} label="Top Lists" active={view==="toplist"} onClick={()=>{setView("toplist");setSelectedCase(null);}}/>
          <NavItem icon={<Shield size={16}/>} label="Brand Assets" active={view==="assets"} onClick={()=>{setView("assets");setSelectedCase(null);}}/>
          <div style={{margin:"12px 0 6px",borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:10}}>
            <p style={{margin:"0 0 6px",fontSize:9,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:1,paddingLeft:4}}>Modules</p>
            {MODULES.map(m=>{
              const cnt=brandCases.filter(c=>c.module===m).length;
              if(!cnt)return null;
              return(
                <div key={m} onClick={()=>{setActiveFilters({module:m});setView("cases");setSelectedCase(null);}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 8px",borderRadius:6,cursor:"pointer",marginBottom:1,background:activeFilters.module===m&&view==="cases"?"rgba(255,255,255,0.1)":"transparent",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"} onMouseLeave={e=>e.currentTarget.style.background=activeFilters.module===m&&view==="cases"?"rgba(255,255,255,0.1)":"transparent"}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:10}}>{MODULE_ICONS[m]}</span>
                    <span style={{fontSize:11,color:"rgba(255,255,255,0.55)"}}>{m}</span>
                  </div>
                  <span style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.6)",fontWeight:600}}>{cnt}</span>
                </div>
              );
            })}
          </div>
        </nav>
        {/* User footer */}
        <div style={{padding:"12px 14px",borderTop:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:T.navyMid,border:"1.5px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:600,color:T.white}}>CL</div>
            <div><p style={{margin:0,fontSize:11,fontWeight:600,color:T.white}}>Client User</p><p style={{margin:0,fontSize:9,color:"rgba(255,255,255,0.4)"}}>client@brand.com</p></div>
          </div>
          <button onClick={logout} title="Log out" style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.4)",padding:2,display:"flex",alignItems:"center"}} onMouseEnter={e=>e.currentTarget.style.color=T.white} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}><LogOut size={15}/></button>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        {/* Topbar */}
        <div style={{background:T.white,borderBottom:`1px solid ${T.gray200}`,padding:"0 20px",height:56,display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{flex:1,maxWidth:340,position:"relative"}}>
            <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T.gray300,fontSize:14}}>⌕</span>
            <input value={searchQ} onChange={e=>{setSearchQ(e.target.value);setView("cases");setActiveFilters({});}} placeholder="Search cases, infringers, IDs…" style={{width:"100%",padding:"8px 12px 8px 30px",borderRadius:8,border:`1.5px solid ${T.gray200}`,fontSize:13,outline:"none",boxSizing:"border-box",background:T.gray50,color:T.navy}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.gray200}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:8,background:T.bluePale,border:`1.5px solid ${T.blue}20`}}>
            <div style={{width:14,height:14,borderRadius:3,background:activeBrand?.color,flexShrink:0}}></div>
            <span style={{fontSize:12,fontWeight:600,color:T.navy}}>{activeBrand?.name}</span>
          </div>
          <button onClick={()=>setNewCaseOpen(true)} style={{background:T.navy,color:T.white,border:"none",borderRadius:8,padding:"8px 16px",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}><Plus size={14}/>New case</button>
          <button onClick={()=>setNewAssetOpen(true)} style={{background:T.white,color:T.navy,border:`1.5px solid ${T.gray200}`,borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}><Upload size={14}/>Add asset</button>
        </div>

        {/* Page content */}
        <div style={{flex:1,overflow:"auto",padding:24}}>

          {/* ══ DASHBOARD ══════════════════════════════════════════════════════ */}
          {view==="dashboard"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
                <div>
                  <p style={{fontSize:22,fontWeight:700,color:T.navy,margin:"0 0 4px",letterSpacing:-0.5}}>Dashboard</p>
                  <p style={{margin:0,fontSize:13,color:T.gray400}}>{activeBrand?.name} · {activeBrand?.industry}</p>
                </div>
                <PeriodBar period={dashPeriod} setPeriod={setDashPeriod}/>
              </div>

              {/* KPI row */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
                {[
                  {label:"Active cases",value:dashCases.filter(c=>c.status==="Active").length,color:T.blue,bg:T.bluePale,icon:<FolderOpen size={14}/>,filter:{status:"Active"}},
                  {label:"Resolved",value:dashCases.filter(c=>c.status==="Resolved").length,color:T.success,bg:T.successPale,icon:<CheckCircle2 size={14}/>,filter:{status:"Resolved"}},
                  {label:"Critical",value:dashCases.filter(c=>c.priority==="Critical").length,color:T.danger,bg:T.dangerPale,icon:<AlertTriangle size={14}/>,filter:{priority:"Critical"}},
                  {label:"Success rate",value:dashCases.length?Math.round(dashCases.filter(c=>c.status==="Resolved").length/dashCases.length*100)+"%":"—",color:T.warning,bg:T.warningPale,icon:<TrendingUp size={14}/>,filter:null},
                ].map((k,i)=>(
                  <div key={i} onClick={()=>k.filter&&goFiltered(k.filter)} style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px",cursor:k.filter?"pointer":"default",transition:"all 0.2s"}} onMouseEnter={e=>{if(k.filter){e.currentTarget.style.borderColor=k.color;e.currentTarget.style.transform="translateY(-1px)";}}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.gray200;e.currentTarget.style.transform="none";}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                      <p style={{margin:0,fontSize:11,fontWeight:600,color:T.gray400,textTransform:"uppercase",letterSpacing:0.8}}>{k.label}</p>
                      <div style={{width:28,height:28,borderRadius:7,background:k.bg,display:"flex",alignItems:"center",justifyContent:"center",color:k.color}}>
                      {k.icon}
                    </div>
                    </div>
                    <p style={{margin:"0 0 6px",fontSize:28,fontWeight:700,color:T.navy,letterSpacing:-1}}>{k.value}</p>
                    {k.filter&&<p style={{margin:0,fontSize:11,color:k.color,fontWeight:500}}>View cases →</p>}
                  </div>
                ))}
              </div>

              {/* Module breakdown */}
              <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px",marginBottom:20}}>
                <p style={{margin:"0 0 16px",fontSize:13,fontWeight:700,color:T.navy,textTransform:"uppercase",letterSpacing:0.5}}>Cases by module</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
                  {MODULES.map(m=>{
                    const cnt=dashCases.filter(c=>c.module===m).length;
                    const total=dashCases.length||1;
                    const pct=Math.round(cnt/total*100);
                    return(
                      <div key={m} onClick={()=>goFiltered({module:m})} style={{padding:"14px 12px",borderRadius:10,border:`1.5px solid ${T.gray200}`,cursor:"pointer",background:T.gray50,transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background=T.bluePale;e.currentTarget.style.borderColor=MODULE_COLORS[m];}} onMouseLeave={e=>{e.currentTarget.style.background=T.gray50;e.currentTarget.style.borderColor=T.gray200;}}>
                        <div style={{fontSize:22,marginBottom:8}}>{MODULE_ICONS[m]}</div>
                        <p style={{margin:"0 0 2px",fontSize:20,fontWeight:700,color:T.navy,letterSpacing:-0.5}}>{cnt}</p>
                        <p style={{margin:"0 0 10px",fontSize:10,color:T.gray400,fontWeight:500}}>{m}</p>
                        <div style={{height:3,borderRadius:2,background:T.gray200,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${pct}%`,background:MODULE_COLORS[m],borderRadius:2}}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                {/* Recent cases */}
                <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <p style={{margin:0,fontSize:13,fontWeight:700,color:T.navy,textTransform:"uppercase",letterSpacing:0.5}}>Recent cases</p>
                    <button onClick={()=>goFiltered({})} style={{fontSize:11,color:T.blue,background:"none",border:"none",cursor:"pointer",padding:0,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>View all <ArrowRight size={11}/></button>
                  </div>
                  {dashCases.slice(0,5).map((c,i)=>(
                    <div key={c.id} onClick={()=>openCase(c,"dashboard")} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderTop:i>0?`1px solid ${T.gray100}`:"none",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.75"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      {c.previewShot&&<img src={c.previewShot} alt="" style={{width:40,height:26,borderRadius:5,objectFit:"cover",flexShrink:0,border:`1px solid ${T.gray200}`}}/>}
                      <div style={{flex:1,minWidth:0}}>
                        <p style={{margin:"0 0 2px",fontSize:12,fontWeight:600,color:T.navy,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.title}</p>
                        <p style={{margin:0,fontSize:10,color:T.gray400}}>{c.module} · {c.updated}</p>
                      </div>
                      <Badge label={c.status} color={sColor(c.status)} bg={sBg(c.status)}/>
                    </div>
                  ))}
                </div>
                {/* Reports */}
                <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px"}}>
                  <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:T.navy,textTransform:"uppercase",letterSpacing:0.5}}>Reports</p>
                  {REPORTS.map((r,i)=>(
                    <div key={r.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderTop:i>0?`1px solid ${T.gray100}`:"none"}}>
                      <div style={{width:36,height:36,borderRadius:9,background:T.bluePale,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10,color:T.blue,flexShrink:0}}><FileBarChart size={18}/></div>
                      <div style={{flex:1}}>
                        <p style={{margin:"0 0 1px",fontSize:12,fontWeight:600,color:T.navy}}>{r.name}</p>
                        <p style={{margin:0,fontSize:10,color:T.gray400}}>{r.date} · {r.size}</p>
                      </div>
                      <button style={{fontSize:11,color:T.blue,background:T.bluePale,border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontWeight:600}}>↓</button>
                    </div>
                  ))}
                  <button style={{marginTop:12,width:"100%",padding:"8px",borderRadius:8,border:`1.5px dashed ${T.gray200}`,background:"transparent",fontSize:11,color:T.gray400,cursor:"pointer",fontWeight:500}}>+ Generate report</button>
                </div>
              </div>

              {/* Notifications preview */}
              <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <p style={{margin:0,fontSize:13,fontWeight:700,color:T.navy,textTransform:"uppercase",letterSpacing:0.5}}>Recent notifications</p>
                  <button onClick={()=>setView("notifications")} style={{fontSize:11,color:T.blue,background:"none",border:"none",cursor:"pointer",fontWeight:600,display:"flex",alignItems:"center",gap:4}}>View all <ArrowRight size={11}/></button>
                </div>
                {notifs.slice(0,4).map((n,i)=>(
                  <div key={n.id} style={{display:"flex",gap:12,padding:"10px 0",borderTop:i>0?`1px solid ${T.gray100}`:"none",cursor:n.caseId?"pointer":"default",alignItems:"flex-start"}} onClick={()=>n.caseId&&openCase(cases.find(c=>c.id===n.caseId),"dashboard")}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:nColor(n.type),marginTop:4,flexShrink:0}}></div>
                    <div style={{flex:1}}><p style={{margin:"0 0 2px",fontSize:12,color:T.navy,fontWeight:500}}>{n.text}</p><p style={{margin:0,fontSize:10,color:T.gray400}}>{n.time}</p></div>
                    {n.caseId&&<span style={{fontSize:10,color:T.blue,fontWeight:600,flexShrink:0}}>→</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ CASES ══════════════════════════════════════════════════════════ */}
          {view==="cases"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <div>
                  <p style={{fontSize:22,fontWeight:700,color:T.navy,margin:"0 0 4px",letterSpacing:-0.5}}>Cases</p>
                  <p style={{margin:0,fontSize:13,color:T.gray400}}>{activeBrand?.name} · {displayCases.length} case{displayCases.length!==1?"s":""}{pinned.length>0?` · ${pinned.length} pinned`:""}</p>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:"7px 10px",borderRadius:7,border:`1.5px solid ${T.gray200}`,fontSize:12,outline:"none",background:T.white,color:T.gray700,fontWeight:500}}>
                    <option value="updated">Last updated</option><option value="opened">Date opened</option>
                    <option value="priority">Priority</option><option value="progress">Progress</option>
                    <option value="status">Status</option><option value="title">Title A–Z</option>
                  </select>
                  <button onClick={()=>setSortDir(d=>d==="asc"?"desc":"asc")} style={{padding:"7px 10px",borderRadius:7,border:`1.5px solid ${T.gray200}`,background:T.white,fontSize:12,cursor:"pointer",color:T.gray600,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>{sortDir==="asc"?<><SortAsc size={14}/>Asc</>:<><SortDesc size={14}/>Desc</>}</button>
                  <div style={{position:"relative"}}>
                    <button onClick={()=>setFilterMenuOpen(o=>!o)} style={{padding:"7px 12px",borderRadius:7,border:`1.5px solid ${T.gray200}`,background:filterMenuOpen?T.bluePale:T.white,fontSize:12,cursor:"pointer",color:filterMenuOpen?T.blue:T.gray600,fontWeight:600,display:"flex",alignItems:"center",gap:6}}><Settings2 size={14}/>Filters</button>
                    {filterMenuOpen&&(
                      <div style={{position:"absolute",right:0,top:"calc(100% + 6px)",background:T.white,border:`1.5px solid ${T.gray200}`,borderRadius:10,padding:14,zIndex:20,minWidth:180,boxShadow:"0 8px 24px rgba(0,0,0,0.10)"}}>
                        <p style={{margin:"0 0 10px",fontSize:11,color:T.gray400,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Visible filters</p>
                        {ALL_FILTER_TYPES.map(ft=>(
                          <label key={ft.key} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,cursor:"pointer"}}>
                            <input type="checkbox" checked={visibleFilters.includes(ft.key)} onChange={()=>setVisibleFilters(vf=>vf.includes(ft.key)?vf.filter(x=>x!==ft.key):[...vf,ft.key])}/>
                            <span style={{fontSize:12,color:T.gray700,fontWeight:500}}>{ft.label}</span>
                          </label>
                        ))}
                        <button onClick={()=>setFilterMenuOpen(false)} style={{marginTop:6,width:"100%",padding:"6px",borderRadius:6,border:`1px solid ${T.gray200}`,background:T.gray50,fontSize:11,cursor:"pointer",fontWeight:500}}>Done</button>
                      </div>
                    )}
                  </div>
                  {Object.keys(activeFilters).filter(k=>activeFilters[k]).length>0&&<button onClick={()=>setActiveFilters({})} style={{fontSize:11,color:T.gray600,background:T.gray100,border:`1px solid ${T.gray200}`,borderRadius:6,padding:"6px 10px",cursor:"pointer",fontWeight:500,display:"flex",alignItems:"center",gap:4}}><X size={11}/>Clear</button>}
                </div>
              </div>
              {/* Filter dropdowns */}
              {visibleFilters.length>0&&(
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16,padding:"12px 16px",background:T.white,borderRadius:10,border:`1.5px solid ${T.gray200}`}}>
                  {ALL_FILTER_TYPES.filter(ft=>visibleFilters.includes(ft.key)).map(ft=>{
                    const val=activeFilters[ft.key];
                    return(
                      <div key={ft.key} style={{position:"relative"}}>
                        <select value={val||""} onChange={e=>setActiveFilters(f=>({...f,[ft.key]:e.target.value||undefined}))} style={{padding:"6px 26px 6px 10px",borderRadius:7,border:`1.5px solid ${val?T.blue:T.gray200}`,background:val?T.bluePale:T.white,color:val?T.blue:T.gray600,fontSize:12,outline:"none",cursor:"pointer",appearance:"none",WebkitAppearance:"none",fontWeight:val?600:400}}>
                          <option value="">{ft.label}</option>
                          {(ft.key==="period"?PERIODS.map(p=>p.label):ft.options).map(opt=><option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",fontSize:9,color:val?T.blue:T.gray300,pointerEvents:"none"}}>▾</span>
                    {val&&<button onClick={()=>setActiveFilters(f=>({...f,[ft.key]:undefined}))} style={{position:"absolute",right:22,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:T.blue,padding:0,lineHeight:1,display:"flex",alignItems:"center"}}><X size={10}/></button>}
                      </div>
                    );
                  })}
                </div>
              )}
              {displayCases.length===0&&<div style={{textAlign:"center",padding:48,color:T.gray400,background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`}}>No cases match the current filters.</div>}
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {displayCases.map(c=>(
                  <div key={c.id} style={{background:T.white,borderRadius:12,border:`1.5px solid ${c.pinned?T.blue:T.gray200}`,padding:"14px 16px",display:"flex",gap:12,alignItems:"center",transition:"all 0.2s"}} onMouseEnter={e=>{if(!c.pinned)e.currentTarget.style.borderColor=T.gray300;e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=c.pinned?T.blue:T.gray200;e.currentTarget.style.boxShadow="none";}}>
                    <input type="checkbox" checked={!!c.pinned} onChange={()=>updateCase(c.id,x=>({...x,pinned:!x.pinned}))} onClick={e=>e.stopPropagation()} style={{margin:0,cursor:"pointer",flexShrink:0,accentColor:T.navy}}/>
                    {c.previewShot&&<img src={c.previewShot} alt="" onClick={()=>openCase(c,"cases")} style={{width:64,height:40,borderRadius:7,objectFit:"cover",flexShrink:0,border:`1px solid ${T.gray200}`,cursor:"pointer"}}/>}
                    <div style={{flex:1,minWidth:0,cursor:"pointer"}} onClick={()=>openCase(c,"cases")}>
                      <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}>
                        {c.pinned&&<Badge label={<span style={{display:"flex",alignItems:"center",gap:3}}><Pin size={9}/>Pinned</span>} color={T.blue} bg={T.bluePale}/>}
                        {c.isLead&&<Badge label="Lead" color={T.purple} bg={T.purplePale}/>}
                        <Badge label={`${MODULE_ICONS[c.module]} ${c.module}`} color={MODULE_COLORS[c.module]} bg={`${MODULE_COLORS[c.module]}15`}/>
                        <span style={{fontSize:10,color:T.gray400,fontFamily:"monospace"}}>{c.id}</span>
                      </div>
                      <p style={{margin:"0 0 3px",fontSize:13,fontWeight:600,color:T.navy,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.title}</p>
                      <p style={{margin:0,fontSize:11,color:T.gray400}}>{c.infringer} · {c.country} · {c.updated}</p>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5,flexShrink:0,cursor:"pointer"}} onClick={()=>openCase(c,"cases")}>
                      <div style={{display:"flex",gap:5}}>
                        <Badge label={c.status} color={sColor(c.status)} bg={sBg(c.status)}/>
                        <Badge label={c.priority} color={pColor(c.priority)} bg={pBg(c.priority)}/>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <div style={{width:80,height:4,borderRadius:2,background:T.gray100,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${c.progress}%`,background:c.status==="Resolved"?T.success:T.blue,borderRadius:2}}></div>
                        </div>
                        <span style={{fontSize:10,color:T.gray400,fontWeight:500}}>{c.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ CASE DETAIL ═════════════════════════════════════════════════════ */}
          {view==="caseDetail"&&selectedCase&&(()=>{
            const c=selectedCase;
            return(
              <div>
                <button onClick={()=>setView(prevView||"cases")} style={{background:"none",border:"none",color:T.blue,fontSize:12,cursor:"pointer",padding:0,marginBottom:16,fontWeight:600,display:"flex",alignItems:"center",gap:4}}><ChevronDown size={14} style={{transform:"rotate(90deg)"}}/>Back to {prevView||"cases"}</button>
                {/* Header card */}
                <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"20px 22px",marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                        {c.isLead&&<Badge label="Lead case" color={T.purple} bg={T.purplePale}/>}
                        <Badge label={`${MODULE_ICONS[c.module]} ${c.module}`} color={MODULE_COLORS[c.module]} bg={`${MODULE_COLORS[c.module]}15`}/>
                        <span style={{fontSize:11,color:T.gray400,fontFamily:"monospace"}}>{c.id}</span>
                      </div>
                      <p style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:T.navy,letterSpacing:-0.3}}>{c.title}</p>
                      <p style={{margin:0,fontSize:12,color:T.gray400}}>{c.platform} · {c.country} · Opened {c.opened}</p>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <Badge label={c.status} color={sColor(c.status)} bg={sBg(c.status)} size={11}/>
                      <Badge label={c.priority} color={pColor(c.priority)} bg={pBg(c.priority)} size={11}/>
                    </div>
                  </div>
                  <p style={{margin:"0 0 14px",fontSize:13,color:T.gray500,lineHeight:1.7}}>{c.description}</p>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:11,color:T.gray400,fontWeight:500}}>Progress</span>
                    <div style={{flex:1,height:6,borderRadius:3,background:T.gray100,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${c.progress}%`,background:c.status==="Resolved"?T.success:T.blue,borderRadius:3}}></div>
                    </div>
                    <span style={{fontSize:12,fontWeight:700,color:T.navy}}>{c.progress}%</span>
                  </div>
                </div>
                {/* Marketplace */}
                {c.module==="Marketplace"&&c.mp&&(
                  <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px",marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <p style={{margin:0,fontSize:13,fontWeight:700,color:T.navy}}>🛒 Marketplace data</p>
                      <Toggle on={c.mp.offlineAction} onToggle={()=>updateCase(c.id,x=>({...x,mp:{...x.mp,offlineAction:!x.mp.offlineAction}}))} label="Offline action" color={T.warning}/>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
                      {[["Listed price",c.mp.price],["Stock",c.mp.stock.toLocaleString()],["Units sold",c.mp.sold.toLocaleString()]].map(([l,v])=>(
                        <div key={l} style={{background:T.gray50,borderRadius:8,padding:"12px 14px",border:`1px solid ${T.gray100}`}}>
                          <p style={{margin:0,fontSize:10,color:T.gray400,textTransform:"uppercase",letterSpacing:0.6,fontWeight:600}}>{l}</p>
                          <p style={{margin:0,fontSize:20,fontWeight:700,color:T.navy,letterSpacing:-0.5}}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,color:T.gray500,textTransform:"uppercase",letterSpacing:0.5}}>Product images</p>
                    <div style={{display:"flex",gap:8}}>{c.mp.images.map((img,i)=><img key={i} src={img} alt="" style={{width:68,height:68,borderRadius:8,objectFit:"cover",border:`1.5px solid ${T.gray200}`,cursor:"pointer"}} onClick={()=>setSsPreview(img)}/>)}</div>
                  </div>
                )}
                {/* Social media */}
                {c.module==="Social Media"&&c.sm&&(
                  <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px",marginBottom:14}}>
                    <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:T.navy}}>📱 Social media profile</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                      {[["Profile name",c.sm.profileName],["Followers",c.sm.followers],["Created",c.sm.created]].map(([l,v])=>(
                        <div key={l} style={{background:T.gray50,borderRadius:8,padding:"12px 14px",border:`1px solid ${T.gray100}`}}>
                          <p style={{margin:0,fontSize:10,color:T.gray400,textTransform:"uppercase",letterSpacing:0.6,fontWeight:600}}>{l}</p>
                          <p style={{margin:0,fontSize:16,fontWeight:700,color:T.navy}}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Related cases */}
                {c.isLead&&(
                  <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px",marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                      <p style={{margin:0,fontSize:13,fontWeight:700,color:T.navy}}>Related cases ({c.relatedCases.length})</p>
                      <Toggle on={c.bulkEnforcement} onToggle={()=>updateCase(c.id,x=>({...x,bulkEnforcement:!x.bulkEnforcement}))} label="Bulk enforcement"/>
                    </div>
                    {c.bulkEnforcement&&<div style={{padding:"10px 14px",borderRadius:8,background:T.successPale,border:`1px solid #A7F3D0`,marginBottom:12,fontSize:12,color:T.success,fontWeight:500}}>✓ Bulk enforcement active — all {c.relatedCases.length} URLs will receive simultaneous takedowns.</div>}
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {c.relatedCases.map((rc,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,background:T.gray50,border:`1px solid ${T.gray200}`}}>
                          <span style={{fontSize:12,color:T.blue,flex:1,fontFamily:"monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{rc.url}</span>
                          <div style={{display:"flex",gap:4}}>{rc.tags.map(tag=><span key={tag} style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:TAG_COLORS[tag][0],color:TAG_COLORS[tag][1],fontWeight:600}}>{tag}</span>)}</div>
                        </div>
                      ))}
                      {c.relatedCases.length===0&&<p style={{margin:0,fontSize:12,color:T.gray400}}>No related URLs linked.</p>}
                    </div>
                  </div>
                )}
                {/* Screenshots */}
                <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px",marginBottom:14}}>
                  <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:T.navy}}>Screenshots{c.screenshots?.length>0?` (${c.screenshots.length})`:""}</p>
                  {c.screenshots?.length>0&&(
                    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:12}}>
                      {c.screenshots.map((ss,i)=>(
                        <div key={i} style={{borderRadius:8,overflow:"hidden",border:`1.5px solid ${T.gray200}`,position:"relative"}}>
                          <img src={ss} alt="" onClick={()=>setSsPreview(ss)} style={{width:"100%",display:"block",cursor:"pointer"}}/>
                          <button onClick={()=>updateCase(c.id,x=>({...x,screenshots:x.screenshots.filter((_,j)=>j!==i)}))} style={{position:"absolute",top:6,right:6,width:22,height:22,borderRadius:"50%",background:"rgba(0,0,0,0.5)",color:T.white,border:"none",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>×</button>
                          <div style={{padding:"6px 10px",background:T.gray50}}><p style={{margin:0,fontSize:10,color:T.gray400}}>Screenshot {i+1} · click to enlarge</p></div>
                        </div>
                      ))}
                    </div>
                  )}
                  <DropZone onDrop={e=>handleDropSS(e,c.id)} label="Drop image files here to add screenshots"/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                  {/* Timeline */}
                  <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px"}}>
                    <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:T.navy,display:"flex",alignItems:"center",gap:6}}><Clock size={15} color={T.blue}/>Timeline</p>
                    {c.timeline.map((t,i)=>(
                      <div key={i} style={{display:"flex",gap:12,marginBottom:12}}>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                          <div style={{width:10,height:10,borderRadius:"50%",background:t.type==="success"?T.success:t.type==="pending"?T.warning:T.blue,marginTop:2,flexShrink:0}}></div>
                          {i<c.timeline.length-1&&<div style={{width:1.5,flex:1,background:T.gray200,margin:"4px 0"}}></div>}
                        </div>
                        <div style={{paddingBottom:i<c.timeline.length-1?10:0}}>
                          <p style={{margin:0,fontSize:12,fontWeight:600,color:T.navy}}>{t.event}</p>
                          <p style={{margin:0,fontSize:11,color:T.gray400}}>{t.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Documents */}
                  <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px"}}>
                    <p style={{margin:"0 0 12px",fontSize:13,fontWeight:700,color:T.navy,display:"flex",alignItems:"center",gap:6}}><FileText size={15} color={T.blue}/>Documents</p>
                    {c.documents.map((d,i)=>(
                    <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${T.gray100}`}}>
                        <span style={{color:T.blue,display:"flex"}}><FileText size={13}/></span>
                        <span style={{fontSize:12,color:T.navy,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:500}}>{d}</span>
                        <button onClick={()=>updateCase(c.id,x=>({...x,documents:x.documents.filter((_,j)=>j!==i)}))} style={{color:T.danger,background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center"}}><X size={13}/></button>
                      </div>
                    ))}
                    <div style={{marginTop:10}}><DropZone onDrop={e=>handleDropDoc(e,c.id)} label="Drop files here"/></div>
                  </div>
                </div>
                {/* Comments */}
                <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px"}}>
                  <p style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:T.navy,display:"flex",alignItems:"center",gap:6}}><MessageSquare size={15} color={T.blue}/>Comments</p>
                  {c.comments.length===0&&<p style={{fontSize:12,color:T.gray400,marginBottom:12}}>No comments yet.</p>}
                  {c.comments.map((cm,i)=>(
                    <div key={i} style={{display:"flex",gap:10,marginBottom:12,padding:"12px 14px",background:T.gray50,borderRadius:9,border:`1px solid ${T.gray100}`}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:T.bluePale,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:T.blue,flexShrink:0}}>{cm.user.slice(0,2).toUpperCase()}</div>
                      <div><p style={{margin:"0 0 2px",fontSize:12,fontWeight:600,color:T.navy}}>{cm.user} <span style={{fontWeight:400,color:T.gray400}}>· {cm.date}</span></p><p style={{margin:0,fontSize:12,color:T.gray500,lineHeight:1.6}}>{cm.text}</p></div>
                    </div>
                  ))}
                  <div style={{display:"flex",gap:8}}>
                    <input value={newComment} onChange={e=>setNewComment(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addComment(c.id)} placeholder="Add a comment…" style={{flex:1,padding:"9px 12px",borderRadius:8,border:`1.5px solid ${T.gray200}`,fontSize:12,outline:"none",color:T.navy}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.gray200}/>
                    <button onClick={()=>addComment(c.id)} style={{padding:"9px 16px",borderRadius:8,background:T.navy,color:T.white,border:"none",fontSize:12,cursor:"pointer",fontWeight:600,display:"flex",alignItems:"center",gap:6}}><Send size={13}/>Post</button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ══ NOTIFICATIONS ═══════════════════════════════════════════════════ */}
          {view==="notifications"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <div><p style={{fontSize:22,fontWeight:700,color:T.navy,margin:"0 0 4px",letterSpacing:-0.5}}>Notifications</p><p style={{margin:0,fontSize:13,color:T.gray400}}>{notifs.length} unread</p></div>
                <div style={{display:"flex",gap:6}}>
                  {["all","success","warning","danger","info"].map(t=>(
                    <button key={t} onClick={()=>setNotifTypeFilter(t)} style={{padding:"6px 12px",borderRadius:7,border:`1.5px solid ${notifTypeFilter===t?nColor(t==="all"?"info":t):T.gray200}`,background:notifTypeFilter===t?`${nColor(t==="all"?"info":t)}15`:T.white,color:notifTypeFilter===t?nColor(t==="all"?"info":t):T.gray500,fontSize:11,cursor:"pointer",fontWeight:notifTypeFilter===t?600:400,textTransform:"capitalize"}}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {notifs.filter(n=>notifTypeFilter==="all"||n.type===notifTypeFilter).map(n=>(
                  <div key={n.id} style={{background:T.white,borderRadius:10,border:`1.5px solid ${T.gray200}`,padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:nColor(n.type),marginTop:5,flexShrink:0}}>
                    </div>
                    <div style={{flex:1}}>
                      <p style={{margin:"0 0 3px",fontSize:13,color:T.navy,fontWeight:500}}>{n.text}</p>
                      <p style={{margin:0,fontSize:11,color:T.gray400}}>{n.time}</p>
                    </div>
                    <div style={{display:"flex",gap:6,flexShrink:0}}>
                      {n.caseId&&<button onClick={()=>{const c=cases.find(x=>x.id===n.caseId);if(c)openCase(c,"notifications");}} style={{fontSize:11,color:T.blue,background:T.bluePale,border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontWeight:600,display:"flex",alignItems:"center",gap:4}}><ArrowRight size={11}/>View case</button>}
                      <button onClick={()=>setNotifs(ns=>ns.filter(x=>x.id!==n.id))} style={{background:"none",border:"none",color:T.gray300,cursor:"pointer",padding:0,display:"flex",alignItems:"center"}}><X size={15}/></button>
                    </div>
                  </div>
                ))}
                {notifs.filter(n=>notifTypeFilter==="all"||n.type===notifTypeFilter).length===0&&<div style={{textAlign:"center",padding:48,color:T.gray400,background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,fontSize:14}}>All caught up!</div>}
              </div>
            </div>
          )}

          {/* ══ TOP LISTS ════════════════════════════════════════════════════════ */}
          {view==="toplist"&&(
            <div>
              <p style={{fontSize:22,fontWeight:700,color:T.navy,margin:"0 0 20px",letterSpacing:-0.5}}>Top lists</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px"}}>
                  <p style={{margin:"0 0 16px",fontSize:13,fontWeight:700,color:T.navy,textTransform:"uppercase",letterSpacing:0.5}}>Top infringers</p>
                  {TOP_INF.map((inf,i)=>(
                    <div key={i} onClick={()=>goFiltered({infringer:inf.name})} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderTop:i>0?`1px solid ${T.gray100}`:"none",cursor:"pointer",transition:"opacity 0.15s"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      <div style={{width:24,height:24,borderRadius:6,background:i===0?T.navy:T.gray100,color:i===0?T.white:T.gray500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{i+1}</div>
                      <span style={{flex:1,fontSize:13,color:T.navy,fontWeight:500}}>{inf.name}</span>
                      <Badge label={inf.status} color={sColor(inf.status)} bg={sBg(inf.status)}/>
                      <span style={{fontSize:13,fontWeight:700,color:T.navy,minWidth:16,textAlign:"right"}}>{inf.cases}</span>
                      <span style={{fontSize:11,color:T.blue,fontWeight:600}}>→</span>
                    </div>
                  ))}
                </div>
                <div style={{background:T.white,borderRadius:12,border:`1.5px solid ${T.gray200}`,padding:"18px 20px"}}>
                  <p style={{margin:"0 0 16px",fontSize:13,fontWeight:700,color:T.navy,textTransform:"uppercase",letterSpacing:0.5}}>Top countries</p>
                  {TOP_CTRY.map((ct,i)=>(
                    <div key={i} onClick={()=>goFiltered({country:ct.country})} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderTop:i>0?`1px solid ${T.gray100}`:"none",cursor:"pointer",transition:"opacity 0.15s"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      <span style={{fontSize:18}}>{ct.flag}</span>
                      <span style={{flex:1,fontSize:13,color:T.navy,fontWeight:500}}>{ct.country}</span>
                      <div style={{width:70,height:5,borderRadius:3,background:T.gray100,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${ct.cases/8*100}%`,background:T.blue,borderRadius:3}}></div>
                      </div>
                      <span style={{fontSize:13,fontWeight:700,color:T.navy,minWidth:16,textAlign:"right"}}>{ct.cases}</span>
                      <span style={{fontSize:11,color:T.blue,fontWeight:600}}>→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ BRAND ASSETS ═════════════════════════════════════════════════════ */}
          {view==="assets"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <div><p style={{fontSize:22,fontWeight:700,color:T.navy,margin:"0 0 4px",letterSpacing:-0.5}}>Brand assets</p><p style={{margin:0,fontSize:13,color:T.gray400}}>{activeBrand?.name} · {brandAssets.length} files</p></div>
                <button onClick={()=>setNewAssetOpen(true)} style={{background:T.navy,color:T.white,border:"none",borderRadius:8,padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><Plus size={14}/>Add asset</button>
              </div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:16}}>
                {ASSET_TYPES.map(t=>{
                  const cnt=brandAssets.filter(a=>t==="All"||a.type===t).length;
                  return<button key={t} onClick={()=>setAssetTypeFilter(t)} style={{padding:"6px 14px",borderRadius:7,border:`1.5px solid ${assetTypeFilter===t?T.navy:T.gray200}`,background:assetTypeFilter===t?T.navy:T.white,color:assetTypeFilter===t?T.white:T.gray600,fontSize:12,cursor:"pointer",fontWeight:assetTypeFilter===t?600:400,transition:"all 0.15s"}}>{t!=="All"&&ASSET_ICONS[t]+" "}{t} ({cnt})</button>;
                })}
              </div>
              <div onDragOver={e=>e.preventDefault()} onDrop={handleDropAsset} style={{border:`2px dashed ${T.blue}`,borderRadius:10,padding:"18px",textAlign:"center",background:T.bluePale,marginBottom:20,cursor:"default"}}>
                <p style={{margin:0,fontSize:13,color:T.blue,fontWeight:600}}>⬆ Drop files here to upload assets</p>
              </div>
              {(assetTypeFilter==="All"?ASSET_TYPES.filter(t=>t!=="All"):[assetTypeFilter]).map(type=>{
                const typeAssets=brandAssets.filter(a=>a.type===type);
                if(!typeAssets.length)return null;
                return(
                  <div key={type} style={{marginBottom:20}}>
                    <p style={{margin:"0 0 10px",fontSize:11,fontWeight:700,color:T.gray500,textTransform:"uppercase",letterSpacing:0.8}}>{ASSET_ICONS[type]} {type}</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                      {typeAssets.map(a=>(
                        <div key={a.id} style={{background:T.white,borderRadius:10,border:`1.5px solid ${T.gray200}`,padding:"14px 16px",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.gray300;e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.gray200;e.currentTarget.style.boxShadow="none";}}>
                          <div style={{width:36,height:36,borderRadius:9,background:T.bluePale,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10,color:T.blue,flexShrink:0}}><Shield size={18}/></div>
                          <p style={{margin:"0 0 3px",fontSize:13,fontWeight:600,color:T.navy}}>{a.name}</p>
                          <p style={{margin:0,fontSize:10,color:T.gray400,marginBottom:12}}>{a.date} · {a.size}</p>
                          <div style={{display:"flex",gap:6}}>
                            <button style={{fontSize:11,color:T.blue,background:T.bluePale,border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontWeight:600,display:"flex",alignItems:"center",gap:4}}><Download size={11}/>Download</button>
                            <button onClick={()=>setAssets(as=>as.filter(x=>x.id!==a.id))} style={{fontSize:11,color:T.danger,background:T.dangerPale,border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontWeight:600,display:"flex",alignItems:"center",gap:4}}><Trash2 size={11}/>Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Screenshot lightbox */}
      {ssPreview&&(
        <div onClick={()=>setSsPreview(null)} style={{position:"absolute",inset:0,background:"rgba(11,31,75,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:60}}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.white,borderRadius:14,padding:16,maxWidth:560,width:"90%",border:`1px solid ${T.gray200}`}}>
            <img src={ssPreview} alt="" style={{width:"100%",borderRadius:9,display:"block"}}/>
            <button onClick={()=>setSsPreview(null)} style={{marginTop:10,width:"100%",padding:"8px",borderRadius:8,border:`1.5px solid ${T.gray200}`,background:T.white,fontSize:12,cursor:"pointer",color:T.gray600,fontWeight:500}}>Close</button>
          </div>
        </div>
      )}

      {/* New Case Modal */}
      {newCaseOpen&&(
        <div style={{position:"absolute",inset:0,background:"rgba(11,31,75,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}}>
          <div style={{background:T.white,borderRadius:14,padding:24,width:460,maxHeight:"85vh",overflow:"auto",border:`1px solid ${T.gray200}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <p style={{margin:0,fontSize:16,fontWeight:700,color:T.navy}}>New case</p>
              <button onClick={()=>setNewCaseOpen(false)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:T.gray400,fontWeight:700}}>×</button>
            </div>
            {[["Title","title"],["Infringer","infringer"],["Platform","platform"],["Country","country"]].map(([l,k])=>(
              <div key={k} style={{marginBottom:12}}>
                <label style={{fontSize:11,fontWeight:600,color:T.gray700,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:0.4}}>{l}</label>
                <input value={ncForm[k]} onChange={e=>setNcForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",padding:"9px 12px",borderRadius:7,border:`1.5px solid ${T.gray200}`,fontSize:13,outline:"none",boxSizing:"border-box",color:T.navy}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.gray200}/>
              </div>
            ))}
            {[["Module","module",MODULES],["Priority","priority",["Critical","High","Medium","Low"]]].map(([l,k,opts])=>(
              <div key={k} style={{marginBottom:12}}>
                <label style={{fontSize:11,fontWeight:600,color:T.gray700,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:0.4}}>{l}</label>
                <select value={ncForm[k]} onChange={e=>setNcForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",padding:"9px 12px",borderRadius:7,border:`1.5px solid ${T.gray200}`,fontSize:13,outline:"none",background:T.white,boxSizing:"border-box",color:T.navy}}>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div style={{marginBottom:18}}>
              <label style={{fontSize:11,fontWeight:600,color:T.gray700,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:0.4}}>Description</label>
              <textarea value={ncForm.description} onChange={e=>setNcForm(f=>({...f,description:e.target.value}))} rows={3} style={{width:"100%",padding:"9px 12px",borderRadius:7,border:`1.5px solid ${T.gray200}`,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box",color:T.navy}}/>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>setNewCaseOpen(false)} style={{padding:"9px 18px",borderRadius:8,border:`1.5px solid ${T.gray200}`,background:T.white,fontSize:13,cursor:"pointer",color:T.gray600,fontWeight:500}}>Cancel</button>
              <button onClick={submitCase} style={{padding:"9px 18px",borderRadius:8,background:T.navy,color:T.white,border:"none",fontSize:13,cursor:"pointer",fontWeight:600}}>Create case</button>
            </div>
          </div>
        </div>
      )}

      {/* New Asset Modal */}
      {newAssetOpen&&(
        <div style={{position:"absolute",inset:0,background:"rgba(11,31,75,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}}>
          <div style={{background:T.white,borderRadius:14,padding:24,width:380,border:`1px solid ${T.gray200}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <p style={{margin:0,fontSize:16,fontWeight:700,color:T.navy}}>Add asset</p>
              <button onClick={()=>setNewAssetOpen(false)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:T.gray400,fontWeight:700}}>×</button>
            </div>
            {[["Name","name"],["Size (e.g. 2.1MB)","size"]].map(([l,k])=>(
              <div key={k} style={{marginBottom:12}}>
                <label style={{fontSize:11,fontWeight:600,color:T.gray700,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:0.4}}>{l}</label>
                <input value={naForm[k]} onChange={e=>setNaForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",padding:"9px 12px",borderRadius:7,border:`1.5px solid ${T.gray200}`,fontSize:13,outline:"none",boxSizing:"border-box",color:T.navy}}/>
              </div>
            ))}
            <div style={{marginBottom:18}}>
              <label style={{fontSize:11,fontWeight:600,color:T.gray700,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:0.4}}>Type</label>
              <select value={naForm.type} onChange={e=>setNaForm(f=>({...f,type:e.target.value}))} style={{width:"100%",padding:"9px 12px",borderRadius:7,border:`1.5px solid ${T.gray200}`,fontSize:13,outline:"none",background:T.white,boxSizing:"border-box",color:T.navy}}>
                {ASSET_TYPES.filter(t=>t!=="All").map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>setNewAssetOpen(false)} style={{padding:"9px 18px",borderRadius:8,border:`1.5px solid ${T.gray200}`,background:T.white,fontSize:13,cursor:"pointer",color:T.gray600,fontWeight:500}}>Cancel</button>
              <button onClick={submitAsset} style={{padding:"9px 18px",borderRadius:8,background:T.navy,color:T.white,border:"none",fontSize:13,cursor:"pointer",fontWeight:600}}>Add asset</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <div style={{position:"absolute",bottom:20,right:20,zIndex:40}}>
        {chatOpen?(
          <div style={{width:320,background:T.white,borderRadius:16,border:`1px solid ${T.gray200}`,display:"flex",flexDirection:"column",height:420,boxShadow:"0 8px 32px rgba(11,31,75,0.15)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",background:T.navy,borderRadius:"16px 16px 0 0"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",color:T.white}}><Sparkles size={12}/></div>
                <div><p style={{margin:0,fontSize:12,fontWeight:600,color:T.white}}>AI assistant</p><p style={{margin:0,fontSize:9,color:"rgba(255,255,255,0.5)"}}>Powered by Claude</p></div>
              </div>
              <button onClick={()=>setChatOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:16,cursor:"pointer",fontWeight:700}}>×</button>
            </div>
            <div style={{flex:1,overflow:"auto",padding:12,display:"flex",flexDirection:"column",gap:8}}>
              {chatMsgs.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"84%",padding:"8px 12px",borderRadius:10,background:m.role==="user"?T.navy:T.gray50,color:m.role==="user"?T.white:T.navy,fontSize:12,lineHeight:1.6,border:m.role==="assistant"?`1px solid ${T.gray200}`:"none",fontWeight:m.role==="user"?400:400}}>{m.text}</div>
                </div>
              ))}
              {chatLoading&&<div style={{display:"flex",justifyContent:"flex-start"}}><div style={{padding:"8px 12px",borderRadius:10,background:T.gray50,fontSize:12,color:T.gray400,border:`1px solid ${T.gray200}`}}>Thinking…</div></div>}
              <div ref={chatEndRef}></div>
            </div>
            <div style={{padding:"10px 12px",borderTop:`1px solid ${T.gray200}`,display:"flex",gap:6}}>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask anything…" style={{flex:1,padding:"8px 11px",borderRadius:8,border:`1.5px solid ${T.gray200}`,fontSize:12,outline:"none",color:T.navy}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.gray200}/>
              <button onClick={sendChat} style={{padding:"8px 14px",borderRadius:8,background:T.navy,color:T.white,border:"none",fontSize:12,cursor:"pointer",fontWeight:600,display:"flex",alignItems:"center"}}><Send size={13}/></button>
            </div>
          </div>
        ):(
          <button onClick={()=>setChatOpen(true)} style={{width:44,height:44,borderRadius:"50%",background:T.navy,color:T.white,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(11,31,75,0.3)"}}><Sparkles size={18}/></button>
        )}
      </div>
    </div>
  );
}