import { useState, useEffect, useRef } from "react";

const LOGO = "https://res.cloudinary.com/dl6oeomro/image/upload/f_auto,q_auto/file_00000000612071f89fc3df316af77377_wgll3l";

// ⬅️ Replace this with your real app URL after deployment
const APP_URL = "https://youthmarket-app.netlify.app";

const C = {
  bg:"#060606", s1:"#0D0D0D", s2:"#141414", s3:"#1C1C1C",
  border:"#242424", text:"#F2EDE4", muted:"#686260",
  gold:"#F0A04B", goldL:"#FFD080", goldD:"#C07830",
  teal:"#2A9D8F", red:"#E76F51", purple:"#9B72CF", green:"#25D366",
  font:"'Cormorant Garamond',Georgia,serif",
  sans:"'DM Sans',system-ui,sans-serif",
};

const GS = () => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`
      *{margin:0;padding:0;box-sizing:border-box;}
      html{scroll-behavior:smooth;}
      body{background:${C.bg};color:${C.text};font-family:${C.sans};overflow-x:hidden;}
      ::-webkit-scrollbar{width:5px;}
      ::-webkit-scrollbar-track{background:${C.bg};}
      ::-webkit-scrollbar-thumb{background:${C.gold}55;border-radius:3px;}
      a{text-decoration:none;color:inherit;}
      button{cursor:pointer;font-family:${C.sans};}
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
      @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(.97)}}
      @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
      @keyframes glow{0%,100%{box-shadow:0 0 20px ${C.gold}33}50%{box-shadow:0 0 50px ${C.gold}66}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
      .fu{animation:fadeUp .9s ease both;}
      .fu1{animation:fadeUp .9s ease .15s both;}
      .fu2{animation:fadeUp .9s ease .3s both;}
      .fu3{animation:fadeUp .9s ease .45s both;}
      .float{animation:float 5s ease-in-out infinite;}
      .glow{animation:glow 3s ease-in-out infinite;}
    `}</style>
  </>
);

function Logo({w=160}){
  const [e,setE]=useState(false);
  if(e) return <div style={{fontFamily:C.font,fontWeight:900,fontSize:w*.18,lineHeight:1,letterSpacing:"-1px"}}><span style={{color:"#fff"}}>Youth</span><span style={{color:C.gold}}>Market</span></div>;
  return <img src={LOGO} alt="YouthMarket" onError={()=>setE(true)} style={{width:w,height:"auto",objectFit:"contain",display:"block"}}/>;
}

function Btn({children,onClick,outline=false,size="md",style={}}){
  const [h,setH]=useState(false);
  const p={sm:"8px 18px",md:"12px 28px",lg:"16px 44px"};
  const f={sm:12,md:14,lg:16};
  return(
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:outline?"transparent":h?C.goldL:C.gold,color:outline?(h?C.gold:C.text):"#080808",
        border:outline?`1px solid ${h?C.gold:C.border}`:"none",borderRadius:8,padding:p[size],
        fontFamily:C.sans,fontWeight:600,fontSize:f[size],transition:"all .2s",letterSpacing:".3px",...style}}>
      {children}
    </button>
  );
}

