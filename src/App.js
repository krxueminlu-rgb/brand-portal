import { useState, useRef } from "react";

const C = {
  blue50:"#E6F1FB",blue100:"#B5D4F4",blue200:"#85B7EB",
  blue400:"#378ADD",blue600:"#185FA5",blue800:"#0C447C",
  gray50:"#F8FAFC",gray100:"#F1F5F9",gray200:"#E2E8F0",
  gray400:"#94A3B8",gray600:"#64748B",gray700:"#475569",gray800:"#1E293B",
  white:"#FFFFFF",success:"#16A34A",warning:"#D97706",danger:"#DC2626",purple:"#7F77DD"
};

const BRANDS=[
  {id:1,name:"NordLight",logo:"NL",industry:"Apparel",color:"#185FA5",desc:"Fashion & outdoor clothing"},
  {id:2,name:"PureOak",logo:"PO",industry:"Cosmetics",color:"#0F6E56",desc:"Natural skincare & beauty"},
  {id:3,name:"VoltEdge",logo:"VE",industry:"Electronics",color:"#7F77DD",desc:"Consumer electronics"},
];
const MODULES=["Marketplace","Social Media","Domain","Keyword Ad","Web Content"];
const MODULE_ICONS={"Marketplace":"🛒","Social Media":"📱","Domain":"🌐","Keyword Ad":"🔍","Web Content":"📄"};
const TAG_COLORS={"infringer":["#FEE2E2","#DC2626"],"product":["#EFF6FF","#2563EB"],"content":["#F0FDF4","#16A34A"]};
const ASSET_TYPES=["All","Trademark","Copyright","Patent","Logo","Product Images","Website","Other"];
const ASSET_ICONS={"Trademark":"™","Copyright":"©","Patent":"⚙","Logo":"◈","Product Images":"🖼","Website":"🌐","Other":"📎"};

const makeSS=(label,color,w=400,h=220)=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${color}"/><text x="${w/2}" y="${h/2}" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="system-ui" font-size="12">${label}</text></svg>`)}`;

const sColor=s=>({Active:C.blue600,Resolved:C.success,"Legal Review":C.warning,Pending:C.gray400}[s]||C.gray400);
const pColor=p=>({Critical:C.danger,High:C.warning,Medium:C.blue600,Low:C.gray400}[p]||C.gray400);
const mColor=m=>({"Marketplace":"#185FA5","Social Media":"#c0392b","Domain":"#8e44ad","Keyword Ad":"#16a085","Web Content":"#6c3483"}[m]||C.gray600);
const nColor=t=>({success:C.success,warning:C.warning,danger:C.danger,info:C.blue600}[t]||C.gray400);

const INIT_CASES=[
  {id:"BP-001",title:"Counterfeit Jackets — Amazon DE",brand:1,module:"Marketplace",status:"Active",priority:"High",isLead:true,relatedCases:[{id:"BP-001a",url:"amazon.de/dp/B0CFAKE001",tags:["infringer","product"]},{id:"BP-001b",url:"amazon.de/dp/B0CFAKE002",tags:["product"]}],bulkEnforcement:false,infringer:"FashionDrop GmbH",country:"Germany",platform:"Amazon",opened:"2024-01-15",updated:"2024-03-10",progress:65,description:"Multiple listings selling counterfeit NordLight jackets.",screenshots:[makeSS("Amazon Listing",C.blue600),makeSS("Seller Profile","#8e44ad")],previewShot:makeSS("Amazon DE",C.blue600,200,110),mp:{price:"€29.99",stock:142,sold:834,offlineAction:false,images:[makeSS("Fake Jacket","#2c3e50",80,80),makeSS("Label","#7f8c8d",80,80)]},timeline:[{date:"2024-01-15",event:"Case opened",type:"open"},{date:"2024-02-05",event:"Takedown notice sent",type:"action"},{date:"2024-02-20",event:"2 listings removed",type:"success"},{date:"2024-03-10",event:"Follow-up sent",type:"action"}],comments:[{user:"Sarah K.",date:"2024-03-10",text:"Amazon responded — escalating to brand registry."}],documents:[],pinned:false},
  {id:"BP-002",title:"Logo Misuse — Instagram Influencer",brand:1,module:"Social Media",status:"Resolved",priority:"Medium",isLead:true,relatedCases:[{id:"BP-002a",url:"instagram.com/p/fake_post_001",tags:["content"]},{id:"BP-002b",url:"instagram.com/p/fake_post_002",tags:["content","infringer"]}],bulkEnforcement:false,infringer:"@style_fakes_eu",country:"France",platform:"Instagram",opened:"2024-02-01",updated:"2024-03-01",progress:100,description:"Influencer using NordLight logo without authorization.",screenshots:[makeSS("Instagram Post","#c0392b"),makeSS("Story","#8e44ad")],previewShot:makeSS("Instagram","#c0392b",200,110),sm:{profileName:"@style_fakes_eu",followers:"48.2K",created:"2021-06-15"},timeline:[{date:"2024-02-01",event:"Case opened",type:"open"},{date:"2024-02-10",event:"DMCA notice filed",type:"action"},{date:"2024-03-01",event:"Account suspended",type:"success"}],comments:[{user:"Sarah K.",date:"2024-03-01",text:"Resolved."}],documents:[],pinned:false},
  {id:"BP-003",title:"Domain Squatting — nordlight-sale.com",brand:1,module:"Domain",status:"Active",priority:"Critical",isLead:false,relatedCases:[],bulkEnforcement:false,infringer:"Unknown",country:"Netherlands",platform:"Web",opened:"2024-03-01",updated:"2024-03-12",progress:30,description:"Fraudulent website mimicking NordLight store.",screenshots:[makeSS("Phishing Homepage","#c0392b"),makeSS("WHOIS","#2c3e50")],previewShot:makeSS("Phishing Site","#c0392b",200,110),timeline:[{date:"2024-03-01",event:"Case opened",type:"open"},{date:"2024-03-05",event:"Registrar contacted",type:"action"},{date:"2024-03-12",event:"Awaiting response",type:"pending"}],comments:[],documents:[],pinned:false},
  {id:"BP-004",title:"Brand Keyword Bidding — Google Ads",brand:1,module:"Keyword Ad",status:"Active",priority:"High",isLead:true,relatedCases:[{id:"BP-004a",url:"google.com/search?q=nordlight+buy",tags:["content"]},{id:"BP-004b",url:"rivalstore.de/nordlight-alt",tags:["infringer","content"]}],bulkEnforcement:false,infringer:"RivalStore GmbH",country:"Germany",platform:"Google Ads",opened:"2024-02-10",updated:"2024-03-13",progress:40,description:"Competitor bidding on NordLight brand terms.",screenshots:[makeSS("Google Ad","#185F68"),makeSS("SERP","#1a5276")],previewShot:makeSS("Google Ads","#185F68",200,110),timeline:[{date:"2024-02-10",event:"Case opened",type:"open"},{date:"2024-02-18",event:"Google complaint filed",type:"action"},{date:"2024-03-13",event:"Pending review",type:"pending"}],comments:[{user:"Tom R.",date:"2024-03-13",text:"ETA 10 business days."}],documents:[],pinned:false},
  {id:"BP-005",title:"Copied Descriptions — fashionreviews.net",brand:1,module:"Web Content",status:"Active",priority:"Low",isLead:false,relatedCases:[],bulkEnforcement:false,infringer:"fashionreviews.net",country:"United Kingdom",platform:"Web",opened:"2024-03-05",updated:"2024-03-14",progress:20,description:"Website copying NordLight product descriptions.",screenshots:[makeSS("Copied Content","#6c3483")],previewShot:makeSS("Web Content","#6c3483",200,110),timeline:[{date:"2024-03-05",event:"Case opened",type:"open"},{date:"2024-03-14",event:"DMCA sent",type:"action"}],comments:[],documents:[],pinned:false},
  {id:"BP-006",title:"Fake Serums — eBay UK",brand:2,module:"Marketplace",status:"Active",priority:"High",isLead:true,relatedCases:[{id:"BP-006a",url:"ebay.co.uk/itm/fake-serum-001",tags:["product","infringer"]},{id:"BP-006b",url:"ebay.co.uk/itm/fake-serum-002",tags:["product"]}],bulkEnforcement:true,infringer:"BeautySupplyPlus",country:"United Kingdom",platform:"eBay",opened:"2024-02-20",updated:"2024-03-11",progress:45,description:"Counterfeit PureOak serums with dangerous ingredients.",screenshots:[makeSS("eBay Listing","#c0392b"),makeSS("Lab Report","#27ae60")],previewShot:makeSS("eBay UK","#c0392b",200,110),mp:{price:"£12.99",stock:67,sold:1240,offlineAction:false,images:[makeSS("Fake Serum","#c0392b",80,80),makeSS("Packaging","#e67e22",80,80)]},timeline:[{date:"2024-02-20",event:"Case opened",type:"open"},{date:"2024-02-28",event:"Lab analysis ordered",type:"action"},{date:"2024-03-11",event:"Counterfeit confirmed",type:"success"}],comments:[{user:"Tom R.",date:"2024-03-11",text:"Escalating to Trading Standards."}],documents:[],pinned:false},
  {id:"BP-007",title:"Patent Infringement — Charger Design",brand:3,module:"Marketplace",status:"Legal Review",priority:"Critical",isLead:true,relatedCases:[{id:"BP-007a",url:"alibaba.com/product/techclone-v1",tags:["product","infringer"]},{id:"BP-007b",url:"aliexpress.com/item/techclone-fast",tags:["product"]},{id:"BP-007c",url:"techclone.cn/charger-specs",tags:["content","infringer"]}],bulkEnforcement:false,infringer:"TechClone Ltd",country:"China",platform:"Alibaba",opened:"2024-01-10",updated:"2024-03-09",progress:55,description:"Exact copy of VoltEdge fast-charger design.",screenshots:[makeSS("Alibaba Listing","#e67e22"),makeSS("Design Compare","#c0392b"),makeSS("Patent Filing","#2c3e50")],previewShot:makeSS("Alibaba","#e67e22",200,110),mp:{price:"$8.50",stock:5000,sold:12400,offlineAction:true,images:[makeSS("Clone Charger","#e67e22",80,80),makeSS("Packaging","#2c3e50",80,80)]},timeline:[{date:"2024-01-10",event:"Case opened",type:"open"},{date:"2024-01-25",event:"Attorney engaged",type:"action"},{date:"2024-02-15",event:"C&D sent",type:"action"},{date:"2024-03-09",event:"Under legal review",type:"pending"}],comments:[{user:"Legal",date:"2024-03-09",text:"C&D acknowledged."}],documents:[],pinned:false},
];

