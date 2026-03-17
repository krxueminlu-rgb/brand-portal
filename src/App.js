import { useState, useRef } from "react";
import { LayoutDashboard, FolderOpen, Bell, BarChart2, Shield, FileText, ArrowRight, Upload, Clock, MessageSquare, TrendingUp, FileBarChart, LogOut, Plus, Settings2, SortAsc, SortDesc, X, Pin, AlertTriangle, CheckCircle2, Download, Trash2, Send, Sparkles, ChevronDown, Search, Globe, ShoppingCart, Megaphone, Tag, Filter, MoreHorizontal, ChevronRight, Circle, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const T = {
  navy:"#0A1628", navyLight:"#0F2040", navyMid:"#162B55",
  blue:"#1D6EE8", blueLight:"#3B82F6", bluePale:"#EBF3FE",
  white:"#FFFFFF", offWhite:"#F9FAFB",
  gray50:"#F9FAFB", gray100:"#F3F4F6", gray200:"#E5E7EB",
  gray300:"#D1D5DB", gray400:"#9CA3AF", gray500:"#6B7280", gray700:"#374151", gray900:"#111827",
  success:"#16A34A", successPale:"#F0FDF4", successMid:"#DCFCE7",
  warning:"#D97706", warningPale:"#FFFBEB", warningMid:"#FEF3C7",
  danger:"#DC2626", dangerPale:"#FEF2F2", dangerMid:"#FEE2E2",
  purple:"#7C3AED", purplePale:"#F5F3FF",
  teal:"#0D9488", tealPale:"#F0FDFA",
  orange:"#EA580C", orangePale:"#FFF7ED",
};

const BRANDS=[
  {id:1,name:"NordLight",logo:"NL",industry:"Apparel",color:T.blue,desc:"Fashion & outdoor clothing"},
  {id:2,name:"PureOak",logo:"PO",industry:"Cosmetics",color:T.teal,desc:"Natural skincare & beauty"},
  {id:3,name:"VoltEdge",logo:"VE",industry:"Electronics",color:T.purple,desc:"Consumer electronics"},
];
const MODULES=["Marketplace","Social Media","Domain","Keyword Ad","Web Content"];
const MODULE_ICON=(m,s=14)=>({
  "Marketplace":<ShoppingCart size={s}/>,
  "Social Media":<Megaphone size={s}/>,
  "Domain":<Globe size={s}/>,
  "Keyword Ad":<Search size={s}/>,
  "Web Content":<FileText size={s}/>,
}[m]||<FileText size={s}/>);
const MODULE_COLOR={"Marketplace":T.blue,"Social Media":"#E11D48","Domain":T.purple,"Keyword Ad":T.teal,"Web Content":T.orange};
const ASSET_TYPES=["All","Trademark","Copyright","Patent","Logo","Product Images","Website","Other"];
const PERIODS=[{label:"7D",days:7},{label:"30D",days:30},{label:"90D",days:90},{label:"1Y",days:365},{label:"All",days:9999}];
const TAG_COLORS={"infringer":[T.dangerPale,T.danger],"product":[T.bluePale,T.blue],"content":[T.successPale,T.success]};

const makeSS=(label,color,w=400,h=220)=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${color}"/><text x="${w/2}" y="${h/2}" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="system-ui" font-size="12">${label}</text></svg>`)}`;
const sColor=s=>({Active:T.blue,Resolved:T.success,"Legal Review":T.warning,Pending:T.gray400}[s]||T.gray400);
const sBg=s=>({Active:T.bluePale,Resolved:T.successPale,"Legal Review":T.warningPale,Pending:T.gray100}[s]||T.gray100);
const pColor=p=>({Critical:T.danger,High:T.warning,Medium:T.blue,Low:T.gray400}[p]||T.gray400);
const pBg=p=>({Critical:T.dangerPale,High:T.warningPale,Medium:T.bluePale,Low:T.gray100}[p]||T.gray100);
const nColor=t=>({success:T.success,warning:T.warning,danger:T.danger,info:T.blue}[t]||T.gray400);
const nIcon=t=>({success:<CheckCircle size={14} color={T.success}/>,warning:<AlertCircle size={14} color={T.warning}/>,danger:<XCircle size={14} color={T.danger}/>,info:<Circle size={14} color={T.blue}/>}[t]||<Circle size={14}/>);

const INIT_CASES=[
  {id:"BP-001",title:"Counterfeit Jackets — Amazon DE",brand:1,module:"Marketplace",status:"Active",priority:"High",isLead:true,relatedCases:[{id:"BP-001a",url:"amazon.de/dp/B0CFAKE001",tags:["infringer","product"]},{id:"BP-001b",url:"amazon.de/dp/B0CFAKE002",tags:["product"]}],bulkEnforcement:false,infringer:"FashionDrop GmbH",country:"Germany",platform:"Amazon",opened:"2024-01-15",updated:"2024-03-10",progress:65,description:"Multiple listings selling counterfeit NordLight jackets. Images stolen from official website.",screenshots:[makeSS("Amazon DE Listing",T.blue),makeSS("Seller Profile","#8e44ad")],previewShot:makeSS("Amazon DE",T.blue,200,110),mp:{price:"€29.99",stock:142,sold:834,offlineAction:false,images:[makeSS("Fake Jacket","#2c3e50",80,80),makeSS("Label","#7f8c8d",80,80)]},timeline:[{date:"2024-01-15",event:"Case opened",type:"open"},{date:"2024-02-05",event:"Takedown notice sent",type:"action"},{date:"2024-02-20",event:"2 listings removed",type:"success"},{date:"2024-03-10",event:"Follow-up sent",type:"action"}],comments:[{user:"Sarah K.",date:"2024-03-10",text:"Amazon responded — escalating to brand registry."}],documents:[],pinned:false},
  {id:"BP-002",title:"Logo Misuse — Instagram Influencer",brand:1,module:"Social Media",status:"Resolved",priority:"Medium",isLead:true,relatedCases:[{id:"BP-002a",url:"instagram.com/p/fake_post_001",tags:["content"]},{id:"BP-002b",url:"instagram.com/p/fake_post_002",tags:["content","infringer"]}],bulkEnforcement:false,infringer:"@style_fakes_eu",country:"France",platform:"Instagram",opened:"2024-02-01",updated:"2024-03-01",progress:100,description:"Influencer using NordLight logo without authorization.",screenshots:[makeSS("Instagram Post","#c0392b")],previewShot:makeSS("Instagram","#c0392b",200,110),sm:{profileName:"@style_fakes_eu",followers:"48.2K",created:"2021-06-15"},timeline:[{date:"2024-02-01",event:"Case opened",type:"open"},{date:"2024-02-10",event:"DMCA notice filed",type:"action"},{date:"2024-03-01",event:"Account suspended",type:"success"}],comments:[{user:"Sarah K.",date:"2024-03-01",text:"Resolved."}],documents:[],pinned:false},
  {id:"BP-003",title:"Domain Squatting — nordlight-sale.com",brand:1,module:"Domain",status:"Active",priority:"Critical",isLead:false,relatedCases:[],bulkEnforcement:false,infringer:"Unknown",country:"Netherlands",platform:"Web",opened:"2024-03-01",updated:"2024-03-12",progress:30,description:"Fraudulent website mimicking NordLight store.",screenshots:[makeSS("Phishing Homepage","#c0392b")],previewShot:makeSS("Phishing Site","#c0392b",200,110),timeline:[{date:"2024-03-01",event:"Case opened",type:"open"},{date:"2024-03-05",event:"Registrar contacted",type:"action"},{date:"2024-03-12",event:"Awaiting response",type:"pending"}],comments:[],documents:[],pinned:false},
  {id:"BP-004",title:"Brand Keyword Bidding — Google Ads",brand:1,module:"Keyword Ad",status:"Active",priority:"High",isLead:true,relatedCases:[{id:"BP-004a",url:"google.com/search?q=nordlight+buy",tags:["content"]}],bulkEnforcement:false,infringer:"RivalStore GmbH",country:"Germany",platform:"Google Ads",opened:"2024-02-10",updated:"2024-03-13",progress:40,description:"Competitor bidding on NordLight brand terms.",screenshots:[makeSS("Google Ad","#185F68")],previewShot:makeSS("Google Ads","#185F68",200,110),timeline:[{date:"2024-02-10",event:"Case opened",type:"open"},{date:"2024-02-18",event:"Google complaint filed",type:"action"},{date:"2024-03-13",event:"Pending review",type:"pending"}],comments:[],documents:[],pinned:false},
  {id:"BP-005",title:"Copied Descriptions — fashionreviews.net",brand:1,module:"Web Content",status:"Active",priority:"Low",isLead:false,relatedCases:[],bulkEnforcement:false,infringer:"fashionreviews.net",country:"United Kingdom",platform:"Web",opened:"2024-03-05",updated:"2024-03-14",progress:20,description:"Website copying NordLight product descriptions.",screenshots:[makeSS("Copied Content","#6c3483")],previewShot:makeSS("Web Content","#6c3483",200,110),timeline:[{date:"2024-03-05",event:"Case opened",type:"open"},{date:"2024-03-14",event:"DMCA sent",type:"action"}],comments:[],documents:[],pinned:false},
  {id:"BP-006",title:"Fake Serums — eBay UK",brand:2,module:"Marketplace",status:"Active",priority:"High",isLead:true,relatedCases:[{id:"BP-006a",url:"ebay.co.uk/itm/fake-serum-001",tags:["product","infringer"]}],bulkEnforcement:true,infringer:"BeautySupplyPlus",country:"United Kingdom",platform:"eBay",opened:"2024-02-20",updated:"2024-03-11",progress:45,description:"Counterfeit PureOak serums with dangerous ingredients.",screenshots:[makeSS("eBay Listing","#c0392b")],previewShot:makeSS("eBay UK","#c0392b",200,110),mp:{price:"£12.99",stock:67,sold:1240,offlineAction:false,images:[makeSS("Fake Serum","#c0392b",80,80),makeSS("Packaging","#e67e22",80,80)]},timeline:[{date:"2024-02-20",event:"Case opened",type:"open"},{date:"2024-03-11",event:"Counterfeit confirmed",type:"success"}],comments:[],documents:[],pinned:false},
  {id:"BP-007",title:"Patent Infringement — Charger Design",brand:3,module:"Marketplace",status:"Legal Review",priority:"Critical",isLead:true,relatedCases:[{id:"BP-007a",url:"alibaba.com/product/techclone-v1",tags:["product","infringer"]},{id:"BP-007b",url:"techclone.cn/charger-specs",tags:["content","infringer"]}],bulkEnforcement:false,infringer:"TechClone Ltd",country:"China",platform:"Alibaba",opened:"2024-01-10",updated:"2024-03-09",progress:55,description:"Exact copy of VoltEdge fast-charger design.",screenshots:[makeSS("Alibaba Listing","#e67e22")],previewShot:makeSS("Alibaba","#e67e22",200,110),mp:{price:"$8.50",stock:5000,sold:12400,offlineAction:true,images:[makeSS("Clone Charger","#e67e22",80,80),makeSS("Packaging","#2c3e50",80,80)]},timeline:[{date:"2024-01-10",event:"Case opened",type:"open"},{date:"2024-02-15",event:"C&D sent",type:"action"},{date:"2024-03-09",event:"Under legal review",type:"pending"}],comments:[{user:"Legal",date:"2024-03-09",text:"C&D acknowledged."}],documents:[],pinned:false},
];
const INIT_ASSETS=[
  {id:"a1",brand:1,name:"NordLight Logo Pack",type:"Logo",size:"4.2 MB",date:"2024-01-10"},
  {id:"a2",brand:1,name:"EU Trademark Certificate",type:"Trademark",size:"1.1 MB",date:"2023-06-15"},
  {id:"a3",brand:1,name:"EU Design Patent 2019",type:"Patent",size:"2.3 MB",date:"2023-06-15"},
  {id:"a4",brand:1,name:"Brand Guidelines 2024",type:"Other",size:"8.7 MB",date:"2024-01-05"},
  {id:"a5",brand:1,name:"Product Photography Kit",type:"Product Images",size:"45 MB",date:"2024-02-01"},
  {id:"a6",brand:1,name:"Official Website Screenshot",type:"Website",size:"0.8 MB",date:"2024-03-01"},
  {id:"a7",brand:1,name:"Copyright Registration US",type:"Copyright",size:"0.5 MB",date:"2023-11-20"},
  {id:"a8",brand:2,name:"PureOak Logo Pack",type:"Logo",size:"3.1 MB",date:"2024-01-12"},
  {id:"a9",brand:2,name:"EU Trademark Certificate",type:"Trademark",size:"1.2 MB",date:"2023-08-10"},
  {id:"a10",brand:3,name:"VoltEdge Patent Bundle",type:"Patent",size:"5.4 MB",date:"2023-09-01"},
];
const INIT_NOTIFS=[
  {id:1,type:"success",text:"BP-002: Resolved — Instagram account suspended",time:"2h ago",caseId:"BP-002"},
  {id:2,type:"danger",text:"BP-003: New phishing reports from customers",time:"5h ago",caseId:"BP-003"},
  {id:3,type:"warning",text:"BP-003: Domain registrar response overdue",time:"1d ago",caseId:"BP-003"},
  {id:4,type:"info",text:"BP-007: New document uploaded by legal team",time:"1d ago",caseId:"BP-007"},
  {id:5,type:"warning",text:"BP-001: Amazon seller re-listed removed products",time:"4d ago",caseId:"BP-001"},
];
const REPORTS=[
  {id:"r1",name:"Monthly Report — Feb 2024",date:"2024-03-01",size:"2.1 MB",period:"monthly"},
  {id:"r2",name:"Weekly Summary — W11 2024",date:"2024-03-15",size:"0.8 MB",period:"weekly"},
  {id:"r3",name:"Annual Report — 2023",date:"2024-01-15",size:"5.6 MB",period:"annual"},
  {id:"r4",name:"Monthly Report — Jan 2024",date:"2024-02-01",size:"1.9 MB",period:"monthly"},
];
const TOP_INF=[{name:"FashionDrop GmbH",cases:4,status:"Active"},{name:"TechClone Ltd",cases:3,status:"Legal Review"},{name:"BeautySupplyPlus",cases:2,status:"Active"},{name:"@style_fakes_eu",cases:1,status:"Resolved"},{name:"RivalStore GmbH",cases:1,status:"Active"}];
const TOP_CTRY=[{country:"Germany",flag:"🇩🇪",cases:8},{country:"China",flag:"🇨🇳",cases:6},{country:"United Kingdom",flag:"🇬🇧",cases:5},{country:"Netherlands",flag:"🇳🇱",cases:3},{country:"France",flag:"🇫🇷",cases:2}];
const ALL_FILTER_TYPES_DEF=(bc)=>[
  {key:"module",label:"Module",options:MODULES},
  {key:"status",label:"Status",options:["Active","Resolved","Legal Review"]},
  {key:"priority",label:"Priority",options:["Critical","High","Medium","Low"]},
  {key:"country",label:"Country",options:[...new Set(bc.map(c=>c.country).filter(Boolean))]},
  {key:"infringer",label:"Infringer",options:[...new Set(bc.map(c=>c.infringer).filter(Boolean))]},
  {key:"period",label:"Period",options:PERIODS.map(p=>p.label)},
];

// ── Realpro Logo ──────────────────────────────────────────────────────────────
function RealproLogo({size=32,showText=true,darkBg=true}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:showText?10:0}}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB"/>
            <stop offset="100%" stopColor="#0A1628"/>
          </linearGradient>
          <radialGradient id="rg1" cx="70%" cy="30%" r="50%">
            <stop offset="0%" stopColor="rgba(99,179,237,0.3)"/>
            <stop offset="100%" stopColor="rgba(99,179,237,0)"/>
          </radialGradient>
        </defs>
        <rect width="40" height="40" rx="9" fill="url(#lg1)"/>
        <rect width="40" height="40" rx="9" fill="url(#rg1)"/>
        <circle cx="20" cy="20" r="12" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none"/>
        <path d="M6 20 Q10 6 20 6 Q30 6 34 20" stroke="rgba(99,179,237,0.35)" strokeWidth="0.8" fill="none"/>
        <path d="M13 12H22.5C24.9 12 26.5 13.6 26.5 15.8C26.5 17.5 25.5 18.9 24 19.4L27 26H23.8L21 20H16.5V26H13V12ZM16.5 17.2H22C22.9 17.2 23.5 16.6 23.5 15.8C23.5 15 22.9 14.4 22 14.4H16.5V17.2Z" fill="white"/>
        <circle cx="31.5" cy="8.5" r="4" fill="#2563EB"/>
        <circle cx="31.5" cy="8.5" r="2.5" fill="white" fillOpacity="0.9"/>
        <circle cx="31.5" cy="8.5" r="1" fill="#2563EB"/>
      </svg>
      {showText&&(
        <span style={{fontSize:size*0.42,fontWeight:800,letterSpacing:-0.5,lineHeight:1,color:darkBg?T.white:T.navy}}>Real<span style={{color:T.blue}}>pro</span></span>
      )}
    </div>
  );
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function Badge({children,color,bg,size=11}){
  return <span style={{display:"inline-flex",alignItems:"center",gap:3,fontSize:size,padding:"2px 8px",borderRadius:4,background:bg,color,fontWeight:500,whiteSpace:"nowrap"}}>{children}</span>;
}

