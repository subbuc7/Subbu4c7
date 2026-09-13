"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import CinematicBackground from "./CinematicBackground";

const projects = [
  ["01", "RailConnect AI", "Smart Indian Railway Journey Planner", "Intelligent direct + connecting route planning with interchange detection, layover calculation, connection safety and fastest/safest/cheapest ranking.", ["React","TypeScript","FastAPI","PostgreSQL","Redis"]],
  ["02", "Orangee", "Caller Identification & Protection App", "A mobile concept for caller identification and helping users recognize potentially suspicious or unwanted calls.", ["Android","Kotlin","Java"]],
  ["03", "WorkLife", "Task Management Application", "A productivity application for organizing tasks, priorities and daily work with a clean interface.", ["Productivity","Task Management","Clean UI"]],
  ["04", "Love Video", "Modern Media Player", "A VLC-style media player concept with a modern interface and smooth playback.", ["Android","Kotlin","ExoPlayer"]],
  ["05", "LoveBeat", "Music Application", "An immersive music-player concept focused on attractive UI and smooth animations.", ["Music","UI","Animation"]],
  ["06", "Sparsha", "AI Voice Assistant", "An AI-powered voice-assistant concept for natural voice interaction and intelligent responses.", ["AI","Voice","Automation"]],
  ["07", "Ephemeral", "Privacy-Focused Application", "A privacy-oriented concept focused on temporary interactions and reducing unnecessary persistence of data.", ["Privacy","Security","Minimalism"]]
] as const;

const skillGroups = {
  Frontend: ["React","TypeScript","JavaScript","HTML5","CSS3","Tailwind CSS"],
  Backend: ["Python","FastAPI","REST APIs"],
  Mobile: ["Java","Kotlin","Flutter","Android Development"],
  "Database & Cloud": ["PostgreSQL","Supabase"],
  Tools: ["Git","GitHub","Android Studio","VS Code","Power BI"]
};