const INIT_ASSETS=[
  {id:"a1",brand:1,name:"NordLight Logo Pack",type:"Logo",size:"4.2MB",date:"2024-01-10",url:"#"},
  {id:"a2",brand:1,name:"EU Trademark Certificate",type:"Trademark",size:"1.1MB",date:"2023-06-15",url:"#"},
  {id:"a3",brand:1,name:"EU Design Patent 2019",type:"Patent",size:"2.3MB",date:"2023-06-15",url:"#"},
  {id:"a4",brand:1,name:"Brand Guidelines 2024",type:"Other",size:"8.7MB",date:"2024-01-05",url:"#"},
  {id:"a5",brand:1,name:"Product Photography Kit",type:"Product Images",size:"45MB",date:"2024-02-01",url:"#"},
  {id:"a6",brand:1,name:"Official Website Screenshot",type:"Website",size:"0.8MB",date:"2024-03-01",url:"#"},
  {id:"a7",brand:1,name:"Copyright Registration US",type:"Copyright",size:"0.5MB",date:"2023-11-20",url:"#"},
  {id:"a8",brand:2,name:"PureOak Logo Pack",type:"Logo",size:"3.1MB",date:"2024-01-12",url:"#"},
  {id:"a9",brand:2,name:"EU Trademark Certificate",type:"Trademark",size:"1.2MB",date:"2023-08-10",url:"#"},
  {id:"a10",brand:3,name:"VoltEdge Patent Bundle",type:"Patent",size:"5.4MB",date:"2023-09-01",url:"#"},
];

const INIT_NOTIFS=[
  {id:1,type:"success",text:"BP-002: Resolved — Instagram account suspended",time:"2h ago",caseId:"BP-002",docId:null},
  {id:2,type:"danger",text:"BP-003: New phishing reports from customers",time:"5h ago",caseId:"BP-003",docId:null},
  {id:3,type:"warning",text:"BP-003: Domain registrar response overdue",time:"1d ago",caseId:"BP-003",docId:null},
  {id:4,type:"info",text:"BP-007: New document uploaded by legal team",time:"1d ago",caseId:"BP-007",docId:"patent_EU.pdf"},
  {id:5,type:"info",text:"February monthly report is ready",time:"3d ago",caseId:null,docId:"report_feb2024.pdf"},
  {id:6,type:"warning",text:"BP-001: Amazon seller re-listed removed products",time:"4d ago",caseId:"BP-001",docId:null},
];

const REPORTS=[
  {id:"r1",name:"Monthly Report — Feb 2024",date:"2024-03-01",size:"2.1MB",period:"monthly"},
  {id:"r2",name:"Weekly Summary — W11 2024",date:"2024-03-15",size:"0.8MB",period:"weekly"},
  {id:"r3",name:"Annual Report — 2023",date:"2024-01-15",size:"5.6MB",period:"annual"},
  {id:"r4",name:"Monthly Report — Jan 2024",date:"2024-02-01",size:"1.9MB",period:"monthly"},
];

const TOP_INF=[
  {name:"FashionDrop GmbH",cases:4,status:"Active",infringer:"FashionDrop GmbH"},
  {name:"TechClone Ltd",cases:3,status:"Legal Review",infringer:"TechClone Ltd"},
  {name:"BeautySupplyPlus",cases:2,status:"Active",infringer:"BeautySupplyPlus"},
  {name:"@style_fakes_eu",cases:1,status:"Resolved",infringer:"@style_fakes_eu"},
  {name:"RivalStore GmbH",cases:1,status:"Active",infringer:"RivalStore GmbH"},
];
const TOP_CTRY=[
  {country:"Germany",flag:"🇩🇪",cases:8},{country:"China",flag:"🇨🇳",cases:6},
  {country:"United Kingdom",flag:"🇬🇧",cases:5},{country:"Netherlands",flag:"🇳🇱",cases:3},{country:"France",flag:"🇫🇷",cases:2},
];

const PERIODS=[
  {label:"7d",days:7},{label:"30d",days:30},{label:"90d",days:90},{label:"1Y",days:365},{label:"All",days:9999}
];

function Toggle({on,onToggle,label,color}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      {label&&<span style={{fontSize:11,color:C.gray600}}>{label}</span>}
      <div onClick={onToggle} style={{width:34,height:18,borderRadius:9,background:on?(color||C.success):C.gray200,position:"relative",cursor:"pointer",transition:"background 0.2s",flexShrink:0}}>
        <div style={{width:14,height:14,borderRadius:"50%",background:C.white,position:"absolute",top:2,left:on?18:2,transition:"left 0.2s"}}></div>
      </div>
      {label!==undefined&&<span style={{fontSize:10,color:on?(color||C.success):C.gray400,fontWeight:500,minWidth:20}}>{on?"ON":"OFF"}</span>}
    </div>
  );
}

function DropZone({onDrop,label,compact}){
  const [over,setOver]=useState(false);
  return(
    <div onDragOver={e=>{e.preventDefault();setOver(true);}} onDragLeave={()=>setOver(false)} onDrop={e=>{e.preventDefault();setOver(false);onDrop(e);}} style={{border:`1.5px dashed ${over?C.blue400:C.gray200}`,borderRadius:8,padding:compact?"10px":"16px",textAlign:"center",background:over?C.blue50:"transparent",transition:"all 0.15s",cursor:"default"}}>
      <p style={{margin:0,fontSize:11,color:over?C.blue600:C.gray400}}>{label||"Drop files here"}</p>
    </div>
  );
}