function Pill({children,active,onClick}){
  return(
    <button onClick={onClick} style={{padding:"5px 14px",borderRadius:20,border:`1px solid ${active?T.blue:T.gray200}`,background:active?T.blue:T.white,color:active?T.white:T.gray500,fontSize:12,fontWeight:active?600:400,cursor:"pointer",transition:"all 0.15s"}}>{children}</button>
  );
}

function Toggle({on,onToggle,label,color}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      {label&&<span style={{fontSize:12,color:T.gray500}}>{label}</span>}
      <div onClick={onToggle} style={{width:36,height:20,borderRadius:10,background:on?(color||T.success):T.gray200,position:"relative",cursor:"pointer",transition:"background 0.2s",flexShrink:0}}>
        <div style={{width:16,height:16,borderRadius:"50%",background:T.white,position:"absolute",top:2,left:on?18:2,transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}></div>
      </div>
      <span style={{fontSize:11,color:on?(color||T.success):T.gray400,fontWeight:500}}>{on?"ON":"OFF"}</span>
    </div>
  );
}

function DropZone({onDrop,label}){
  const [over,setOver]=useState(false);
  return(
    <div onDragOver={e=>{e.preventDefault();setOver(true);}} onDragLeave={()=>setOver(false)} onDrop={e=>{e.preventDefault();setOver(false);onDrop(e);}}
      style={{border:`1.5px dashed ${over?T.blue:T.gray200}`,borderRadius:8,padding:"16px",textAlign:"center",background:over?T.bluePale:T.white,transition:"all 0.15s"}}>
      <Upload size={16} color={over?T.blue:T.gray300} style={{margin:"0 auto 6px",display:"block"}}/>
      <p style={{margin:0,fontSize:12,color:over?T.blue:T.gray400}}>{label||"Drop files here"}</p>
    </div>
  );
}