export default function Portfolio() {
  const [active, setActive] = useState("HOME");
  const [menu, setMenu] = useState(false);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx,{stiffness:180,damping:22}); const sy = useSpring(my,{stiffness:180,damping:22});

  useEffect(() => {
    const sections = ["home","about","skills","projects","journey","contact"];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id.toUpperCase()==="HOME"?"HOME":visible.target.id.toUpperCase());
    }, { rootMargin:"-35% 0px -55% 0px", threshold:[0,.25,.5,.75] });
    sections.forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el)});
    return ()=>observer.disconnect();
  }, []);

  const nav = ["HOME","ABOUT","SKILLS","PROJECTS","JOURNEY","CONTACT"];
  const scrollTo = (id:string) => { document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"}); setMenu(false); };

  return (
    <div className="site">
      <CinematicBackground />
      <div className="top-progress" />
      <header className="nav">
        <button className="brand" onClick={()=>scrollTo("home")}>Subramanyam<span>.</span></button>
        <nav className={menu?"nav-links open":"nav-links"}>
          {nav.map(n=><button key={n} className={active===n?"active":""} onClick={()=>scrollTo(n)}>{n}</button>)}
        </nav>
        <button className="menu-button" onClick={()=>setMenu(v=>!v)} aria-label="Menu">{menu?"×":"☰"}</button>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-inner">
            <motion.div initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
              <div className="eyebrow">01 / SOFTWARE DEVELOPER & CREATIVE TECHNOLOGIST</div>
              <h1>BUILDING IDEAS <span>INTO EXPERIENCES<span className="red">.</span></span></h1>
            </motion.div>
            <motion.div className="hero-copy" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:.25,duration:.8}}>
              <p>I build modern web and mobile experiences with a focus on clean UI, useful products, and innovative technology.</p>
              <div className="mono">◉ RAJAMPETA, ANDHRA PRADESH, INDIA</div>
              <div className="actions"><button className="cta primary" onClick={()=>scrollTo("projects")}>VIEW MY PROJECTS →</button><button className="cta" onClick={()=>scrollTo("contact")}>CONTACT ME</button></div>
            </motion.div>
          </div>
          <div className="watermark">SUBRAMANYAM</div>
          <motion.div className="scroll-hint" style={{x:sx,y:sy}}>MOVE / SCROLL</motion.div>
        </section>

        <section id="about" className="section"><div className="container">
          <div className="kicker">02 / IDENTITY</div><h2>ABOUT ME</h2>
          <div className="about-grid">
            <div className="glass terminal"><div className="terminal-dots"><i/><i/><i/></div><pre>{`const developer = {
  name: "Subramanyam Reddy",
  role: "Software Developer",
  focus: ["Web","Mobile","AI","UI/UX"],
  location: "Rajampeta, India"
};`}</pre></div>
            <div className="glass copy"><p>Hi, I'm Subramanyam. I'm a technology enthusiast passionate about creating modern digital experiences.</p><p>I enjoy turning ideas into functional web and mobile applications, experimenting with new technologies, and designing interfaces that are both visually appealing and practical.</p><p>My interests span frontend development, full-stack applications, mobile development, AI-powered experiences, and UI/UX.</p><p>I like building projects from the initial idea and interface design to development, integration, and deployment.</p></div>
          </div>
          <div className="focus-grid">{["Web Experiences","Mobile Applications","AI Experiences","UI & Interaction","Product Ideas"].map((x,i)=><motion.div whileHover={{y:-8}} className="glass mini" key={x}><span>0{i+1}</span><h3>{x}</h3><p>{["Modern responsive websites and web applications.","Android and cross-platform applications.","Voice assistants, intelligent interfaces and AI-powered features.","Smooth animations, glassmorphism, micro-interactions and polished interfaces.","Turning ideas into working digital products."][i]}</p></motion.div>)}</div>
        </div></section>

        <section id="skills" className="section"><div className="container">
          <div className="kicker">03 / TOOLKIT</div><h2>TECHNICAL SKILLS</h2>
          <div className="skills-grid">{Object.entries(skillGroups).map(([name,items])=><div className="glass skill" key={name}><h3>{name}</h3><div className="chips">{items.map(x=><span key={x}>{x}</span>)}</div></div>)}</div>
        </div></section>

        <section id="projects" className="section"><div className="container">
          <div className="kicker">04 / SELECTED WORK</div><h2>FEATURED PROJECTS</h2>
          <div className="projects-grid">{projects.map(([num,name,sub,desc,stack])=><motion.article whileHover={{y:-8}} className="glass project" key={name}><div className="project-num">{num}</div><h3>{name}</h3><div className="sub">{sub}</div><p>{desc}</p><div className="chips">{stack.map(x=><span key={x}>{x}</span>)}</div></motion.article>)}</div>
        </div></section>

        <section id="journey" className="section"><div className="container">
          <div className="kicker">05 / JOURNEY</div><h2>EDUCATION</h2>
          <div className="glass journey"><div className="journey-year">2024</div><div><div className="node" /><h3>Bachelor of Technology (B.Tech)</h3><p>Electronics & Communication Engineering (ECE)<br/>JNTUA University<br/>Completed: 2024</p></div></div>
          <div className="glass focus"><div className="status"><i/> CURRENT FOCUS</div><p>Building modern software products that combine technology, design and real-world usefulness.</p></div>
        </div></section>

        <section id="contact" className="section contact"><div className="container">
          <div className="kicker">06 / CONNECT</div><h2>LET'S BUILD<br/>SOMETHING.</h2>
          <div className="contact-grid"><div className="glass contact-intro"><p>Have an idea, project or opportunity? Reach out and let's turn it into a useful digital experience.</p><div className="actions"><a className="cta primary" href="mailto:reddysubramanyam.h@gmail.com">EMAIL ME →</a><a className="cta" href="tel:9573021997">CALL</a></div></div>
          <div className="glass details">{[["NAME","Subramanyam Reddy"],["PHONE","9573021997"],["EMAIL","reddysubramanyam.h@gmail.com"],["GITHUB","github.com/subbuc7"],["LOCATION","Rajampeta, Andhra Pradesh, India"]].map(([k,v])=><div className="detail" key={k}><small>{k}</small>{k==="EMAIL"?<a href="mailto:reddysubramanyam.h@gmail.com">{v}</a>:k==="PHONE"?<a href="tel:9573021997">{v}</a>:k==="GITHUB"?<a href="https://github.com/subbuc7" target="_blank">{v}</a>:<b>{v}</b>}</div>)}</div></div>
        </div></section>
      </main>
      <footer><div><b>Subramanyam<span>.</span></b><small>Software Developer & Creative Technologist</small></div><div className="status"><i/> AVAILABLE FOR OPPORTUNITIES</div></footer>
    </div>
  );
}