function Label({children}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
      <div style={{width:28,height:1,background:C.gold}}/>
      <span style={{color:C.gold,fontFamily:C.sans,fontSize:11,fontWeight:600,letterSpacing:4,textTransform:"uppercase"}}>{children}</span>
      <div style={{width:28,height:1,background:C.gold}}/>
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────
function Navbar({page,setPage}){
  const [sc,setSc]=useState(false);
  const [mo,setMo]=useState(false);
  useEffect(()=>{
    const h=()=>setSc(window.scrollY>60);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);
  const links=[
    {l:"Home",p:"home"},{l:"Marketplace",p:"marketplace"},
    {l:"How It Works",p:"how-it-works"},{l:"For Sellers",p:"sellers"},
    {l:"For Buyers",p:"buyers"},{l:"Contact",p:"contact"},
  ];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,
      background:sc?`${C.bg}F5`:"transparent",
      backdropFilter:sc?"blur(24px)":"none",
      borderBottom:sc?`1px solid ${C.border}`:"none",
      transition:"all .3s"}}>
      <div style={{maxWidth:1240,margin:"0 auto",padding:"0 32px",height:70,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div onClick={()=>setPage("home")} style={{cursor:"pointer"}}>
          <Logo w={130}/>
        </div>
        <div style={{display:"flex",gap:28,alignItems:"center"}}>
          {links.map(({l,p})=>(
            <span key={p} onClick={()=>setPage(p)}
              style={{color:page===p?C.gold:C.muted,fontFamily:C.sans,fontSize:13,fontWeight:500,cursor:"pointer",transition:"color .2s",letterSpacing:".3px"}}
              onMouseEnter={e=>e.target.style.color=C.gold}
              onMouseLeave={e=>e.target.style.color=page===p?C.gold:C.muted}>
              {l}
            </span>
          ))}
          <Btn onClick={()=>window.open(APP_URL,"_blank")} size="sm">Explore Talent</Btn>
        </div>
      </div>
    </nav>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────
function Home({setPage}){
  const sellers=[
    {emoji:"🎨",name:"Zara M.",skill:"Portrait Artist",loc:"Lagos, Nigeria",price:"$350",r:"4.9",c:"#F0A04B"},
    {emoji:"💻",name:"Kwame A.",skill:"Web Designer",loc:"Accra, Ghana",price:"$1,200",r:"5.0",c:"#2A9D8F"},
    {emoji:"💎",name:"Amara T.",skill:"Jewelry Maker",loc:"Nairobi, Kenya",price:"$220",r:"4.8",c:"#E9C46A"},
    {emoji:"🎵",name:"Elijah W.",skill:"Music Producer",loc:"Atlanta, USA",price:"$500",r:"5.0",c:"#9B72CF"},
  ];
  const features=[
    {icon:"🌍",title:"Global Talent Pool",desc:"Access extraordinary young creators from 180+ countries. Art, Tech, Fashion, Music, Wellness and more."},
    {icon:"🔒",title:"Secure Escrow",desc:"Your payment is held safely until you approve the delivery. Money only releases when you are satisfied."},
    {icon:"📱",title:"Easy Payments",desc:"Pay via M-Pesa now. Card payments coming very soon. All payments protected by escrow."},
    {icon:"🤖",title:"AI Support 24/7",desc:"YouthBot powered by Claude AI answers all your questions instantly, day or night, in seconds."},
    {icon:"⭐",title:"Verified Creators",desc:"Every seller is reviewed and rated. Featured and Verified badges show you the very best talent."},
    {icon:"💰",title:"Unbeatable Value",desc:"Save up to 70% compared to traditional agencies. World-class quality from young global talent."},
  ];
  const testimonials=[
    {name:"Sarah K.",role:"CEO, London",text:"I hired Kwame to build my company website. The quality was extraordinary. YouthMarket is changing everything!",a:"👩‍💼"},
    {name:"Michael J.",role:"Investor, New York",text:"Zara's portrait exceeded every expectation. Stunning work from a 19-year-old artist. Highly recommend!",a:"👨‍💼"},
    {name:"Raj P.",role:"Entrepreneur, Dubai",text:"YouthMarket gave me access to incredible talent I could not find anywhere else in the world.",a:"👨‍🏭"},
  ];
  return(
    <div>
      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:70}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 15% 50%, ${C.gold}07,transparent 60%),radial-gradient(ellipse at 85% 20%, ${C.purple}07,transparent 60%)`}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.border}18 1px,transparent 1px),linear-gradient(90deg,${C.border}18 1px,transparent 1px)`,backgroundSize:"56px 56px",opacity:.6}}/>
        <div style={{position:"absolute",top:"8%",right:"3%",width:500,height:500,background:`radial-gradient(circle,${C.gold}05,transparent)`,borderRadius:"50%",pointerEvents:"none"}}/>

        <div style={{maxWidth:1240,margin:"0 auto",padding:"80px 32px",position:"relative",zIndex:1,width:"100%"}}>

          {/* App banner */}
          <div onClick={()=>window.open(APP_URL,"_blank")} style={{background:`linear-gradient(135deg,${C.gold}18,${C.purple}18)`,border:`1px solid ${C.gold}44`,borderRadius:14,padding:"14px 20px",marginBottom:40,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",flexWrap:"wrap",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:22}}>🚀</span>
              <div>
                <div style={{fontFamily:C.sans,fontWeight:700,fontSize:14,color:C.gold}}>YouthMarket App is LIVE!</div>
                <div style={{color:C.muted,fontSize:12}}>Sign up as buyer or seller and start today</div>
              </div>
            </div>
            <div style={{background:C.gold,color:"#080808",borderRadius:8,padding:"8px 18px",fontFamily:C.sans,fontWeight:700,fontSize:13,flexShrink:0}}>
              Open App →
            </div>
          </div>          <div style={{display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:72,alignItems:"center"}}>

            {/* LEFT */}
            <div className="fu">
              <Label>The Global Youth Marketplace</Label>
              <h1 style={{fontFamily:C.font,fontSize:"clamp(44px,5.5vw,78px)",fontWeight:900,lineHeight:1.03,marginBottom:26,letterSpacing:"-2px"}}>
                Where Young<br/>
                <span style={{color:C.gold}}>Talent</span> Meets<br/>
                <span style={{WebkitTextStroke:`1.5px ${C.gold}`,color:"transparent"}}>Wealthy Buyers</span>
              </h1>
              <p style={{color:C.muted,fontSize:16,lineHeight:1.85,marginBottom:44,maxWidth:480,fontFamily:C.sans}}>
                YouthMarket connects extraordinary young creators aged 13–25 from around the world with successful buyers globally. Commission art, tech, fashion, music and more — from wherever you are.
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:64}}>
                <Btn onClick={()=>window.open(APP_URL,"_blank")} size="lg">Browse Talent →</Btn>
                <Btn outline onClick={()=>window.open(APP_URL,"_blank")} size="lg">Start Selling Free</Btn>
              </div>
              {/* Stats */}
              <div style={{display:"flex",gap:48,paddingTop:40,borderTop:`1px solid ${C.border}`}}>
                {[{v:"2,400+",l:"Young Sellers",c:C.gold},{v:"$4.2M",l:"Earned by Youth",c:C.teal},{v:"180+",l:"Countries",c:C.purple},{v:"98%",l:"Satisfaction",c:"#E9C46A"}].map(s=>(
                  <div key={s.l} style={{textAlign:"center"}}>
                    <div style={{fontFamily:C.font,fontSize:34,fontWeight:800,color:s.c,lineHeight:1,marginBottom:4}}>{s.v}</div>
                    <div style={{color:C.muted,fontSize:11,fontFamily:C.sans,letterSpacing:1}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Seller cards */}
            <div className="fu1" style={{position:"relative"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {sellers.map((s,i)=>(
                  <div key={i} className={i===0?"float":""} style={{
                    background:`linear-gradient(135deg,${C.s1},${C.s2})`,
                    border:`1px solid ${i===0?s.c+"55":C.border}`,
                    borderRadius:18,padding:22,
                    transform:i%2===1?"translateY(22px)":"none",
                    boxShadow:i===0?`0 0 40px ${s.c}14`:"none",
                    transition:"all .3s",
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.transform=(i%2===1?"translateY(22px) ":"")+"scale(1.02)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform=i%2===1?"translateY(22px)":"none";}}>
                    <div style={{fontSize:38,marginBottom:10}}>{s.emoji}</div>
                    <div style={{fontFamily:C.font,fontSize:16,fontWeight:700,marginBottom:2}}>{s.name}</div>
                    <div style={{color:C.muted,fontSize:11,fontFamily:C.sans,marginBottom:6}}>{s.skill}</div>
                    <div style={{color:C.muted,fontSize:10,fontFamily:C.sans,marginBottom:10}}>📍 {s.loc}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{fontFamily:C.font,fontSize:20,fontWeight:800,color:s.c}}>From {s.price}</div>
                      <div style={{color:"#FFD700",fontSize:12}}>⭐ {s.r}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Badge */}
              <div className="glow" style={{position:"absolute",bottom:-22,left:"50%",transform:"translateX(-50%)",background:C.gold,color:"#080808",borderRadius:40,padding:"11px 26px",fontFamily:C.sans,fontWeight:700,fontSize:13,whiteSpace:"nowrap",zIndex:10}}>
                🌍 Global · M-Pesa Now · Card Payments Coming Soon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{background:`linear-gradient(90deg,${C.goldD},${C.gold},${C.goldL},${C.gold},${C.goldD})`,overflow:"hidden",padding:"13px 0"}}>
        <div style={{display:"flex",gap:60,animation:"marquee 22s linear infinite",whiteSpace:"nowrap"}}>
          {[...Array(2)].map((_,j)=>(
            <div key={j} style={{display:"flex",gap:60,flexShrink:0}}>
              {["🎨 Art & Portraits","💻 Web & App Design","💎 Luxury Jewelry","📱 Social Media","🎵 Music Production","🌿 Wellness Products","📸 Photography","🖥️ 3D Visualization","👗 Fashion Design","✍️ Creative Writing"].map((t,i)=>(
                <span key={i} style={{color:"#080808",fontFamily:C.sans,fontWeight:700,fontSize:13}}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{padding:"110px 32px",maxWidth:1240,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:72}}>
          <Label>Why Choose YouthMarket</Label>
          <h2 style={{fontFamily:C.font,fontSize:"clamp(34px,4.5vw,60px)",fontWeight:800,marginBottom:18,letterSpacing:"-1px"}}>
            Built for the <span style={{color:C.gold}}>Future</span> of Work
          </h2>
          <p style={{color:C.muted,fontSize:16,maxWidth:560,margin:"0 auto",lineHeight:1.8}}>
            Everything you need to hire world-class young talent or start earning from your skills globally.
          </p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:22}}>
          {features.map((f,i)=>(
            <div key={i} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:20,padding:30,transition:"all .3s",cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold+"55";e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 20px 60px rgba(0,0,0,.3)`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <div style={{fontSize:38,marginBottom:16}}>{f.icon}</div>
              <div style={{fontFamily:C.font,fontSize:21,fontWeight:700,marginBottom:10}}>{f.title}</div>
              <p style={{color:C.muted,fontSize:14,lineHeight:1.75}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"110px 32px",background:C.s1,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1240,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:72}}>
            <Label>Simple Process</Label>
            <h2 style={{fontFamily:C.font,fontSize:"clamp(34px,4.5vw,60px)",fontWeight:800,letterSpacing:"-1px"}}>
              How It <span style={{color:C.gold}}>Works</span>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:40}}>
            {[
              {n:"01",icon:"🔍",title:"Browse",desc:"Explore hundreds of verified young sellers across 8 categories worldwide."},
              {n:"02",icon:"💬",title:"Connect",desc:"Message sellers directly. Discuss your project and get a custom quote."},
              {n:"03",icon:"💳",title:"Pay Securely",desc:"Pay via M-Pesa now. Card payments coming very soon. Funds held in escrow."},
              {n:"04",icon:"✅",title:"Approve & Done",desc:"Review the delivery, approve it, and the seller gets paid automatically."},
            ].map((s,i)=>(
              <div key={i} style={{position:"relative"}}>
                <div style={{fontFamily:C.font,fontSize:72,fontWeight:900,color:`${C.gold}18`,lineHeight:1,marginBottom:18}}>{s.n}</div>
                <div style={{width:52,height:52,background:`${C.gold}18`,border:`1px solid ${C.gold}44`,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:16}}>{s.icon}</div>
                <div style={{fontFamily:C.font,fontSize:22,fontWeight:700,marginBottom:10,color:C.gold}}>{s.title}</div>
                <p style={{color:C.muted,fontSize:14,lineHeight:1.75}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:"110px 32px",maxWidth:1240,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:72}}>
          <Label>Global Reviews</Label>
          <h2 style={{fontFamily:C.font,fontSize:"clamp(34px,4.5vw,60px)",fontWeight:800,letterSpacing:"-1px"}}>
            Trusted by Buyers <span style={{color:C.gold}}>Worldwide</span>
          </h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:22}}>
          {testimonials.map((t,i)=>(
            <div key={i} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:20,padding:30}}>
              <div style={{color:C.gold,fontSize:18,marginBottom:16,letterSpacing:2}}>★★★★★</div>
              <p style={{color:C.text,fontSize:15,lineHeight:1.75,marginBottom:22,fontFamily:C.sans,fontStyle:"italic"}}>"{t.text}"</p>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{fontSize:36}}>{t.a}</div>
                <div>
                  <div style={{fontFamily:C.sans,fontWeight:600,fontSize:14}}>{t.name}</div>
                  <div style={{color:C.muted,fontSize:12}}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"110px 32px",background:`linear-gradient(135deg,${C.gold}07,${C.purple}07)`,borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:680,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:52,marginBottom:22}}>🌍</div>
          <h2 style={{fontFamily:C.font,fontSize:"clamp(36px,5vw,66px)",fontWeight:900,marginBottom:22,letterSpacing:"-1px"}}>
            Join the Global <span style={{color:C.gold}}>Youth Movement</span>
          </h2>
          <p style={{color:C.muted,fontSize:16,lineHeight:1.85,marginBottom:44}}>
            Thousands of young creators worldwide are already earning real money. Wealthy buyers from every corner of the globe are discovering extraordinary talent. Your turn starts now.
          </p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <Btn onClick={()=>window.open(APP_URL,"_blank")} size="lg">Browse Global Talent →</Btn>
            <Btn outline onClick={()=>window.open(APP_URL,"_blank")} size="lg">Start Selling Free</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── MARKETPLACE PAGE ──────────────────────────────────────────
function Marketplace({setPage}){
  const [cat,setCat]=useState("All");
  const [filter,setFilter]=useState("all");
  const listings=[
    {id:1,title:"Custom Hand-Painted Portrait",cat:"Art",price:350,orig:438,emoji:"🎨",color:"#F0A04B",delivery:"digital",featured:true,rating:4.9,reviews:42,tag:"Top Seller",seller:"Zara M.",age:19,location:"Lagos, Nigeria",verified:true},
    {id:2,title:"Premium Web & App Design",cat:"Tech",price:1200,orig:1500,emoji:"💻",color:"#2A9D8F",delivery:"digital",featured:true,rating:5.0,reviews:18,tag:"Rising Star",seller:"Kwame A.",age:22,location:"Accra, Ghana",verified:false},
    {id:3,title:"Handcrafted Luxury Jewelry",cat:"Fashion",price:220,orig:null,emoji:"💎",color:"#E9C46A",delivery:"physical",featured:false,rating:4.8,reviews:67,tag:"Verified",seller:"Amara T.",age:17,location:"Nairobi, Kenya",verified:true},
    {id:4,title:"Social Media Strategy",cat:"Marketing",price:800,orig:1000,emoji:"📱",color:"#E76F51",delivery:"service",featured:false,rating:4.9,reviews:31,tag:"Top Seller",seller:"Diego R.",age:21,location:"São Paulo, Brazil",verified:false},
    {id:5,title:"Organic Skincare Gift Set",cat:"Wellness",price:180,orig:null,emoji:"🌿",color:"#81B29A",delivery:"physical",featured:false,rating:4.7,reviews:89,tag:"New",seller:"Priya K.",age:20,location:"Mumbai, India",verified:false},
    {id:6,title:"Original Music Production",cat:"Music",price:500,orig:625,emoji:"🎵",color:"#9B72CF",delivery:"digital",featured:true,rating:5.0,reviews:11,tag:"Rising Star",seller:"Elijah W.",age:18,location:"Atlanta, USA",verified:true},
    {id:7,title:"Luxury Event Photography",cat:"Art",price:950,orig:null,emoji:"📸",color:"#F0A04B",delivery:"service",featured:false,rating:4.9,reviews:24,tag:"Verified",seller:"Sofia L.",age:23,location:"Barcelona, Spain",verified:true},
    {id:8,title:"3D Product Visualization",cat:"Tech",price:680,orig:850,emoji:"🖥️",color:"#2A9D8F",delivery:"digital",featured:false,rating:4.8,reviews:15,tag:"Rising Star",seller:"Tariq B.",age:20,location:"Dubai, UAE",verified:false},
  ];
  const cats=["All","Art","Tech","Fashion","Marketing","Wellness","Music"];
  const DICONS={digital:"📁",physical:"📦",service:"🎥"};
  const TCOLORS={"Top Seller":C.gold,"Rising Star":C.purple,"Verified":C.teal,"New":C.red};
  let shown=listings.filter(l=>cat==="All"||l.cat===cat);
  if(filter==="featured") shown=shown.filter(l=>l.featured);
  if(filter==="verified") shown=shown.filter(l=>l.verified);

  return(
    <div style={{paddingTop:100,minHeight:"100vh",padding:"100px 32px 70px",maxWidth:1300,margin:"0 auto"}}>
      <div style={{marginBottom:44}}>
        <Label>Global Youth Marketplace</Label>
        <h1 style={{fontFamily:C.font,fontSize:"clamp(38px,5vw,68px)",fontWeight:900,marginBottom:14,letterSpacing:"-1px"}}>
          Browse <span style={{color:C.gold}}>Young Talent</span>
        </h1>
        <p style={{color:C.muted,fontSize:15}}>Discover extraordinary young creators from around the world</p>
      </div>

      {/* Payment banner */}
      <div style={{background:"linear-gradient(135deg,#0A1208,#080808)",border:`1px solid ${C.teal}`,borderRadius:14,padding:"16px 22px",marginBottom:30}}>
        <div style={{fontFamily:C.sans,fontWeight:700,fontSize:14,color:C.teal,marginBottom:12}}>💳 Payment Options</div>
        <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{width:36,height:36,background:"#25D36618",border:"1px solid #25D36633",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📱</div>
            <div>
              <div style={{fontFamily:C.sans,fontWeight:600,fontSize:13,color:"#25D366"}}>M-Pesa — Available Now</div>
              <div style={{color:C.muted,fontSize:11}}>Send to 0769366863 · Confirmed in 30 mins</div>
            </div>
          </div>
          <div style={{width:1,background:C.border}}/>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{width:36,height:36,background:`${C.gold}18`,border:`1px solid ${C.gold}33`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>💳</div>
            <div>
              <div style={{fontFamily:C.sans,fontWeight:600,fontSize:13,color:C.gold}}>Card Payments — Coming Soon</div>
              <div style={{color:C.muted,fontSize:11}}>Visa · Mastercard · Bank Transfer · Pesapal · Licensed by Bank of Tanzania</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
        {cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{background:cat===c?C.gold:C.s2,color:cat===c?"#080808":C.muted,border:`1px solid ${cat===c?C.gold:C.border}`,borderRadius:20,padding:"8px 18px",fontFamily:C.sans,fontSize:13,fontWeight:500,transition:"all .15s"}}>{c}</button>)}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:36}}>
        {[["all","All"],["featured","⭐ Featured"],["verified","✓ Verified"]].map(([f,l])=><button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`${C.gold}18`:C.s2,color:filter===f?C.gold:C.muted,border:`1px solid ${filter===f?C.gold:C.border}`,borderRadius:20,padding:"7px 16px",fontFamily:C.sans,fontSize:12,transition:"all .15s"}}>{l}</button>)}
      </div>

      {/* Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20}}>
        {shown.map(item=>{
          const disc=item.orig?Math.round((1-item.price/item.orig)*100):null;
          return(
            <div key={item.id} style={{background:"#fff",borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"all .2s",border:"1px solid #EEE",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.16)";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.06)";e.currentTarget.style.transform="none";}}>
              <div style={{background:`linear-gradient(135deg,#1A1A1A,#2A2A2A)`,height:190,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                <div style={{position:"absolute",inset:0,background:`radial-gradient(circle,${item.color}22,transparent)`}}/>
                <div style={{fontSize:76,filter:"drop-shadow(0 4px 14px rgba(0,0,0,.4))",position:"relative"}}>{item.emoji}</div>
                {item.featured&&<div style={{position:"absolute",top:10,left:10,background:C.gold,color:"#080808",borderRadius:4,padding:"2px 10px",fontSize:10,fontFamily:C.sans,fontWeight:700}}>⭐ FEATURED</div>}
                {disc&&<div style={{position:"absolute",top:10,right:10,background:C.red,color:"#fff",borderRadius:4,padding:"2px 9px",fontSize:10,fontFamily:C.sans,fontWeight:700}}>-{disc}%</div>}
                <div style={{position:"absolute",bottom:10,right:10,background:"rgba(0,0,0,.7)",borderRadius:20,padding:"2px 10px",fontSize:11,color:"#fff",display:"flex",gap:4,alignItems:"center"}}>
                  <span>{DICONS[item.delivery]}</span><span style={{textTransform:"capitalize"}}>{item.delivery}</span>
                </div>
              </div>
              <div style={{padding:"14px 14px 18px"}}>
                <div style={{fontFamily:C.sans,fontWeight:600,fontSize:14,color:"#1A1A1A",marginBottom:4,lineHeight:1.4,height:40,overflow:"hidden"}}>{item.title}</div>
                <div style={{color:"#666",fontSize:12,marginBottom:6,display:"flex",alignItems:"center",gap:4}}>
                  by {item.seller}
                  {item.verified&&<span style={{background:"#E8F5F3",color:C.teal,borderRadius:3,padding:"1px 5px",fontSize:10,fontWeight:700}}>✓</span>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:10}}>
                  {[1,2,3,4,5].map(s=><span key={s} style={{color:s<=Math.round(item.rating)?"#F0A04B":"#DDD",fontSize:13}}>★</span>)}
                  <span style={{color:"#666",fontSize:11}}>({item.reviews})</span>
                </div>
                <div style={{marginBottom:12}}>
                  {item.orig&&<div style={{color:"#AAA",fontSize:11,textDecoration:"line-through",marginBottom:1}}>${item.orig}</div>}
                  <div style={{display:"flex",alignItems:"baseline",gap:2}}>
                    <span style={{fontSize:13,fontWeight:700,color:"#1A1A1A"}}>$</span>
                    <span style={{fontSize:28,fontWeight:800,color:"#1A1A1A",lineHeight:1}}>{item.price}</span>
                  </div>
                  <div style={{color:"#888",fontSize:11,marginTop:2}}>Pay via M-Pesa · 30 min confirmation</div>
                </div>
                <button style={{width:"100%",background:C.gold,color:"#080808",border:"none",borderRadius:8,padding:"11px",fontSize:13,fontWeight:700,fontFamily:C.sans}}>Hire Now</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── HOW IT WORKS ──────────────────────────────────────────────
function HowItWorks(){
  const steps=[
    {n:"01",icon:"🔍",title:"Browse Listings",desc:"Explore hundreds of young seller listings across Art, Tech, Fashion, Marketing, Music, Wellness and more. Filter by category, featured or verified sellers.",color:C.gold},
    {n:"02",icon:"💬",title:"Message the Seller",desc:"Use YouthMarket's built-in messaging to chat directly with sellers. Discuss your project, timeline, and any special requirements before paying.",color:C.teal},
    {n:"03",icon:"💳",title:"Pay Securely",desc:"Pay via M-Pesa to 0769366863. Card payments coming very soon. Funds held safely in escrow until delivery.",color:C.purple},
    {n:"04",icon:"🔒",title:"Escrow Protection",desc:"Your payment is held safely until you approve the delivery. No money is released until you are fully satisfied with what you receive.",color:C.gold},
    {n:"05",icon:"📦",title:"Receive Your Order",desc:"The seller delivers your digital file, physical product, or completes your service via Zoom or email. Review everything carefully at your own pace.",color:C.teal},
    {n:"06",icon:"✅",title:"Approve & Release",desc:"Click approve to release payment to the seller. Not happy? Raise a dispute and our team resolves it within 24 hours.",color:C.red},
  ];
  return(
    <div style={{paddingTop:100,minHeight:"100vh",padding:"100px 32px 80px",maxWidth:1240,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:80}}>
        <Label>Simple & Transparent</Label>
        <h1 style={{fontFamily:C.font,fontSize:"clamp(36px,5vw,64px)",fontWeight:900,marginBottom:18,letterSpacing:"-1px"}}>
          How <span style={{color:C.gold}}>YouthMarket</span> Works
        </h1>
        <p style={{color:C.muted,fontSize:16,maxWidth:560,margin:"0 auto",lineHeight:1.85}}>
          From browsing to delivery — our process is simple, secure and transparent for both buyers and sellers worldwide.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:24,marginBottom:60}}>
        {steps.map((s,i)=>(
          <div key={i} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:20,padding:32,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-8,right:-8,fontFamily:C.font,fontSize:86,fontWeight:900,color:`${s.color}10`,lineHeight:1}}>{s.n}</div>
            <div style={{width:52,height:52,background:`${s.color}18`,border:`1px solid ${s.color}44`,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:16}}>{s.icon}</div>
            <div style={{fontFamily:C.font,fontSize:22,fontWeight:700,marginBottom:10,color:s.color}}>{s.title}</div>
            <p style={{color:C.muted,fontSize:14,lineHeight:1.75}}>{s.desc}</p>
          </div>
        ))}
      </div>
      {/* Payment section */}
      <div style={{background:"linear-gradient(135deg,#0A1208,#080808)",border:`1px solid ${C.teal}`,borderRadius:20,padding:38}}>
        <div style={{fontFamily:C.font,fontSize:28,fontWeight:700,marginBottom:10,color:C.teal}}>💳 Payment Options</div>
        <p style={{color:C.muted,fontSize:14,marginBottom:28,lineHeight:1.7}}>YouthMarket currently accepts M-Pesa payments and is integrating international card payments very soon.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
          <div style={{background:"#25D36610",border:"1px solid #25D36633",borderRadius:14,padding:22}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <span style={{fontSize:24}}>📱</span>
              <div>
                <div style={{fontFamily:C.sans,fontWeight:700,fontSize:14,color:"#25D366"}}>M-Pesa</div>
                <div style={{background:"#25D36620",color:"#25D366",borderRadius:20,padding:"1px 10px",fontSize:10,fontWeight:700,display:"inline-block"}}>✅ AVAILABLE NOW</div>
              </div>
            </div>
            {[["Number","0769366863"],["WhatsApp","0769366863"],["Email","youthmarket.global@gmail.com"],["Confirmation","Within 30 minutes"]].map(([l,v])=>(
              <div key={l} style={{marginBottom:8}}>
                <div style={{color:C.muted,fontSize:10,letterSpacing:1,textTransform:"uppercase"}}>{l}</div>
                <div style={{fontFamily:C.sans,fontWeight:600,fontSize:13,color:"#25D366"}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{background:`${C.gold}08`,border:`1px solid ${C.gold}33`,borderRadius:14,padding:22}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <span style={{fontSize:24}}>💳</span>
              <div>
                <div style={{fontFamily:C.sans,fontWeight:700,fontSize:14,color:C.gold}}>Card Payments — Coming Soon</div>
                <div style={{background:`${C.gold}20`,color:C.gold,borderRadius:20,padding:"1px 10px",fontSize:10,fontWeight:700,display:"inline-block"}}>🔜 COMING SOON</div>
              </div>
            </div>
            {[["Accepts","Visa · Mastercard · Bank Transfer"],["Licensed by","Bank of Tanzania"],["Countries","200+ worldwide"],["Processing","Instant automatic"]].map(([l,v])=>(
              <div key={l} style={{marginBottom:8}}>
                <div style={{color:C.muted,fontSize:10,letterSpacing:1,textTransform:"uppercase"}}>{l}</div>
                <div style={{fontFamily:C.sans,fontWeight:600,fontSize:13,color:C.gold}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SELLERS PAGE ──────────────────────────────────────────────
function Sellers(){
  const perks=[
    {icon:"💰",title:"Earn Real Money",desc:"Get paid in USD for your skills. Keep 80% of every order. Receive payments via M-Pesa or bank transfer directly to your account."},
    {icon:"🌍",title:"Global Buyers",desc:"Access wealthy buyers from USA, Europe, UAE, and worldwide who are actively searching for your exact talent right now."},
    {icon:"🚀",title:"Boost Your Profile",desc:"Get Featured ($49/mo), Promoted ($15/week) or Verified ($20 once) to attract more buyers and grow your income faster."},
    {icon:"📊",title:"Seller Dashboard",desc:"Track your orders, earnings, messages and ratings all in one beautiful powerful dashboard designed for young creators."},
    {icon:"🤖",title:"AI Support",desc:"YouthBot helps sellers with pricing, delivery tips, dispute resolution and business advice — 24 hours a day, 7 days a week."},
    {icon:"🏆",title:"Build Your Brand",desc:"Build your global portfolio and reputation on a platform that truly believes in the power of young talent worldwide."},
  ];
  return(
    <div style={{paddingTop:100,minHeight:"100vh"}}>
      <div style={{padding:"80px 32px",maxWidth:1240,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
        <div>
          <Label>For Young Creators Worldwide 13–25</Label>
          <h1 style={{fontFamily:C.font,fontSize:"clamp(36px,5vw,64px)",fontWeight:900,marginBottom:22,letterSpacing:"-1px"}}>
            Turn Your<br/><span style={{color:C.gold}}>Talent</span> Into<br/>Real Income
          </h1>
          <p style={{color:C.muted,fontSize:16,lineHeight:1.85,marginBottom:38}}>
            Join 2,400+ young creators from Nigeria, Ghana, Kenya, Brazil, India, USA and 180+ countries who are earning real money on YouthMarket. Create your free listing in minutes.
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:44}}>
            <Btn onClick={()=>window.open(APP_URL,"_blank")} size="lg">Start Selling Free →</Btn>
            <Btn outline onClick={()=>window.open(APP_URL,"_blank")} size="lg">See Success Stories</Btn>
          </div>
          <div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:14,padding:22}}>
            <div style={{fontFamily:C.sans,fontSize:11,color:C.muted,marginBottom:14,letterSpacing:2,textTransform:"uppercase"}}>Your Earnings Per Order</div>
            <div style={{display:"flex",gap:28}}>
              {[["$100 order","$80 to you"],["$350 order","$280 to you"],["$1,000 order","$800 to you"]].map(([o,e])=>(
                <div key={o}>
                  <div style={{color:C.muted,fontSize:11,marginBottom:3}}>{o}</div>
                  <div style={{fontFamily:C.font,fontSize:20,fontWeight:700,color:C.gold}}>{e}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {[{e:"🎨",n:"Zara M.",s:"Portrait Artist",l:"Lagos",p:"$4,200 earned"},{e:"💻",n:"Kwame A.",s:"Web Designer",l:"Accra",p:"$8,400 earned"},{e:"🎵",n:"Elijah W.",s:"Music Producer",l:"Atlanta",p:"$3,500 earned"},{e:"💎",n:"Amara T.",s:"Jeweler",l:"Nairobi",p:"$2,800 earned"}].map((s,i)=>(
            <div key={i} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:14,padding:20,transform:i%2===1?"translateY(22px)":"none"}}>
              <div style={{fontSize:34,marginBottom:10}}>{s.e}</div>
              <div style={{fontFamily:C.font,fontSize:16,fontWeight:700}}>{s.n}</div>
              <div style={{color:C.muted,fontSize:11,marginBottom:6}}>{s.s} · {s.l}</div>
              <div style={{color:C.gold,fontSize:13,fontWeight:600}}>{s.p}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"80px 32px",background:C.s1,borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1240,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <h2 style={{fontFamily:C.font,fontSize:"clamp(28px,4vw,50px)",fontWeight:800,letterSpacing:"-1px"}}>Why Sell on <span style={{color:C.gold}}>YouthMarket</span></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:22}}>
            {perks.map((p,i)=>(
              <div key={i} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:16,padding:26}}>
                <div style={{fontSize:34,marginBottom:14}}>{p.icon}</div>
                <div style={{fontFamily:C.font,fontSize:19,fontWeight:700,marginBottom:10}}>{p.title}</div>
                <p style={{color:C.muted,fontSize:14,lineHeight:1.75}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── BUYERS PAGE ───────────────────────────────────────────────
function Buyers(){
  return(
    <div style={{paddingTop:100,minHeight:"100vh",padding:"100px 32px 80px",maxWidth:1240,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:64}}>
        <Label>For Buyers Worldwide</Label>
        <h1 style={{fontFamily:C.font,fontSize:"clamp(36px,5vw,64px)",fontWeight:900,marginBottom:18,letterSpacing:"-1px"}}>
          Discover <span style={{color:C.gold}}>World-Class</span><br/>Young Talent
        </h1>
        <p style={{color:C.muted,fontSize:16,maxWidth:560,margin:"0 auto",lineHeight:1.85}}>
          Access extraordinary young creators you cannot find anywhere else. Premium quality at incredible value. Save up to 70% compared to traditional agencies worldwide.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:22,marginBottom:60}}>
        {[
          {icon:"🎯",title:"Curated Global Talent",desc:"Every seller is reviewed and rated. Featured and Verified badges show you the very best young creators from around the world."},
          {icon:"🔒",title:"Escrow Protection",desc:"Your payment is held safely until you approve delivery. Money only releases when you are 100% satisfied with the work."},
          {icon:"👑",title:"VIP Membership",desc:"Upgrade to VIP for $99/month. Get exclusive access, priority 2-hour responses, and the best talent before anyone else."},
          {icon:"💬",title:"Direct Messaging",desc:"Chat directly with sellers. Discuss your project, see their portfolio, and get exactly what you need."},
          {icon:"⚡",title:"Fast Global Delivery",desc:"Digital files, physical products, and services delivered worldwide. Most orders completed in 3–7 days."},
          {icon:"🌍",title:"180+ Countries",desc:"Access talent from Nigeria, Ghana, Kenya, Brazil, India, Spain, USA and 180+ countries worldwide."},
        ].map((b,i)=>(
          <div key={i} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:16,padding:26}}>
            <div style={{fontSize:34,marginBottom:14}}>{b.icon}</div>
            <div style={{fontFamily:C.font,fontSize:19,fontWeight:700,marginBottom:10}}>{b.title}</div>
            <p style={{color:C.muted,fontSize:14,lineHeight:1.75}}>{b.desc}</p>
          </div>
        ))}
      </div>
      <div style={{background:"linear-gradient(135deg,#1A1206,#080808)",border:"2px solid #FFD70055",borderRadius:22,padding:44,textAlign:"center"}}>
        <div style={{fontFamily:C.font,fontSize:38,fontWeight:900,color:"#FFD700",marginBottom:8}}>👑 VIP Buyer Membership</div>
        <div style={{fontFamily:C.font,fontSize:56,fontWeight:900,color:"#FFD700",marginBottom:8}}>$99<span style={{fontSize:22,color:C.muted}}>/month</span></div>
        <p style={{color:C.muted,fontSize:16,maxWidth:500,margin:"0 auto 32px",lineHeight:1.85}}>Exclusive access to premium sellers, priority 2-hour responses, unlimited messaging, and one free featured order per month.</p>
        <Btn size="lg" onClick={()=>window.open(APP_URL,"_blank")} style={{background:"#FFD700",fontSize:16}}>Unlock VIP Access →</Btn>
      </div>
    </div>
  );
}

// ── CONTACT PAGE ──────────────────────────────────────────────
function Contact(){
  const [form,setForm]=useState({name:"",email:"",subject:"",message:""});
  const [sent,setSent]=useState(false);
  return(
    <div style={{paddingTop:100,minHeight:"100vh",padding:"100px 32px 80px",maxWidth:1000,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:64}}>
        <Label>Get In Touch</Label>
        <h1 style={{fontFamily:C.font,fontSize:"clamp(36px,5vw,64px)",fontWeight:900,marginBottom:16,letterSpacing:"-1px"}}>
          Contact <span style={{color:C.gold}}>YouthMarket</span>
        </h1>
        <p style={{color:C.muted,fontSize:16,lineHeight:1.85}}>We respond within 24 hours. Always.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52}}>
        <div>
          <div style={{fontFamily:C.font,fontSize:24,fontWeight:700,marginBottom:30}}>Reach Us Directly</div>
          {[{icon:"📱",label:"M-Pesa / WhatsApp",value:"0769366863",color:C.teal},{icon:"📧",label:"Email",value:"youthmarket.global@gmail.com",color:C.gold},{icon:"🌐",label:"Website",value:"www.youthmarket.com",color:C.purple},{icon:"🌍",label:"Platform",value:"Global Youth Marketplace",color:C.red}].map((c,i)=>(
            <div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:26}}>
              <div style={{width:46,height:46,background:`${c.color}18`,border:`1px solid ${c.color}44`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{c.icon}</div>
              <div>
                <div style={{color:C.muted,fontSize:11,letterSpacing:2,textTransform:"uppercase",marginBottom:3}}>{c.label}</div>
                <div style={{fontFamily:C.sans,fontWeight:600,fontSize:15,color:c.color}}>{c.value}</div>
              </div>
            </div>
          ))}
          <div style={{background:"#0A1F0A",border:`1px solid ${C.green}33`,borderRadius:14,padding:22,marginTop:22}}>
            <div style={{fontFamily:C.sans,fontWeight:600,fontSize:14,color:C.green,marginBottom:8}}>💬 WhatsApp Support</div>
            <p style={{color:C.muted,fontSize:13,lineHeight:1.75,marginBottom:16}}>Fastest response via WhatsApp. We reply within 30 minutes during business hours.</p>
            <a href="https://wa.me/255769366863?text=Hi YouthMarket! I need help with..." target="_blank" rel="noreferrer"
              style={{display:"inline-block",background:C.green,color:"#fff",borderRadius:8,padding:"10px 20px",fontFamily:C.sans,fontWeight:600,fontSize:13}}>
              💬 Chat on WhatsApp →
            </a>
          </div>
        </div>
        <div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:20,padding:34}}>
          {sent?(
            <div style={{textAlign:"center",padding:"44px 0"}}>
              <div style={{fontSize:60,marginBottom:18}}>✅</div>
              <div style={{fontFamily:C.font,fontSize:26,fontWeight:700,marginBottom:10}}>Message Sent!</div>
              <p style={{color:C.muted,fontSize:14}}>We will reply within 24 hours. Thank you!</p>
            </div>
          ):(
            <>
              <div style={{fontFamily:C.font,fontSize:22,fontWeight:700,marginBottom:26}}>Send Us a Message</div>
              {[["name","Your Full Name","text"],["email","Email Address","email"],["subject","Subject","text"]].map(([k,ph,t])=>(
                <div key={k} style={{marginBottom:14}}>
                  <input type={t} placeholder={ph} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}
                    style={{width:"100%",background:C.s2,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 15px",color:C.text,fontFamily:C.sans,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                </div>
              ))}
              <textarea placeholder="Your message..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={4}
                style={{width:"100%",background:C.s2,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 15px",color:C.text,fontFamily:C.sans,fontSize:13,outline:"none",boxSizing:"border-box",resize:"vertical",marginBottom:22}}/>
              <Btn onClick={()=>setSent(true)} style={{width:"100%",padding:"14px"}}>Send Message →</Btn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── PRIVACY POLICY ────────────────────────────────────────────
function Privacy(){
  const sections=[
    {t:"1. Introduction",c:"YouthMarket is committed to protecting your privacy globally. This Privacy Policy explains how we collect, use, store and protect your personal information when you use YouthMarket. By using YouthMarket you consent to the practices described in this policy. This policy complies with the laws of the United Republic of Tanzania and international data protection standards required for secure payment processing."},
    {t:"2. Who We Are",c:"YouthMarket is a global online marketplace operated by an individual entrepreneur. We connect young creators aged 13–25 worldwide with buyers globally. Our platform is currently operating as a sole proprietorship in the process of full business registration. Contact: youthmarket.global@gmail.com · WhatsApp: +255769366863"},
    {t:"3. Information We Collect",c:"We collect: name, email, phone, date of birth when registering; profile photo, bio, location; payment details for payouts; messages on the platform; listings you post; government ID for seller verification. We also automatically collect device type, IP address, pages viewed, transaction history, and usage data."},
    {t:"4. How We Use Your Information",c:"To create and manage your account, process payments via M-Pesa, connect buyers with sellers, send order confirmations, provide customer support, resolve disputes, improve the platform, prevent fraud, comply with Tanzanian law, and send marketing emails where you have given consent."},
    {t:"5. Payment Processing",c:"Payments are currently processed via M-Pesa mobile money to 0769366863. YouthMarket is integrating Pesapal for card payments for Visa and Mastercard payments very soon. Our payment system complies with international security standards."},
    {t:"6. How We Share Your Information",c:"YouthMarket does not sell your personal information. We share data only with our payment providers for payment processing, between buyers and sellers involved in a specific transaction, and with government authorities when required by Tanzanian law."},
    {t:"7. Data Storage and Security",c:"Your data is stored securely using Supabase with AES-256 encryption and bank-grade security. We retain your data while your account is active. Upon deletion we remove your data within 30 days. We will notify you promptly of any data breach."},
    {t:"8. Your Rights",c:"You have the right to access, correct or delete your personal data. You may withdraw consent to marketing, request data portability, and object to processing. Contact youthmarket.global@gmail.com within 30 days for any request."},
    {t:"9. Children's Privacy",c:"YouthMarket allows sellers aged 13–17 with verified parental consent. We do not collect information from children under 13. Parents may contact us to request deletion of a minor's data at any time."},
    {t:"10. Changes to This Policy",c:"We may update this Privacy Policy at any time. We will notify you of significant changes by email or in-app notification at least 14 days before changes take effect."},
    {t:"11. Contact Us",c:"Email: youthmarket.global@gmail.com · WhatsApp: +255769366863 · Website: www.youthmarket.com · Response: Within 24 hours"},
  ];
  return(
    <div style={{paddingTop:100,minHeight:"100vh",padding:"100px 32px 80px",maxWidth:860,margin:"0 auto"}}>
      <div style={{marginBottom:50}}>
        <Label>Legal</Label>
        <h1 style={{fontFamily:C.font,fontSize:"clamp(36px,5vw,64px)",fontWeight:900,marginBottom:14,letterSpacing:"-1px"}}>Privacy <span style={{color:C.gold}}>Policy</span></h1>
        <p style={{color:C.muted,fontSize:14,fontFamily:C.sans}}>Effective Date: January 1, 2026 · Last Updated: May 2026</p>
      </div>
      <div style={{background:"#001A18",border:`1px solid ${C.teal}`,borderRadius:14,padding:22,marginBottom:44,display:"flex",gap:14}}>
        <span style={{fontSize:22,flexShrink:0}}>🏦</span>
        <div>
          <div style={{fontFamily:C.sans,fontWeight:700,fontSize:14,color:C.teal,marginBottom:4}}>Secure Payment Partner</div>
          <div style={{color:C.muted,fontFamily:C.sans,fontSize:13,lineHeight:1.75}}>YouthMarket processes all payments securely. M-Pesa payments are available now. International card payments are coming very soon.</div>
        </div>
      </div>
      {sections.map((s,i)=>(
        <div key={i} style={{borderBottom:`1px solid ${C.border}`,padding:"28px 0"}}>
          <div style={{fontFamily:C.font,fontSize:20,fontWeight:700,color:C.gold,marginBottom:12}}>{s.t}</div>
          <p style={{color:C.muted,fontFamily:C.sans,fontSize:14,lineHeight:1.85}}>{s.c}</p>
        </div>
      ))}
      <div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:16,padding:30,marginTop:44}}>
        <div style={{fontFamily:C.font,fontSize:22,fontWeight:700,marginBottom:18}}>Privacy Questions?</div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href="mailto:youthmarket.global@gmail.com" style={{background:C.gold,color:"#080808",borderRadius:8,padding:"10px 22px",fontFamily:C.sans,fontWeight:600,fontSize:13,textDecoration:"none"}}>📧 Email Us</a>
          <a href="https://wa.me/255769366863" target="_blank" rel="noreferrer" style={{background:C.green,color:"#fff",borderRadius:8,padding:"10px 22px",fontFamily:C.sans,fontWeight:600,fontSize:13,textDecoration:"none"}}>💬 WhatsApp</a>
        </div>
      </div>
    </div>
  );
}

// ── TERMS & CONDITIONS ────────────────────────────────────────
function Terms(){
  const sections=[
    {t:"1. Introduction and Acceptance",c:"Welcome to YouthMarket. These Terms and Conditions govern your use of the YouthMarket global marketplace platform. By creating an account or using YouthMarket you confirm that you have read and agreed to these Terms. YouthMarket is owned and operated by an individual entrepreneur, currently a sole proprietorship in the process of full business registration, operating under the laws of the United Republic of Tanzania. Contact: youthmarket.global@gmail.com · WhatsApp: +255769366863"},
    {t:"2. About YouthMarket",c:"YouthMarket is a global online marketplace connecting young creators aged 13–25 with buyers worldwide. YouthMarket acts solely as an intermediary platform. We provide the technology, process payments via M-Pesa, take a 20% commission, provide dispute resolution, and offer AI-powered support."},
    {t:"3. User Eligibility",c:"Buyers: Age 18 or older. Under 18 requires parental consent. Sellers: Age 13–25. Ages 13–17 require verified parental or guardian consent. All users must provide accurate information."},
    {t:"4. Payments and Commission",c:"YouthMarket charges 20% commission on every completed transaction. Sellers keep 80%. Current payment: M-Pesa to 0769366863. Upcoming: International card payments via Visa and Mastercard coming very soon. Funds held in escrow until buyer approves delivery. Auto-release after 7 days of no buyer response. All prices in USD."},
    {t:"5. Refund Policy",c:"Refunds available when: seller fails to deliver on time, delivered work differs significantly from description, or dispute resolved in buyer's favour. Refunds NOT available for: change of mind after seller accepts, buyer-approved deliveries, or downloaded digital files."},
    {t:"6. Seller Obligations",c:"Accurate listing descriptions, timely professional delivery, professional buyer communication, no personal contacts shared outside platform, only legal products and services, no counterfeit items, acceptance of 20% commission."},
    {t:"7. Buyer Obligations",c:"Accurate shipping info, respectful communication, review and approve/dispute within 7 days, no off-platform transactions, no illegal service requests."},
    {t:"8. Prohibited Activities",c:"Fraud, deceptive behaviour, harassment, illegal products, fake accounts, off-platform transactions to avoid fees, false reviews, malware uploads, money laundering, and violations of Tanzanian law."},
    {t:"9. Dispute Resolution",c:"Disputes may be raised via youthmarket.global@gmail.com or WhatsApp +255769366863. Reviewed within 24 hours. YouthMarket's decision is final and binding."},
    {t:"10. Intellectual Property",c:"Sellers retain full ownership of original work. By listing, sellers grant YouthMarket a non-exclusive marketing licence. Buyers receive agreed usage rights."},
    {t:"11. Limitation of Liability",c:"YouthMarket is not responsible for listing quality, safety or accuracy. Total liability shall not exceed the transaction amount. No liability for indirect or consequential damages."},
    {t:"12. Changes to Terms",c:"Terms may be updated at any time. Notification via email or in-app. Continued use constitutes acceptance."},
    {t:"13. Contact",c:"Email: youthmarket.global@gmail.com · WhatsApp: +255769366863 · Website: www.youthmarket.com · M-Pesa: 0769366863 · Response: Within 24 hours · Country: United Republic of Tanzania"},
  ];
  return(
    <div style={{paddingTop:100,minHeight:"100vh",padding:"100px 32px 80px",maxWidth:860,margin:"0 auto"}}>
      <div style={{marginBottom:50}}>
        <Label>Legal</Label>
        <h1 style={{fontFamily:C.font,fontSize:"clamp(36px,5vw,64px)",fontWeight:900,marginBottom:14,letterSpacing:"-1px"}}>Terms & <span style={{color:C.gold}}>Conditions</span></h1>
        <p style={{color:C.muted,fontSize:14,fontFamily:C.sans}}>Effective Date: January 1, 2026 · Last Updated: May 2026</p>
      </div>
      <div style={{background:"#001A18",border:`1px solid ${C.teal}`,borderRadius:14,padding:22,marginBottom:44,display:"flex",gap:14}}>
        <span style={{fontSize:22,flexShrink:0}}>✅</span>
        <div>
          <div style={{fontFamily:C.sans,fontWeight:700,fontSize:14,color:C.teal,marginBottom:4}}>Payment Compliance</div>
          <div style={{color:C.muted,fontFamily:C.sans,fontSize:13,lineHeight:1.75}}>These Terms and Conditions include all required sections: payment disclosure, refund policy, user rights, and complaint handling.</div>
        </div>
      </div>
      {sections.map((s,i)=>(
        <div key={i} style={{borderBottom:`1px solid ${C.border}`,padding:"28px 0"}}>
          <div style={{fontFamily:C.font,fontSize:20,fontWeight:700,color:C.gold,marginBottom:12}}>{s.t}</div>
          <p style={{color:C.muted,fontFamily:C.sans,fontSize:14,lineHeight:1.85}}>{s.c}</p>
        </div>
      ))}
      <div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:16,padding:30,marginTop:44}}>
        <div style={{fontFamily:C.font,fontSize:22,fontWeight:700,marginBottom:18}}>Questions About These Terms?</div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href="mailto:youthmarket.global@gmail.com" style={{background:C.gold,color:"#080808",borderRadius:8,padding:"10px 22px",fontFamily:C.sans,fontWeight:600,fontSize:13,textDecoration:"none"}}>📧 Email Us</a>
          <a href="https://wa.me/255769366863" target="_blank" rel="noreferrer" style={{background:C.green,color:"#fff",borderRadius:8,padding:"10px 22px",fontFamily:C.sans,fontWeight:600,fontSize:13,textDecoration:"none"}}>💬 WhatsApp</a>
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer({setPage}){
  const cols=[
    {title:"Platform",links:[{l:"Marketplace",p:"marketplace"},{l:"How It Works",p:"how-it-works"},{l:"For Sellers",p:"sellers"},{l:"For Buyers",p:"buyers"},{l:"VIP Membership",p:"buyers"}]},
    {title:"Support",links:[{l:"Help Center",p:"contact"},{l:"Contact Us",p:"contact"},{l:"WhatsApp Chat",p:"contact"},{l:"Dispute Resolution",p:"terms"},{l:"AI Assistant",p:"home"}]},
    {title:"Legal",links:[{l:"Terms & Conditions",p:"terms"},{l:"Privacy Policy",p:"privacy"},{l:"Refund Policy",p:"terms"},{l:"Cookie Policy",p:"privacy"}]},
  ];
  return(
    <footer style={{background:C.s1,borderTop:`1px solid ${C.border}`,padding:"64px 32px 32px"}}>
      <div style={{maxWidth:1240,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:52,marginBottom:52}}>
          <div>
            <div style={{marginBottom:18}}><Logo w={140}/></div>
            <p style={{color:C.muted,fontSize:14,lineHeight:1.85,maxWidth:290,marginBottom:22}}>
              The Global Youth Marketplace. Connecting young creators aged 13–25 with wealthy buyers worldwide. Empowering Youth. Building Futures.
            </p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["📱 TikTok","📸 Instagram","▶️ YouTube","💼 LinkedIn","🐦 Twitter"].map(s=>(
                <div key={s} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 12px",fontSize:11,fontFamily:C.sans,color:C.muted,cursor:"pointer"}}>{s}</div>
              ))}
            </div>
          </div>
          {cols.map((col,i)=>(
            <div key={i}>
              <div style={{fontFamily:C.font,fontSize:17,fontWeight:700,marginBottom:18}}>{col.title}</div>
              {col.links.map(({l,p})=>(
                <div key={l} onClick={()=>setPage(p)} style={{color:C.muted,fontSize:13,marginBottom:12,cursor:"pointer",fontFamily:C.sans,transition:"color .15s"}}
                  onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.muted}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:26,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
          <div style={{color:C.muted,fontSize:12,fontFamily:C.sans}}>© 2026 YouthMarket · The Global Youth Marketplace · All rights reserved</div>
          <div style={{display:"flex",gap:16}}>
            <span onClick={()=>setPage("terms")} style={{color:C.muted,fontSize:12,fontFamily:C.sans,cursor:"pointer"}} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.muted}>Terms</span>
            <span onClick={()=>setPage("privacy")} style={{color:C.muted,fontSize:12,fontFamily:C.sans,cursor:"pointer"}} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.muted}>Privacy</span>
            <span style={{color:C.muted,fontSize:12,fontFamily:C.sans}}>youthmarket.global@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState("home");
  useEffect(()=>{window.scrollTo(0,0);},[page]);
  const pages={
    home:<Home setPage={setPage}/>,
    marketplace:<Marketplace setPage={setPage}/>,
    "how-it-works":<HowItWorks/>,
    sellers:<Sellers/>,
    buyers:<Buyers/>,
    contact:<Contact/>,
    privacy:<Privacy/>,
    terms:<Terms/>,
  };
  return(
    <div style={{background:C.bg,minHeight:"100vh",color:C.text}}>
      <GS/>
      <Navbar page={page} setPage={setPage}/>
      <main>{pages[page]||<Home setPage={setPage}/>}</main>
      <Footer setPage={setPage}/>
    </div>
  );
}