function PeriodBar({period,setPeriod}){
  return(
    <div style={{display:"flex",gap:2,background:T.gray100,borderRadius:8,padding:3}}>
      {PERIODS.map(p=>(
        <button key={p.label} onClick={()=>setPeriod(p.label)} style={{padding:"4px 12px",borderRadius:6,border:"none",background:period===p.label?T.white:"transparent",color:period===p.label?T.gray900:T.gray400,fontSize:11,fontWeight:period===p.label?600:400,cursor:"pointer",transition:"all 0.15s",boxShadow:period===p.label?"0 1px 3px rgba(0,0,0,0.08)":"none"}}>{p.label}</button>
      ))}
    </div>
  );
}

// Stat card — Clawboard style
function StatCard({label,value,color,icon,sub,onClick}){
  return(
    <div onClick={onClick} style={{background:T.white,borderRadius:10,border:`1px solid ${T.gray200}`,padding:"20px 22px",cursor:onClick?"pointer":"default",transition:"box-shadow 0.15s"}} onMouseEnter={e=>{if(onClick)e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.07)";}} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
        <p style={{margin:0,fontSize:10,fontWeight:600,color:T.gray400,textTransform:"uppercase",letterSpacing:0.8}}>{label}</p>
        <div style={{color:T.gray300}}>{icon}</div>
      </div>
      <p style={{margin:"0 0 4px",fontSize:30,fontWeight:700,color,letterSpacing:-1,lineHeight:1}}>{value}</p>
      {sub&&<p style={{margin:0,fontSize:11,color:T.gray400}}>{sub}</p>}
    </div>
  );
}

// Section header — Clawboard style
function SectionHeader({title,action,actionLabel}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
      <p style={{margin:0,fontSize:11,fontWeight:600,color:T.gray400,textTransform:"uppercase",letterSpacing:0.8}}>{title}</p>
      {action&&<button onClick={action} style={{fontSize:11,color:T.blue,background:"none",border:"none",cursor:"pointer",fontWeight:500,display:"flex",alignItems:"center",gap:3}}>{actionLabel||"View all"}<ChevronRight size={12}/></button>}
    </div>
  );
}

// Nav item — sidebar
function NavItem({icon,label,active,badge,onClick}){
  return(
    <div onClick={onClick} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",borderRadius:7,cursor:"pointer",marginBottom:1,background:active?"rgba(255,255,255,0.10)":"transparent",transition:"background 0.15s"}} onMouseEnter={e=>{if(!active)e.currentTarget.style.background="rgba(255,255,255,0.05)";}} onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent";}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{color:active?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.4)",display:"flex"}}>{icon}</span>
        <span style={{fontSize:13,color:active?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.55)",fontWeight:active?500:400}}>{label}</span>
      </div>
      {badge>0&&<span style={{background:T.danger,color:T.white,borderRadius:10,fontSize:9,padding:"2px 6px",fontWeight:600,minWidth:16,textAlign:"center"}}>{badge}</span>}
    </div>
  );
}

