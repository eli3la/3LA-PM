import React, { useState, useCallback, useRef } from "react";

// PEOPLE (tag roster)
const PEOPLE=[{id:"p1",name:"Eli",email:"eli@3la.co",color:"#e94560"},{id:"p2",name:"Luke",email:"luke@3la.co",color:"#3b82f6"},{id:"p3",name:"Michael",email:"michael@3la.co",color:"#0f9b8e"},{id:"p4",name:"Arya",email:"arya@3la.co",color:"#8b5cf6"}];

// DATA — tags=[] on projects, subprojects, tasks; notes="" and attachments=[] on projects, subprojects, tasks
const INIT=[{id:"trak",name:"Trak",color:"#e94560",projects:[{id:"tp",name:"Production",status:"on-track",statusText:"POs are in",timeline:"5/15 Launch",startDate:"2026-02-01",endDate:"2026-05-15",tags:["p1"],notes:"",attachments:[],subprojects:[{id:"s1",name:"Sampling & China Visit",tags:["p1"],notes:"",attachments:[],tasks:[{id:"t1",text:"Confirm sampling date and China visit date",done:false,priority:"high",due:"2026-02-27",tags:["p1"],notes:"",attachments:[]}]}]},{id:"tc",name:"Commercial",status:"on-track",statusText:"Planning phase",timeline:"5/1 Launch",startDate:"2026-02-10",endDate:"2026-05-01",tags:["p1"],notes:"",attachments:[],subprojects:[{id:"s2",name:"Launch Campaign",tags:[],notes:"",attachments:[],tasks:[{id:"t2",text:"Launch campaign pre-production",done:false,priority:"high",due:"2026-03-01",tags:["p1"],notes:"",attachments:[]},{id:"t3",text:"Coming Soon page up",done:false,priority:"high",due:"2026-02-28",tags:[],notes:"",attachments:[]}]},{id:"s3",name:"Partnerships",tags:[],notes:"",attachments:[],tasks:[{id:"t4",text:"Outreach to athletes and partners",done:false,priority:"medium",due:"2026-03-07",tags:[],notes:"",attachments:[]}]}]},{id:"ti",name:"Innovation",status:"on-track",statusText:"Roadmap aligned",timeline:"Ongoing",startDate:"2026-01-15",endDate:"2026-06-30",tags:["p2"],notes:"",attachments:[],subprojects:[{id:"s4",name:"Innovation Brief",tags:["p3"],notes:"",attachments:[],tasks:[{id:"t5",text:"Connect with Michael regarding innovation brief",done:false,priority:"medium",due:"2026-02-27",tags:["p3"],notes:"",attachments:[]}]},{id:"s5",name:"Footwear Prototype",tags:["p2"],notes:"",attachments:[],tasks:[{id:"t6",text:"Luke prototype footwear",done:false,priority:"high",due:"2026-03-15",tags:["p2"],notes:"",attachments:[]}]}]}]},{id:"rados",name:"Rados",color:"#f5a623",projects:[{id:"rp",name:"Production",status:"at-risk",statusText:"Production-Ready",timeline:"TBD",startDate:"2026-02-01",endDate:"2026-04-30",tags:[],notes:"",attachments:[],subprojects:[{id:"s6",name:"Renders & PI",tags:[],notes:"",attachments:[],tasks:[{id:"t7",text:"Render for PI",done:false,priority:"medium",due:"2026-03-01",tags:[],notes:"",attachments:[]}]}]}]},{id:"fo",name:"Family Office",color:"#0f9b8e",projects:[{id:"fm",name:"Merchandise",status:"at-risk",statusText:"Quarter Zip complete",timeline:"Ongoing",startDate:"2026-01-01",endDate:"2026-06-30",tags:["p1"],notes:"",attachments:[],subprojects:[{id:"s7",name:"Quarter Zip Launch",tags:[],notes:"",attachments:[],tasks:[{id:"t8",text:"Launch quarter-zip",done:false,priority:"high",due:"2026-02-25",tags:["p1"],notes:"",attachments:[]}]},{id:"s8",name:"Hat Restock",tags:[],notes:"",attachments:[],tasks:[{id:"t9",text:"Embroiderer to re-do hats",done:false,priority:"high",due:"2026-03-01",tags:[],notes:"",attachments:[]}]}]},{id:"fc",name:"Commercial",status:"on-track",statusText:"Webstore & IG live",timeline:"Ongoing",startDate:"2026-01-15",endDate:"2026-06-30",tags:[],notes:"",attachments:[],subprojects:[{id:"s9",name:"Content & Social",tags:[],notes:"",attachments:[],tasks:[{id:"t10",text:"New content promoting merchandise",done:false,priority:"medium",due:"2026-02-27",tags:[],notes:"",attachments:[]},{id:"t11",text:"Outreach for collab posts",done:false,priority:"medium",due:"2026-03-05",tags:[],notes:"",attachments:[]}]}]},{id:"fb",name:"Beverage",status:"on-track",statusText:"Liquid complete · Can design finalized",timeline:"Late Spring 2026",startDate:"2026-02-01",endDate:"2026-06-15",tags:[],notes:"",attachments:[],subprojects:[{id:"s10",name:"Formula & Production",tags:[],notes:"",attachments:[],tasks:[{id:"t12",text:"Pay invoice to handover formula",done:false,priority:"high",due:"2026-02-25",tags:[],notes:"",attachments:[]},{id:"t13",text:"Lock in production time",done:false,priority:"high",due:"2026-03-01",tags:[],notes:"",attachments:[]},{id:"t14",text:"Reach out to ingredient suppliers",done:false,priority:"medium",due:"2026-03-07",tags:[],notes:"",attachments:[]}]},{id:"s11",name:"Packaging",tags:[],notes:"",attachments:[],tasks:[{id:"t15",text:"Send can design",done:false,priority:"medium",due:"2026-03-01",tags:[],notes:"",attachments:[]}]}]}]},{id:"vesper",name:"Vesper Lab",color:"#8b5cf6",projects:[{id:"vp",name:"Prototype",status:"at-risk",statusText:"Prototype in progress",timeline:"TBD",startDate:"2026-02-01",endDate:"2026-05-30",tags:[],notes:"",attachments:[],subprojects:[{id:"s12",name:"Core Prototype",tags:[],notes:"",attachments:[],tasks:[{id:"t16",text:"Ongoing work to complete prototype",done:false,priority:"high",due:"2026-03-15",tags:[],notes:"",attachments:[]}]}]}]},{id:"design",name:"3LA Design",color:"#3b82f6",projects:[{id:"dw",name:"Website",status:"on-track",statusText:"V1 nearly complete",timeline:"Ongoing",startDate:"2026-01-01",endDate:"2026-04-30",tags:[],notes:"",attachments:[],subprojects:[{id:"s13",name:"V1 Build",tags:[],notes:"",attachments:[],tasks:[{id:"t18",text:"V1 website edits",done:false,priority:"high",due:"2026-03-01",tags:[],notes:"",attachments:[]}]}]},{id:"dp",name:"Product Development",status:"on-track",statusText:"Titanium and Valenki in development",timeline:"Ongoing",startDate:"2026-01-15",endDate:"2026-06-30",tags:["p2"],notes:"",attachments:[],subprojects:[{id:"s14",name:"Partnerships & Talent",tags:[],notes:"",attachments:[],tasks:[{id:"t17",text:"Sign Arya",done:false,priority:"high",due:"2026-02-27",tags:["p4"],notes:"",attachments:[]}]},{id:"s15",name:"Factory & Manufacturing",tags:["p2"],notes:"",attachments:[],tasks:[{id:"t19",text:"Luke send fork instructions to factory",done:false,priority:"medium",due:"2026-03-05",tags:["p2"],notes:"",attachments:[]}]},{id:"s16",name:"Surfboard",tags:[],notes:"",attachments:[],tasks:[{id:"t20",text:"Surfboard vendor search",done:false,priority:"low",due:"2026-03-15",tags:[],notes:"",attachments:[]}]}]}]}];