function PeriodBar({period,setPeriod}){
  return(
    <div style={{display:"flex",gap:3,background:C.gray100,borderRadius:7,padding:3}}>
      {PERIODS.map(p=>(
        <button key={p.label} onClick={()=>setPeriod(p.label)} style={{padding:"3px 9px",borderRadius:5,border:"none",background:period===p.label?C.white:C.gray100,color:period===p.label?C.gray800:C.gray400,fontSize:11,fontWeight:period===p.label?500:400,cursor:"pointer",transition:"all 0.15s"}}>{p.label}</button>
      ))}
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
  const [chatMsgs,setChatMsgs]=useState([{role:"assistant",text:"Hello! Ask me about your cases, infringers, or brand protection strategy."}]);
  const [chatInput,setChatInput]=useState("");
  const [chatLoading,setChatLoading]=useState(false);
  const [newCaseOpen,setNewCaseOpen]=useState(false);
  const [newAssetOpen,setNewAssetOpen]=useState(false);
  const [newComment,setNewComment]=useState("");
  const [ssPreview,setSsPreview]=useState(null);
  const [ncForm,setNcForm]=useState({title:"",module:"Marketplace",priority:"Medium",platform:"",country:"",infringer:"",description:""});
  const [naForm,setNaForm]=useState({name:"",type:"Trademark",size:""});
  const [assetTypeFilter,setAssetTypeFilter]=useState("All");
  const [notifFilters,setNotifFilters]=useState({type:"all",caseId:""});
  const [dashPeriod,setDashPeriod]=useState("30d");
  const [period,setPeriod]=useState("All");
  const chatEndRef=useRef(null);

  const brandCases=cases.filter(c=>c.brand===activeBrand?.id);
  const brandAssets=assets.filter(a=>a.brand===activeBrand?.id);

  const periodDays=PERIODS.find(p=>p.label===period)?.days||9999;
  const dashPeriodDays=PERIODS.find(p=>p.label===dashPeriod)?.days||30;
  const now=new Date();
  const inPeriod=(dateStr,days)=>(now-new Date(dateStr))/(1000*60*60*24)<=days;

  const filteredCases=brandCases
    .filter(c=>{
      if(searchQ&&!c.title.toLowerCase().includes(searchQ.toLowerCase())&&!c.infringer.toLowerCase().includes(searchQ.toLowerCase())&&!c.id.toLowerCase().includes(searchQ.toLowerCase()))return false;
      if(activeFilters.module&&c.module!==activeFilters.module)return false;
      if(activeFilters.status&&c.status!==activeFilters.status)return false;
      if(activeFilters.priority&&c.priority!==activeFilters.priority)return false;
      if(activeFilters.country&&c.country!==activeFilters.country)return false;
      if(activeFilters.infringer&&c.infringer!==activeFilters.infringer)return false;
      if(activeFilters.period||period!=="All"){
        const d=activeFilters.period?PERIODS.find(p=>p.label===activeFilters.period)?.days:periodDays;
        if(!inPeriod(c.opened,d||9999))return false;
      }
      return true;
    })
    .sort((a,b)=>{
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

  const uniqueVals=(key)=>[...new Set(brandCases.map(c=>c[key]).filter(Boolean))];

  const ALL_FILTER_TYPES=[
    {key:"module",label:"Module",options:MODULES},
    {key:"status",label:"Status",options:["Active","Resolved","Legal Review"]},
    {key:"priority",label:"Priority",options:["Critical","High","Medium","Low"]},
    {key:"country",label:"Country",options:uniqueVals("country")},
    {key:"infringer",label:"Infringer",options:uniqueVals("infringer")},
    {key:"period",label:"Period",options:PERIODS.map(p=>p.label)},
  ];

  const openCase=(c,from)=>{setPrevView(from||view);setSelectedCase(c);setView("caseDetail");};
  const goFiltered=(filter)=>{setActiveFilters(filter);setPeriod("All");setView("cases");setSelectedCase(null);};

  const updateCase=(cid,fn)=>{
    setCases(cs=>cs.map(c=>c.id===cid?fn(c):c));
    setSelectedCase(sc=>sc&&sc.id===cid?fn(sc):sc);
  };

  const handleDropSS=(e,cid)=>{
    const files=[...e.dataTransfer.files].filter(f=>f.type.startsWith("image/"));
    const readers=files.map(f=>new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.readAsDataURL(f);}));
    Promise.all(readers).then(imgs=>updateCase(cid,c=>({...c,screenshots:[...c.screenshots,...imgs]})));
  };

  const handleDropDoc=(e,cid)=>{
    const names=[...e.dataTransfer.files].map(f=>f.name);
    updateCase(cid,c=>({...c,documents:[...c.documents,...names]}));
  };

  const handleDropAsset=(e)=>{
    e.preventDefault();
    const files=[...e.dataTransfer.files];
    const newAssets=files.map((f,i)=>({id:`a_drop_${Date.now()}_${i}`,brand:activeBrand.id,name:f.name,type:"Other",size:`${(f.size/1024/1024).toFixed(1)}MB`,date:new Date().toISOString().slice(0,10),url:"#"}));
    setAssets(a=>[...a,...newAssets]);
  };

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
    setCases(cs=>[...cs,{...ncForm,id:`BP-0${cs.length+10}`,brand:activeBrand.id,status:"Active",progress:0,isLead:false,relatedCases:[],bulkEnforcement:false,opened:now.toISOString().slice(0,10),updated:now.toISOString().slice(0,10),timeline:[{date:now.toISOString().slice(0,10),event:"Case opened",type:"open"}],comments:[],documents:[],screenshots:[],previewShot:makeSS(ncForm.platform||ncForm.module,C.blue600,200,110),pinned:false}]);
    setNewCaseOpen(false);setNcForm({title:"",module:"Marketplace",priority:"Medium",platform:"",country:"",infringer:"",description:""});
  };

  const submitAsset=()=>{
    if(!naForm.name)return;
    setAssets(a=>[...a,{id:`a_${Date.now()}`,brand:activeBrand.id,...naForm,date:now.toISOString().slice(0,10),url:"#"}]);
    setNewAssetOpen(false);setNaForm({name:"",type:"Trademark",size:""});
  };

  const addComment=(cid)=>{
    if(!newComment.trim())return;
    updateCase(cid,c=>({...c,comments:[...c.comments,{user:"Client",date:now.toISOString().slice(0,10),text:newComment}]}));
    setNewComment("");
  };

  const login=()=>{if(code==="BP2024"){setStage("brand");setCodeErr(false);}else setCodeErr(true);};
  const logout=()=>{setStage("login");setActiveBrand(null);setCode("");setView("dashboard");setSelectedCase(null);setActiveFilters({});};

  const dashCases=brandCases.filter(c=>inPeriod(c.opened,dashPeriodDays));

  // ── LOGIN ──────────────────────────────────────────
  if(stage==="login")return(
    <div style={{minHeight:540,display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${C.blue50} 0%,${C.gray50} 60%,${C.blue50} 100%)`}}>
      <div style={{background:C.white,borderRadius:20,padding:"44px 40px",width:340,border:`1px solid ${C.gray200}`,textAlign:"center"}}>
        <div style={{width:52,height:52,borderRadius:14,background:C.blue600,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",color:C.white,fontSize:20,fontWeight:500}}>BP</div>
        <p style={{fontSize:20,fontWeight:500,color:C.gray800,margin:"0 0 4px"}}>Brand Protection</p>
        <p style={{fontSize:12,color:C.gray400,margin:"0 0 28px"}}>Client Portal</p>
        <input value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="Access code" style={{width:"100%",padding:"10px 14px",borderRadius:8,border:`1.5px solid ${codeErr?C.danger:C.gray200}`,fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:10,textAlign:"center",letterSpacing:4,fontFamily:"monospace"}}/>
        {codeErr&&<p style={{color:C.danger,fontSize:12,margin:"0 0 8px"}}>Invalid code · Try: BP2024</p>}
        <button onClick={()=>{if(code==="BP2024"){setStage("brand");setCodeErr(false);}else setCodeErr(true);}} style={{width:"100%",padding:"10px",borderRadius:8,background:C.blue600,color:C.white,border:"none",fontSize:14,fontWeight:500,cursor:"pointer"}}>Continue</button>
        <p style={{fontSize:11,color:C.gray400,marginTop:12}}>Demo code: BP2024</p>
      </div>
    </div>
  );

  // ── BRAND SELECT ───────────────────────────────────
  if(stage==="brand")return(
    <div style={{minHeight:540,display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${C.blue50} 0%,${C.gray50} 60%,${C.blue50} 100%)`}}>
      <div style={{width:560,textAlign:"center"}}>
        <div style={{width:48,height:48,borderRadius:12,background:C.blue600,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:C.white,fontSize:16,fontWeight:500}}>BP</div>
        <p style={{fontSize:20,fontWeight:500,color:C.gray800,margin:"0 0 4px"}}>Welcome back</p>
        <p style={{fontSize:13,color:C.gray400,margin:"0 0 28px"}}>Select a brand profile</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {BRANDS.map(b=>{
            const bc=cases.filter(c=>c.brand===b.id);
            const active=bc.filter(c=>c.status==="Active").length;
            return(
              <div key={b.id} onClick={()=>{setActiveBrand(b);setStage("portal");setView("dashboard");}} style={{background:C.white,borderRadius:14,padding:"22px 16px",border:`1.5px solid ${C.gray200}`,cursor:"pointer",textAlign:"center",transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=b.color;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray200;e.currentTarget.style.transform="none";}}>
                <div style={{width:48,height:48,borderRadius:12,background:b.color,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",color:C.white,fontSize:16,fontWeight:500}}>{b.logo}</div>
                <p style={{margin:"0 0 3px",fontSize:14,fontWeight:500,color:C.gray800}}>{b.name}</p>
                <p style={{margin:"0 0 12px",fontSize:11,color:C.gray400}}>{b.desc}</p>
                <div style={{display:"flex",justifyContent:"center",gap:6}}>
                  <span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:C.blue50,color:C.blue800,fontWeight:500}}>{bc.length} cases</span>
                  {active>0&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:"#FEF3C7",color:C.warning,fontWeight:500}}>{active} active</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── PORTAL ─────────────────────────────────────────
  return(
    <div style={{display:"flex",minHeight:580,background:C.gray50,fontFamily:"system-ui,-apple-system,sans-serif",fontSize:14,position:"relative"}}>

      {/* Sidebar */}
      <div style={{width:200,background:C.white,borderRight:`1px solid ${C.gray200}`,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"12px 12px 8px",borderBottom:`1px solid ${C.gray200}`}}>
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            <div style={{width:26,height:26,borderRadius:6,background:C.blue600,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontSize:9,fontWeight:500}}>BP</div>
            <span style={{fontSize:11,fontWeight:500,color:C.gray800}}>Brand Protection</span>
          </div>
        </div>
        <nav style={{padding:"8px 8px",flex:1}}>
          {[{id:"dashboard",label:"Dashboard",icon:"▦"},{id:"cases",label:"Cases",icon:"◈"},{id:"notifications",label:"Notifications",icon:"◉",badge:notifs.filter(n=>n.type==="danger").length},{id:"toplist",label:"Top lists",icon:"◎"},{id:"assets",label:"Brand assets",icon:"◇"}].map(it=>(
            <div key={it.id} onClick={()=>{setView(it.id);setSelectedCase(null);setActiveFilters({});}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 8px",borderRadius:6,cursor:"pointer",marginBottom:1,background:view===it.id||(view==="caseDetail"&&it.id==="cases")?C.blue50:"transparent"}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <span style={{fontSize:11,color:(view===it.id||(view==="caseDetail"&&it.id==="cases"))?C.blue600:C.gray400}}>{it.icon}</span>
                <span style={{fontSize:12,color:(view===it.id||(view==="caseDetail"&&it.id==="cases"))?C.blue800:C.gray600,fontWeight:(view===it.id||(view==="caseDetail"&&it.id==="cases"))?500:400}}>{it.label}</span>
              </div>
              {it.badge>0&&<span style={{background:C.danger,color:C.white,borderRadius:8,fontSize:9,padding:"1px 4px",fontWeight:500}}>{it.badge}</span>}
            </div>
          ))}
          <div style={{margin:"8px 0 4px",padding:"0 8px"}}><p style={{margin:0,fontSize:9,color:C.gray400,textTransform:"uppercase",letterSpacing:0.5}}>Modules</p></div>
          {MODULES.map(m=>{
            const cnt=brandCases.filter(c=>c.module===m).length;
            if(!cnt)return null;
            return(
              <div key={m} onClick={()=>{setActiveFilters({module:m});setView("cases");setSelectedCase(null);}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 8px",borderRadius:5,cursor:"pointer",marginBottom:1,background:activeFilters.module===m&&view==="cases"?C.blue50:"transparent"}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{fontSize:10}}>{MODULE_ICONS[m]}</span>
                  <span style={{fontSize:11,color:C.gray600}}>{m}</span>
                </div>
                <span style={{fontSize:9,padding:"1px 4px",borderRadius:3,background:`${mColor(m)}18`,color:mColor(m),fontWeight:500}}>{cnt}</span>
              </div>
            );
          })}
        </nav>
        <div style={{padding:"8px 12px",borderTop:`1px solid ${C.gray200}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:C.blue100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:500,color:C.blue800}}>CL</div>
              <div>
                <p style={{margin:0,fontSize:11,fontWeight:500,color:C.gray800}}>{activeBrand?.name}</p>
                <button onClick={()=>setStage("brand")} style={{background:"none",border:"none",padding:0,fontSize:9,color:C.blue600,cursor:"pointer"}}>Switch brand</button>
              </div>
            </div>
            <button onClick={logout} title="Log out" style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:C.gray400,padding:2}}>⎋</button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        {/* Topbar */}
        <div style={{background:C.white,borderBottom:`1px solid ${C.gray200}`,padding:"0 16px",height:48,display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <div style={{flex:1,maxWidth:300,position:"relative"}}>
            <span style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)",color:C.gray400,fontSize:12}}>⌕</span>
            <input value={searchQ} onChange={e=>{setSearchQ(e.target.value);setView("cases");setActiveFilters({});}} placeholder="Search cases, infringers…" style={{width:"100%",padding:"5px 8px 5px 24px",borderRadius:6,border:`1px solid ${C.gray200}`,fontSize:12,outline:"none",boxSizing:"border-box",background:C.gray50}}/>
          </div>
          <button onClick={()=>setNewCaseOpen(true)} style={{background:C.blue600,color:C.white,border:"none",borderRadius:6,padding:"5px 11px",fontSize:11,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap"}}>+ New case</button>
          <button onClick={()=>setNewAssetOpen(true)} style={{background:C.white,color:C.blue600,border:`1px solid ${C.blue200}`,borderRadius:6,padding:"5px 11px",fontSize:11,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap"}}>+ Add asset</button>
          <div style={{display:"flex",alignItems:"center",gap:5,padding:"3px 9px",borderRadius:6,background:C.blue50,border:`1px solid ${C.blue100}`}}>
            <div style={{width:12,height:12,borderRadius:3,background:activeBrand?.color,flexShrink:0}}></div>
            <span style={{fontSize:11,fontWeight:500,color:C.blue800}}>{activeBrand?.name}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,overflow:"auto",padding:16}}>

          {/* ── DASHBOARD ─────────────────────────────── */}
          {view==="dashboard"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <p style={{fontSize:16,fontWeight:500,color:C.gray800,margin:0}}>Dashboard — {activeBrand?.name}</p>
                <PeriodBar period={dashPeriod} setPeriod={setDashPeriod}/>
              </div>
              {/* KPIs */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
                {[
                  {label:"Active cases",value:dashCases.filter(c=>c.status==="Active").length,color:C.blue600,filter:{status:"Active"}},
                  {label:"Resolved",value:dashCases.filter(c=>c.status==="Resolved").length,color:C.success,filter:{status:"Resolved"}},
                  {label:"Critical",value:dashCases.filter(c=>c.priority==="Critical").length,color:C.danger,filter:{priority:"Critical"}},
                  {label:"Success rate",value:dashCases.length?Math.round(dashCases.filter(c=>c.status==="Resolved").length/dashCases.length*100)+"%":"—",color:C.warning,filter:null},
                ].map((k,i)=>(
                  <div key={i} onClick={()=>k.filter&&goFiltered(k.filter)} style={{background:C.white,borderRadius:10,border:`1px solid ${C.gray200}`,padding:"11px 13px",cursor:k.filter?"pointer":"default",transition:"border-color 0.15s"}} onMouseEnter={e=>k.filter&&(e.currentTarget.style.borderColor=k.color)} onMouseLeave={e=>(e.currentTarget.style.borderColor=C.gray200)}>
                    <p style={{margin:"0 0 2px",fontSize:9,color:C.gray400,textTransform:"uppercase",letterSpacing:0.5}}>{k.label}</p>
                    <p style={{margin:0,fontSize:22,fontWeight:500,color:k.color}}>{k.value}</p>
                    {k.filter&&<p style={{margin:"2px 0 0",fontSize:9,color:C.blue400}}>View →</p>}
                  </div>
                ))}
              </div>
              {/* Module grid */}
              <div style={{background:C.white,borderRadius:10,border:`1px solid ${C.gray200}`,padding:13,marginBottom:13}}>
                <p style={{margin:"0 0 10px",fontSize:11,fontWeight:500,color:C.gray800}}>Cases by module</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7}}>
                  {MODULES.map(m=>{
                    const cnt=dashCases.filter(c=>c.module===m).length;
                    return(
                      <div key={m} onClick={()=>goFiltered({module:m})} style={{textAlign:"center",padding:"9px 4px",borderRadius:7,border:`1px solid ${C.gray200}`,cursor:"pointer",background:C.gray50,transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.background=C.blue50;e.currentTarget.style.borderColor=mColor(m);}} onMouseLeave={e=>{e.currentTarget.style.background=C.gray50;e.currentTarget.style.borderColor=C.gray200;}}>
                        <div style={{fontSize:16,marginBottom:3}}>{MODULE_ICONS[m]}</div>
                        <p style={{margin:"0 0 1px",fontSize:13,color:C.gray700,fontWeight:500}}>{cnt}</p>
                        <p style={{margin:0,fontSize:9,color:C.gray400}}>{m}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:13}}>
                {/* Recent cases */}
                <div style={{background:C.white,borderRadius:10,border:`1px solid ${C.gray200}`,padding:13}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
                    <p style={{margin:0,fontSize:11,fontWeight:500,color:C.gray800}}>Recent cases</p>
                    <button onClick={()=>goFiltered({})} style={{fontSize:10,color:C.blue600,background:"none",border:"none",cursor:"pointer",padding:0}}>View all</button>
                  </div>
                  {dashCases.slice(0,4).map(c=>(
                    <div key={c.id} onClick={()=>openCase(c,"dashboard")} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 0",borderBottom:`1px solid ${C.gray100}`,cursor:"pointer"}}>
                      {c.previewShot&&<img src={c.previewShot} alt="" style={{width:32,height:20,borderRadius:3,objectFit:"cover",flexShrink:0}}/>}
                      <div style={{flex:1,minWidth:0}}>
                        <p style={{margin:0,fontSize:11,fontWeight:500,color:C.gray800,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.title}</p>
                        <p style={{margin:0,fontSize:9,color:C.gray400}}>{c.module} · {c.updated}</p>
                      </div>
                      <span style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:`${sColor(c.status)}15`,color:sColor(c.status),fontWeight:500,flexShrink:0}}>{c.status}</span>
                    </div>
                  ))}
                </div>
                {/* Reports */}
                <div style={{background:C.white,borderRadius:10,border:`1px solid ${C.gray200}`,padding:13}}>
                  <p style={{margin:"0 0 9px",fontSize:11,fontWeight:500,color:C.gray800}}>Reports</p>
                  {REPORTS.map(r=>(
                    <div key={r.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${C.gray100}`}}>
                      <span style={{fontSize:14}}>📋</span>
                      <div style={{flex:1}}>
                        <p style={{margin:0,fontSize:11,fontWeight:500,color:C.gray800}}>{r.name}</p>
                        <p style={{margin:0,fontSize:9,color:C.gray400}}>{r.date} · {r.size}</p>
                      </div>
                      <button style={{fontSize:10,color:C.blue600,background:C.blue50,border:`1px solid ${C.blue100}`,borderRadius:4,padding:"2px 7px",cursor:"pointer"}}>↓</button>
                    </div>
                  ))}
                  <button style={{marginTop:8,width:"100%",padding:"5px",borderRadius:6,border:`1px dashed ${C.gray200}`,background:"transparent",fontSize:10,color:C.gray400,cursor:"pointer"}}>+ Generate report</button>
                </div>
              </div>
              {/* Notifications preview */}
              <div style={{background:C.white,borderRadius:10,border:`1px solid ${C.gray200}`,padding:13}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
                  <p style={{margin:0,fontSize:11,fontWeight:500,color:C.gray800}}>Notifications</p>
                  <button onClick={()=>setView("notifications")} style={{fontSize:10,color:C.blue600,background:"none",border:"none",cursor:"pointer",padding:0}}>View all</button>
                </div>
                {notifs.slice(0,3).map(n=>(
                  <div key={n.id} style={{display:"flex",gap:7,padding:"5px 0",borderBottom:`1px solid ${C.gray100}`,cursor:n.caseId?"pointer":"default"}} onClick={()=>n.caseId&&openCase(cases.find(c=>c.id===n.caseId),"dashboard")}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:nColor(n.type),marginTop:4,flexShrink:0}}></div>
                    <div style={{flex:1}}><p style={{margin:0,fontSize:11,color:C.gray700}}>{n.text}</p><p style={{margin:0,fontSize:9,color:C.gray400}}>{n.time}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CASES ──────────────────────────────────── */}
          {view==="cases"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div>
                  <p style={{fontSize:16,fontWeight:500,color:C.gray800,margin:"0 0 1px"}}>Cases — {activeBrand?.name}</p>
                  <p style={{margin:0,fontSize:10,color:C.gray400}}>{displayCases.length} case{displayCases.length!==1?"s":""}{pinned.length>0?` · ${pinned.length} pinned`:""}</p>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  {/* Sort */}
                  <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:"4px 7px",borderRadius:6,border:`1px solid ${C.gray200}`,fontSize:11,outline:"none",background:C.white,color:C.gray700}}>
                    <option value="updated">Last updated</option>
                    <option value="opened">Date opened</option>
                    <option value="priority">Priority</option>
                    <option value="progress">Progress</option>
                    <option value="status">Status</option>
                    <option value="title">Title A–Z</option>
                  </select>
                  <button onClick={()=>setSortDir(d=>d==="asc"?"desc":"asc")} style={{padding:"4px 7px",borderRadius:6,border:`1px solid ${C.gray200}`,background:C.white,fontSize:11,cursor:"pointer",color:C.gray600}}>{sortDir==="asc"?"↑":"↓"}</button>
                  {/* Filter customise */}
                  <div style={{position:"relative"}}>
                    <button onClick={()=>setFilterMenuOpen(o=>!o)} style={{padding:"4px 9px",borderRadius:6,border:`1px solid ${C.gray200}`,background:C.white,fontSize:11,cursor:"pointer",color:C.gray600}}>Filters ⚙</button>
                    {filterMenuOpen&&(
                      <div style={{position:"absolute",right:0,top:"calc(100% + 4px)",background:C.white,border:`1px solid ${C.gray200}`,borderRadius:8,padding:10,zIndex:20,minWidth:160,boxShadow:"0 4px 12px rgba(0,0,0,0.08)"}}>
                        <p style={{margin:"0 0 6px",fontSize:10,color:C.gray400,fontWeight:500}}>Visible filters</p>
                        {ALL_FILTER_TYPES.map(ft=>(
                          <label key={ft.key} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,cursor:"pointer"}}>
                            <input type="checkbox" checked={visibleFilters.includes(ft.key)} onChange={()=>setVisibleFilters(vf=>vf.includes(ft.key)?vf.filter(x=>x!==ft.key):[...vf,ft.key])} style={{margin:0}}/>
                            <span style={{fontSize:11,color:C.gray700}}>{ft.label}</span>
                          </label>
                        ))}
                        <button onClick={()=>setFilterMenuOpen(false)} style={{marginTop:6,width:"100%",padding:"4px",borderRadius:5,border:`1px solid ${C.gray200}`,background:C.gray50,fontSize:10,cursor:"pointer"}}>Done</button>
                      </div>
                    )}
                  </div>
                  {Object.keys(activeFilters).length>0&&<button onClick={()=>{setActiveFilters({});setPeriod("All");}} style={{fontSize:10,color:C.gray600,background:C.gray100,border:`1px solid ${C.gray200}`,borderRadius:5,padding:"4px 8px",cursor:"pointer"}}>Clear ×</button>}
                </div>
              </div>
              {/* Filter dropdowns */}
              {visibleFilters.length>0&&(
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                  {ALL_FILTER_TYPES.filter(ft=>visibleFilters.includes(ft.key)).map(ft=>{
                    const val=ft.key==="period"?activeFilters.period:activeFilters[ft.key];
                    const active=!!val;
                    return(
                      <div key={ft.key} style={{position:"relative"}}>
                        <select
                          value={val||""}
                          onChange={e=>{
                            const v=e.target.value;
                            setActiveFilters(f=>({...f,[ft.key]:v||undefined}));
                          }}
                          style={{padding:"4px 22px 4px 8px",borderRadius:6,border:`1px solid ${active?C.blue400:C.gray200}`,background:active?C.blue50:C.white,color:active?C.blue800:C.gray600,fontSize:11,outline:"none",cursor:"pointer",appearance:"none",WebkitAppearance:"none",fontWeight:active?500:400}}
                        >
                          <option value="">{ft.label}</option>
                          {(ft.key==="period"?PERIODS.map(p=>p.label):ft.options).map(opt=>(
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <span style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",fontSize:9,color:active?C.blue600:C.gray400,pointerEvents:"none"}}>▾</span>
                        {active&&(
                          <button onClick={()=>setActiveFilters(f=>({...f,[ft.key]:undefined}))} style={{position:"absolute",right:18,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:11,color:C.blue400,padding:0,lineHeight:1}}>×</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {displayCases.length===0&&<div style={{textAlign:"center",padding:36,color:C.gray400}}>No cases match the current filters.</div>}
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {displayCases.map(c=>(
                  <div key={c.id} style={{background:C.white,borderRadius:9,border:`1px solid ${c.pinned?C.blue200:C.gray200}`,padding:"10px 12px",display:"flex",gap:10,alignItems:"center",transition:"border-color 0.15s"}} onMouseEnter={e=>!c.pinned&&(e.currentTarget.style.borderColor=C.blue100)} onMouseLeave={e=>!c.pinned&&(e.currentTarget.style.borderColor=C.gray200)}>
                    {/* Pin checkbox */}
                    <input type="checkbox" checked={!!c.pinned} onChange={()=>updateCase(c.id,x=>({...x,pinned:!x.pinned}))} onClick={e=>e.stopPropagation()} title={c.pinned?"Unpin":"Pin to top"} style={{margin:0,cursor:"pointer",flexShrink:0}}/>
                    {c.previewShot&&<img src={c.previewShot} alt="" onClick={()=>openCase(c,"cases")} style={{width:60,height:36,borderRadius:5,objectFit:"cover",flexShrink:0,border:`1px solid ${C.gray200}`,cursor:"pointer"}}/>}
                    <div style={{flex:1,minWidth:0,cursor:"pointer"}} onClick={()=>openCase(c,"cases")}>
                      <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                        {c.pinned&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:C.blue50,color:C.blue600,fontWeight:500}}>📌 Pinned</span>}
                        {c.isLead&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:"#EFF6FF",color:"#2563EB",fontWeight:500}}>Lead</span>}
                        <span style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:`${mColor(c.module)}15`,color:mColor(c.module),fontWeight:500}}>{MODULE_ICONS[c.module]} {c.module}</span>
                        <span style={{fontSize:9,color:C.gray400}}>{c.id}</span>
                      </div>
                      <p style={{margin:"0 0 2px",fontSize:12,fontWeight:500,color:C.gray800,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.title}</p>
                      <p style={{margin:0,fontSize:10,color:C.gray400}}>{c.infringer} · {c.country} · {c.updated}</p>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0,cursor:"pointer"}} onClick={()=>openCase(c,"cases")}>
                      <div style={{display:"flex",gap:4}}>
                        <span style={{fontSize:9,padding:"2px 6px",borderRadius:3,background:`${sColor(c.status)}15`,color:sColor(c.status),fontWeight:500}}>{c.status}</span>
                        <span style={{fontSize:9,padding:"2px 6px",borderRadius:3,background:`${pColor(c.priority)}15`,color:pColor(c.priority),fontWeight:500}}>{c.priority}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:5}}>
                        <div style={{width:70,height:3,borderRadius:2,background:C.gray100,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${c.progress}%`,background:c.status==="Resolved"?C.success:C.blue400}}></div>
                        </div>
                        <span style={{fontSize:9,color:C.gray400}}>{c.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CASE DETAIL ────────────────────────────── */}
          {view==="caseDetail"&&selectedCase&&(()=>{
            const c=selectedCase;
            return(
              <div>
                <button onClick={()=>setView(prevView||"cases")} style={{background:"none",border:"none",color:C.blue600,fontSize:11,cursor:"pointer",padding:0,marginBottom:12}}>← Back</button>
                {/* Header */}
                <div style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray200}`,padding:16,marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                        {c.isLead&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:"#EFF6FF",color:"#2563EB",fontWeight:500}}>Lead case</span>}
                        <span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:`${mColor(c.module)}15`,color:mColor(c.module),fontWeight:500}}>{MODULE_ICONS[c.module]} {c.module}</span>
                        <span style={{fontSize:10,color:C.gray400}}>{c.id}</span>
                      </div>
                      <p style={{margin:"0 0 2px",fontSize:15,fontWeight:500,color:C.gray800}}>{c.title}</p>
                      <p style={{margin:0,fontSize:10,color:C.gray400}}>{c.platform} · {c.country} · Opened {c.opened}</p>
                    </div>
                    <div style={{display:"flex",gap:5}}>
                      <span style={{fontSize:10,padding:"3px 8px",borderRadius:5,background:`${sColor(c.status)}15`,color:sColor(c.status),fontWeight:500}}>{c.status}</span>
                      <span style={{fontSize:10,padding:"3px 8px",borderRadius:5,background:`${pColor(c.priority)}15`,color:pColor(c.priority),fontWeight:500}}>{c.priority}</span>
                    </div>
                  </div>
                  <p style={{margin:"0 0 8px",fontSize:12,color:C.gray600,lineHeight:1.6}}>{c.description}</p>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontSize:10,color:C.gray400}}>Progress</span>
                    <div style={{flex:1,height:4,borderRadius:2,background:C.gray100,overflow:"hidden"}}><div style={{height:"100%",width:`${c.progress}%`,background:c.status==="Resolved"?C.success:C.blue400}}></div></div>
                    <span style={{fontSize:10,fontWeight:500,color:C.gray600}}>{c.progress}%</span>
                  </div>
                </div>

                {/* Module-specific */}
                {c.module==="Marketplace"&&c.mp&&(
                  <div style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray200}`,padding:14,marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <p style={{margin:0,fontSize:12,fontWeight:500,color:C.gray800}}>🛒 Marketplace data</p>
                      <Toggle on={c.mp.offlineAction} onToggle={()=>updateCase(c.id,x=>({...x,mp:{...x.mp,offlineAction:!x.mp.offlineAction}}))} label="Offline action" color={C.warning}/>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
                      {[["Listed price",c.mp.price],["Stock",c.mp.stock.toLocaleString()],["Units sold",c.mp.sold.toLocaleString()]].map(([l,v])=>(
                        <div key={l} style={{background:C.gray50,borderRadius:7,padding:"8px 10px"}}>
                          <p style={{margin:0,fontSize:9,color:C.gray400,textTransform:"uppercase",letterSpacing:0.5}}>{l}</p>
                          <p style={{margin:0,fontSize:16,fontWeight:500,color:C.gray800}}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <p style={{margin:"0 0 6px",fontSize:11,color:C.gray600,fontWeight:500}}>Product images</p>
                    <div style={{display:"flex",gap:7}}>
                      {c.mp.images.map((img,i)=>(
                        <img key={i} src={img} alt="" style={{width:64,height:64,borderRadius:7,objectFit:"cover",border:`1px solid ${C.gray200}`,cursor:"pointer"}} onClick={()=>setSsPreview(img)}/>
                      ))}
                    </div>
                  </div>
                )}
                {c.module==="Social Media"&&c.sm&&(
                  <div style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray200}`,padding:14,marginBottom:12}}>
                    <p style={{margin:"0 0 10px",fontSize:12,fontWeight:500,color:C.gray800}}>📱 Social media profile</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                      {[["Profile name",c.sm.profileName],["Followers",c.sm.followers],["Created",c.sm.created]].map(([l,v])=>(
                        <div key={l} style={{background:C.gray50,borderRadius:7,padding:"8px 10px"}}>
                          <p style={{margin:0,fontSize:9,color:C.gray400,textTransform:"uppercase",letterSpacing:0.5}}>{l}</p>
                          <p style={{margin:0,fontSize:14,fontWeight:500,color:C.gray800}}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related cases */}
                {c.isLead&&(
                  <div style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray200}`,padding:14,marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <p style={{margin:0,fontSize:12,fontWeight:500,color:C.gray800}}>Related cases ({c.relatedCases.length})</p>
                      <Toggle on={c.bulkEnforcement} onToggle={()=>updateCase(c.id,x=>({...x,bulkEnforcement:!x.bulkEnforcement}))} label="Bulk enforcement"/>
                    </div>
                    {c.bulkEnforcement&&<div style={{padding:"7px 10px",borderRadius:7,background:"#F0FDF4",border:"1px solid #BBF7D0",marginBottom:9,fontSize:10,color:"#15803D"}}>✓ Bulk enforcement active — all {c.relatedCases.length} related URLs will receive simultaneous takedowns.</div>}
                    <div style={{display:"flex",flexDirection:"column",gap:5}}>
                      {c.relatedCases.map((rc,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 9px",borderRadius:7,background:C.gray50,border:`1px solid ${C.gray200}`}}>
                          <span style={{fontSize:11,color:C.blue600,flex:1,fontFamily:"monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{rc.url}</span>
                          <div style={{display:"flex",gap:3,flexShrink:0}}>
                            {rc.tags.map(tag=><span key={tag} style={{fontSize:9,padding:"2px 6px",borderRadius:3,background:TAG_COLORS[tag][0],color:TAG_COLORS[tag][1],fontWeight:500}}>{tag}</span>)}
                          </div>
                        </div>
                      ))}
                      {c.relatedCases.length===0&&<p style={{margin:0,fontSize:11,color:C.gray400}}>No related URLs linked.</p>}
                    </div>
                  </div>
                )}

                {/* Screenshots */}
                <div style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray200}`,padding:14,marginBottom:12}}>
                  <p style={{margin:"0 0 10px",fontSize:12,fontWeight:500,color:C.gray800}}>Screenshots{c.screenshots?.length>0?` (${c.screenshots.length})`:""}</p>
                  {c.screenshots?.length>0&&(
                    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:9}}>
                      {c.screenshots.map((ss,i)=>(
                        <div key={i} style={{borderRadius:7,overflow:"hidden",border:`1px solid ${C.gray200}`,position:"relative"}}>
                          <img src={ss} alt="" onClick={()=>setSsPreview(ss)} style={{width:"100%",display:"block",cursor:"pointer"}}/>
                          <button onClick={()=>updateCase(c.id,x=>({...x,screenshots:x.screenshots.filter((_,j)=>j!==i)}))} style={{position:"absolute",top:4,right:4,width:18,height:18,borderRadius:"50%",background:"rgba(0,0,0,0.5)",color:C.white,border:"none",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
                          <div style={{padding:"4px 8px",background:C.gray50}}><p style={{margin:0,fontSize:9,color:C.gray400}}>Screenshot {i+1} · click to enlarge</p></div>
                        </div>
                      ))}
                    </div>
                  )}
                  <DropZone onDrop={e=>handleDropSS(e,c.id)} label="Drop image files here to add screenshots" compact/>
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                  {/* Timeline */}
                  <div style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray200}`,padding:13}}>
                    <p style={{margin:"0 0 10px",fontSize:12,fontWeight:500,color:C.gray800}}>Timeline</p>
                    {c.timeline.map((t,i)=>(
                      <div key={i} style={{display:"flex",gap:8,marginBottom:8}}>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                          <div style={{width:7,height:7,borderRadius:"50%",background:t.type==="success"?C.success:t.type==="pending"?C.warning:C.blue400,marginTop:2}}></div>
                          {i<c.timeline.length-1&&<div style={{width:1,height:14,background:C.gray200,margin:"3px 0"}}></div>}
                        </div>
                        <div>
                          <p style={{margin:0,fontSize:11,fontWeight:500,color:C.gray700}}>{t.event}</p>
                          <p style={{margin:0,fontSize:9,color:C.gray400}}>{t.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Documents */}
                  <div style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray200}`,padding:13}}>
                    <p style={{margin:"0 0 10px",fontSize:12,fontWeight:500,color:C.gray800}}>Documents</p>
                    {c.documents.map((d,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 0",borderBottom:`1px solid ${C.gray100}`}}>
                        <span style={{fontSize:10,color:C.blue400}}>◈</span>
                        <span style={{fontSize:11,color:C.gray700,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d}</span>
                        <button onClick={()=>updateCase(c.id,x=>({...x,documents:x.documents.filter((_,j)=>j!==i)}))} style={{fontSize:11,color:C.danger,background:"none",border:"none",cursor:"pointer",padding:0}}>×</button>
                      </div>
                    ))}
                    <div style={{marginTop:7}}><DropZone onDrop={e=>handleDropDoc(e,c.id)} label="Drop files here" compact/></div>
                  </div>
                </div>

                {/* Comments */}
                <div style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray200}`,padding:13}}>
                  <p style={{margin:"0 0 10px",fontSize:12,fontWeight:500,color:C.gray800}}>Comments</p>
                  {c.comments.length===0&&<p style={{fontSize:11,color:C.gray400,marginBottom:8}}>No comments yet.</p>}
                  {c.comments.map((cm,i)=>(
                    <div key={i} style={{display:"flex",gap:7,marginBottom:8,padding:"8px 9px",background:C.gray50,borderRadius:7}}>
                      <div style={{width:24,height:24,borderRadius:"50%",background:C.blue100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:500,color:C.blue800,flexShrink:0}}>{cm.user.slice(0,2).toUpperCase()}</div>
                      <div><p style={{margin:"0 0 1px",fontSize:11,fontWeight:500,color:C.gray800}}>{cm.user} <span style={{fontWeight:400,color:C.gray400}}>· {cm.date}</span></p><p style={{margin:0,fontSize:11,color:C.gray600,lineHeight:1.5}}>{cm.text}</p></div>
                    </div>
                  ))}
                  <div style={{display:"flex",gap:6}}>
                    <input value={newComment} onChange={e=>setNewComment(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addComment(c.id)} placeholder="Add a comment…" style={{flex:1,padding:"6px 9px",borderRadius:6,border:`1px solid ${C.gray200}`,fontSize:11,outline:"none"}}/>
                    <button onClick={()=>addComment(c.id)} style={{padding:"6px 11px",borderRadius:6,background:C.blue600,color:C.white,border:"none",fontSize:11,cursor:"pointer"}}>Post</button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── NOTIFICATIONS ──────────────────────────── */}
          {view==="notifications"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <p style={{fontSize:16,fontWeight:500,color:C.gray800,margin:0}}>Notifications</p>
                <div style={{display:"flex",gap:6}}>
                  {["all","success","warning","danger","info"].map(t=>(
                    <button key={t} onClick={()=>setNotifFilters(f=>({...f,type:t}))} style={{padding:"3px 9px",borderRadius:5,border:`1px solid ${notifFilters.type===t?nColor(t==="all"?C.blue600:t):C.gray200}`,background:notifFilters.type===t?`${nColor(t==="all"?"info":t)}10`:C.white,color:notifFilters.type===t?nColor(t==="all"?"info":t):C.gray500,fontSize:10,cursor:"pointer",fontWeight:notifFilters.type===t?500:400,textTransform:"capitalize"}}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {notifs.filter(n=>notifFilters.type==="all"||n.type===notifFilters.type).map(n=>(
                  <div key={n.id} style={{background:C.white,borderRadius:9,border:`1px solid ${C.gray200}`,padding:"10px 13px",display:"flex",gap:9,alignItems:"flex-start"}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:nColor(n.type),marginTop:4,flexShrink:0}}></div>
                    <div style={{flex:1}}>
                      <p style={{margin:"0 0 1px",fontSize:12,color:C.gray800}}>{n.text}</p>
                      <p style={{margin:0,fontSize:10,color:C.gray400}}>{n.time}</p>
                    </div>
                    <div style={{display:"flex",gap:5,flexShrink:0}}>
                      {n.caseId&&<button onClick={()=>{const c=cases.find(x=>x.id===n.caseId);if(c)openCase(c,"notifications");}} style={{fontSize:10,color:C.blue600,background:C.blue50,border:`1px solid ${C.blue100}`,borderRadius:4,padding:"2px 7px",cursor:"pointer"}}>View case</button>}
                      {n.docId&&<button style={{fontSize:10,color:C.gray600,background:C.gray100,border:`1px solid ${C.gray200}`,borderRadius:4,padding:"2px 7px",cursor:"pointer"}}>↓ Doc</button>}
                      <button onClick={()=>setNotifs(ns=>ns.filter(x=>x.id!==n.id))} style={{background:"none",border:"none",color:C.gray400,cursor:"pointer",fontSize:14,padding:0}}>×</button>
                    </div>
                  </div>
                ))}
                {notifs.filter(n=>notifFilters.type==="all"||n.type===notifFilters.type).length===0&&<div style={{textAlign:"center",padding:36,color:C.gray400}}>All caught up!</div>}
              </div>
            </div>
          )}

          {/* ── TOP LIST ───────────────────────────────── */}
          {view==="toplist"&&(
            <div>
              <p style={{fontSize:16,fontWeight:500,color:C.gray800,margin:"0 0 13px"}}>Top lists</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13}}>
                <div style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray200}`,padding:14}}>
                  <p style={{margin:"0 0 10px",fontSize:12,fontWeight:500,color:C.gray800}}>Top infringers</p>
                  {TOP_INF.map((inf,i)=>(
                    <div key={i} onClick={()=>goFiltered({infringer:inf.infringer})} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${C.gray100}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=C.gray50} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <span style={{width:18,height:18,borderRadius:"50%",background:i===0?C.blue600:C.gray100,color:i===0?C.white:C.gray600,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:500,flexShrink:0}}>{i+1}</span>
                      <span style={{flex:1,fontSize:11,color:C.gray700}}>{inf.name}</span>
                      <span style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:`${sColor(inf.status)}15`,color:sColor(inf.status)}}>{inf.status}</span>
                      <span style={{fontSize:11,fontWeight:500,color:C.gray600,minWidth:12,textAlign:"right"}}>{inf.cases}</span>
                      <span style={{fontSize:9,color:C.blue400}}>→</span>
                    </div>
                  ))}
                </div>
                <div style={{background:C.white,borderRadius:11,border:`1px solid ${C.gray200}`,padding:14}}>
                  <p style={{margin:"0 0 10px",fontSize:12,fontWeight:500,color:C.gray800}}>Top countries</p>
                  {TOP_CTRY.map((ct,i)=>(
                    <div key={i} onClick={()=>goFiltered({country:ct.country})} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${C.gray100}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=C.gray50} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <span style={{fontSize:14}}>{ct.flag}</span>
                      <span style={{flex:1,fontSize:11,color:C.gray700}}>{ct.country}</span>
                      <div style={{width:50,height:3,borderRadius:2,background:C.gray100,overflow:"hidden"}}><div style={{height:"100%",width:`${ct.cases/8*100}%`,background:C.blue400}}></div></div>
                      <span style={{fontSize:11,fontWeight:500,color:C.gray600,minWidth:12,textAlign:"right"}}>{ct.cases}</span>
                      <span style={{fontSize:9,color:C.blue400}}>→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── BRAND ASSETS ───────────────────────────── */}
          {view==="assets"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:13}}>
                <p style={{fontSize:16,fontWeight:500,color:C.gray800,margin:0}}>Brand assets — {activeBrand?.name}</p>
                <button onClick={()=>setNewAssetOpen(true)} style={{background:C.blue600,color:C.white,border:"none",borderRadius:6,padding:"5px 11px",fontSize:11,fontWeight:500,cursor:"pointer"}}>+ Add asset</button>
              </div>
              {/* Type filters */}
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:13}}>
                {ASSET_TYPES.map(t=>{
                  const cnt=brandAssets.filter(a=>t==="All"||a.type===t).length;
                  return(
                    <button key={t} onClick={()=>setAssetTypeFilter(t)} style={{padding:"3px 9px",borderRadius:5,border:`1px solid ${assetTypeFilter===t?C.blue400:C.gray200}`,background:assetTypeFilter===t?C.blue50:C.white,color:assetTypeFilter===t?C.blue800:C.gray600,fontSize:10,cursor:"pointer",fontWeight:assetTypeFilter===t?500:400}}>
                      {t!=="All"&&ASSET_ICONS[t]+" "}{t} ({cnt})
                    </button>
                  );
                })}
              </div>
              {/* Drop zone */}
              <div onDragOver={e=>e.preventDefault()} onDrop={handleDropAsset} style={{border:`1.5px dashed ${C.blue200}`,borderRadius:9,padding:"14px",textAlign:"center",background:C.blue50,marginBottom:13,cursor:"default"}}>
                <p style={{margin:0,fontSize:12,color:C.blue600}}>Drop files here to add assets</p>
              </div>
              {/* Asset groups */}
              {(assetTypeFilter==="All"?ASSET_TYPES.filter(t=>t!=="All"):([assetTypeFilter])).map(type=>{
                const typeAssets=brandAssets.filter(a=>a.type===type);
                if(!typeAssets.length)return null;
                return(
                  <div key={type} style={{marginBottom:14}}>
                    <p style={{margin:"0 0 7px",fontSize:11,fontWeight:500,color:C.gray600,textTransform:"uppercase",letterSpacing:0.5}}>{ASSET_ICONS[type]} {type}</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                      {typeAssets.map(a=>(
                        <div key={a.id} style={{background:C.white,borderRadius:8,border:`1px solid ${C.gray200}`,padding:"11px 13px"}}>
                          <div style={{width:28,height:28,borderRadius:6,background:C.blue50,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:7,fontSize:14}}>{ASSET_ICONS[a.type]}</div>
                          <p style={{margin:"0 0 2px",fontSize:12,fontWeight:500,color:C.gray800}}>{a.name}</p>
                          <p style={{margin:0,fontSize:10,color:C.gray400}}>{a.date} · {a.size}</p>
                          <div style={{display:"flex",gap:5,marginTop:7}}>
                            <button style={{fontSize:10,color:C.blue600,background:C.blue50,border:`1px solid ${C.blue100}`,borderRadius:4,padding:"2px 7px",cursor:"pointer"}}>↓</button>
                            <button onClick={()=>setAssets(as=>as.filter(x=>x.id!==a.id))} style={{fontSize:10,color:C.danger,background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:4,padding:"2px 7px",cursor:"pointer"}}>×</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {brandAssets.filter(a=>assetTypeFilter==="All"||a.type===assetTypeFilter).length===0&&<div style={{textAlign:"center",padding:36,color:C.gray400}}>No assets found.</div>}
            </div>
          )}
        </div>
      </div>

      {/* Screenshot lightbox */}
      {ssPreview&&(
        <div onClick={()=>setSsPreview(null)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:60}}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.white,borderRadius:12,padding:14,maxWidth:500,width:"90%"}}>
            <img src={ssPreview} alt="" style={{width:"100%",borderRadius:7,display:"block"}}/>
            <button onClick={()=>setSsPreview(null)} style={{marginTop:9,width:"100%",padding:"6px",borderRadius:6,border:`1px solid ${C.gray200}`,background:C.white,fontSize:11,cursor:"pointer",color:C.gray600}}>Close</button>
          </div>
        </div>
      )}

      {/* New Case Modal */}
      {newCaseOpen&&(
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}}>
          <div style={{background:C.white,borderRadius:13,padding:20,width:440,maxHeight:"80vh",overflow:"auto",border:`1px solid ${C.gray200}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <p style={{margin:0,fontSize:13,fontWeight:500,color:C.gray800}}>New case</p>
              <button onClick={()=>setNewCaseOpen(false)} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:C.gray400}}>×</button>
            </div>
            {[["Title","title"],["Infringer","infringer"],["Platform","platform"],["Country","country"]].map(([l,k])=>(
              <div key={k} style={{marginBottom:8}}>
                <p style={{margin:"0 0 2px",fontSize:10,color:C.gray600}}>{l}</p>
                <input value={ncForm[k]} onChange={e=>setNcForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",padding:"6px 8px",borderRadius:5,border:`1px solid ${C.gray200}`,fontSize:11,outline:"none",boxSizing:"border-box"}}/>
              </div>
            ))}
            {[["Module","module",MODULES],["Priority","priority",["Critical","High","Medium","Low"]]].map(([l,k,opts])=>(
              <div key={k} style={{marginBottom:8}}>
                <p style={{margin:"0 0 2px",fontSize:10,color:C.gray600}}>{l}</p>
                <select value={ncForm[k]} onChange={e=>setNcForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",padding:"6px 8px",borderRadius:5,border:`1px solid ${C.gray200}`,fontSize:11,outline:"none",background:C.white,boxSizing:"border-box"}}>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div style={{marginBottom:12}}>
              <p style={{margin:"0 0 2px",fontSize:10,color:C.gray600}}>Description</p>
              <textarea value={ncForm.description} onChange={e=>setNcForm(f=>({...f,description:e.target.value}))} rows={3} style={{width:"100%",padding:"6px 8px",borderRadius:5,border:`1px solid ${C.gray200}`,fontSize:11,outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
            </div>
            <div style={{display:"flex",gap:6,justifyContent:"flex-end"}}>
              <button onClick={()=>setNewCaseOpen(false)} style={{padding:"6px 12px",borderRadius:6,border:`1px solid ${C.gray200}`,background:C.white,fontSize:11,cursor:"pointer",color:C.gray600}}>Cancel</button>
              <button onClick={submitCase} style={{padding:"6px 12px",borderRadius:6,background:C.blue600,color:C.white,border:"none",fontSize:11,cursor:"pointer",fontWeight:500}}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* New Asset Modal */}
      {newAssetOpen&&(
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}}>
          <div style={{background:C.white,borderRadius:13,padding:20,width:360,border:`1px solid ${C.gray200}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <p style={{margin:0,fontSize:13,fontWeight:500,color:C.gray800}}>Add asset</p>
              <button onClick={()=>setNewAssetOpen(false)} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:C.gray400}}>×</button>
            </div>
            {[["Name","name"],["Size (e.g. 2.1MB)","size"]].map(([l,k])=>(
              <div key={k} style={{marginBottom:8}}>
                <p style={{margin:"0 0 2px",fontSize:10,color:C.gray600}}>{l}</p>
                <input value={naForm[k]} onChange={e=>setNaForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",padding:"6px 8px",borderRadius:5,border:`1px solid ${C.gray200}`,fontSize:11,outline:"none",boxSizing:"border-box"}}/>
              </div>
            ))}
            <div style={{marginBottom:13}}>
              <p style={{margin:"0 0 2px",fontSize:10,color:C.gray600}}>Type</p>
              <select value={naForm.type} onChange={e=>setNaForm(f=>({...f,type:e.target.value}))} style={{width:"100%",padding:"6px 8px",borderRadius:5,border:`1px solid ${C.gray200}`,fontSize:11,outline:"none",background:C.white,boxSizing:"border-box"}}>
                {ASSET_TYPES.filter(t=>t!=="All").map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{display:"flex",gap:6,justifyContent:"flex-end"}}>
              <button onClick={()=>setNewAssetOpen(false)} style={{padding:"6px 12px",borderRadius:6,border:`1px solid ${C.gray200}`,background:C.white,fontSize:11,cursor:"pointer",color:C.gray600}}>Cancel</button>
              <button onClick={submitAsset} style={{padding:"6px 12px",borderRadius:6,background:C.blue600,color:C.white,border:"none",fontSize:11,cursor:"pointer",fontWeight:500}}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <div style={{position:"absolute",bottom:14,right:14,zIndex:40}}>
        {chatOpen?(
          <div style={{width:300,background:C.white,borderRadius:13,border:`1px solid ${C.gray200}`,display:"flex",flexDirection:"column",height:380}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 11px",background:C.blue600,borderRadius:"13px 13px 0 0"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:20,height:20,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>✦</div>
                <span style={{fontSize:11,fontWeight:500,color:C.white}}>AI assistant</span>
              </div>
              <button onClick={()=>setChatOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.7)",fontSize:14,cursor:"pointer"}}>×</button>
            </div>
            <div style={{flex:1,overflow:"auto",padding:9,display:"flex",flexDirection:"column",gap:6}}>
              {chatMsgs.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"82%",padding:"6px 9px",borderRadius:8,background:m.role==="user"?C.blue600:C.gray50,color:m.role==="user"?C.white:C.gray800,fontSize:11,lineHeight:1.5,border:m.role==="assistant"?`1px solid ${C.gray200}`:"none"}}>{m.text}</div>
                </div>
              ))}
              {chatLoading&&<div style={{display:"flex",justifyContent:"flex-start"}}><div style={{padding:"6px 9px",borderRadius:8,background:C.gray50,fontSize:11,color:C.gray400}}>Thinking…</div></div>}
              <div ref={chatEndRef}></div>
            </div>
            <div style={{padding:"6px 8px",borderTop:`1px solid ${C.gray200}`,display:"flex",gap:4}}>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask anything…" style={{flex:1,padding:"5px 8px",borderRadius:5,border:`1px solid ${C.gray200}`,fontSize:11,outline:"none"}}/>
              <button onClick={sendChat} style={{padding:"5px 10px",borderRadius:5,background:C.blue600,color:C.white,border:"none",fontSize:11,cursor:"pointer"}}>↑</button>
            </div>
          </div>
        ):(
          <button onClick={()=>setChatOpen(true)} style={{width:40,height:40,borderRadius:"50%",background:C.blue600,color:C.white,border:"none",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✦</button>
        )}
      </div>
    </div>
  );
}