// Card wrapper
function Card({children,style={}}){
  return <div style={{background:T.white,borderRadius:10,border:`1px solid ${T.gray200}`,padding:"18px 20px",...style}}>{children}</div>;
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
  const inPeriod=(d,days)=>(now-new Date(d))/86400000<=days;
  const dashDays=PERIODS.find(p=>p.label===dashPeriod)?.days||30;
  const dashCases=brandCases.filter(c=>inPeriod(c.opened,dashDays));

  const filteredCases=brandCases.filter(c=>{
    if(searchQ&&![c.title,c.infringer,c.id].some(v=>v.toLowerCase().includes(searchQ.toLowerCase())))return false;
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
  const handleDropAsset=(e)=>{e.preventDefault();setAssets(a=>[...a,...[...e.dataTransfer.files].map((f,i)=>({id:`a_${Date.now()}_${i}`,brand:activeBrand.id,name:f.name,type:"Other",size:`${(f.size/1048576).toFixed(1)} MB`,date:now.toISOString().slice(0,10)}))]);};

  const sendChat=async()=>{
    if(!chatInput.trim()||chatLoading)return;
    const msg=chatInput.trim();setChatInput("");
    setChatMsgs(m=>[...m,{role:"user",text:msg}]);setChatLoading(true);
    try{
      const ctx=`Brand protection assistant for Realpro portal. Brand: ${activeBrand?.name}. Cases: ${brandCases.map(c=>`${c.id}: ${c.title} (${c.status}, ${c.priority}, ${c.module})`).join("; ")}. Be concise.`;
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
    <div style={{minHeight:560,display:"flex",background:T.offWhite}}>
      <div style={{width:"42%",background:T.navy,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"48px 48px 40px"}}>
        <RealproLogo size={34} showText={true} darkBg={true}/>
        <div>
          <p style={{fontSize:28,fontWeight:700,color:T.white,lineHeight:1.25,margin:"0 0 14px",letterSpacing:-0.5}}>Brand protection,<br/>intelligently managed.</p>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.8,margin:"0 0 40px"}}>Monitor, detect and enforce your brand rights across every platform from a single client portal.</p>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {[[<Shield size={16}/>,T.blue,"IP Enforcement","Takedowns across marketplaces, domains & social"],[<TrendingUp size={16}/>,T.success,"Live Analytics","Real-time dashboards and case tracking"],[<Sparkles size={16}/>,T.purple,"AI Assistant","Instant answers on cases and strategy"]].map(([ic,col,t,d])=>(
              <div key={t} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:30,height:30,borderRadius:7,background:`${col}22`,border:`1px solid ${col}44`,display:"flex",alignItems:"center",justifyContent:"center",color:col,flexShrink:0}}>{ic}</div>
                <div><p style={{margin:"0 0 2px",fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.8)"}}>{t}</p><p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.35)"}}>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
        <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.2)"}}>© 2024 Realpro. All rights reserved.</p>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:T.white}}>
        <div style={{width:360}}>
          <p style={{fontSize:22,fontWeight:700,color:T.gray900,margin:"0 0 4px"}}>Sign in</p>
          <p style={{fontSize:13,color:T.gray400,margin:"0 0 28px"}}>Enter your client access code to continue</p>
          <label style={{fontSize:11,fontWeight:600,color:T.gray700,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>Access code</label>
          <input value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••" style={{width:"100%",padding:"11px 14px",borderRadius:8,border:`1.5px solid ${codeErr?T.danger:T.gray200}`,fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:10,letterSpacing:6,fontFamily:"monospace",color:T.gray900,background:T.white}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=codeErr?T.danger:T.gray200}/>
          {codeErr&&<p style={{color:T.danger,fontSize:12,margin:"0 0 10px",display:"flex",alignItems:"center",gap:4}}><AlertCircle size={12}/>Invalid access code. Please contact your account manager.</p>}
          <button onClick={login} style={{width:"100%",padding:"11px",borderRadius:8,background:T.navy,color:T.white,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>Continue <ArrowRight size={14}/></button>
        </div>
      </div>
    </div>
  );

  // ── BRAND SELECT ─────────────────────────────────────────────────────────
  if(stage==="brand")return(
    <div style={{minHeight:560,display:"flex",alignItems:"center",justifyContent:"center",background:T.offWhite}}>
      <div style={{width:580}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:20}}><RealproLogo size={32} showText={true} darkBg={false}/></div>
          <p style={{fontSize:22,fontWeight:700,color:T.gray900,margin:"0 0 6px"}}>Select a brand profile</p>
          <p style={{fontSize:13,color:T.gray400,margin:0}}>Choose which brand to manage</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {BRANDS.map(b=>{
            const bc=cases.filter(c=>c.brand===b.id);
            const active=bc.filter(c=>c.status==="Active").length;
            const critical=bc.filter(c=>c.priority==="Critical").length;
            return(
              <div key={b.id} onClick={()=>{setActiveBrand(b);setStage("portal");setView("dashboard");}} style={{background:T.white,borderRadius:12,padding:"24px 20px",border:`1px solid ${T.gray200}`,cursor:"pointer",textAlign:"center",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=b.color;e.currentTarget.style.boxShadow=`0 4px 16px rgba(0,0,0,0.08)`;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.gray200;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
                <div style={{width:48,height:48,borderRadius:12,background:b.color,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:T.white,fontSize:15,fontWeight:700}}>{b.logo}</div>
                <p style={{margin:"0 0 3px",fontSize:14,fontWeight:700,color:T.gray900}}>{b.name}</p>
                <p style={{margin:"0 0 16px",fontSize:11,color:T.gray400}}>{b.desc}</p>
                <div style={{display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap"}}>
                  <Badge color={T.blue} bg={T.bluePale}>{bc.length} cases</Badge>
                  {active>0&&<Badge color={T.warning} bg={T.warningMid}>{active} active</Badge>}
                  {critical>0&&<Badge color={T.danger} bg={T.dangerMid}>{critical} critical</Badge>}
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
    <div style={{display:"flex",minHeight:580,background:T.offWhite,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif",fontSize:14,position:"relative"}}>

      {/* Sidebar */}
      <div style={{width:216,background:T.navy,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"18px 16px 14px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          <RealproLogo size={28} showText={true} darkBg={true}/>
        </div>
        {/* Brand switcher */}
        <div style={{padding:"10px 12px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          <p style={{margin:"0 0 6px",fontSize:9,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:1,paddingLeft:4}}>Brand</p>
          {BRANDS.map(b=>(
            <div key={b.id} onClick={()=>{setActiveBrand(b);setActiveFilters({});setView("dashboard");setSelectedCase(null);}} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:6,cursor:"pointer",background:activeBrand?.id===b.id?"rgba(255,255,255,0.09)":"transparent",marginBottom:1,transition:"background 0.15s"}} onMouseEnter={e=>{if(activeBrand?.id!==b.id)e.currentTarget.style.background="rgba(255,255,255,0.04)";}} onMouseLeave={e=>{if(activeBrand?.id!==b.id)e.currentTarget.style.background="transparent";}}>
              <div style={{width:18,height:18,borderRadius:4,background:b.color,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontSize:7,fontWeight:700,flexShrink:0}}>{b.logo}</div>
              <span style={{fontSize:12,color:activeBrand?.id===b.id?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.45)",fontWeight:activeBrand?.id===b.id?500:400}}>{b.name}</span>
              {activeBrand?.id===b.id&&<div style={{marginLeft:"auto",width:4,height:4,borderRadius:"50%",background:T.blue}}/>}
            </div>
          ))}
        </div>
        {/* Nav */}
        <nav style={{padding:"10px 8px",flex:1}}>
          <p style={{margin:"0 0 5px",fontSize:9,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:1,paddingLeft:4}}>Navigation</p>
          <NavItem icon={<LayoutDashboard size={15}/>} label="Dashboard" active={view==="dashboard"} onClick={()=>{setView("dashboard");setSelectedCase(null);setActiveFilters({});}}/>
          <NavItem icon={<FolderOpen size={15}/>} label="Cases" active={view==="cases"||view==="caseDetail"} onClick={()=>{setView("cases");setSelectedCase(null);setActiveFilters({});}}/>
          <NavItem icon={<Bell size={15}/>} label="Notifications" active={view==="notifications"} badge={notifs.filter(n=>n.type==="danger").length} onClick={()=>{setView("notifications");setSelectedCase(null);}}/>
          <NavItem icon={<BarChart2 size={15}/>} label="Top Lists" active={view==="toplist"} onClick={()=>{setView("toplist");setSelectedCase(null);}}/>
          <NavItem icon={<Shield size={15}/>} label="Brand Assets" active={view==="assets"} onClick={()=>{setView("assets");setSelectedCase(null);}}/>
          <div style={{margin:"12px 0 5px",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:10}}>
            <p style={{margin:"0 0 5px",fontSize:9,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:1,paddingLeft:4}}>Modules</p>
            {MODULES.map(m=>{
              const cnt=brandCases.filter(c=>c.module===m).length;
              if(!cnt)return null;
              const isActive=activeFilters.module===m&&view==="cases";
              return(
                <div key={m} onClick={()=>{setActiveFilters({module:m});setView("cases");setSelectedCase(null);}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 8px",borderRadius:6,cursor:"pointer",marginBottom:1,background:isActive?"rgba(255,255,255,0.09)":"transparent",transition:"background 0.15s"}} onMouseEnter={e=>!isActive&&(e.currentTarget.style.background="rgba(255,255,255,0.04)")} onMouseLeave={e=>!isActive&&(e.currentTarget.style.background="transparent")}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{color:isActive?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.3)",display:"flex"}}>{MODULE_ICON(m,13)}</span>
                    <span style={{fontSize:11,color:isActive?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.45)"}}>{m}</span>
                  </div>
                  <span style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.4)",fontWeight:500}}>{cnt}</span>
                </div>
              );
            })}
          </div>
        </nav>
        <div style={{padding:"10px 12px",borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:600,color:"rgba(255,255,255,0.6)"}}>CL</div>
            <div><p style={{margin:0,fontSize:11,fontWeight:500,color:"rgba(255,255,255,0.7)"}}>Client User</p><p style={{margin:0,fontSize:9,color:"rgba(255,255,255,0.3)"}}>client@brand.com</p></div>
          </div>
          <button onClick={logout} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.3)",padding:2,display:"flex",alignItems:"center",transition:"color 0.15s"}} onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.7)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}><LogOut size={14}/></button>
        </div>
      </div>

      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        {/* Topbar */}
        <div style={{background:T.white,borderBottom:`1px solid ${T.gray200}`,padding:"0 20px",height:52,display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{flex:1,maxWidth:320,position:"relative"}}>
            <Search size={13} color={T.gray300} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}/>
            <input value={searchQ} onChange={e=>{setSearchQ(e.target.value);setView("cases");setActiveFilters({});}} placeholder="Search cases, infringers…" style={{width:"100%",padding:"7px 10px 7px 28px",borderRadius:7,border:`1px solid ${T.gray200}`,fontSize:12,outline:"none",boxSizing:"border-box",background:T.gray50,color:T.gray900}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.gray200}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 10px",borderRadius:7,background:T.gray50,border:`1px solid ${T.gray200}`}}>
            <div style={{width:12,height:12,borderRadius:3,background:activeBrand?.color,flexShrink:0}}></div>
            <span style={{fontSize:12,fontWeight:500,color:T.gray700}}>{activeBrand?.name}</span>
          </div>
          <button onClick={()=>setNewCaseOpen(true)} style={{background:T.navy,color:T.white,border:"none",borderRadius:7,padding:"7px 14px",fontSize:12,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><Plus size={13}/>New case</button>
          <button onClick={()=>setNewAssetOpen(true)} style={{background:T.white,color:T.gray700,border:`1px solid ${T.gray200}`,borderRadius:7,padding:"6px 13px",fontSize:12,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><Upload size={13}/>Add asset</button>
        </div>

        {/* Content */}
        <div style={{flex:1,overflow:"auto",padding:22}}>

          {/* ══ DASHBOARD ══════════════════════════════════════════════════════ */}
          {view==="dashboard"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <div>
                  <p style={{fontSize:18,fontWeight:700,color:T.gray900,margin:"0 0 2px"}}>Overview</p>
                  <p style={{margin:0,fontSize:12,color:T.gray400}}>{activeBrand?.name} · {activeBrand?.industry}</p>
                </div>
                <PeriodBar period={dashPeriod} setPeriod={setDashPeriod}/>
              </div>
              {/* KPI row */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
                <StatCard label="Active cases" value={dashCases.filter(c=>c.status==="Active").length} color={T.blue} icon={<FolderOpen size={16}/>} sub={`of ${dashCases.length} total`} onClick={()=>goFiltered({status:"Active"})}/>
                <StatCard label="Resolved" value={dashCases.filter(c=>c.status==="Resolved").length} color={T.success} icon={<CheckCircle size={16}/>} sub="successfully closed" onClick={()=>goFiltered({status:"Resolved"})}/>
                <StatCard label="Critical" value={dashCases.filter(c=>c.priority==="Critical").length} color={T.danger} icon={<AlertTriangle size={16}/>} sub="require immediate action" onClick={()=>goFiltered({priority:"Critical"})}/>
                <StatCard label="Success rate" value={dashCases.length?Math.round(dashCases.filter(c=>c.status==="Resolved").length/dashCases.length*100)+"%":"—"} color={T.success} icon={<TrendingUp size={16}/>} sub="resolution rate"/>
              </div>
              {/* Module breakdown */}
              <Card style={{marginBottom:16}}>
                <SectionHeader title="Cases by module" action={()=>goFiltered({})} actionLabel="View all cases"/>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
                  {MODULES.map(m=>{
                    const cnt=dashCases.filter(c=>c.module===m).length;
                    const pct=dashCases.length?Math.round(cnt/dashCases.length*100):0;
                    return(
                      <div key={m} onClick={()=>goFiltered({module:m})} style={{padding:"14px 12px",borderRadius:8,border:`1px solid ${T.gray200}`,cursor:"pointer",background:T.white,transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=MODULE_COLOR[m];e.currentTarget.style.background=T.gray50;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.gray200;e.currentTarget.style.background=T.white;}}>
                        <div style={{color:MODULE_COLOR[m],marginBottom:8,display:"flex"}}>{MODULE_ICON(m,18)}</div>
                        <p style={{margin:"0 0 2px",fontSize:22,fontWeight:700,color:T.gray900,letterSpacing:-0.5}}>{cnt}</p>
                        <p style={{margin:"0 0 10px",fontSize:10,color:T.gray400,fontWeight:500}}>{m}</p>
                        <div style={{height:3,borderRadius:2,background:T.gray100,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${pct}%`,background:MODULE_COLOR[m],borderRadius:2}}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                {/* Recent cases */}
                <Card>
                  <SectionHeader title="Recent cases" action={()=>goFiltered({})}/>
                  {dashCases.slice(0,5).map((c,i)=>(
                    <div key={c.id} onClick={()=>openCase(c,"dashboard")} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderTop:i>0?`1px solid ${T.gray100}`:"none",cursor:"pointer",transition:"opacity 0.15s"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      {c.previewShot&&<img src={c.previewShot} alt="" style={{width:36,height:22,borderRadius:4,objectFit:"cover",flexShrink:0,border:`1px solid ${T.gray100}`}}/>}
                      <div style={{flex:1,minWidth:0}}>
                        <p style={{margin:"0 0 1px",fontSize:12,fontWeight:500,color:T.gray900,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.title}</p>
                        <p style={{margin:0,fontSize:10,color:T.gray400}}>{c.module} · {c.updated}</p>
                      </div>
                      <Badge color={sColor(c.status)} bg={sBg(c.status)}>{c.status}</Badge>
                    </div>
                  ))}
                </Card>
                {/* Reports */}
                <Card>
                  <SectionHeader title="Reports"/>
                  {REPORTS.map((r,i)=>(
                    <div key={r.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderTop:i>0?`1px solid ${T.gray100}`:"none"}}>
                      <div style={{width:30,height:30,borderRadius:7,background:T.gray50,border:`1px solid ${T.gray200}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:T.gray400}}><FileBarChart size={14}/></div>
                      <div style={{flex:1}}>
                        <p style={{margin:"0 0 1px",fontSize:12,fontWeight:500,color:T.gray900}}>{r.name}</p>
                        <p style={{margin:0,fontSize:10,color:T.gray400}}>{r.date} · {r.size}</p>
                      </div>
                      <button style={{fontSize:11,color:T.blue,background:T.bluePale,border:"none",borderRadius:5,padding:"3px 9px",cursor:"pointer",fontWeight:500,display:"flex",alignItems:"center",gap:4}}><Download size={10}/>PDF</button>
                    </div>
                  ))}
                  <button style={{marginTop:12,width:"100%",padding:"7px",borderRadius:7,border:`1px dashed ${T.gray200}`,background:"transparent",fontSize:11,color:T.gray400,cursor:"pointer",fontWeight:500}}>+ Generate report</button>
                </Card>
              </div>
              {/* Notifications */}
              <Card>
                <SectionHeader title="Recent notifications" action={()=>setView("notifications")}/>
                {notifs.slice(0,4).map((n,i)=>(
                  <div key={n.id} style={{display:"flex",gap:10,padding:"9px 0",borderTop:i>0?`1px solid ${T.gray100}`:"none",cursor:n.caseId?"pointer":"default",alignItems:"center"}} onClick={()=>n.caseId&&openCase(cases.find(c=>c.id===n.caseId),"dashboard")}>
                    {nIcon(n.type)}
                    <div style={{flex:1}}><p style={{margin:"0 0 1px",fontSize:12,color:T.gray700,fontWeight:400}}>{n.text}</p><p style={{margin:0,fontSize:10,color:T.gray400}}>{n.time}</p></div>
                    {n.caseId&&<ChevronRight size={13} color={T.gray300}/>}
                  </div>
                ))}
              </Card>
            </div>
          )}

          {/* ══ CASES ══════════════════════════════════════════════════════════ */}
          {view==="cases"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div>
                  <p style={{fontSize:18,fontWeight:700,color:T.gray900,margin:"0 0 2px"}}>Cases</p>
                  <p style={{margin:0,fontSize:12,color:T.gray400}}>{activeBrand?.name} · {displayCases.length} case{displayCases.length!==1?"s":""}{pinned.length>0?` · ${pinned.length} pinned`:""}</p>
                </div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}>
                  <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:"6px 10px",borderRadius:7,border:`1px solid ${T.gray200}`,fontSize:11,outline:"none",background:T.white,color:T.gray700,fontWeight:500,cursor:"pointer"}}>
                    <option value="updated">Last updated</option>
                    <option value="opened">Date opened</option>
                    <option value="priority">Priority</option>
                    <option value="progress">Progress</option>
                    <option value="status">Status</option>
                    <option value="title">Title A–Z</option>
                  </select>
                  <button onClick={()=>setSortDir(d=>d==="asc"?"desc":"asc")} style={{padding:"6px 9px",borderRadius:7,border:`1px solid ${T.gray200}`,background:T.white,cursor:"pointer",color:T.gray500,display:"flex",alignItems:"center"}}>{sortDir==="asc"?<SortAsc size={14}/>:<SortDesc size={14}/>}</button>
                  <div style={{position:"relative"}}>
                    <button onClick={()=>setFilterMenuOpen(o=>!o)} style={{padding:"6px 11px",borderRadius:7,border:`1px solid ${filterMenuOpen?T.blue:T.gray200}`,background:filterMenuOpen?T.bluePale:T.white,fontSize:11,cursor:"pointer",color:filterMenuOpen?T.blue:T.gray600,fontWeight:500,display:"flex",alignItems:"center",gap:5}}><Filter size={12}/>Filters</button>
                    {filterMenuOpen&&(
                      <div style={{position:"absolute",right:0,top:"calc(100% + 5px)",background:T.white,border:`1px solid ${T.gray200}`,borderRadius:9,padding:14,zIndex:20,minWidth:180,boxShadow:"0 8px 24px rgba(0,0,0,0.08)"}}>
                        <p style={{margin:"0 0 10px",fontSize:10,color:T.gray400,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Visible filters</p>
                        {ALL_FILTER_TYPES.map(ft=>(
                          <label key={ft.key} style={{display:"flex",alignItems:"center",gap:7,marginBottom:8,cursor:"pointer"}}>
                            <input type="checkbox" checked={visibleFilters.includes(ft.key)} onChange={()=>setVisibleFilters(vf=>vf.includes(ft.key)?vf.filter(x=>x!==ft.key):[...vf,ft.key])}/>
                            <span style={{fontSize:12,color:T.gray700}}>{ft.label}</span>
                          </label>
                        ))}
                        <button onClick={()=>setFilterMenuOpen(false)} style={{marginTop:6,width:"100%",padding:"5px",borderRadius:6,border:`1px solid ${T.gray200}`,background:T.gray50,fontSize:11,cursor:"pointer"}}>Done</button>
                      </div>
                    )}
                  </div>
                  {Object.keys(activeFilters).filter(k=>activeFilters[k]).length>0&&<button onClick={()=>setActiveFilters({})} style={{fontSize:11,color:T.gray500,background:T.gray100,border:`1px solid ${T.gray200}`,borderRadius:6,padding:"5px 9px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><X size={11}/>Clear</button>}
                </div>
              </div>
              {/* Filter dropdowns */}
              {visibleFilters.length>0&&(
                <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14,padding:"12px 14px",background:T.white,borderRadius:8,border:`1px solid ${T.gray200}`}}>
                  {ALL_FILTER_TYPES.filter(ft=>visibleFilters.includes(ft.key)).map(ft=>{
                    const val=activeFilters[ft.key];
                    return(
                      <div key={ft.key} style={{position:"relative"}}>
                        <select value={val||""} onChange={e=>setActiveFilters(f=>({...f,[ft.key]:e.target.value||undefined}))} style={{padding:"5px 24px 5px 9px",borderRadius:6,border:`1px solid ${val?T.blue:T.gray200}`,background:val?T.bluePale:T.white,color:val?T.blue:T.gray500,fontSize:11,outline:"none",cursor:"pointer",appearance:"none",WebkitAppearance:"none",fontWeight:val?500:400}}>
                          <option value="">{ft.label}</option>
                          {(ft.key==="period"?PERIODS.map(p=>p.label):ft.options).map(opt=><option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <ChevronDown size={10} color={val?T.blue:T.gray300} style={{position:"absolute",right:7,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}/>
                        {val&&<button onClick={()=>setActiveFilters(f=>({...f,[ft.key]:undefined}))} style={{position:"absolute",right:18,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:T.blue,padding:0,display:"flex",alignItems:"center"}}><X size={9}/></button>}
                      </div>
                    );
                  })}
                </div>
              )}
              {displayCases.length===0&&<Card style={{textAlign:"center",padding:40,color:T.gray400}}>No cases match the current filters.</Card>}
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {displayCases.map(c=>(
                  <div key={c.id} style={{background:T.white,borderRadius:9,border:`1px solid ${c.pinned?T.blue:T.gray200}`,padding:"12px 14px",display:"flex",gap:10,alignItems:"center",transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=c.pinned?T.blue:T.gray300;e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.05)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=c.pinned?T.blue:T.gray200;e.currentTarget.style.boxShadow="none";}}>
                    <input type="checkbox" checked={!!c.pinned} onChange={()=>updateCase(c.id,x=>({...x,pinned:!x.pinned}))} onClick={e=>e.stopPropagation()} title={c.pinned?"Unpin":"Pin"} style={{margin:0,cursor:"pointer",flexShrink:0,accentColor:T.navy}}/>
                    {c.previewShot&&<img src={c.previewShot} alt="" onClick={()=>openCase(c,"cases")} style={{width:56,height:34,borderRadius:5,objectFit:"cover",flexShrink:0,border:`1px solid ${T.gray100}`,cursor:"pointer"}}/>}
                    <div style={{flex:1,minWidth:0,cursor:"pointer"}} onClick={()=>openCase(c,"cases")}>
                      <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:3}}>
                        {c.pinned&&<Badge color={T.blue} bg={T.bluePale}><Pin size={9}/>Pinned</Badge>}
                        {c.isLead&&<Badge color={T.purple} bg={T.purplePale}>Lead</Badge>}
                        <Badge color={MODULE_COLOR[c.module]} bg={`${MODULE_COLOR[c.module]}12`}><span style={{display:"flex",alignItems:"center",gap:3}}>{MODULE_ICON(c.module,9)}{c.module}</span></Badge>
                        <span style={{fontSize:10,color:T.gray300,fontFamily:"monospace"}}>{c.id}</span>
                      </div>
                      <p style={{margin:"0 0 2px",fontSize:13,fontWeight:500,color:T.gray900,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.title}</p>
                      <p style={{margin:0,fontSize:11,color:T.gray400}}>{c.infringer} · {c.country} · {c.updated}</p>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0,cursor:"pointer"}} onClick={()=>openCase(c,"cases")}>
                      <div style={{display:"flex",gap:4}}>
                        <Badge color={sColor(c.status)} bg={sBg(c.status)}>{c.status}</Badge>
                        <Badge color={pColor(c.priority)} bg={pBg(c.priority)}>{c.priority}</Badge>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div style={{width:72,height:3,borderRadius:2,background:T.gray100,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${c.progress}%`,background:c.status==="Resolved"?T.success:T.blue}}></div>
                        </div>
                        <span style={{fontSize:10,color:T.gray400}}>{c.progress}%</span>
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
                <button onClick={()=>setView(prevView||"cases")} style={{background:"none",border:"none",color:T.blue,fontSize:12,cursor:"pointer",padding:0,marginBottom:14,fontWeight:500,display:"flex",alignItems:"center",gap:4}}><ChevronDown size={13} style={{transform:"rotate(90deg)"}}/>Back</button>
                <Card style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:6}}>
                        {c.isLead&&<Badge color={T.purple} bg={T.purplePale}>Lead case</Badge>}
                        <Badge color={MODULE_COLOR[c.module]} bg={`${MODULE_COLOR[c.module]}12`}><span style={{display:"flex",alignItems:"center",gap:3}}>{MODULE_ICON(c.module,9)}{c.module}</span></Badge>
                        <span style={{fontSize:10,color:T.gray300,fontFamily:"monospace"}}>{c.id}</span>
                      </div>
                      <p style={{margin:"0 0 3px",fontSize:16,fontWeight:700,color:T.gray900}}>{c.title}</p>
                      <p style={{margin:0,fontSize:11,color:T.gray400}}>{c.platform} · {c.country} · Opened {c.opened}</p>
                    </div>
                    <div style={{display:"flex",gap:5}}>
                      <Badge color={sColor(c.status)} bg={sBg(c.status)} size={11}>{c.status}</Badge>
                      <Badge color={pColor(c.priority)} bg={pBg(c.priority)} size={11}>{c.priority}</Badge>
                    </div>
                  </div>
                  <p style={{margin:"0 0 12px",fontSize:12,color:T.gray500,lineHeight:1.7}}>{c.description}</p>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:10,color:T.gray400,fontWeight:500}}>Progress</span>
                    <div style={{flex:1,height:4,borderRadius:2,background:T.gray100,overflow:"hidden"}}><div style={{height:"100%",width:`${c.progress}%`,background:c.status==="Resolved"?T.success:T.blue}}></div></div>
                    <span style={{fontSize:11,fontWeight:600,color:T.gray700}}>{c.progress}%</span>
                  </div>
                </Card>
                {c.module==="Marketplace"&&c.mp&&(
                  <Card style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                      <p style={{margin:0,fontSize:12,fontWeight:600,color:T.gray900,display:"flex",alignItems:"center",gap:6}}><ShoppingCart size={14} color={T.blue}/>Marketplace data</p>
                      <Toggle on={c.mp.offlineAction} onToggle={()=>updateCase(c.id,x=>({...x,mp:{...x.mp,offlineAction:!x.mp.offlineAction}}))} label="Offline action" color={T.warning}/>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
                      {[["Listed price",c.mp.price],["Stock",c.mp.stock.toLocaleString()],["Units sold",c.mp.sold.toLocaleString()]].map(([l,v])=>(
                        <div key={l} style={{background:T.gray50,borderRadius:7,padding:"10px 12px",border:`1px solid ${T.gray100}`}}>
                          <p style={{margin:0,fontSize:9,color:T.gray400,textTransform:"uppercase",letterSpacing:0.6,fontWeight:600,marginBottom:4}}>{l}</p>
                          <p style={{margin:0,fontSize:18,fontWeight:700,color:T.gray900,letterSpacing:-0.3}}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <p style={{margin:"0 0 7px",fontSize:10,fontWeight:600,color:T.gray400,textTransform:"uppercase",letterSpacing:0.5}}>Product images</p>
                    <div style={{display:"flex",gap:7}}>{c.mp.images.map((img,i)=><img key={i} src={img} alt="" style={{width:64,height:64,borderRadius:7,objectFit:"cover",border:`1px solid ${T.gray200}`,cursor:"pointer"}} onClick={()=>setSsPreview(img)}/>)}</div>
                  </Card>
                )}
                {c.module==="Social Media"&&c.sm&&(
                  <Card style={{marginBottom:12}}>
                    <p style={{margin:"0 0 12px",fontSize:12,fontWeight:600,color:T.gray900,display:"flex",alignItems:"center",gap:6}}><Megaphone size={14} color={T.blue}/>Social media profile</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                      {[["Profile name",c.sm.profileName],["Followers",c.sm.followers],["Created",c.sm.created]].map(([l,v])=>(
                        <div key={l} style={{background:T.gray50,borderRadius:7,padding:"10px 12px",border:`1px solid ${T.gray100}`}}>
                          <p style={{margin:0,fontSize:9,color:T.gray400,textTransform:"uppercase",letterSpacing:0.6,fontWeight:600,marginBottom:4}}>{l}</p>
                          <p style={{margin:0,fontSize:14,fontWeight:600,color:T.gray900}}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                {c.isLead&&(
                  <Card style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <p style={{margin:0,fontSize:12,fontWeight:600,color:T.gray900}}>Related cases ({c.relatedCases.length})</p>
                      <Toggle on={c.bulkEnforcement} onToggle={()=>updateCase(c.id,x=>({...x,bulkEnforcement:!x.bulkEnforcement}))} label="Bulk enforcement"/>
                    </div>
                    {c.bulkEnforcement&&<div style={{padding:"9px 12px",borderRadius:7,background:T.successPale,border:`1px solid ${T.successMid}`,marginBottom:10,fontSize:11,color:T.success,display:"flex",alignItems:"center",gap:6}}><CheckCircle size={12}/>Bulk enforcement active — all {c.relatedCases.length} URLs will receive simultaneous takedowns.</div>}
                    <div style={{display:"flex",flexDirection:"column",gap:5}}>
                      {c.relatedCases.map((rc,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:7,background:T.gray50,border:`1px solid ${T.gray200}`}}>
                          <Globe size={12} color={T.gray400}/>
                          <span style={{fontSize:11,color:T.blue,flex:1,fontFamily:"monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{rc.url}</span>
                          <div style={{display:"flex",gap:3}}>{rc.tags.map(tag=><span key={tag} style={{fontSize:9,padding:"2px 6px",borderRadius:3,background:TAG_COLORS[tag][0],color:TAG_COLORS[tag][1],fontWeight:600}}>{tag}</span>)}</div>
                        </div>
                      ))}
                      {c.relatedCases.length===0&&<p style={{margin:0,fontSize:11,color:T.gray400}}>No related URLs linked.</p>}
                    </div>
                  </Card>
                )}
                <Card style={{marginBottom:12}}>
                  <p style={{margin:"0 0 12px",fontSize:12,fontWeight:600,color:T.gray900}}>Screenshots{c.screenshots?.length>0?` (${c.screenshots.length})`:""}</p>
                  {c.screenshots?.length>0&&(
                    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:10}}>
                      {c.screenshots.map((ss,i)=>(
                        <div key={i} style={{borderRadius:7,overflow:"hidden",border:`1px solid ${T.gray200}`,position:"relative"}}>
                          <img src={ss} alt="" onClick={()=>setSsPreview(ss)} style={{width:"100%",display:"block",cursor:"pointer"}}/>
                          <button onClick={()=>updateCase(c.id,x=>({...x,screenshots:x.screenshots.filter((_,j)=>j!==i)}))} style={{position:"absolute",top:5,right:5,width:20,height:20,borderRadius:"50%",background:"rgba(0,0,0,0.45)",color:T.white,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={11}/></button>
                          <div style={{padding:"5px 8px",background:T.gray50}}><p style={{margin:0,fontSize:9,color:T.gray400}}>Screenshot {i+1} · click to enlarge</p></div>
                        </div>
                      ))}
                    </div>
                  )}
                  <DropZone onDrop={e=>handleDropSS(e,c.id)} label="Drop image files here to add screenshots"/>
                </Card>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                  <Card>
                    <p style={{margin:"0 0 12px",fontSize:12,fontWeight:600,color:T.gray900,display:"flex",alignItems:"center",gap:6}}><Clock size={13} color={T.gray400}/>Timeline</p>
                    {c.timeline.map((t,i)=>(
                      <div key={i} style={{display:"flex",gap:10,marginBottom:10}}>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                          <div style={{width:8,height:8,borderRadius:"50%",background:t.type==="success"?T.success:t.type==="pending"?T.warning:T.blue,marginTop:2}}></div>
                          {i<c.timeline.length-1&&<div style={{width:1,height:16,background:T.gray200,margin:"3px 0"}}></div>}
                        </div>
                        <div><p style={{margin:0,fontSize:11,fontWeight:500,color:T.gray700}}>{t.event}</p><p style={{margin:0,fontSize:10,color:T.gray400}}>{t.date}</p></div>
                      </div>
                    ))}
                  </Card>
                  <Card>
                    <p style={{margin:"0 0 10px",fontSize:12,fontWeight:600,color:T.gray900,display:"flex",alignItems:"center",gap:6}}><FileText size={13} color={T.gray400}/>Documents</p>
                    {c.documents.map((d,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 0",borderBottom:`1px solid ${T.gray100}`}}>
                        <FileText size={12} color={T.blue}/>
                        <span style={{fontSize:11,color:T.gray700,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d}</span>
                        <button onClick={()=>updateCase(c.id,x=>({...x,documents:x.documents.filter((_,j)=>j!==i)}))} style={{color:T.danger,background:"none",border:"none",cursor:"pointer",padding:0,display:"flex"}}><X size={12}/></button>
                      </div>
                    ))}
                    <div style={{marginTop:8}}><DropZone onDrop={e=>handleDropDoc(e,c.id)} label="Drop files here"/></div>
                  </Card>
                </div>
                <Card>
                  <p style={{margin:"0 0 12px",fontSize:12,fontWeight:600,color:T.gray900,display:"flex",alignItems:"center",gap:6}}><MessageSquare size={13} color={T.gray400}/>Comments</p>
                  {c.comments.length===0&&<p style={{fontSize:11,color:T.gray400,marginBottom:10}}>No comments yet.</p>}
                  {c.comments.map((cm,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:9,padding:"10px 12px",background:T.gray50,borderRadius:7,border:`1px solid ${T.gray100}`}}>
                      <div style={{width:26,height:26,borderRadius:"50%",background:T.bluePale,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:T.blue,flexShrink:0}}>{cm.user.slice(0,2).toUpperCase()}</div>
                      <div><p style={{margin:"0 0 2px",fontSize:11,fontWeight:600,color:T.gray900}}>{cm.user} <span style={{fontWeight:400,color:T.gray400}}>· {cm.date}</span></p><p style={{margin:0,fontSize:11,color:T.gray500,lineHeight:1.6}}>{cm.text}</p></div>
                    </div>
                  ))}
                  <div style={{display:"flex",gap:7}}>
                    <input value={newComment} onChange={e=>setNewComment(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addComment(c.id)} placeholder="Add a comment…" style={{flex:1,padding:"8px 11px",borderRadius:7,border:`1px solid ${T.gray200}`,fontSize:12,outline:"none",color:T.gray900}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.gray200}/>
                    <button onClick={()=>addComment(c.id)} style={{padding:"8px 14px",borderRadius:7,background:T.navy,color:T.white,border:"none",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><Send size={12}/>Post</button>
                  </div>
                </Card>
              </div>
            );
          })()}

          {/* ══ NOTIFICATIONS ═══════════════════════════════════════════════════ */}
          {view==="notifications"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div><p style={{fontSize:18,fontWeight:700,color:T.gray900,margin:"0 0 2px"}}>Notifications</p><p style={{margin:0,fontSize:12,color:T.gray400}}>{notifs.length} unread</p></div>
                <div style={{display:"flex",gap:5}}>
                  {["all","success","warning","danger","info"].map(t=>(
                    <Pill key={t} active={notifTypeFilter===t} onClick={()=>setNotifTypeFilter(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</Pill>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {notifs.filter(n=>notifTypeFilter==="all"||n.type===notifTypeFilter).map(n=>(
                  <div key={n.id} style={{background:T.white,borderRadius:9,border:`1px solid ${T.gray200}`,padding:"12px 14px",display:"flex",gap:10,alignItems:"center"}}>
                    {nIcon(n.type)}
                    <div style={{flex:1}}>
                      <p style={{margin:"0 0 2px",fontSize:12,color:T.gray900,fontWeight:400}}>{n.text}</p>
                      <p style={{margin:0,fontSize:10,color:T.gray400}}>{n.time}</p>
                    </div>
                    <div style={{display:"flex",gap:5,flexShrink:0}}>
                      {n.caseId&&<button onClick={()=>{const c=cases.find(x=>x.id===n.caseId);if(c)openCase(c,"notifications");}} style={{fontSize:11,color:T.blue,background:T.bluePale,border:"none",borderRadius:5,padding:"3px 9px",cursor:"pointer",fontWeight:500,display:"flex",alignItems:"center",gap:4}}>View <ArrowRight size={10}/></button>}
                      <button onClick={()=>setNotifs(ns=>ns.filter(x=>x.id!==n.id))} style={{background:"none",border:"none",color:T.gray300,cursor:"pointer",padding:0,display:"flex",alignItems:"center"}}><X size={14}/></button>
                    </div>
                  </div>
                ))}
                {notifs.filter(n=>notifTypeFilter==="all"||n.type===notifTypeFilter).length===0&&<Card style={{textAlign:"center",padding:40,color:T.gray400}}>All caught up!</Card>}
              </div>
            </div>
          )}

          {/* ══ TOP LISTS ════════════════════════════════════════════════════════ */}
          {view==="toplist"&&(
            <div>
              <p style={{fontSize:18,fontWeight:700,color:T.gray900,margin:"0 0 16px"}}>Top lists</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <Card>
                  <SectionHeader title="Top infringers"/>
                  {TOP_INF.map((inf,i)=>(
                    <div key={i} onClick={()=>goFiltered({infringer:inf.name})} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderTop:i>0?`1px solid ${T.gray100}`:"none",cursor:"pointer",transition:"opacity 0.15s"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.6"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      <div style={{width:22,height:22,borderRadius:5,background:i===0?T.navy:T.gray100,color:i===0?T.white:T.gray500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{i+1}</div>
                      <span style={{flex:1,fontSize:12,color:T.gray900,fontWeight:500}}>{inf.name}</span>
                      <Badge color={sColor(inf.status)} bg={sBg(inf.status)}>{inf.status}</Badge>
                      <span style={{fontSize:13,fontWeight:700,color:T.gray900,minWidth:16,textAlign:"right"}}>{inf.cases}</span>
                      <ChevronRight size={13} color={T.gray300}/>
                    </div>
                  ))}
                </Card>
                <Card>
                  <SectionHeader title="Top countries"/>
                  {TOP_CTRY.map((ct,i)=>(
                    <div key={i} onClick={()=>goFiltered({country:ct.country})} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderTop:i>0?`1px solid ${T.gray100}`:"none",cursor:"pointer",transition:"opacity 0.15s"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.6"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      <span style={{fontSize:18}}>{ct.flag}</span>
                      <span style={{flex:1,fontSize:12,color:T.gray900,fontWeight:500}}>{ct.country}</span>
                      <div style={{width:60,height:4,borderRadius:2,background:T.gray100,overflow:"hidden"}}><div style={{height:"100%",width:`${ct.cases/8*100}%`,background:T.blue}}></div></div>
                      <span style={{fontSize:13,fontWeight:700,color:T.gray900,minWidth:16,textAlign:"right"}}>{ct.cases}</span>
                      <ChevronRight size={13} color={T.gray300}/>
                    </div>
                  ))}
                </Card>
              </div>
            </div>
          )}

          {/* ══ BRAND ASSETS ═════════════════════════════════════════════════════ */}
          {view==="assets"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div><p style={{fontSize:18,fontWeight:700,color:T.gray900,margin:"0 0 2px"}}>Brand assets</p><p style={{margin:0,fontSize:12,color:T.gray400}}>{activeBrand?.name} · {brandAssets.length} files</p></div>
                <button onClick={()=>setNewAssetOpen(true)} style={{background:T.navy,color:T.white,border:"none",borderRadius:7,padding:"7px 14px",fontSize:12,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><Plus size={13}/>Add asset</button>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                {ASSET_TYPES.map(t=>(
                  <Pill key={t} active={assetTypeFilter===t} onClick={()=>setAssetTypeFilter(t)}>{t} ({brandAssets.filter(a=>t==="All"||a.type===t).length})</Pill>
                ))}
              </div>
              <div onDragOver={e=>e.preventDefault()} onDrop={handleDropAsset} style={{border:`1.5px dashed ${T.blue}`,borderRadius:9,padding:"16px",textAlign:"center",background:T.bluePale,marginBottom:16,cursor:"default"}}>
                <Upload size={16} color={T.blue} style={{margin:"0 auto 6px",display:"block"}}/>
                <p style={{margin:0,fontSize:12,color:T.blue,fontWeight:500}}>Drop files here to upload assets</p>
              </div>
              {(assetTypeFilter==="All"?ASSET_TYPES.filter(t=>t!=="All"):[assetTypeFilter]).map(type=>{
                const typeAssets=brandAssets.filter(a=>a.type===type);
                if(!typeAssets.length)return null;
                return(
                  <div key={type} style={{marginBottom:18}}>
                    <p style={{margin:"0 0 9px",fontSize:10,fontWeight:600,color:T.gray400,textTransform:"uppercase",letterSpacing:0.8}}>{type}</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
                      {typeAssets.map(a=>(
                        <div key={a.id} style={{background:T.white,borderRadius:9,border:`1px solid ${T.gray200}`,padding:"13px 14px",transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.gray300;e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.05)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.gray200;e.currentTarget.style.boxShadow="none";}}>
                          <div style={{width:32,height:32,borderRadius:7,background:T.gray50,border:`1px solid ${T.gray200}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:9,color:T.gray400}}><FileText size={15}/></div>
                          <p style={{margin:"0 0 2px",fontSize:12,fontWeight:600,color:T.gray900}}>{a.name}</p>
                          <p style={{margin:0,fontSize:10,color:T.gray400,marginBottom:10}}>{a.date} · {a.size}</p>
                          <div style={{display:"flex",gap:5}}>
                            <button style={{fontSize:10,color:T.blue,background:T.bluePale,border:"none",borderRadius:5,padding:"3px 8px",cursor:"pointer",fontWeight:500,display:"flex",alignItems:"center",gap:3}}><Download size={10}/>Download</button>
                            <button onClick={()=>setAssets(as=>as.filter(x=>x.id!==a.id))} style={{fontSize:10,color:T.danger,background:T.dangerPale,border:"none",borderRadius:5,padding:"3px 8px",cursor:"pointer",fontWeight:500,display:"flex",alignItems:"center",gap:3}}><Trash2 size={10}/>Remove</button>
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
        <div onClick={()=>setSsPreview(null)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:60}}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.white,borderRadius:12,padding:14,maxWidth:540,width:"90%",border:`1px solid ${T.gray200}`}}>
            <img src={ssPreview} alt="" style={{width:"100%",borderRadius:8,display:"block"}}/>
            <button onClick={()=>setSsPreview(null)} style={{marginTop:9,width:"100%",padding:"7px",borderRadius:7,border:`1px solid ${T.gray200}`,background:T.white,fontSize:11,cursor:"pointer",color:T.gray500}}>Close</button>
          </div>
        </div>
      )}

      {/* New Case Modal */}
      {newCaseOpen&&(
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.25)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}}>
          <div style={{background:T.white,borderRadius:12,padding:22,width:440,maxHeight:"85vh",overflow:"auto",border:`1px solid ${T.gray200}`,boxShadow:"0 16px 40px rgba(0,0,0,0.12)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <p style={{margin:0,fontSize:15,fontWeight:700,color:T.gray900}}>New case</p>
              <button onClick={()=>setNewCaseOpen(false)} style={{background:"none",border:"none",cursor:"pointer",color:T.gray400,display:"flex"}}><X size={16}/></button>
            </div>
            {[["Title","title"],["Infringer","infringer"],["Platform","platform"],["Country","country"]].map(([l,k])=>(
              <div key={k} style={{marginBottom:10}}>
                <label style={{fontSize:10,fontWeight:600,color:T.gray500,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:0.4}}>{l}</label>
                <input value={ncForm[k]} onChange={e=>setNcForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${T.gray200}`,fontSize:12,outline:"none",boxSizing:"border-box",color:T.gray900}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.gray200}/>
              </div>
            ))}
            {[["Module","module",MODULES],["Priority","priority",["Critical","High","Medium","Low"]]].map(([l,k,opts])=>(
              <div key={k} style={{marginBottom:10}}>
                <label style={{fontSize:10,fontWeight:600,color:T.gray500,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:0.4}}>{l}</label>
                <select value={ncForm[k]} onChange={e=>setNcForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${T.gray200}`,fontSize:12,outline:"none",background:T.white,boxSizing:"border-box",color:T.gray900}}>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div style={{marginBottom:16}}>
              <label style={{fontSize:10,fontWeight:600,color:T.gray500,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:0.4}}>Description</label>
              <textarea value={ncForm.description} onChange={e=>setNcForm(f=>({...f,description:e.target.value}))} rows={3} style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${T.gray200}`,fontSize:12,outline:"none",resize:"vertical",boxSizing:"border-box",color:T.gray900}}/>
            </div>
            <div style={{display:"flex",gap:7,justifyContent:"flex-end"}}>
              <button onClick={()=>setNewCaseOpen(false)} style={{padding:"7px 14px",borderRadius:7,border:`1px solid ${T.gray200}`,background:T.white,fontSize:12,cursor:"pointer",color:T.gray500}}>Cancel</button>
              <button onClick={submitCase} style={{padding:"7px 14px",borderRadius:7,background:T.navy,color:T.white,border:"none",fontSize:12,cursor:"pointer",fontWeight:600}}>Create case</button>
            </div>
          </div>
        </div>
      )}

      {/* New Asset Modal */}
      {newAssetOpen&&(
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.25)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}}>
          <div style={{background:T.white,borderRadius:12,padding:22,width:360,border:`1px solid ${T.gray200}`,boxShadow:"0 16px 40px rgba(0,0,0,0.12)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <p style={{margin:0,fontSize:15,fontWeight:700,color:T.gray900}}>Add asset</p>
              <button onClick={()=>setNewAssetOpen(false)} style={{background:"none",border:"none",cursor:"pointer",color:T.gray400,display:"flex"}}><X size={16}/></button>
            </div>
            {[["Name","name"],["Size (e.g. 2.1 MB)","size"]].map(([l,k])=>(
              <div key={k} style={{marginBottom:10}}>
                <label style={{fontSize:10,fontWeight:600,color:T.gray500,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:0.4}}>{l}</label>
                <input value={naForm[k]} onChange={e=>setNaForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${T.gray200}`,fontSize:12,outline:"none",boxSizing:"border-box",color:T.gray900}}/>
              </div>
            ))}
            <div style={{marginBottom:16}}>
              <label style={{fontSize:10,fontWeight:600,color:T.gray500,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:0.4}}>Type</label>
              <select value={naForm.type} onChange={e=>setNaForm(f=>({...f,type:e.target.value}))} style={{width:"100%",padding:"8px 10px",borderRadius:6,border:`1px solid ${T.gray200}`,fontSize:12,outline:"none",background:T.white,boxSizing:"border-box",color:T.gray900}}>
                {ASSET_TYPES.filter(t=>t!=="All").map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{display:"flex",gap:7,justifyContent:"flex-end"}}>
              <button onClick={()=>setNewAssetOpen(false)} style={{padding:"7px 14px",borderRadius:7,border:`1px solid ${T.gray200}`,background:T.white,fontSize:12,cursor:"pointer",color:T.gray500}}>Cancel</button>
              <button onClick={submitAsset} style={{padding:"7px 14px",borderRadius:7,background:T.navy,color:T.white,border:"none",fontSize:12,cursor:"pointer",fontWeight:600}}>Add asset</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <div style={{position:"absolute",bottom:18,right:18,zIndex:40}}>
        {chatOpen?(
          <div style={{width:316,background:T.white,borderRadius:12,border:`1px solid ${T.gray200}`,display:"flex",flexDirection:"column",height:400,boxShadow:"0 8px 32px rgba(0,0,0,0.10)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:T.navy,borderRadius:"12px 12px 0 0"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",color:T.white}}><Sparkles size={11}/></div>
                <div><p style={{margin:0,fontSize:12,fontWeight:600,color:T.white}}>AI assistant</p><p style={{margin:0,fontSize:9,color:"rgba(255,255,255,0.4)"}}>Powered by Claude</p></div>
              </div>
              <button onClick={()=>setChatOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",display:"flex"}}><X size={14}/></button>
            </div>
            <div style={{flex:1,overflow:"auto",padding:10,display:"flex",flexDirection:"column",gap:7}}>
              {chatMsgs.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"84%",padding:"8px 11px",borderRadius:9,background:m.role==="user"?T.navy:T.gray50,color:m.role==="user"?T.white:T.gray900,fontSize:12,lineHeight:1.6,border:m.role==="assistant"?`1px solid ${T.gray200}`:"none"}}>{m.text}</div>
                </div>
              ))}
              {chatLoading&&<div style={{display:"flex"}}><div style={{padding:"8px 11px",borderRadius:9,background:T.gray50,fontSize:12,color:T.gray400,border:`1px solid ${T.gray200}`}}>Thinking…</div></div>}
              <div ref={chatEndRef}></div>
            </div>
            <div style={{padding:"9px 10px",borderTop:`1px solid ${T.gray200}`,display:"flex",gap:5}}>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask anything…" style={{flex:1,padding:"7px 10px",borderRadius:7,border:`1px solid ${T.gray200}`,fontSize:12,outline:"none",color:T.gray900}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.gray200}/>
              <button onClick={sendChat} style={{padding:"7px 12px",borderRadius:7,background:T.navy,color:T.white,border:"none",cursor:"pointer",display:"flex",alignItems:"center"}}><Send size={13}/></button>
            </div>
          </div>
        ):(
          <button onClick={()=>setChatOpen(true)} style={{width:42,height:42,borderRadius:"50%",background:T.navy,color:T.white,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(10,22,40,0.25)"}}><Sparkles size={17}/></button>
        )}
      </div>
    </div>
  );
}