const ST={"on-track":{l:"On Track",c:"#0f9b8e"},"at-risk":{l:"At Risk",c:"#f5a623"},blocked:{l:"Blocked",c:"#e94560"},complete:{l:"Complete",c:"#6b7280"}};
const PR={high:{l:"High",c:"#e94560",s:0},medium:{l:"Med",c:"#f5a623",s:1},low:{l:"Low",c:"#6b7280",s:2}};
const CL=["#e94560","#f5a623","#0f9b8e","#8b5cf6","#3b82f6","#ec4899","#14b8a6","#f97316"];
const du=d=>Math.round((new Date(d+"T00:00:00")-new Date("2026-02-23T00:00:00"))/864e5);
const fm=d=>new Date(d+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"});
const dba=(a,b)=>Math.round((new Date(b)-new Date(a))/864e5);
const uid=()=>"_"+Math.random().toString(36).slice(2,9);
const pn=id=>PEOPLE.find(p=>p.id===id);
const gAll=data=>{const o=[];data.forEach(c=>c.projects.forEach(p=>p.subprojects.forEach(s=>s.tasks.forEach(t=>o.push({...t,catId:c.id,catName:c.name,catColor:c.color,projId:p.id,projName:p.name,projTags:p.tags||[],spId:s.id,spName:s.name,spTags:s.tags||[]})))));return o};

// CSS
const css={bg:"#0a0a10",card:"#111119",bdr:"#1a1a24",sub:"#0d0d14"};

// UI PRIMITIVES
const B=({children,bg,color:c})=><span style={{fontSize:9,fontWeight:650,padding:"2px 7px",borderRadius:6,background:bg,color:c,whiteSpace:"nowrap"}}>{children}</span>;
const Ch=({on,color:c,onClick})=><div onClick={onClick} style={{width:17,height:17,borderRadius:5,border:on?"none":"2px solid #333",background:on?c:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{on&&<span style={{color:"#fff",fontSize:10,fontWeight:800}}>✓</span>}</div>;
const Br=({p,color:c,h=3})=><div style={{flex:1,height:h,background:css.bdr,borderRadius:h,overflow:"hidden"}}><div style={{width:`${p}%`,height:"100%",background:c,borderRadius:h,transition:"width .3s"}}/></div>;
const Du=({due:d,done})=>{if(done)return <span style={{fontSize:10,color:"#444"}}>Done</span>;const v=du(d);return <span style={{fontSize:10,color:v<0?"#e94560":v<=3?"#f5a623":"#555",fontWeight:v<=3?650:400}}>{v<0?Math.abs(v)+"d late":v===0?"Today":v+"d"}</span>};
const Bt=({children,accent:a,onClick,sx})=><div onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"5px 10px",background:a?a+"18":"#1a1a28",border:`1px solid ${a?a+"30":"#252536"}`,borderRadius:6,cursor:"pointer",fontSize:10,color:a||"#888",fontWeight:600,...sx}}>{children}</div>;
const In=({style:sx,...r})=><input {...r} style={{background:css.bg,border:"1px solid #1e1e2e",borderRadius:5,padding:"6px 9px",color:"#ddd",fontSize:11,outline:"none",...sx}}/>;
const Se=({children,...r})=><select {...r} style={{background:css.bg,border:"1px solid #1e1e2e",borderRadius:5,padding:"6px 7px",color:"#aaa",fontSize:10}}>{children}</select>;
const Ta=({style:sx,...r})=><textarea {...r} style={{background:css.bg,border:"1px solid #1e1e2e",borderRadius:5,padding:"6px 9px",color:"#ddd",fontSize:11,outline:"none",resize:"vertical",minHeight:40,fontFamily:"inherit",...sx}}/>;

// INLINE EDIT
function IE({value:val,onSave,style:sx}){
  const[e,sE]=useState(false);const[v,sV]=useState(val);
  if(!e)return <span onDoubleClick={()=>{sV(val);sE(true)}} style={{cursor:"pointer",...sx}} title="Double-click to edit">{val}</span>;
  return <input autoFocus value={v} onChange={e=>sV(e.target.value)} onBlur={()=>{if(v.trim()&&v!==val)onSave(v.trim());sE(false)}} onKeyDown={e=>{if(e.key==="Enter"){if(v.trim())onSave(v.trim());sE(false)}if(e.key==="Escape")sE(false)}} style={{background:css.bg,border:"1px solid #e94560",borderRadius:4,padding:"2px 6px",color:"#ddd",fontSize:"inherit",fontWeight:"inherit",outline:"none",width:"100%"}}/>;
}

// DELETE CONFIRM
function DB({onConfirm}){const[c,sC]=useState(false);if(!c)return <span onClick={e=>{e.stopPropagation();sC(true)}} style={{fontSize:10,color:"#555",cursor:"pointer",padding:"2px 4px"}}>✕</span>;return <span onClick={e=>e.stopPropagation()} style={{fontSize:9,display:"inline-flex",gap:4}}><span style={{color:"#e94560",cursor:"pointer",fontWeight:600}} onClick={()=>{onConfirm();sC(false)}}>Yes</span><span style={{color:"#555",cursor:"pointer"}} onClick={()=>sC(false)}>No</span></span>}

// TAG PILLS — show tagged people as colored pills
function Tags({tags=[],small}){if(!tags.length)return null;return <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>{tags.map(id=>{const p=pn(id);return p?<span key={id} style={{fontSize:small?7.5:8.5,fontWeight:600,padding:small?"1px 4px":"1px 5px",borderRadius:4,background:p.color+"20",color:p.color,whiteSpace:"nowrap"}}>{p.name}</span>:null})}</div>}

// TAG PICKER — toggle people on/off
function TP({tags=[],onChange,people}){
  const[open,setOpen]=useState(false);
  return <div style={{position:"relative",display:"inline-flex"}}>
    <span onClick={()=>setOpen(!open)} style={{fontSize:10,color:"#555",cursor:"pointer",padding:"2px 6px",background:"#1a1a28",borderRadius:4,border:"1px solid #252536"}}>👤{tags.length>0?` ${tags.length}`:""}</span>
    {open&&<div style={{position:"absolute",top:"100%",left:0,zIndex:50,background:css.card,border:"1px solid "+css.bdr,borderRadius:8,padding:6,minWidth:140,marginTop:4,boxShadow:"0 8px 24px #0008"}}>
      <div style={{fontSize:9,color:"#555",fontWeight:600,marginBottom:4,padding:"0 4px"}}>Tag people</div>
      {(people||PEOPLE).map(p=><div key={p.id} onClick={()=>{const n=tags.includes(p.id)?tags.filter(x=>x!==p.id):[...tags,p.id];onChange(n)}} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 6px",borderRadius:4,cursor:"pointer",background:tags.includes(p.id)?p.color+"15":"transparent",marginBottom:1}}>
        <div style={{width:6,height:6,borderRadius:3,background:p.color}}/>
        <span style={{fontSize:10.5,color:tags.includes(p.id)?p.color:"#888",fontWeight:tags.includes(p.id)?600:400}}>{p.name}</span>
        {tags.includes(p.id)&&<span style={{marginLeft:"auto",fontSize:9,color:p.color}}>✓</span>}
      </div>)}
      <div style={{borderTop:"1px solid "+css.bdr,marginTop:4,paddingTop:4}}><span onClick={()=>setOpen(false)} style={{fontSize:9,color:"#555",cursor:"pointer",padding:"2px 6px"}}>Done</span></div>
    </div>}
  </div>
}

// NOTES PANEL — expandable notes + attachments
function NP({notes,attachments=[],onNotesChange,onAddAttachment,onRemoveAttachment}){
  const[open,setOpen]=useState(false);const[an,setAn]=useState("");
  const hasContent=notes||(attachments&&attachments.length>0);
  return <div style={{marginTop:4}}>
    <span onClick={()=>setOpen(!open)} style={{fontSize:9,color:hasContent?"#888":"#444",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:3}}>
      {open?"▾":"▸"} {notes?"📝":"📎"} {hasContent?"Notes":"Add notes"} {attachments.length>0&&`(${attachments.length} files)`}
    </span>
    {open&&<div style={{marginTop:6,padding:"8px 10px",background:css.bg,borderRadius:6,border:"1px solid #1e1e2e"}}>
      <Ta value={notes||""} onChange={e=>onNotesChange(e.target.value)} placeholder="Add notes..." style={{width:"100%",marginBottom:6}}/>
      <div style={{fontSize:9,color:"#555",fontWeight:600,marginBottom:4}}>Attachments</div>
      {attachments.map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"3px 0",fontSize:10}}>
        <span style={{color:"#3b82f6"}}>📎</span><span style={{color:"#aaa",flex:1}}>{a.name}</span><span style={{fontSize:9,color:"#555"}}>{a.url?"🔗":""}</span>
        <span onClick={()=>onRemoveAttachment(i)} style={{color:"#555",cursor:"pointer",fontSize:9}}>✕</span></div>)}
      <div style={{display:"flex",gap:4,marginTop:4}}>
        <In value={an} onChange={e=>setAn(e.target.value)} placeholder="Link or filename..." style={{flex:1,fontSize:10,padding:"4px 7px"}} onKeyDown={e=>{if(e.key==="Enter"&&an.trim()){onAddAttachment({name:an.trim(),url:an.trim().startsWith("http")?an.trim():""});setAn("")}}}/>
        <Bt sx={{padding:"3px 8px",fontSize:9}} onClick={()=>{if(an.trim()){onAddAttachment({name:an.trim(),url:an.trim().startsWith("http")?an.trim():""});setAn("")}}}>Add</Bt>
      </div>
    </div>}
  </div>
}

