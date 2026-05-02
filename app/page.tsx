'use client';
import { useState, useCallback } from "react";

const BOARD = [
  { rank:1, name:"vitalik.eth", streak:420 },
  { rank:2, name:"jesse.base.eth", streak:211 },
  { rank:3, name:"coinbase.eth", streak:189 },
  { rank:4, name:"0x1efF…AA71", streak:97 },
  { rank:5, name:"0xe1AB…6276", streak:64 },
];

export default function Page() {
  const [tab, setTab] = useState("streak");
  const [streak, setStreak] = useState(7);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkIn = useCallback(async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setStreak(s => s + 1);
    setChecked(true);
    setLoading(false);
  }, []);

  return (
    <div style={{minHeight:"100vh",background:"#0a0a0f",color:"#fff",fontFamily:"monospace",maxWidth:420,margin:"0 auto",padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
        <span style={{color:"rgba(255,255,255,0.4)",fontSize:11,letterSpacing:3}}>⛓ STREAKBASE</span>
        <span style={{background:"rgba(255,107,0,0.15)",color:"#ff9500",fontSize:10,padding:"3px 8px",borderRadius:100,border:"1px solid rgba(255,107,0,0.3)"}}>BASE</span>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:20}}>
        {["streak","board"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"8px 0",borderRadius:8,border:tab===t?"1px solid rgba(255,107,0,0.4)":"1px solid transparent",background:tab===t?"rgba(255,107,0,0.2)":"rgba(255,255,255,0.04)",color:tab===t?"#ff9500":"rgba(255,255,255,0.35)",fontSize:11,fontFamily:"monospace",fontWeight:700,cursor:"pointer"}}>
            {t==="streak"?"MY STREAK":"LEADERBOARD"}
          </button>
        ))}
      </div>
      {tab==="streak"&&(
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:80,fontWeight:900,margin:"24px 0 4px"}}>{streak}</div>
          <div style={{color:"#ff9500",letterSpacing:3,fontSize:12,marginBottom:4}}>DAY STREAK 🔥</div>
          <div style={{color:"rgba(255,255,255,0.25)",fontSize:10,marginBottom:28}}>{streak>=100?"ELITE":streak>=30?"COMMITTED":streak>=7?"BUILDING":"STARTER"}</div>
          <div style={{display:"flex",gap:8,marginBottom:24}}>
            {[{l:"STREAK",v:`${streak}🔥`},{l:"TOTAL",v:streak},{l:"RANK",v:"#12"}].map(s=>(
              <div key={s.l} style={{flex:1,padding:"14px 8px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:900}}>{s.v}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:1.5,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:3,marginBottom:24}}>
            {Array.from({length:14},(_,i)=>(
              <div key={i} style={{flex:1,aspectRatio:"1",borderRadius:3,background:i<streak?`rgba(255,107,0,${0.2+0.05*i})`:"rgba(255,255,255,0.06)"}}/>
            ))}
          </div>
          <button onClick={checkIn} disabled={checked||loading} style={{width:"100%",padding:"16px 0",borderRadius:14,border:checked?"1px solid rgba(34,197,94,0.3)":"none",background:checked?"rgba(34,197,94,0.15)":"linear-gradient(135deg,#ff6b00,#ff9500)",color:checked?"#22c55e":"#fff",fontSize:15,fontWeight:700,fontFamily:"monospace",letterSpacing:2,cursor:checked?"not-allowed":"pointer",boxShadow:!checked?"0 0 30px rgba(255,107,0,0.4)":"none"}}>
            {loading?"CONFIRMING...":checked?"✓ CHECKED IN TODAY":"🔥 CHECK IN"}
          </button>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.2)",marginTop:8}}>{checked?"Streak recorded onchain ✓":"Gas sponsored · free to check in"}</div>
        </div>
      )}
      {tab==="board"&&(
        <div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:2,marginBottom:12}}>GLOBAL RANKINGS</div>
          {BOARD.map((e,i)=>(
            <div key={e.rank} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:10,marginBottom:4,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
              <span style={{fontSize:i<3?18:12,minWidth:28,textAlign:"center"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${e.rank}`}</span>
              <span style={{flex:1,fontSize:12,fontWeight:700}}>{e.name}</span>
              <span style={{fontSize:13,fontWeight:700,color:"#ff9500"}}>{e.streak}🔥</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