// MODAL
function Mo({title:ti,content:co,onClose}){const[cp,sC]=useState(false);return <div style={{position:"fixed",inset:0,background:"#000c",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}><div onClick={e=>e.stopPropagation()} style={{background:css.card,border:"1px solid #1e1e2e",borderRadius:14,width:"100%",maxWidth:560,maxHeight:"80vh",display:"flex",flexDirection:"column",overflow:"hidden"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderBottom:"1px solid "+css.bdr}}><span style={{fontSize:13,fontWeight:700,color:"#e0e0ea"}}>{ti}</span><div style={{display:"flex",gap:6,alignItems:"center"}}>{cp&&<span style={{fontSize:10,color:"#0f9b8e",fontWeight:600}}>✓</span>}<Bt onClick={()=>{navigator.clipboard.writeText(co);sC(true);setTimeout(()=>sC(false),2e3)}}>📋 Copy</Bt><Bt accent="#e94560" onClick={()=>window.open(`mailto:?subject=${encodeURIComponent(ti)}&body=${encodeURIComponent(co)}`)}>✉ Email</Bt><span onClick={onClose} style={{cursor:"pointer",color:"#555",fontSize:16}}>✕</span></div></div><pre style={{flex:1,overflow:"auto",padding:"14px 18px",margin:0,fontSize:10.5,lineHeight:1.6,color:"#b0b0bc",fontFamily:"monospace",whiteSpace:"pre-wrap",background:css.bg}}>{co}</pre></div></div>}

// EXPORT + DIGEST helpers
function eP(c,p){const at=[];p.subprojects.forEach(s=>s.tasks.forEach(t=>at.push(t)));const d=at.filter(t=>t.done).length;const pc=at.length?Math.round(d/at.length*100):0;const ptags=(p.tags||[]).map(id=>pn(id)?.name).filter(Boolean).join(", ");let t=`${c.name} › ${p.name}${ptags?` [${ptags}]`:""}\n${ST[p.status].l} | ${d}/${at.length} (${pc}%) | ${p.timeline}\n${"─".repeat(40)}\n`;if(p.notes)t+=`Notes: ${p.notes}\n`;if(p.attachments?.length)t+=`Attachments: ${p.attachments.map(a=>a.name).join(", ")}\n`;t+="\n";p.subprojects.forEach(sp=>{const sd=sp.tasks.filter(x=>x.done).length;const stags=(sp.tags||[]).map(id=>pn(id)?.name).filter(Boolean).join(", ");t+=`▸ ${sp.name}${stags?` [${stags}]`:""} (${sd}/${sp.tasks.length})\n`;if(sp.notes)t+=`  Notes: ${sp.notes}\n`;sp.tasks.forEach(x=>{const v=du(x.due);const tt=(x.tags||[]).map(id=>pn(id)?.name).filter(Boolean).join(", ");t+=`  ${x.done?"✓":"○"} [${x.priority.toUpperCase()}] ${x.text}${tt?` @${tt}`:""} — ${fm(x.due)} (${x.done?"done":v<0?Math.abs(v)+"d overdue":v+"d"})\n`;if(x.notes)t+=`    Notes: ${x.notes}\n`});t+="\n"});return t}

function bD(gs,n,data,filterPerson){const ov=gs.find(g=>g.t==="Overdue")?.items||[];const td=gs.find(g=>g.t==="Due Today")?.items||[];const wk=gs.find(g=>g.t==="This Week")?.items||[];const fc=ov.length+td.length;const pName=filterPerson?pn(filterPerson)?.name:"Everyone";let b=`3LA DAILY DIGEST${filterPerson?` — ${pName}`:""}\n${new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}\n${"═".repeat(32)}\n\n📌 TODAY\n${"─".repeat(32)}\n`;if(!ov.length&&!td.length&&!wk.length)b+="  All clear!\n\n";else{if(ov.length){b+=`  🚨 ${ov.length} OVERDUE:\n`;ov.forEach(t=>{const tt=(t.tags||[]).map(id=>pn(id)?.name).filter(Boolean).join(", ");b+=`     • ${t.text}${tt?` @${tt}`:""} (${Math.abs(du(t.due))}d)\n`});b+="\n"}if(td.length){b+=`  ⚡ ${td.length} DUE TODAY:\n`;td.forEach(t=>b+=`     • ${t.text}\n`);b+="\n"}if(wk.length){b+=`  📋 This week: ${wk.length}\n`;wk.slice(0,3).forEach(t=>b+=`     • ${t.text} (${fm(t.due)})\n`);b+="\n"}}b+=`\n📊 STATUS\n${"─".repeat(32)}\n`;data.forEach(c=>c.projects.forEach(p=>{const at=[];p.subprojects.forEach(s=>s.tasks.forEach(x=>at.push(x)));const d=at.filter(x=>x.done).length;b+=`  ${c.name} > ${p.name} — ${d}/${at.length}\n`}));b+=`\n📑 ALL TASKS\n${"═".repeat(32)}\n\n`;gs.forEach(g=>{if(!g.items.length)return;b+=`${g.e} ${g.t.toUpperCase()} (${g.items.length})\n`;g.items.forEach(t=>{const tt=(t.tags||[]).map(id=>pn(id)?.name).filter(Boolean).join(", ");b+=`  [${t.priority.toUpperCase()}] ${t.text}${tt?` @${tt}`:""} — ${fm(t.due)}\n`})});return{subject:fc>0?`3LA${filterPerson?` (${pName})`:""} — ${fc} need attention`:`3LA${filterPerson?` (${pName})`:""} — ${n} pending`,body:b}}

// PEOPLE MANAGER
function PM({people,setPeople}){const[show,setShow]=useState(false);const[nn,setNn]=useState("");const[ne,setNe]=useState("");const[editing,setEditing]=useState(null);const[en,setEn]=useState("");const[ee,setEe]=useState("");
  const startEdit=(p)=>{setEditing(p.id);setEn(p.name);setEe(p.email)};
  const saveEdit=()=>{if(!en.trim())return;setPeople(ps=>ps.map(p=>p.id!==editing?p:{...p,name:en.trim(),email:ee.trim()}));setEditing(null)};
  return <div style={{position:"relative",display:"inline-flex"}}>
    <span onClick={()=>setShow(!show)} style={{fontSize:10,color:"#888",cursor:"pointer",padding:"5px 10px",background:"#1a1a28",border:"1px solid #252536",borderRadius:6,display:"inline-flex",alignItems:"center",gap:4,fontWeight:600}}>👥 Team ({people.length})</span>
    {show&&<div style={{position:"absolute",top:"100%",right:0,zIndex:60,background:css.card,border:"1px solid "+css.bdr,borderRadius:10,padding:10,minWidth:260,marginTop:4,boxShadow:"0 8px 24px #0008"}}>
      <div style={{fontSize:10,fontWeight:650,color:"#888",marginBottom:6}}>Team Members</div>
      {people.map(p=>editing===p.id?<div key={p.id} style={{display:"flex",gap:4,alignItems:"center",padding:"4px 2px",flexWrap:"wrap"}}>
        <div style={{width:8,height:8,borderRadius:4,background:p.color,flexShrink:0}}/>
        <In value={en} onChange={e=>setEn(e.target.value)} style={{flex:1,fontSize:10,padding:"3px 6px",minWidth:60}} onKeyDown={e=>e.key==="Enter"&&saveEdit()}/>
        <In value={ee} onChange={e=>setEe(e.target.value)} style={{flex:1,fontSize:10,padding:"3px 6px",minWidth:80}} onKeyDown={e=>e.key==="Enter"&&saveEdit()}/>
        <span onClick={saveEdit} style={{fontSize:9,color:"#0f9b8e",cursor:"pointer",fontWeight:600}}>Save</span>
        <span onClick={()=>setEditing(null)} style={{fontSize:9,color:"#555",cursor:"pointer"}}>✕</span>
      </div>:<div key={p.id} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 2px"}}>
        <div style={{width:8,height:8,borderRadius:4,background:p.color,flexShrink:0}}/>
        <span style={{fontSize:11,color:"#ccc",flex:1}}>{p.name}</span>
        <span style={{fontSize:9,color:"#555"}}>{p.email}</span>
        <span onClick={()=>startEdit(p)} style={{fontSize:9,color:"#555",cursor:"pointer"}} title="Edit">✎</span>
        <DB onConfirm={()=>setPeople(ps=>ps.filter(x=>x.id!==p.id))}/>
      </div>)}
      <div style={{borderTop:"1px solid "+css.bdr,marginTop:6,paddingTop:6}}>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <In value={nn} onChange={e=>setNn(e.target.value)} placeholder="Name" style={{flex:1,fontSize:10,padding:"4px 7px",minWidth:70}} onKeyDown={e=>{if(e.key==="Enter"&&nn.trim()){setPeople(p=>[...p,{id:uid(),name:nn.trim(),email:ne.trim(),color:CL[p.length%CL.length]}]);setNn("");setNe("")}}}/>
          <In value={ne} onChange={e=>setNe(e.target.value)} placeholder="Email" style={{flex:1,fontSize:10,padding:"4px 7px",minWidth:100}} onKeyDown={e=>{if(e.key==="Enter"&&nn.trim()){setPeople(p=>[...p,{id:uid(),name:nn.trim(),email:ne.trim(),color:CL[p.length%CL.length]}]);setNn("");setNe("")}}}/>
          <Bt sx={{padding:"3px 8px",fontSize:9}} accent="#0f9b8e" onClick={()=>{if(nn.trim()){setPeople(p=>[...p,{id:uid(),name:nn.trim(),email:ne.trim(),color:CL[p.length%CL.length]}]);setNn("");setNe("")}}}>Add</Bt>
        </div>
      </div>
      <div style={{marginTop:6,textAlign:"right"}}><span onClick={()=>setShow(false)} style={{fontSize:9,color:"#555",cursor:"pointer"}}>Close</span></div>
    </div>}
  </div>
}

// MAIN APP
export default function App(){
  const[data,setData]=useState(INIT);const[people,setPeople]=useState(PEOPLE);const[view,setView]=useState("status");const[detail,setDetail]=useState(null);const[showAdd,setShowAdd]=useState(false);const[af,setAf]=useState({text:"",catId:"",projId:"",spId:"",priority:"medium",due:"2026-03-01",tags:[]});
  const tog=useCallback((ci,pi,si,ti)=>setData(d=>d.map(c=>c.id!==ci?c:{...c,projects:c.projects.map(p=>p.id!==pi?p:{...p,subprojects:p.subprojects.map(s=>s.id!==si?s:{...s,tasks:s.tasks.map(t=>t.id!==ti?t:{...t,done:!t.done})})})})),[]);
  const uSt=useCallback((ci,pi,st)=>setData(d=>d.map(c=>c.id!==ci?c:{...c,projects:c.projects.map(p=>p.id!==pi?p:{...p,status:st})})),[]);
  const dT=(ci,pi,si,ti)=>setData(d=>d.map(c=>c.id!==ci?c:{...c,projects:c.projects.map(p=>p.id!==pi?p:{...p,subprojects:p.subprojects.map(s=>s.id!==si?s:{...s,tasks:s.tasks.filter(t=>t.id!==ti)})})}));
  // Generic updater for deep nested fields
  const uTask=(ci,pi,si,ti,fn)=>setData(d=>d.map(c=>c.id!==ci?c:{...c,projects:c.projects.map(p=>p.id!==pi?p:{...p,subprojects:p.subprojects.map(s=>s.id!==si?s:{...s,tasks:s.tasks.map(t=>t.id!==ti?t:fn(t))})})}));
  const uSP=(ci,pi,si,fn)=>setData(d=>d.map(c=>c.id!==ci?c:{...c,projects:c.projects.map(p=>p.id!==pi?p:{...p,subprojects:p.subprojects.map(s=>s.id!==si?s:fn(s))})}));
  const uProj=(ci,pi,fn)=>setData(d=>d.map(c=>c.id!==ci?c:{...c,projects:c.projects.map(p=>p.id!==pi?p:fn(p))}));
  const doAdd=()=>{const f=af;if(!f.text||!f.catId||!f.projId||!f.spId)return;setData(d=>d.map(c=>c.id!==f.catId?c:{...c,projects:c.projects.map(p=>p.id!==f.projId?p:{...p,subprojects:p.subprojects.map(s=>s.id!==f.spId?s:{...s,tasks:[...s.tasks,{id:uid(),text:f.text,done:false,priority:f.priority,due:f.due,tags:f.tags||[],notes:"",attachments:[]}]})})}));setAf({text:"",catId:"",projId:"",spId:"",priority:"medium",due:"2026-03-01",tags:[]});setShowAdd(false)};
  const scp=af.catId?data.find(c=>c.id===af.catId)?.projects||[]:[];const sps=af.projId?scp.find(p=>p.id===af.projId)?.subprojects||[]:[];
  const all=gAll(data);const tot=all.length;const dn=all.filter(t=>t.done).length;const urg=all.filter(t=>!t.done&&du(t.due)<=3).length;
  const dc=detail?data.find(c=>c.id===detail.catId):null;const dp=dc?dc.projects.find(p=>p.id===detail.projId):null;
  const VW=[{k:"status",l:"Status",i:"◎"},{k:"tasks",l:"Tasks",i:"☐"},{k:"reminders",l:"Reminders",i:"⏰"},{k:"gantt",l:"Timeline",i:"▬"}];

  // STATUS VIEW
  function SV(){
    const[ex,sEx]=useState({});const[mo,sMo]=useState(null);const[aC,sAC]=useState(false);const[nC,sNC]=useState("");const[nCo,sNCo]=useState("#e94560");const[aP,sAP]=useState(null);const[nP,sNP]=useState({n:"",tl:"TBD",s:"2026-03-01",e:"2026-06-30"});const[aSP,sASP]=useState(null);const[nSP,sNSP]=useState("");
    const tg=id=>sEx(p=>({...p,[id]:p[id]===undefined?false:!p[id]}));
    return <div style={{display:"grid",gap:20}}>
      {mo&&<Mo {...mo} onClose={()=>sMo(null)}/>}
      {data.map(cat=>{const at=[];cat.projects.forEach(p=>p.subprojects.forEach(s=>s.tasks.forEach(t=>at.push(t))));const d=at.filter(t=>t.done).length;const p=at.length?(d/at.length)*100:0;const ur=at.filter(t=>!t.done&&du(t.due)<=3).length;
        return <div key={cat.id}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span onClick={()=>tg(cat.id)} style={{fontSize:9,color:"#555",cursor:"pointer",transform:ex[cat.id]===false?"rotate(-90deg)":"",display:"inline-block",transition:"transform .2s"}}>▼</span>
            <div style={{width:8,height:8,borderRadius:2,background:cat.color}}/>
            <IE value={cat.name} onSave={n=>setData(d=>d.map(c=>c.id!==cat.id?c:{...c,name:n}))} style={{fontSize:13,fontWeight:700,color:"#e0e0ea"}}/>
            <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}><Br p={p} color={cat.color}/><span style={{fontSize:9.5,color:"#555"}}>{d}/{at.length}</span></div>
            {ur>0&&<B bg="#e9456020" color="#e94560">{ur} urgent</B>}
            <span onClick={()=>sAP(aP===cat.id?null:cat.id)} style={{fontSize:10,color:cat.color,cursor:"pointer",fontWeight:600}}>+ Project</span>
            <DB onConfirm={()=>setData(d=>d.filter(c=>c.id!==cat.id))}/>
          </div>
          {aP===cat.id&&<div style={{display:"flex",gap:6,marginBottom:8,marginLeft:20,flexWrap:"wrap",alignItems:"center"}}><In value={nP.n} onChange={e=>sNP({...nP,n:e.target.value})} placeholder="Project name..." style={{flex:1,minWidth:140}} onKeyDown={e=>e.key==="Enter"&&(()=>{if(!nP.n.trim())return;setData(d=>d.map(c=>c.id!==cat.id?c:{...c,projects:[...c.projects,{id:uid(),name:nP.n.trim(),status:"on-track",statusText:"",timeline:nP.tl,startDate:nP.s,endDate:nP.e,tags:[],notes:"",attachments:[],subprojects:[]}]}));sNP({n:"",tl:"TBD",s:"2026-03-01",e:"2026-06-30"});sAP(null)})()}/><In value={nP.tl} onChange={e=>sNP({...nP,tl:e.target.value})} placeholder="Timeline" style={{width:90}}/><In type="date" value={nP.s} onChange={e=>sNP({...nP,s:e.target.value})} style={{width:130}}/><In type="date" value={nP.e} onChange={e=>sNP({...nP,e:e.target.value})} style={{width:130}}/><Bt accent={cat.color} onClick={()=>{if(!nP.n.trim())return;setData(d=>d.map(c=>c.id!==cat.id?c:{...c,projects:[...c.projects,{id:uid(),name:nP.n.trim(),status:"on-track",statusText:"",timeline:nP.tl,startDate:nP.s,endDate:nP.e,tags:[],notes:"",attachments:[],subprojects:[]}]}));sNP({n:"",tl:"TBD",s:"2026-03-01",e:"2026-06-30"});sAP(null)}}>Add</Bt></div>}
          {ex[cat.id]!==false&&<div style={{display:"grid",gap:6,paddingLeft:20}}>
            {cat.projects.map(proj=>{const pt=[];proj.subprojects.forEach(s=>s.tasks.forEach(t=>pt.push(t)));const pd=pt.filter(t=>t.done).length;const pp=pt.length?(pd/pt.length)*100:0;const st=ST[proj.status];
              return <div key={proj.id} style={{background:css.card,border:"1px solid "+css.bdr,borderRadius:10,overflow:"hidden",borderLeft:`3px solid ${cat.color}`}}>
                <div style={{padding:"11px 14px",cursor:"pointer"}} onClick={()=>tg(proj.id)}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                    <div style={{display:"flex",alignItems:"center",gap:7,flex:1}} onClick={e=>e.stopPropagation()}>
                      <span style={{fontSize:8,color:"#555",transform:ex[proj.id]===false?"rotate(-90deg)":"",display:"inline-block"}} onClick={()=>tg(proj.id)}>▼</span>
                      <div style={{flex:1}} onDoubleClick={e=>e.stopPropagation()}><IE value={proj.name} onSave={n=>uProj(cat.id,proj.id,p=>({...p,name:n}))} style={{fontSize:13,fontWeight:600,color:"#dddde6"}}/><IE value={proj.statusText||"Add status note..."} onSave={n=>uProj(cat.id,proj.id,p=>({...p,statusText:n}))} style={{fontSize:10,color:"#666",marginTop:1,display:"block"}}/><Tags tags={proj.tags}/></div></div>
                    <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0}} onClick={e=>e.stopPropagation()}>
                      <TP tags={proj.tags||[]} onChange={t=>uProj(cat.id,proj.id,p=>({...p,tags:t}))} people={people}/>
                      <Bt sx={{padding:"3px 8px",fontSize:9}} onClick={()=>setDetail({catId:cat.id,projId:proj.id})}>▶</Bt>
                      <Bt sx={{padding:"3px 8px",fontSize:9}} onClick={()=>sMo({title:`${cat.name} › ${proj.name}`,content:eP(cat,proj)})}>↗</Bt>
                      <B bg={st.c+"18"} color={st.c}>{st.l}</B>
                      <span style={{fontSize:9.5,color:"#555"}}>{proj.timeline}</span>
                      <DB onConfirm={()=>setData(d=>d.map(c=>c.id!==cat.id?c:{...c,projects:c.projects.filter(p=>p.id!==proj.id)}))}/></div></div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}><Br p={pp} color={cat.color}/><span style={{fontSize:9.5,color:"#555"}}>{pd}/{pt.length}</span></div></div>
                {ex[proj.id]!==false&&<div style={{borderTop:"1px solid "+css.bdr}}>
                  {proj.subprojects.map(sp=>{const sd=sp.tasks.filter(t=>t.done).length;const spp=sp.tasks.length?(sd/sp.tasks.length)*100:0;
                    return <div key={sp.id} style={{borderBottom:"1px solid #14141e"}}>
                      <div onClick={()=>tg(sp.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px 8px 28px",cursor:"pointer",background:css.sub}}>
                        <span style={{fontSize:7,color:"#444",transform:ex[sp.id]===false?"rotate(-90deg)":"",display:"inline-block"}}>▼</span>
                        <div style={{width:5,height:5,borderRadius:2,background:cat.color+"80"}}/>
                        <div style={{flex:1}} onClick={e=>e.stopPropagation()}><IE value={sp.name} onSave={n=>uSP(cat.id,proj.id,sp.id,s=>({...s,name:n}))} style={{fontSize:11.5,fontWeight:600,color:"#b0b0bc"}}/><Tags tags={sp.tags} small/></div>
                        <span onClick={e=>e.stopPropagation()}><TP tags={sp.tags||[]} onChange={t=>uSP(cat.id,proj.id,sp.id,s=>({...s,tags:t}))} people={people}/></span>
                        <div style={{width:40}}><Br p={spp} color={cat.color} h={2}/></div>
                        <span style={{fontSize:9,color:"#555"}}>{sd}/{sp.tasks.length}</span>
                        <span onClick={e=>e.stopPropagation()}><DB onConfirm={()=>setData(d=>d.map(c=>c.id!==cat.id?c:{...c,projects:c.projects.map(p=>p.id!==proj.id?p:{...p,subprojects:p.subprojects.filter(s=>s.id!==sp.id)})}))}/></span></div>
                      {ex[sp.id]!==false&&<div style={{padding:"4px 14px 8px 44px"}}>
                        {sp.tasks.map(t=><div key={t.id} style={{opacity:t.done?.4:1,marginBottom:2}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0"}}>
                            <Ch on={t.done} color={cat.color} onClick={()=>tog(cat.id,proj.id,sp.id,t.id)}/>
                            <span style={{flex:1,fontSize:11.5,color:t.done?"#555":"#c8c8d4",textDecoration:t.done?"line-through":"none"}}>{t.text}</span>
                            <Tags tags={t.tags} small/>
                            <TP tags={t.tags||[]} onChange={tg=>uTask(cat.id,proj.id,sp.id,t.id,x=>({...x,tags:tg}))} people={people}/>
                            <B bg={PR[t.priority].c+"1a"} color={PR[t.priority].c}>{PR[t.priority].l}</B>
                            <Du due={t.due} done={t.done}/><DB onConfirm={()=>dT(cat.id,proj.id,sp.id,t.id)}/></div>
                          <div style={{paddingLeft:25}}><NP notes={t.notes} attachments={t.attachments||[]} onNotesChange={n=>uTask(cat.id,proj.id,sp.id,t.id,x=>({...x,notes:n}))} onAddAttachment={a=>uTask(cat.id,proj.id,sp.id,t.id,x=>({...x,attachments:[...(x.attachments||[]),a]}))} onRemoveAttachment={i=>uTask(cat.id,proj.id,sp.id,t.id,x=>({...x,attachments:(x.attachments||[]).filter((_,j)=>j!==i)}))}/></div></div>)}</div>}</div>})}
                  <div style={{padding:"6px 28px",background:css.sub}}><span onClick={()=>sASP(aSP===proj.id?null:proj.id)} style={{fontSize:10,color:"#444",cursor:"pointer"}}>+ Sub-project</span></div>
                  {aSP===proj.id&&<div style={{display:"flex",gap:6,padding:"6px 28px 10px",background:css.sub}}><In value={nSP} onChange={e=>sNSP(e.target.value)} placeholder="Sub-project name..." style={{flex:1}} onKeyDown={e=>{if(e.key==="Enter"&&nSP.trim()){setData(d=>d.map(c=>c.id!==cat.id?c:{...c,projects:c.projects.map(p=>p.id!==proj.id?p:{...p,subprojects:[...p.subprojects,{id:uid(),name:nSP.trim(),tags:[],notes:"",attachments:[],tasks:[]}]})}));sNSP("");sASP(null)}}}/><Bt accent={cat.color} onClick={()=>{if(!nSP.trim())return;setData(d=>d.map(c=>c.id!==cat.id?c:{...c,projects:c.projects.map(p=>p.id!==proj.id?p:{...p,subprojects:[...p.subprojects,{id:uid(),name:nSP.trim(),tags:[],notes:"",attachments:[],tasks:[]}]})}));sNSP("");sASP(null)}}>Add</Bt></div>}
                </div>}</div>})}</div>}</div>})}
      {!aC?<div onClick={()=>sAC(true)} style={{padding:"10px",border:"1px dashed #1e1e2e",borderRadius:10,cursor:"pointer",fontSize:11,color:"#555",textAlign:"center",fontWeight:600}}>+ Add Category</div>
      :<div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}><In value={nC} onChange={e=>sNC(e.target.value)} placeholder="Category name..." style={{flex:1,minWidth:140}} onKeyDown={e=>{if(e.key==="Enter"&&nC.trim()){setData(d=>[...d,{id:uid(),name:nC.trim(),color:nCo,projects:[]}]);sNC("");sAC(false)}}}/><div style={{display:"flex",gap:3}}>{CL.map(c=><div key={c} onClick={()=>sNCo(c)} style={{width:18,height:18,borderRadius:4,background:c,cursor:"pointer",border:nCo===c?"2px solid #fff":"2px solid transparent"}}/>)}</div><Bt accent={nCo} onClick={()=>{if(nC.trim()){setData(d=>[...d,{id:uid(),name:nC.trim(),color:nCo,projects:[]}]);sNC("");sAC(false)}}}>Add</Bt><span onClick={()=>sAC(false)} style={{color:"#555",cursor:"pointer"}}>✕</span></div>}</div>}

  // TASKS VIEW
  function TV(){const al=gAll(data);const pe=al.filter(t=>!t.done).sort((a,b)=>PR[a.priority].s-PR[b.priority].s||new Date(a.due)-new Date(b.due));const done=al.filter(t=>t.done);
    return <div><div style={{fontSize:10,fontWeight:650,letterSpacing:1.5,textTransform:"uppercase",color:"#777",marginBottom:8}}>Pending ({pe.length})</div>
      {pe.map(t=><div key={t.id} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 12px",background:"#0e0e16",borderRadius:7,marginBottom:4}}><Ch on={false} color={t.catColor} onClick={()=>tog(t.catId,t.projId,t.spId,t.id)}/><div style={{flex:1}}><div style={{fontSize:12,color:"#d0d0da"}}>{t.text}</div><div style={{fontSize:9.5,color:"#4a4a5a",marginTop:1}}>{t.catName} › {t.projName} › {t.spName}</div></div><Tags tags={t.tags} small/><B bg={PR[t.priority].c+"1a"} color={PR[t.priority].c}>{PR[t.priority].l}</B><Du due={t.due} done={false}/></div>)}
      {done.length>0&&<><div style={{fontSize:10,fontWeight:650,letterSpacing:1.5,textTransform:"uppercase",color:"#444",marginBottom:8,marginTop:20}}>Completed ({done.length})</div>{done.map(t=><div key={t.id} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 12px",background:"#0e0e16",borderRadius:7,marginBottom:4,opacity:.45}}><Ch on={true} color={t.catColor} onClick={()=>tog(t.catId,t.projId,t.spId,t.id)}/><div style={{flex:1}}><div style={{fontSize:12,color:"#555",textDecoration:"line-through"}}>{t.text}</div></div></div>)}</>}</div>}

  // REMINDERS VIEW with person filter
  function RV(){const[fb,sFb]=useState(null);const[fP,sFP]=useState(null);let al=gAll(data).filter(t=>!t.done);if(fP)al=al.filter(t=>(t.tags||[]).includes(fP)||(t.projTags||[]).includes(fP)||(t.spTags||[]).includes(fP));al.sort((a,b)=>new Date(a.due)-new Date(b.due));const gs=[{t:"Overdue",items:al.filter(t=>du(t.due)<0),a:"#e94560",e:"🚨"},{t:"Due Today",items:al.filter(t=>du(t.due)===0),a:"#f5a623",e:"⚡"},{t:"This Week",items:al.filter(t=>{const v=du(t.due);return v>0&&v<=7}),a:"#0f9b8e",e:"📋"},{t:"Next Week",items:al.filter(t=>{const v=du(t.due);return v>7&&v<=14}),a:"#3b82f6",e:"📅"},{t:"Later",items:al.filter(t=>du(t.due)>14),a:"#555",e:"🗓"}];const sh=m=>{sFb(m);setTimeout(()=>sFb(null),2500)};
    return <div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,padding:"12px 14px",background:css.card,border:"1px solid "+css.bdr,borderRadius:10,flexWrap:"wrap"}}>
        <div style={{flex:1,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          {gs[0].items.length>0&&<span style={{fontSize:11,color:"#e94560",fontWeight:650}}>{gs[0].items.length} overdue</span>}
          {gs[1].items.length>0&&<span style={{fontSize:11,color:"#f5a623",fontWeight:650}}>{gs[1].items.length} today</span>}
          <span style={{fontSize:11,color:"#888"}}>{gs[2].items.length} this week</span>
          <span style={{fontSize:10.5,color:"#555"}}>{al.length} total</span></div>
        <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:9,color:"#555",fontWeight:600}}>Filter:</span>
          <span onClick={()=>sFP(null)} style={{fontSize:9,padding:"2px 8px",borderRadius:4,cursor:"pointer",background:!fP?"#252536":"transparent",color:!fP?"#ddd":"#555",fontWeight:600}}>All</span>
          {people.map(p=><span key={p.id} onClick={()=>sFP(fP===p.id?null:p.id)} style={{fontSize:9,padding:"2px 8px",borderRadius:4,cursor:"pointer",background:fP===p.id?p.color+"25":"transparent",color:fP===p.id?p.color:"#555",fontWeight:600}}>{p.name}</span>)}
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {fb&&<span style={{fontSize:10,color:"#0f9b8e",fontWeight:600}}>✓ {fb}</span>}
          <Bt onClick={()=>{const{subject:s,body:b}=bD(gs,al.length,data,fP);navigator.clipboard.writeText(`Subject: ${s}\n\n${b}`).then(()=>sh("Copied"))}}>📋 Copy</Bt>
          <Bt accent="#e94560" onClick={()=>{const{subject:s,body:b}=bD(gs,al.length,data,fP);const toEmail=fP?pn(fP)?.email:"";window.open(`mailto:${toEmail}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}`);sh("Opened")}}>✉ Email{fP?` ${pn(fP)?.name}`:""}</Bt></div></div>
      {gs.map(g=>!g.items.length?null:<div key={g.t} style={{marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><div style={{width:6,height:6,borderRadius:3,background:g.a}}/><span style={{fontSize:10,fontWeight:650,letterSpacing:1.5,textTransform:"uppercase",color:g.a}}>{g.t} ({g.items.length})</span></div>
        {g.items.map(t=><div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 13px",background:css.card,border:"1px solid "+css.bdr,borderRadius:8,marginBottom:5,borderLeft:`3px solid ${g.a}`}}>
          <div style={{flex:1}}><div style={{fontSize:12,color:"#d0d0da"}}>{t.text}</div><div style={{fontSize:9.5,color:"#4a4a5a",marginTop:1}}>{t.catName} › {t.projName} › {t.spName} · {fm(t.due)}</div></div>
          <Tags tags={t.tags} small/><B bg={PR[t.priority].c+"1a"} color={PR[t.priority].c}>{PR[t.priority].l}</B><Du due={t.due} done={false}/></div>)}</div>)}</div>}

  // GANTT VIEW
  function GV(){const[mo,sMo]=useState(null);const[fC,sFC]=useState(null);const gs="2026-01-01",td=dba(gs,"2026-07-01"),to=dba(gs,"2026-02-23");const ms=[{n:"Jan",d:31},{n:"Feb",d:28},{n:"Mar",d:31},{n:"Apr",d:30},{n:"May",d:31},{n:"Jun",d:30}];const fd2=fC?data.filter(c=>c.id===fC):data;const rows=[];fd2.forEach(c=>c.projects.forEach(p=>{const at=[];p.subprojects.forEach(s=>s.tasks.forEach(t=>at.push(t)));const pc=at.length?(at.filter(t=>t.done).length/at.length)*100:0;rows.push({t:"p",c,p,pc,tasks:at});p.subprojects.forEach(s=>{const sp=s.tasks.length?(s.tasks.filter(t=>t.done).length/s.tasks.length)*100:0;rows.push({t:"s",c,p,s,pc:sp,tasks:s.tasks})})}));
    return <div>{mo&&<Mo {...mo} onClose={()=>sMo(null)}/>}
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12,flexWrap:"wrap"}}><Bt sx={{padding:"4px 10px",...(!fC?{background:"#252536",color:"#ddd"}:{})}} onClick={()=>sFC(null)}>All</Bt>{data.map(c=><Bt key={c.id} sx={{padding:"4px 10px",...(fC===c.id?{background:c.color+"25",color:c.color}:{})}} onClick={()=>sFC(fC===c.id?null:c.id)}>{c.name}</Bt>)}<div style={{flex:1}}/><Bt onClick={()=>{let t=`3LA TIMELINE\n${"═".repeat(50)}\n\n`;fd2.forEach(c=>c.projects.forEach(p=>{const at=[];p.subprojects.forEach(s=>s.tasks.forEach(x=>at.push(x)));const d=at.filter(x=>x.done).length;t+=`${c.name} › ${p.name} (${d}/${at.length}) — ${p.timeline}\n`;p.subprojects.forEach(s=>{const sd=s.tasks.filter(x=>x.done).length;t+=`  ${s.name} (${sd}/${s.tasks.length})\n`});t+="\n"}));sMo({title:"Timeline",content:t})}}>↗ Export</Bt></div>
      <div style={{overflowX:"auto",paddingBottom:12}}><div style={{minWidth:750}}>
        <div style={{display:"flex",marginLeft:210,marginBottom:6}}>{ms.map(m=><div key={m.n} style={{width:`${m.d/td*100}%`,fontSize:9.5,fontWeight:650,color:"#555",letterSpacing:1.2,textTransform:"uppercase",paddingLeft:4,borderLeft:"1px solid "+css.bdr}}>{m.n}</div>)}</div>
        <div style={{position:"relative"}}><div style={{position:"absolute",left:`calc(210px + ${to/td*100}%)`,top:-6,bottom:0,width:1,background:"#e94560",opacity:.5,zIndex:5}}/><div style={{position:"absolute",left:`calc(210px + ${to/td*100}% - 14px)`,top:-16,fontSize:7.5,color:"#e94560",fontWeight:750,zIndex:6}}>TODAY</div>
          {rows.map((r,i)=>{const ip=r.t==="p";const so=dba(gs,r.p.startDate);const dr=dba(r.p.startDate,r.p.endDate);const l=so/td*100;const w=dr/td*100;return <div key={i} style={{display:"flex",alignItems:"center",height:ip?32:24,borderBottom:"1px solid #12121a"}}><div style={{width:210,flexShrink:0,paddingRight:10,paddingLeft:ip?0:18}}><div style={{fontSize:ip?11:10,color:ip?"#ccc":"#888",fontWeight:ip?600:400,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"flex",alignItems:"center",gap:6}}>{ip&&<div style={{width:6,height:6,borderRadius:2,background:r.c.color}}/>}{ip?`${r.c.name} › ${r.p.name}`:r.s.name}</div></div><div style={{flex:1,position:"relative",height:"100%"}}><div style={{position:"absolute",left:`${l}%`,width:`${w}%`,top:ip?8:7,height:ip?14:8,background:r.c.color+(ip?"22":"15"),borderRadius:ip?4:3,overflow:"hidden",border:`1px solid ${r.c.color}${ip?"35":"20"}`}}><div style={{width:`${r.pc}%`,height:"100%",background:r.c.color+(ip?"aa":"66")}}/></div>{r.tasks.map(t=>{const tl=dba(gs,t.due)/td*100;return <div key={t.id} title={`${t.text} — ${fm(t.due)}`} style={{position:"absolute",left:`calc(${tl}% - 2.5px)`,top:ip?11:8,width:5,height:5,borderRadius:3,background:t.done?"#333":PR[t.priority].c,zIndex:2}}/>})}</div></div>})}</div></div></div></div>}

  // DETAIL VIEW
  function DV(){const[aSP,sASP]=useState(false);const[spN,sSN]=useState("");const[aT,sAT]=useState(null);const[tN,sTN]=useState("");const[tP,sTP]=useState("medium");const[tDu,sTD]=useState("2026-03-15");const[tTg,sTTg]=useState([]);const[mo,sMo]=useState(null);const cat=dc,proj=dp;if(!cat||!proj)return null;const at=[];proj.subprojects.forEach(s=>s.tasks.forEach(t=>at.push(t)));const d=at.filter(t=>t.done).length;const p=at.length?(d/at.length)*100:0;
    return <div>{mo&&<Mo {...mo} onClose={()=>sMo(null)}/>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><div onClick={()=>setDetail(null)} style={{fontSize:11,color:"#555",cursor:"pointer"}}>← Back</div><Bt onClick={()=>sMo({title:`${cat.name} › ${proj.name}`,content:eP(cat,proj)})}>↗ Export</Bt></div>
      <div style={{background:css.card,border:"1px solid "+css.bdr,borderRadius:12,padding:18,borderTop:`3px solid ${cat.color}`,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div><div style={{fontSize:10,color:cat.color,fontWeight:650,letterSpacing:1.2,textTransform:"uppercase"}}>{cat.name}</div><div style={{fontSize:18,fontWeight:700,color:"#e8e8ef"}}>{proj.name}</div><div style={{fontSize:11,color:"#777",marginTop:3}}>{proj.statusText}</div><div style={{marginTop:4}}><Tags tags={proj.tags}/></div></div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"flex-start"}}><TP tags={proj.tags||[]} onChange={t=>uProj(cat.id,proj.id,p=>({...p,tags:t}))} people={people}/>{Object.entries(ST).map(([k,v])=><div key={k} onClick={()=>uSt(cat.id,proj.id,k)} style={{fontSize:9,padding:"3px 7px",borderRadius:5,cursor:"pointer",fontWeight:650,background:proj.status===k?v.c+"28":"#141420",color:proj.status===k?v.c:"#444",border:`1px solid ${proj.status===k?v.c+"40":css.bdr}`}}>{v.l}</div>)}</div></div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:12}}><Br p={p} color={cat.color} h={5}/><span style={{fontSize:11,color:"#888"}}>{Math.round(p)}%</span></div>
        <div style={{display:"flex",gap:14,marginTop:10,fontSize:10.5,color:"#555"}}><span>Timeline: <strong style={{color:"#999"}}>{proj.timeline}</strong></span><span>{d}/{at.length} tasks</span></div>
        <NP notes={proj.notes} attachments={proj.attachments||[]} onNotesChange={n=>uProj(cat.id,proj.id,p=>({...p,notes:n}))} onAddAttachment={a=>uProj(cat.id,proj.id,p=>({...p,attachments:[...(p.attachments||[]),a]}))} onRemoveAttachment={i=>uProj(cat.id,proj.id,p=>({...p,attachments:(p.attachments||[]).filter((_,j)=>j!==i)}))}/></div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:10,fontWeight:650,letterSpacing:1.5,textTransform:"uppercase",color:"#777"}}>Sub-projects ({proj.subprojects.length})</span><span onClick={()=>sASP(!aSP)} style={{fontSize:10,color:cat.color,cursor:"pointer",fontWeight:600}}>+ Sub-project</span></div>
      {aSP&&<div style={{display:"flex",gap:6,marginBottom:10}}><In value={spN} onChange={e=>sSN(e.target.value)} placeholder="Name..." style={{flex:1}} onKeyDown={e=>{if(e.key==="Enter"&&spN.trim()){setData(x=>x.map(c=>c.id!==cat.id?c:{...c,projects:c.projects.map(q=>q.id!==proj.id?q:{...q,subprojects:[...q.subprojects,{id:uid(),name:spN.trim(),tags:[],notes:"",attachments:[],tasks:[]}]})}));sSN("");sASP(false)}}}/><Bt accent={cat.color} onClick={()=>{if(!spN.trim())return;setData(x=>x.map(c=>c.id!==cat.id?c:{...c,projects:c.projects.map(q=>q.id!==proj.id?q:{...q,subprojects:[...q.subprojects,{id:uid(),name:spN.trim(),tags:[],notes:"",attachments:[],tasks:[]}]})}));sSN("");sASP(false)}}>Add</Bt></div>}
      {proj.subprojects.map(sp=>{const sd=sp.tasks.filter(t=>t.done).length;const spp=sp.tasks.length?(sd/sp.tasks.length)*100:0;
        return <div key={sp.id} style={{background:css.card,border:"1px solid "+css.bdr,borderRadius:10,marginBottom:8,borderLeft:`2px solid ${cat.color}50`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"#0e0e16"}}><div style={{width:5,height:5,borderRadius:2,background:cat.color+"80"}}/><span style={{fontSize:12,fontWeight:600,color:"#c0c0cc",flex:1}}>{sp.name}</span><Tags tags={sp.tags} small/><TP tags={sp.tags||[]} onChange={t=>uSP(cat.id,proj.id,sp.id,s=>({...s,tags:t}))} people={people}/><div style={{width:50}}><Br p={spp} color={cat.color} h={2}/></div><span style={{fontSize:9,color:"#555"}}>{sd}/{sp.tasks.length}</span></div>
          <div style={{paddingLeft:28,paddingRight:14}}><NP notes={sp.notes} attachments={sp.attachments||[]} onNotesChange={n=>uSP(cat.id,proj.id,sp.id,s=>({...s,notes:n}))} onAddAttachment={a=>uSP(cat.id,proj.id,sp.id,s=>({...s,attachments:[...(s.attachments||[]),a]}))} onRemoveAttachment={i=>uSP(cat.id,proj.id,sp.id,s=>({...s,attachments:(s.attachments||[]).filter((_,j)=>j!==i)}))}/></div>
          <div style={{padding:"6px 14px 10px 28px"}}>
            {sp.tasks.map(t=><div key={t.id} style={{opacity:t.done?.4:1,marginBottom:2}}>
              <div style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0"}}>
                <Ch on={t.done} color={cat.color} onClick={()=>tog(cat.id,proj.id,sp.id,t.id)}/>
                <span style={{flex:1,fontSize:11.5,color:t.done?"#555":"#c8c8d4",textDecoration:t.done?"line-through":"none"}}>{t.text}</span>
                <Tags tags={t.tags} small/><TP tags={t.tags||[]} onChange={tg=>uTask(cat.id,proj.id,sp.id,t.id,x=>({...x,tags:tg}))} people={people}/>
                <B bg={PR[t.priority].c+"1a"} color={PR[t.priority].c}>{PR[t.priority].l}</B><Du due={t.due} done={t.done}/>
                <DB onConfirm={()=>dT(cat.id,proj.id,sp.id,t.id)}/></div>
              <div style={{paddingLeft:25}}><NP notes={t.notes} attachments={t.attachments||[]} onNotesChange={n=>uTask(cat.id,proj.id,sp.id,t.id,x=>({...x,notes:n}))} onAddAttachment={a=>uTask(cat.id,proj.id,sp.id,t.id,x=>({...x,attachments:[...(x.attachments||[]),a]}))} onRemoveAttachment={i=>uTask(cat.id,proj.id,sp.id,t.id,x=>({...x,attachments:(x.attachments||[]).filter((_,j)=>j!==i)}))}/></div></div>)}
            {aT===sp.id?<div style={{display:"flex",gap:5,marginTop:6,alignItems:"center",flexWrap:"wrap"}}>
              <In value={tN} onChange={e=>sTN(e.target.value)} placeholder="Task..." style={{flex:1,minWidth:140}} onKeyDown={e=>{if(e.key==="Enter"&&tN.trim()){setData(x=>x.map(c=>c.id!==cat.id?c:{...c,projects:c.projects.map(q=>q.id!==proj.id?q:{...q,subprojects:q.subprojects.map(s=>s.id!==sp.id?s:{...s,tasks:[...s.tasks,{id:uid(),text:tN.trim(),done:false,priority:tP,due:tDu,tags:tTg,notes:"",attachments:[]}]})})}));sTN("");sAT(null)}}}/>
              <Se value={tP} onChange={e=>sTP(e.target.value)}><option value="high">High</option><option value="medium">Med</option><option value="low">Low</option></Se>
              <In type="date" value={tDu} onChange={e=>sTD(e.target.value)} style={{width:130}}/>
              <TP tags={tTg} onChange={t=>sTTg(t)} people={people}/>
              <Bt accent={cat.color} onClick={()=>{if(!tN.trim())return;setData(x=>x.map(c=>c.id!==cat.id?c:{...c,projects:c.projects.map(q=>q.id!==proj.id?q:{...q,subprojects:q.subprojects.map(s=>s.id!==sp.id?s:{...s,tasks:[...s.tasks,{id:uid(),text:tN.trim(),done:false,priority:tP,due:tDu,tags:tTg,notes:"",attachments:[]}]})})}));sTN("");sAT(null)}}>Add</Bt>
              <span onClick={()=>sAT(null)} style={{color:"#555",cursor:"pointer"}}>✕</span></div>
            :<div onClick={()=>sAT(sp.id)} style={{fontSize:10,color:"#444",cursor:"pointer",marginTop:4}}>+ Add task</div>}</div></div>})}</div>}

  // RENDER
  return <div style={{background:css.bg,minHeight:"100vh",color:"#e8e8ef",fontFamily:"'DM Sans','Helvetica Neue',sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <div style={{padding:"16px 20px 0",borderBottom:"1px solid #14141e"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div><div style={{fontSize:18,fontWeight:700,letterSpacing:-.5}}><span style={{color:"#e94560"}}>3LA</span> <span style={{color:"#555",fontWeight:400}}>PM</span></div><div style={{fontSize:10,color:"#444",marginTop:1}}>Week of Feb 23, 2026</div></div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <PM people={people} setPeople={setPeople}/>
          <div style={{display:"flex",gap:14,alignItems:"center"}}><div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:urg>0?"#f5a623":"#0f9b8e"}}>{urg}</div><div style={{fontSize:8,color:"#555",letterSpacing:1.2,fontWeight:600}}>URGENT</div></div><div style={{width:1,height:24,background:css.bdr}}/><div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:700}}>{dn}<span style={{color:"#444",fontWeight:400}}>/{tot}</span></div><div style={{fontSize:8,color:"#555",letterSpacing:1.2,fontWeight:600}}>TASKS</div></div></div></div></div>
      <div style={{display:"flex"}}>
        {VW.map(v=><div key={v.k} onClick={()=>{setView(v.k);setDetail(null)}} style={{padding:"7px 14px",cursor:"pointer",fontSize:11.5,fontWeight:view===v.k&&!detail?650:400,color:view===v.k&&!detail?"#e8e8ef":"#555",borderBottom:view===v.k&&!detail?"2px solid #e94560":"2px solid transparent",display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:11}}>{v.i}</span> {v.l}</div>)}
        <div style={{flex:1}}/>
        <div onClick={()=>setShowAdd(!showAdd)} style={{padding:"7px 12px",cursor:"pointer",fontSize:11.5,fontWeight:650,color:"#e94560",display:"flex",alignItems:"center",gap:3}}><span style={{fontSize:15,lineHeight:1}}>+</span> Task</div></div></div>
    {showAdd&&<div style={{padding:"10px 20px",background:"#0e0e16",borderBottom:"1px solid #14141e"}}><div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}><In value={af.text} onChange={e=>setAf({...af,text:e.target.value})} placeholder="Task..." style={{flex:1,minWidth:160}} onKeyDown={e=>e.key==="Enter"&&doAdd()}/><Se value={af.catId} onChange={e=>setAf({...af,catId:e.target.value,projId:"",spId:""})}><option value="">Category...</option>{data.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</Se><Se value={af.projId} onChange={e=>setAf({...af,projId:e.target.value,spId:""})}><option value="">Project...</option>{scp.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</Se><Se value={af.spId} onChange={e=>setAf({...af,spId:e.target.value})}><option value="">Sub-project...</option>{sps.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</Se><Se value={af.priority} onChange={e=>setAf({...af,priority:e.target.value})}><option value="high">High</option><option value="medium">Med</option><option value="low">Low</option></Se><In type="date" value={af.due} onChange={e=>setAf({...af,due:e.target.value})} style={{width:130}}/><TP tags={af.tags||[]} onChange={t=>setAf({...af,tags:t})} people={people}/><Bt accent="#e94560" onClick={doAdd}>Add</Bt></div></div>}
    <div style={{padding:"14px 20px 40px"}}>{detail?<DV/>:view==="status"?<SV/>:view==="tasks"?<TV/>:view==="reminders"?<RV/>:<GV/>}</div></div>;
}
